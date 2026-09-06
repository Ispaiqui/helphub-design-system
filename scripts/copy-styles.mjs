import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const stylesDir = join(root, "src", "styles");
const distDir = join(root, "dist");

mkdirSync(distDir, { recursive: true });

for (const file of ["tokens.css", "theme.css", "index.css"]) {
  copyFileSync(join(stylesDir, file), join(distDir, file));
}
