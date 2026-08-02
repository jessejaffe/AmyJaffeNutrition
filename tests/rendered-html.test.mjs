import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
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
  assert.match(html, /Nutrition counseling · South Florida &amp; telehealth/);
  assert.match(html, /Find freedom from eating disorders, diets, food rules, and body struggles - delivered with care and compassion, curiosity, not judgment\./);
  assert.doesNotMatch(html, /that listens to you - not the numbers/);
  assert.match(html, /In-person in South Florida and via secure telehealth/);
  assert.doesNotMatch(html, /[—–]/);
  assert.match(html, /poster="images\/purple-flowers-breeze-poster\.jpg"/);
  assert.match(html, /src="video\/purple-flowers-breeze-slow\.mp4"/);
  assert.match(html, /Request an appointment/);
  assert.match(html, /href="testimonials\/">Testimonials<\/a>/i);
  assert.match(html, /Eating disorder recovery\..*GLP-1 support\..*Less food fear\..*More body trust\./s);
  assert.doesNotMatch(html, /A life beyond diets/);
  assert.match(html, /<h2 class="about-title"><span>Meet Amy Jaffe,<\/span><em>MS, RD, LD<\/em><\/h2>/i);
  assert.match(html, /<p class="about-subheadline">Providing care that considers your/i);
  assert.match(html, /My approach is highly individualized and comprehensive\./i);
  assert.doesNotMatch(html, /Care that sees the whole person|highly individualized and holistic/i);
  assert.doesNotMatch(html, /RDN, LDN/i);
  assert.match(html, /Honored for care in our community\./i);
  assert.match(html, /It&#x27;s not only about calories, cholesterol, and other numbers\./i);
  assert.match(html, /ending the struggle… so you can build a life of balance, confidence, and peace\./i);
  assert.doesNotMatch(html, /and finally finding food freedom/i);
  assert.match(html, /Nationally Registered and Licensed Nutritionist\/Dietitian/i);
  assert.doesNotMatch(html, />Registered Dietitian</i);
  assert.doesNotMatch(html, /HAES-aligned/i);
  assert.doesNotMatch(html, /other metrics|It&#x27;s about challenging your beliefs\.<\/blockquote>/i);
  assert.match(html, /<p class="quote-caption">- Amy Jaffe<\/p>/i);
  assert.match(html, /images\/award-businessrate-2026\.webp/i);
  assert.match(html, /images\/award-businessrate-2025\.webp/i);
  assert.match(html, /images\/award-marquis-whos-who-2025\.webp/i);
  assert.match(html, /images\/award-quality-business-2024\.avif/i);
  assert.match(html, /Quality Business Award/i);
  assert.match(html, /Winner · 2024/i);
  assert.equal((html.match(/class="award-card"/g) ?? []).length, 4);
  assert.match(html, /<strong>20\+<\/strong><span>years of/i);
  assert.match(html, /poster="images\/amy-video-poster\.jpg"/);
  assert.match(html, /src="video\/nutritioncounselingflorida\.mp4\?v=20260731-6"/);
  assert.match(html, /src="video\/client-testimonial\.mp4\?v=20260731"/);
  assert.match(html, /href="testimonials\/">See more testimonials/i);
  assert.match(html, /Nutrition assessment/i);
  assert.match(html, /90 minutes/i);
  assert.match(html, /A thoughtful look at your health, eating patterns, and goals - followed by a practical plan created together\./i);
  assert.match(html, /href="services\/nutrition-assessment\/"[^>]*aria-label="Learn more about the nutrition assessment"/i);
  assert.match(html, /Nutrition counseling follow-up sessions/i);
  assert.match(html, /Goal-centered sessions that build on your assessment/i);
  assert.match(html, /href="services\/follow-up-sessions\/"[^>]*aria-label="Learn more about nutrition counseling follow-up sessions"/i);
  assert.doesNotMatch(html, /Individual counseling/i);
  assert.doesNotMatch(html, /The assessment includes a detailed medical history/i);
  assert.match(html, /<section class="expertise section" id="expertise">/i);
  assert.match(html, /Areas of[\s\S]*?expertise\./i);
  assert.match(html, /Ages 13 and up/i);
  assert.match(html, /Eating Disorders, Disordered Eating/i);
  assert.match(html, /GLP-1 Nutrition Support/i);
  assert.match(html, /Bariatric Surgery/i);
  assert.match(html, /Intuitive Eating/i);
  assert.match(html, /PMOS \(PCOS\)/i);
  assert.match(html, /Type 2 Diabetes/i);
  assert.match(html, /Pregnancy/i);
  assert.match(html, /Menopause/i);
  assert.match(html, /Overeating\/Emotional Eating/i);
  assert.match(html, /Weight Cycling/i);
  assert.match(html, /GI Issues/i);
  assert.match(html, /Body Image/i);
  assert.match(html, /Heart Disease/i);
  assert.match(html, /Metabolic Syndrome/i);
  assert.doesNotMatch(html, /High Blood Pressure/i);
  assert.equal((html.match(/class="expertise-item"/g) ?? []).length, 14);
  assert.equal((html.match(/class="expertise-icon" aria-hidden="true">✦<\/span>/g) ?? []).length, 14);
  assert.doesNotMatch(html, /class="expertise-icon"[^>]*>\d+/i);
  assert.match(html, /<ul class="expertise-list">/i);
  assert.doesNotMatch(html, /<ol class="expertise-list">/i);
  const expertiseOrder = [
    "Bariatric Surgery",
    "Body Image",
    "Eating Disorders, Disordered Eating",
    "GI Issues",
    "GLP-1 Nutrition Support",
    "Heart Disease",
    "Intuitive Eating",
    "Menopause",
    "Metabolic Syndrome",
    "Overeating/Emotional Eating",
    "PMOS (PCOS)",
    "Pregnancy",
    "Type 2 Diabetes",
    "Weight Cycling",
  ];
  let previousExpertiseIndex = -1;
  for (const area of expertiseOrder) {
    const areaIndex = html.indexOf(area, previousExpertiseIndex + 1);
    assert.ok(areaIndex > previousExpertiseIndex, `${area} should appear in alphabetical order`);
    previousExpertiseIndex = areaIndex;
  }
  assert.ok(html.indexOf('class="quote-section"') < html.indexOf('class="expertise section"'), "Specialized support should follow the calories quote");
  assert.ok(html.indexOf('class="expertise section"') < html.indexOf('class="services section"'), "Specialized support should come before services");
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
  assert.match(html, /Amy helped me navigate my relationship with food, transforming it into a source of joy rather than anxiety\./i);
  assert.match(html, /images\/client-testimonial-poster\.jpg/i);
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
  assert.match(html, /class="google-brand-heading" aria-label="Google Reviews"/i);
  assert.match(html, /google-blue">G<\/span><span class="google-red">o<\/span><span class="google-yellow">o<\/span><span class="google-blue">g<\/span><span class="google-green">l<\/span><span class="google-red">e<\/span>/i);
  assert.match(html, /class="google-reviews-label"[^>]*>Reviews<\/span>/i);
  assert.doesNotMatch(html, /Google(?:™|®)|Google Reviews<\/p>/i);
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
  assert.doesNotMatch(html, /quote-number/i);
  assert.doesNotMatch(html, /testimonial-image-gallery/i);
  assert.doesNotMatch(html, /rainbow of possibilities/i);
});

test("server-renders the nutrition assessment detail page", async () => {
  const response = await render("/services/nutrition-assessment");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Nutrition Assessment \| Amy Jaffe Nutrition<\/title>/i);
  assert.match(html, /Initial session · 90 minutes/i);
  assert.match(html, /The assessment includes a detailed medical history, prior eating patterns, weight issues, physical activity, food and body challenges\./i);
  assert.match(html, /class="assessment-review-copy"/i);
  assert.match(html, /interoceptive senses \(internal cues of hunger and fullness\)/i);
  assert.match(html, /concrete plan of action that is evaluated in follow-up sessions/i);
  assert.match(html, /href="https:\/\/www\.recoveryrecord\.com\/"[^>]*>Recovery Record/i);
  assert.match(html, /href="https:\/\/www\.nourishly\.com\/"[^>]*>Nourishly/i);
  assert.match(html, /href="\.\.\/\.\.\/#services"[^>]*>.*Back to services/i);
});

test("server-renders the nutrition counseling follow-up sessions page", async () => {
  const response = await render("/services/follow-up-sessions");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Nutrition Counseling Follow-Up Sessions \| Amy Jaffe Nutrition<\/title>/i);
  assert.match(html, /Ongoing, individualized support/i);
  assert.match(html, /The follow-up sessions are based on the goals determined during the initial nutrition assessment\./i);
  assert.match(html, /both successes and challenges are used to promote change/i);
  assert.match(html, /Grocery outings/i);
  assert.match(html, /Mindful meal outings/i);
  assert.match(html, /Intuitive eating/i);
  assert.match(html, /interoceptive awareness/i);
  assert.match(html, /framework will guide our work together, helping you move from structure toward flexibility and greater freedom with food/i);
  assert.match(html, /local grocery store, or we meet there together virtually/i);
  assert.match(html, /local restaurants or cafés, or we meet there together virtually/i);
  assert.match(html, /Food exposures/i);
  assert.match(html, /challenging or forbidden foods to the session, in person or virtually/i);
  assert.match(html, /facing your fears/i);
  assert.equal((html.match(/class="follow-up-option-card"/g) ?? []).length, 4);
  const optionOrder = ["Intuitive eating", "Food exposures", "Mindful meal outings", "Grocery outings"];
  let previousOptionIndex = -1;
  for (const option of optionOrder) {
    const optionIndex = html.indexOf(option, previousOptionIndex + 1);
    assert.ok(optionIndex > previousOptionIndex, `${option} should appear in the requested session order`);
    previousOptionIndex = optionIndex;
  }
  assert.match(html, /href="\.\.\/\.\.\/#services"[^>]*>.*Back to services/i);
});

test("exports a GitHub Pages-ready static site", async () => {
  const index = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  const notFound = await readFile(new URL("../dist/client/404.html", import.meta.url), "utf8");
  const testimonials = await readFile(new URL("../dist/client/testimonials/index.html", import.meta.url), "utf8");
  const assessment = await readFile(new URL("../dist/client/services/nutrition-assessment/index.html", import.meta.url), "utf8");
  const followUp = await readFile(new URL("../dist/client/services/follow-up-sessions/index.html", import.meta.url), "utf8");

  assert.match(index, /<title>Amy Jaffe Nutrition \| Intuitive Eating Dietitian<\/title>/i);
  assert.match(index, /href="assets\//);
  assert.match(index, /src="video\/nutritioncounselingflorida\.mp4\?v=20260731-6"/);
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
  assert.match(assessment, /<title>Nutrition Assessment \| Amy Jaffe Nutrition<\/title>/i);
  assert.match(assessment, /href="\.\.\/\.\.\/assets\//);
  assert.match(assessment, /src="\.\.\/\.\.\/images\/amy-jaffe-logo\.avif"/i);
  assert.match(assessment, /href="\.\.\/\.\.\/#services"/i);
  assert.doesNotMatch(assessment, /<script\b/i);
  assert.doesNotMatch(assessment, /modulepreload/i);
  assert.match(followUp, /<title>Nutrition Counseling Follow-Up Sessions \| Amy Jaffe Nutrition<\/title>/i);
  assert.match(followUp, /href="\.\.\/\.\.\/assets\//);
  assert.match(followUp, /src="\.\.\/\.\.\/images\/amy-jaffe-logo\.avif"/i);
  assert.match(followUp, /Grocery outings/i);
  assert.match(followUp, /Mindful meal outings/i);
  assert.match(followUp, /Intuitive eating/i);
  assert.match(followUp, /Food exposures/i);
  assert.match(followUp, /href="\.\.\/\.\.\/#services"/i);
  assert.doesNotMatch(followUp, /<script\b/i);
  assert.doesNotMatch(followUp, /modulepreload/i);
  assert.equal(notFound, index);
  await access(new URL("../dist/client/.nojekyll", import.meta.url));
});

test("ships the owned visual assets and no starter preview", async () => {
  await Promise.all([
    access(new URL("../public/images/meadow.avif", import.meta.url)),
    access(new URL("../public/images/purple-flowers-breeze-poster.jpg", import.meta.url)),
    access(new URL("../public/images/amy-video-poster.jpg", import.meta.url)),
    access(new URL("../public/images/client-testimonial-poster.jpg", import.meta.url)),
    access(new URL("../public/images/award-businessrate-2026.webp", import.meta.url)),
    access(new URL("../public/images/award-businessrate-2025.webp", import.meta.url)),
    access(new URL("../public/images/award-marquis-whos-who-2025.webp", import.meta.url)),
    access(new URL("../public/images/award-quality-business-2024.avif", import.meta.url)),
    access(new URL("../public/images/testimonials/testimonial-note-01.jpg", import.meta.url)),
    access(new URL("../public/images/testimonials/testimonial-note-08.jpg", import.meta.url)),
    access(new URL("../public/images/testimonials/testimonial-note-09.png", import.meta.url)),
    access(new URL("../public/images/testimonials/testimonial-note-16.jpg", import.meta.url)),
    access(new URL("../public/video/nutritioncounselingflorida.mp4", import.meta.url)),
    access(new URL("../public/video/client-testimonial.mp4", import.meta.url)),
    access(new URL("../public/video/purple-flowers-breeze-slow.mp4", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
  const testimonialVideo = await stat(new URL("../public/video/client-testimonial.mp4", import.meta.url));
  assert.ok(testimonialVideo.size < 6 * 1024 * 1024, "client testimonial video should remain optimized for web playback");
  const meetAmyVideo = await stat(new URL("../public/video/nutritioncounselingflorida.mp4", import.meta.url));
  assert.ok(meetAmyVideo.size < 6 * 1024 * 1024, "Meet Amy video should remain optimized for web playback");
  const awardImages = await Promise.all([
    stat(new URL("../public/images/award-businessrate-2026.webp", import.meta.url)),
    stat(new URL("../public/images/award-businessrate-2025.webp", import.meta.url)),
    stat(new URL("../public/images/award-marquis-whos-who-2025.webp", import.meta.url)),
  ]);
  assert.ok(awardImages.reduce((total, image) => total + image.size, 0) < 150 * 1024, "recognition images should remain optimized for fast loading");
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
