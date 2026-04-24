import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Serve the build
        # Note: In this environment, we might just open the files directly or use the preview server if possible.
        # But since I already verified the server with curl, I'll trust the build output.
        # Let's try to take a screenshot of the home page from the build output.
        page = await browser.new_page()

        # We'll use a simple http server to serve the dist folder for verification
        import subprocess
        process = subprocess.Popen(["npx", "react-router-serve", "./build/server/index.js"], env=os.environ)
        await asyncio.sleep(5)

        try:
            await page.goto("http://localhost:3000")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="home_v3.png")

            # Click on the first project
            await page.click("a[href*='/']")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="project_v3.png")
        finally:
            process.kill()

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
