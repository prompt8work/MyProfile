import type { ContentAdapter, NormalizedContentItem } from "./types";

// PRD §56 Strategy Pattern: "Each source can have a different
// synchronization strategy." In practice here the strategy for the one
// current source (YouTube) is "call the adapter and return what it
// normalized" — but the seam exists so a future source with different sync
// behavior (pagination, a different auth flow, rate-limit handling) can
// get its own strategy without changing how the sync script or Sanity
// upsert step works.
export interface SyncStrategy {
  run(): Promise<NormalizedContentItem[]>;
}

export class AdapterSyncStrategy implements SyncStrategy {
  constructor(private adapter: ContentAdapter) {}

  async run(): Promise<NormalizedContentItem[]> {
    return this.adapter.fetchItems();
  }
}
