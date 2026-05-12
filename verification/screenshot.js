import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:5173/");
    await page.waitForSelector("main");
    await page.screenshot({ path: "/home/jules/verification/home_page.png", fullPage: true });
    console.log("Homepage screenshot taken");

    await page.click('a[href="/neon-lights"]');
    await page.waitForSelector("h1");
    await page.screenshot({ path: "/home/jules/verification/project_page.png", fullPage: true });
    console.log("Project page screenshot taken");
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
