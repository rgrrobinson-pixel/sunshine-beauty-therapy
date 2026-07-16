// Server-only PayPal REST API helpers. Uses the create+capture order flow
// (recommended over client-only integration) so payment is always verified
// server-side before we record an order or issue a voucher.

const PAYPAL_API_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function createPayPalOrder(params: {
  amount: number;
  currency?: string;
  description: string;
  referenceId: string;
}) {
  const accessToken = await getAccessToken();
  const currency = params.currency ?? "AUD";

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: params.referenceId,
          description: params.description,
          amount: {
            currency_code: currency,
            value: params.amount.toFixed(2),
          },
        },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `PayPal create order failed: ${res.status} ${await res.text()}`
    );
  }

  return res.json();
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getAccessToken();

  const res = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `PayPal capture failed: ${res.status} ${JSON.stringify(data)}`
    );
  }

  return data;
}

export async function verifyPayPalWebhookSignature(params: {
  headers: Headers;
  body: unknown;
}) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    throw new Error("PAYPAL_WEBHOOK_ID is not configured");
  }

  const accessToken = await getAccessToken();

  const res = await fetch(
    `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: params.headers.get("paypal-auth-algo"),
        cert_url: params.headers.get("paypal-cert-url"),
        transmission_id: params.headers.get("paypal-transmission-id"),
        transmission_sig: params.headers.get("paypal-transmission-sig"),
        transmission_time: params.headers.get("paypal-transmission-time"),
        webhook_id: webhookId,
        webhook_event: params.body,
      }),
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.verification_status === "SUCCESS";
}
