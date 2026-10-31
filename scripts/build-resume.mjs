// Requires Playwright; use PLAYWRIGHT_MODULE to point at a bundled installation.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(new URL("../content/resume.html", import.meta.url).href);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: fileURLToPath(new URL("../public/resume/Wildan-Razaq-Ramadhan-Resume.pdf", import.meta.url)), format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true });
} finally { await browser.close(); }
