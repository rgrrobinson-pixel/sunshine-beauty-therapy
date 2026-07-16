const clientId = "AYVRxBtIiNa6GS5Gl4piEY6BWa6Iesqg-AXJQ3bdXSqHlQc_o8GPyg6YtuyqxCc7tki3Mq5pjmJGM3d-";
const secret = "EDR_NZQ8XPsjo-z0uLP2cJ4kKoZCWiwTRPXzg_mW_MLYggWngLmJwrl2WHsaLEW2ffAjfyP_MyUrKj7v";

async function test(url, name) {
  try {
    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
    const res = await fetch(`${url}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    if (res.ok) {
      console.log(`${name}: SUCCESS`);
      return true;
    } else {
      console.log(`${name}: FAILED (${res.status} - ${await res.text()})`);
      return false;
    }
  } catch (err) {
    console.log(`${name}: ERROR (${err.message})`);
    return false;
  }
}

async function run() {
  await test("https://api-m.sandbox.paypal.com", "SANDBOX");
  await test("https://api-m.paypal.com", "LIVE");
}

run();
