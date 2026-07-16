const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: "rc840ke9",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-01",
});

async function run() {
  try {
    const orders = await client.fetch(`*[_type == "order"] | order(createdAt desc)[0..5]`);
    console.log("Recent Orders:");
    console.log(JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
}

run();
