// Sends the voucher confirmation email via Resend's HTTP API directly
// (no SDK dependency needed — keeps the bundle small).

export async function sendVoucherEmail(params: {
  to: string;
  purchaserName: string;
  recipientName?: string;
  code: string;
  itemLabel: string;
  amount: number;
  message?: string;
  treatmentDescription?: string;
  treatmentDuration?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress =
    process.env.VOUCHER_FROM_EMAIL ??
    "onboarding@resend.dev";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const greetingName = params.recipientName || params.purchaserName;

  const isCashVoucher = params.itemLabel.includes("A$");
  const displayValue = isCashVoucher
    ? `A$${params.amount.toFixed(2)}`
    : params.itemLabel.replace("Gift Voucher — ", "");

  const valueLabel = isCashVoucher ? "Certificate Value" : "Selected Treatment";
  const secondaryValueHtml = isCashVoucher
    ? ""
    : `<p style="margin: 6px 0 0; font-size: 13px; color: #8a8880;">Valued at A$${params.amount.toFixed(2)}</p>`;

  const html = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f6f5f2; color: #333333;">
      <!-- Outer Certificate Card -->
      <div style="background-color: #faf8f5; border: 1px solid #e2ded5; padding: 40px 30px; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center;">
        
        <!-- Header / Brand -->
        <div style="margin-bottom: 24px;">
          <p style="margin: 0; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #8a8880;">Sunshine Coast</p>
          <h2 style="font-family: Georgia, serif; font-size: 26px; font-weight: normal; letter-spacing: 0.05em; color: #2c4234; margin: 6px 0 2px; text-transform: uppercase;">Sunshine Beauty Therapy</h2>
          <div style="width: 40px; height: 1px; background-color: #c5a880; margin: 12px auto;"></div>
          <p style="margin: 0; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: #b8975a; font-weight: bold;">Gift Certificate</p>
        </div>

        <!-- Certificate Body Box -->
        <div style="border: 4px double #c5a880; padding: 30px 24px; background-color: #ffffff; margin-bottom: 30px; position: relative;">
          
          <!-- Inner Layout Grid -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="text-align: left; width: 50%; vertical-align: top; padding-bottom: 12px;">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8a8880; display: block; margin-bottom: 2px;">Prepared For</span>
                <span style="font-family: Georgia, serif; font-size: 16px; font-style: italic; color: #2c4234; font-weight: bold;">${params.recipientName || 'Valued Guest'}</span>
              </td>
              <td style="text-align: right; width: 50%; vertical-align: top; padding-bottom: 12px;">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8a8880; display: block; margin-bottom: 2px;">With Love From</span>
                <span style="font-family: Georgia, serif; font-size: 16px; font-style: italic; color: #2c4234; font-weight: bold;">${params.purchaserName}</span>
              </td>
            </tr>
          </table>

          <!-- Value / Item Section -->
          <div style="margin: 20px 0; border-top: 1px solid #f0edf0; border-bottom: 1px solid #f0edf0; padding: 16px 0;">
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8a8880; display: block; margin-bottom: 4px;">${valueLabel}</span>
            <span style="font-family: Georgia, serif; font-size: 32px; color: #2c4234; font-weight: bold; letter-spacing: 0.05em;">
              ${displayValue}
            </span>
            ${params.treatmentDuration ? `<p style="margin: 4px 0 0; font-size: 14px; font-weight: bold; color: #b8975a; letter-spacing: 0.05em;">${params.treatmentDuration}</p>` : ""}
            ${secondaryValueHtml}
          </div>

          <!-- Selected Treatment Description -->
          ${params.treatmentDescription ? `
            <div style="margin: 16px 0; padding: 12px 16px; background-color: #faf8f5; border-radius: 4px; border-left: 3px solid #c5a880; text-align: left;">
              <p style="font-size: 13px; color: #5a5850; line-height: 1.5; margin: 0;">
                ${params.treatmentDescription}
              </p>
            </div>
          ` : ""}

          <!-- Personalized Message -->
          ${params.message ? `
            <div style="margin: 24px 0;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8a8880; display: block; margin-bottom: 6px;">Personal Message</span>
              <p style="font-family: Georgia, serif; font-size: 16px; font-style: italic; color: #4a4842; line-height: 1.6; margin: 0; padding: 0 10px;">
                "${params.message}"
              </p>
            </div>
          ` : ""}

          <!-- Code Box -->
          <div style="background-color: #faf8f5; border: 1px dashed #c5a880; border-radius: 4px; padding: 14px 20px; display: inline-block; margin-top: 10px;">
            <span style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: #8a8880; display: block; margin-bottom: 4px;">Voucher Code</span>
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: bold; color: #2c4234; letter-spacing: 0.1em;">${params.code}</span>
          </div>

        </div>

        <!-- Redemption Terms -->
        <div style="font-size: 12px; color: #7a7872; line-height: 1.6; padding: 0 20px;">
          <p style="margin: 0 0 8px;">To redeem your voucher, please quote code <strong>${params.code}</strong> when booking your appointment with Jane by phone, SMS, or email.</p>
          <p style="margin: 0; font-size: 11px;">Expires on ${new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}. Valid for services at Sunshine Beauty Therapy.</p>
        </div>

      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [params.to],
      subject: "Your Sunshine Beauty Therapy gift voucher",
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend send failed: ${res.status} ${await res.text()}`);
  }

  return res.json();
}
