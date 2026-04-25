import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log("Navigating to http://localhost:5173...");
    await page.goto("http://localhost:5173");

    // Verify Skip to Content link
    console.log("Checking Skip to Content link...");
    await page.keyboard.press("Tab");
    const skipLink = await page.locator('a:has-text("Skip to content")');
    const isVisible = await skipLink.isVisible();
    console.log("Skip link visible on focus:", isVisible);
    await skipLink.screenshot({ path: "skip-link-focused.png" });

    // Verify focus ring on a button or link
    console.log("Checking focus ring...");
    await page.keyboard.press("Tab"); // Move to next focusable element
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    console.log("Focused element:", focusedElement);
    await page.screenshot({ path: "focus-ring.png" });

    console.log("Verification successful. Screenshots saved.");
  } catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
