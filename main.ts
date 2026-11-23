// post-x-the-agent-builds-a-game-from-20261122-1709
// The entrypoint copies POST.json (the X post's address) to /output.
// That is all it has to do: the house reads the post itself from X.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const src = join(botDir, "POST.json");
const raw = readFileSync(src, "utf8");
const post = JSON.parse(raw) as { url?: unknown };
const shape = /^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;
if (typeof post.url !== "string" || !shape.test(post.url)) {
  throw new Error("POST.json must hold {\"url\": \"https://x.com/<handle>/status/<id>\"} (digits only)");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "POST.json"));
console.log("post-x entry: copied POST.json -> " + join(outDir, "POST.json"));
console.log("post url: " + post.url);
