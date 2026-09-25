import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Static generation reads published content only; draft/preview mode
  // (Phase 2 "Draft/preview mode" task) will use a separate client with
  // useCdn: false and the token, once that's built.
  useCdn: true,
});
