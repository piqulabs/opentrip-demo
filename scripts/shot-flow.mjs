import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", ".demo-shots");

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

await page.goto("http://localhost:3000/admin");
// reset via evaluating session clear + reload through UI if needed
await page.evaluate(() => sessionStorage.clear());

await page.goto(
  "http://localhost:3000/booking/komodo-3d2n?departure=2026-08-12",
  { waitUntil: "networkidle" },
);
await page.waitForTimeout(400);
await page.fill("#guest-0", "Raka Pratama");
await page.fill("#contactName", "Raka Pratama");
await page.fill("#contactPhone", "081234567890");
await page.click('button[type="submit"]');
await page.waitForURL(/success/);
await page.waitForTimeout(1800);
await page.screenshot({
  path: path.join(out, "mobile-success.png"),
  fullPage: true,
});

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.screenshot({
  path: path.join(out, "mobile-hero-after-dp.png"),
  fullPage: false,
});

await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
await page.fill("#user", "admin");
await page.fill("#pass", "jelajah");
await page.click('button[type="submit"]');
await page.waitForTimeout(600);
await page.screenshot({
  path: path.join(out, "mobile-admin.png"),
  fullPage: true,
});

const seatsText = await page.locator("text=Sisa").first().textContent().catch(() => "");
console.log("admin snippet", seatsText);
await browser.close();
console.log("flow ok");
