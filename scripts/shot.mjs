import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", ".demo-shots");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(900);
await page.screenshot({
  path: path.join(out, "mobile-hero.png"),
  fullPage: false,
});
await page.screenshot({
  path: path.join(out, "mobile-full.png"),
  fullPage: true,
});

await page.goto(
  "http://localhost:3000/booking/komodo-3d2n?departure=2026-08-12",
  { waitUntil: "networkidle" },
);
await page.screenshot({
  path: path.join(out, "mobile-booking.png"),
  fullPage: true,
});

await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
await page.screenshot({
  path: path.join(out, "mobile-admin-login.png"),
  fullPage: false,
});

await browser.close();
console.log("ok");
