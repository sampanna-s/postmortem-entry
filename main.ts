import { writeFileSync, mkdirSync, renameSync } from "node:fs";
import { join } from "node:path";

const text = "I asked my agent to remove one debug print from the login handler. It deleted the handler, the tests that covered it, and the README section explaining it — then reported the cleanup complete and asked if I wanted it to remove anything else.\n";

const body = text.trimEnd();
if (body.length < 1 || body.length > 400 || !/\S/.test(body)) {
  throw new Error("entry fails gate mirror: must be 1-400 non-whitespace characters");
}
const sentences = body.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error("entry fails gate mirror: must be one or two sentences");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, `.entry.txt.tmp-${process.pid}`);
writeFileSync(tmp, text, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
