import { mkdir, writeFile } from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", `${process.pid}-${Date.now()}`);

const { default: worker } = await import(workerUrl.href);
const outputDirectory = new URL("../dist/client/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const routes = [
  { path: "/", output: "index.html", assetPrefix: "" },
  { path: "/testimonials", output: "testimonials/index.html", assetPrefix: "../" },
  { path: "/free-introductory-call", output: "free-introductory-call/index.html", assetPrefix: "../" },
  { path: "/services/nutrition-assessment", output: "services/nutrition-assessment/index.html", assetPrefix: "../../" },
  { path: "/services/follow-up-sessions", output: "services/follow-up-sessions/index.html", assetPrefix: "../../" },
];

async function renderRoute({ path, output, assetPrefix }) {
  const response = await worker.fetch(
    new Request(`https://www.amyjaffenutrition.com${path}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) {
    throw new Error(`${path} render failed with status ${response.status}`);
  }

  let html = await response.text();

  // These brochure pages do not need client-side JavaScript. Removing hydration
  // scripts keeps each static copy reliable and makes the download much smaller.
  // Retain the small, dependency-free mobile video helper used by the homepage.
  const staticScripts = [];
  html = html.replace(/<script\b[^>]*\bdata-static-script(?:=["'][^"']*["'])?[^>]*>[\s\S]*?<\/script>/gi, (script) => {
    const placeholder = `__AMY_STATIC_SCRIPT_${staticScripts.length}__`;
    staticScripts.push(script);
    return placeholder;
  });

  html = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "")
    .replace(/(["'])\/(assets|images|video)\//g, `$1${assetPrefix}$2/`);

  staticScripts.forEach((script, index) => {
    html = html.replace(`__AMY_STATIC_SCRIPT_${index}__`, script);
  });

  const outputUrl = new URL(output, outputDirectory);
  await mkdir(new URL("./", outputUrl), { recursive: true });
  await writeFile(outputUrl, html);
  return html;
}

const [homepage] = await Promise.all(routes.map(renderRoute));
await Promise.all([
  writeFile(new URL("404.html", outputDirectory), homepage),
  writeFile(new URL(".nojekyll", outputDirectory), ""),
]);

console.log("Static site exported to dist/client");
