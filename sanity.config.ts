"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    // Vision lets you run raw GROQ queries from inside the Studio UI —
    // genuinely useful while wiring up new queries, safe to leave in for
    // a single-editor site.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
