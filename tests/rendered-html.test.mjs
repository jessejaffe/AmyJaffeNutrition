import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
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
  assert.match(html, /Find freedom from eating disorders, diets, food rules, and body struggles delivered with care that listens to you - not the numbers\./);
  assert.doesNotMatch(html, /[—–]/);
  assert.match(html, /poster="images\/purple-flowers-breeze-poster\.jpg"/);
  assert.match(html, /src="video\/purple-flowers-breeze-slow\.mp4"/);
  assert.match(html, /Request an appointment/);
  assert.match(html, /href="testimonials\/">Testimonials<\/a>/i);
  assert.match(html, /Eating disorder recovery\..*Less food fear\..*More body trust\..*A life beyond diets\./s);
  assert.match(html, /<h2 class="about-title"><span>Meet Amy Jaffe,<\/span><em>MS, RD, LD<\/em><\/h2>/i);
  assert.match(html, /<p class="about-subheadline">Care that sees the/i);
  assert.doesNotMatch(html, /RDN, LDN/i);
  assert.match(html, /Honored for care in our community\./i);
  assert.match(html, /images\/award-businessrate-2026\.png/i);
  assert.match(html, /images\/award-businessrate-2025\.png/i);
  assert.match(html, /images\/award-marquis-whos-who-2025\.png/i);
  assert.match(html, /<strong>20\+<\/strong><span>years of/i);
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
  assert.match(html, /Map of Amy Jaffe Nutrition in Miami/i);
  assert.match(html, /1801 NE 123rd Street, Suite 303/);
  assert.match(html, /google\.com\/maps\/dir\/\?api=1/i);
  assert.match(html, /property="og:image" content="https:\/\/www\.amyjaffenutrition\.com\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton|A note from Amy/i);
});

test("server-renders the complete testimonials page", async () => {
  const response = await render("/testimonials");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Client Testimonials \| Amy Jaffe Nutrition<\/title>/i);
  assert.match(html, /Stories of trust,/i);
  assert.match(html, /Kim R\./);
  assert.match(html, /Kind, compassionate &amp; nonjudgmental\./i);
  assert.match(html, /Mark E\./);
  assert.match(html, /Help, support &amp; laughing at my bad jokes\./i);
  assert.match(html, /Becky/);
  assert.match(html, /Irene C\./);
  assert.match(html, /Morgan H\./);
  assert.match(html, /Rachael P\./);
  assert.match(html, /Dr\. Sammi Siegel/);
  assert.match(html, /Carlos C\./);
  assert.match(html, /She helped me get my life back/i);
  assert.match(html, /Kind words,[\s\S]*?answered with care/i);
  assert.match(html, /26 Google reviews/i);
  assert.match(html, /Amy Jaffe Nutrition replied/i);
  assert.match(html, /Amy was such a light and joy to work with/i);
  assert.match(html, /0x88d9b798d570deaf:0xdb7f0e34ff8acdc/i);
  assert.equal((html.match(/class="google-review-card"/g) ?? []).length, 5);
  assert.match(html, /data-client="Abbey Griffith"[\s\S]*?testimonial-note-01\.jpg[\s\S]*?testimonial-note-02\.jpeg/i);
  assert.match(html, /data-client="Michelle"[\s\S]*?testimonial-note-03\.jpeg[\s\S]*?testimonial-note-04\.jpeg/i);
  assert.match(html, /data-client="Karen"[\s\S]*?testimonial-note-07\.jpeg/i);
  assert.match(html, /data-client="Maria"[\s\S]*?testimonial-note-09\.png[\s\S]*?testimonial-note-08\.jpg/i);
  assert.match(html, /data-client="Morgan H\."[\s\S]*?testimonial-note-13\.jpeg/i);
  assert.match(html, /data-client="Rachael P\."[\s\S]*?testimonial-note-14\.jpg/i);
  assert.match(html, /data-client="Dr\. Sammi Siegel"[\s\S]*?testimonial-note-15\.jpeg/i);
  assert.match(html, /data-client="Carlos C\."[\s\S]*?testimonial-note-16\.jpg/i);
  assert.equal((html.match(/<img[^>]+src="\.\.\/images\/testimonials\/testimonial-note-/g) ?? []).length, 14);
  assert.doesNotMatch(html, /client-quote-card/i);
  assert.doesNotMatch(html, /testimonial-image-gallery/i);
  assert.doesNotMatch(html, /rainbow of possibilities/i);
});

test("exports a GitHub Pages-ready static site", async () => {
  const index = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  const notFound = await readFile(new URL("../dist/client/404.html", import.meta.url), "utf8");
  const testimonials = await readFile(new URL("../dist/client/testimonials/index.html", import.meta.url), "utf8");

  assert.match(index, /<title>Amy Jaffe Nutrition \| Intuitive Eating Dietitian<\/title>/i);
  assert.match(index, /href="assets\//);
  assert.match(index, /src="video\/nutritioncounselingflorida\.mp4"/);
  assert.doesNotMatch(index, /<script\b/i);
  assert.doesNotMatch(index, /modulepreload/i);
  assert.match(testimonials, /<title>Client Testimonials \| Amy Jaffe Nutrition<\/title>/i);
  assert.match(testimonials, /href="\.\.\/assets\//);
  assert.match(testimonials, /src="\.\.\/images\/testimonials\/testimonial-note-01\.jpg"/i);
  assert.match(testimonials, /26 Google reviews/i);
  assert.match(testimonials, /Amy Jaffe Nutrition replied/i);
  assert.match(testimonials, /href="\.\.\/#about"/i);
  assert.doesNotMatch(testimonials, /<script\b/i);
  assert.doesNotMatch(testimonials, /modulepreload/i);
  assert.equal(notFound, index);
  await access(new URL("../dist/client/.nojekyll", import.meta.url));
});

test("ships the owned visual assets and no starter preview", async () => {
  await Promise.all([
    access(new URL("../public/images/meadow.avif", import.meta.url)),
    access(new URL("../public/images/purple-flowers-breeze-poster.jpg", import.meta.url)),
    access(new URL("../public/images/amy-video-poster.jpg", import.meta.url)),
    access(new URL("../public/images/client-testimonial-poster.jpg", import.meta.url)),
    access(new URL("../public/images/award-businessrate-2026.png", import.meta.url)),
    access(new URL("../public/images/award-businessrate-2025.png", import.meta.url)),
    access(new URL("../public/images/award-marquis-whos-who-2025.png", import.meta.url)),
    access(new URL("../public/images/testimonials/testimonial-note-01.jpg", import.meta.url)),
    access(new URL("../public/images/testimonials/testimonial-note-08.jpg", import.meta.url)),
    access(new URL("../public/images/testimonials/testimonial-note-09.png", import.meta.url)),
    access(new URL("../public/images/testimonials/testimonial-note-16.jpg", import.meta.url)),
    access(new URL("../public/video/nutritioncounselingflorida.mp4", import.meta.url)),
    access(new URL("../public/video/client-testimonial.mp4", import.meta.url)),
    access(new URL("../public/video/purple-flowers-breeze-slow.mp4", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
