const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: "rc840ke9",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-01",
});

async function run() {
  try {
    const vouchers = await client.fetch(`*[_type == "giftVoucher"] | order(purchasedAt desc)[0..10]`);
    console.log("Recent Vouchers:");
    console.log(JSON.stringify(vouchers, null, 2));
  } catch (err) {
    console.error("Error fetching vouchers:", err);
  }
}

run();
