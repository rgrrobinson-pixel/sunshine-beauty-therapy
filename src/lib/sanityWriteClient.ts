import { createClient } from "next-sanity";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/sanity/client";

// Server-only client with write access. Never import this from a
// client component — SANITY_API_WRITE_TOKEN must stay server-side.
export const writeClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
