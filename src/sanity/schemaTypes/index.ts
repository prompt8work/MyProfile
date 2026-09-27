import { type SchemaTypeDefinition } from "sanity";

import project from "./project";
import experience from "./experience";
import resume from "./resume";
import tool from "./tool";
import prompt from "./prompt";
import experiment from "./experiment";
import automation from "./automation";
import blog from "./blog";
import video from "./video";
import training from "./training";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, experience, resume, tool, prompt, experiment, automation, blog, video, training],
};
