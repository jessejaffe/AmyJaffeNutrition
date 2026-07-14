import { mkdir, writeFile } from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", `${process.pid}-${Date.now()}`);

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://www.amyjaffenutrition.com/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Homepage render failed with status ${response.status}`);
}

let html = await response.text();

// This brochure site does not need client-side JavaScript. Removing hydration
// scripts keeps the static copy reliable and makes the download much smaller.
html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "")
  .replace(/(["'])\/(assets|images|video)\//g, "$1$2/");

const outputDirectory = new URL("../dist/client/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(new URL("index.html", outputDirectory), html),
  writeFile(new URL("404.html", outputDirectory), html),
  writeFile(new URL(".nojekyll", outputDirectory), ""),
]);

console.log("Static site exported to dist/client");
