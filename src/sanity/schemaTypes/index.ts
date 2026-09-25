import { type SchemaTypeDefinition } from "sanity";

import project from "./project";
import experience from "./experience";
import resume from "./resume";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, experience, resume],
};
