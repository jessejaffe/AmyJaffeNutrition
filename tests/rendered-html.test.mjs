import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Amy Jaffe Nutrition homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Amy Jaffe Nutrition \| Intuitive Eating Dietitian<\/title>/i);
  assert.match(html, /Food can feel/);
  assert.match(html, /Find freedom from eating disorders, diets, food rules, and body struggles delivered with care that listens to you—not the numbers\./);
  assert.match(html, /Request an appointment/);
  assert.match(html, /Care that sees the/);
  assert.match(html, /poster="images\/amy-video-poster\.jpg"/);
  assert.match(html, /src="video\/nutritioncounselingflorida\.mp4"/);
  assert.match(html, /src="video\/client-testimonial\.mp4"/);
  assert.match(html, /Nutrition assessment/);
  assert.match(html, /Let&#x27;s make peace/);
  assert.doesNotMatch(html, /class="hero-stamp"|NON-DIET CARE · HAES/i);
  assert.match(html, /action="mailto:amysjaffe@gmail\.com\?subject=Initial%20Nutrition%20Assessment"/i);
  assert.match(html, /method="post"/i);
  assert.match(html, /enctype="text\/plain"/i);
  assert.match(html, /name="Reply-to email"/i);
  assert.match(html, /name="Support requested"[^>]*required/i);
  assert.match(html, /property="og:image" content="https:\/\/www\.amyjaffenutrition\.com\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton|A note from Amy/i);
});

test("exports a GitHub Pages-ready static site", async () => {
  const index = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  const notFound = await readFile(new URL("../dist/client/404.html", import.meta.url), "utf8");

  assert.match(index, /<title>Amy Jaffe Nutrition \| Intuitive Eating Dietitian<\/title>/i);
  assert.match(index, /href="assets\//);
  assert.match(index, /src="video\/nutritioncounselingflorida\.mp4"/);
  assert.doesNotMatch(index, /<script\b/i);
  assert.doesNotMatch(index, /modulepreload/i);
  assert.equal(notFound, index);
  await access(new URL("../dist/client/.nojekyll", import.meta.url));
});

test("ships the owned visual assets and no starter preview", async () => {
  await Promise.all([
    access(new URL("../public/images/meadow.avif", import.meta.url)),
    access(new URL("../public/images/amy-video-poster.jpg", import.meta.url)),
    access(new URL("../public/images/client-testimonial-poster.jpg", import.meta.url)),
    access(new URL("../public/video/nutritioncounselingflorida.mp4", import.meta.url)),
    access(new URL("../public/video/client-testimonial.mp4", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
