const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: "rc840ke9",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-01",
});

const apiKey = "re_qrwkYpDL_6uzriTw9so3KDufWpYqzbTvD";
const fromAddress = "onboarding@resend.dev";

async function sendTest(toEmail, treatmentName) {
  console.log(`Querying Sanity for treatment: ${treatmentName}...`);
  const treatment = await client.fetch(
    `*[_type == "treatment" && name match $name][0]`,
    { name: treatmentName }
  );

  if (!treatment) {
    console.error(`Treatment "${treatmentName}" not found in Sanity!`);
    return;
  }

  console.log(`Found treatment: ${treatment.name}`);
  console.log(`Duration: ${treatment.duration}`);
  console.log(`Description: ${treatment.description}`);
  console.log(`Price: ${treatment.price}`);

  const amount = parseFloat(treatment.price.replace(/[^0-9.]/g, ""));
  const itemLabel = `Gift Voucher — ${treatment.name}`;
  const displayValue = treatment.name;
  const valueLabel = "Selected Treatment";
  const secondaryValueHtml = `<p style="margin: 6px 0 0; font-size: 13px; color: #8a8880;">Valued at A$${amount.toFixed(2)}</p>`;

  const html = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f6f5f2; color: #333333;">
      <div style="background-color: #faf8f5; border: 1px solid #e2ded5; padding: 40px 30px; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center;">
        <div style="margin-bottom: 24px;">
          <p style="margin: 0; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #8a8880;">Sunshine Coast</p>
          <h2 style="font-family: Georgia, serif; font-size: 26px; font-weight: normal; letter-spacing: 0.05em; color: #2c4234; margin: 6px 0 2px; text-transform: uppercase;">Sunshine Beauty Therapy</h2>
          <div style="width: 40px; height: 1px; background-color: #c5a880; margin: 12px auto;"></div>
          <p style="margin: 0; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: #b8975a; font-weight: bold;">Gift Certificate</p>
        </div>

        <div style="border: 4px double #c5a880; padding: 30px 24px; background-color: #ffffff; margin-bottom: 30px; position: relative;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="text-align: left; width: 50%; vertical-align: top; padding-bottom: 12px;">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8a8880; display: block; margin-bottom: 2px;">Prepared For</span>
                <span style="font-family: Georgia, serif; font-size: 16px; font-style: italic; color: #2c4234; font-weight: bold;">Joanne</span>
              </td>
              <td style="text-align: right; width: 50%; vertical-align: top; padding-bottom: 12px;">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8a8880; display: block; margin-bottom: 2px;">With Love From</span>
                <span style="font-family: Georgia, serif; font-size: 16px; font-style: italic; color: #2c4234; font-weight: bold;">John and Tess</span>
              </td>
            </tr>
          </table>

          <div style="margin: 20px 0; border-top: 1px solid #f0edf0; border-bottom: 1px solid #f0edf0; padding: 16px 0;">
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8a8880; display: block; margin-bottom: 4px;">${valueLabel}</span>
            <span style="font-family: Georgia, serif; font-size: 32px; color: #2c4234; font-weight: bold; letter-spacing: 0.05em;">${displayValue}</span>
            ${treatment.duration ? `<p style="margin: 4px 0 0; font-size: 14px; font-weight: bold; color: #b8975a; letter-spacing: 0.05em;">${treatment.duration}</p>` : ""}
            ${secondaryValueHtml}
          </div>

          ${treatment.description ? `
            <div style="margin: 16px 0; padding: 12px 16px; background-color: #faf8f5; border-radius: 4px; border-left: 3px solid #c5a880; text-align: left;">
              <p style="font-size: 13px; color: #5a5850; line-height: 1.5; margin: 0;">
                ${treatment.description}
              </p>
            </div>
          ` : ""}

          <div style="margin: 24px 0;">
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #8a8880; display: block; margin-bottom: 6px;">Personal Message</span>
            <p style="font-family: Georgia, serif; font-size: 16px; font-style: italic; color: #4a4842; line-height: 1.6; margin: 0; padding: 0 10px;">
              "Happy Birthday Joanne, Love John and Tess"
            </p>
          </div>

          <div style="background-color: #faf8f5; border: 1px dashed #c5a880; border-radius: 4px; padding: 14px 20px; display: inline-block; margin-top: 10px;">
            <span style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: #8a8880; display: block; margin-bottom: 4px;">Voucher Code</span>
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: bold; color: #2c4234; letter-spacing: 0.1em;">TEST-BLISS-789</span>
          </div>
        </div>

        <div style="font-size: 12px; color: #7a7872; line-height: 1.6; padding: 0 20px;">
          <p style="margin: 0 0 8px;">To redeem your voucher, please quote code <strong>TEST-BLISS-789</strong> when booking your appointment with Jane.</p>
          <p style="margin: 0; font-size: 11px;">Expires on 2029-07-14. Valid for services at Sunshine Beauty Therapy.</p>
        </div>
      </div>
    </div>
  `;

  console.log(`Attempting to send email to: ${toEmail}...`);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toEmail],
      subject: `Test Sunshine Beauty Therapy Gift Certificate (${treatment.name})`,
      html,
    }),
  });

  const text = await res.text();
  console.log(`Response for ${toEmail}: Status ${res.status} - ${text}\n`);
}

async function main() {
  await sendTest("rgrrobinson@gmail.com", "bliss");
}

main();
