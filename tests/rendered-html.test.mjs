import assert from "node:assert/strict";
import { access } from "node:fs/promises";
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
  assert.match(html, /Request an appointment/);
  assert.match(html, /Care that sees the/);
  assert.match(html, /Nutrition assessment/);
  assert.match(html, /Let&#x27;s make peace/);
  assert.match(html, /property="og:image" content="https:\/\/www\.amyjaffenutrition\.com\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the owned visual assets and no starter preview", async () => {
  await Promise.all([
    access(new URL("../public/images/meadow.avif", import.meta.url)),
    access(new URL("../public/images/amy-jaffe.avif", import.meta.url)),
    access(new URL("../public/video/amy-introduction.mp4", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
