import { readFileSync } from "node:fs";
import { join } from "node:path";

// Single source of truth: the docs files that also ship inside the npm package.
// Read at build time — every route using them is force-static.
const read = (name: string) =>
  readFileSync(join(process.cwd(), "../../packages/calligraph", name), "utf8");

export const index = read("llms.txt");
export const full = read("llms-full.txt");
