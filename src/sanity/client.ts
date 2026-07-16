import { createClient } from "next-sanity";

export const SANITY_PROJECT_ID = "rc840ke9";
export const SANITY_DATASET = "production";

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: false,
});
