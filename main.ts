import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Republic of Mirell — Volcano Warden's Passport.
// The entry image is a fictional prop document produced for the
// worldbuilding design competition. This program copies the finished
// passport spread (entry.png) from the repository into the output
// directory the grader reads.

const repoDir = dirname(fileURLToPath(import.meta.url));
const source = join(repoDir, "entry.png");
const outDir = (process.env.MAKEFUN_OUTPUT_DIR || "").trim() || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error("entry.png not found in repository root");
}

// The competition caps the image at 1 MiB and 1024 by 1024 pixels.
const size = statSync(source).size;
if (size > 1048576) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB cap`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`wrote ${target}`);
