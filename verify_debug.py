import asyncio
from playwright.async_api import async_playwright
import os
import http.server
import socketserver
import threading
import time

def run_server():
    os.chdir("dist")
    handler = http.server.SimpleHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", 8009), handler) as httpd:
        httpd.serve_forever()

async def verify():
    thread = threading.Thread(target=run_server, daemon=True)
    thread.start()
    time.sleep(2)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.type}: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"BROWSER ERROR: {exc}"))

        print("Checking Home page...")
        await page.goto("http://localhost:8009")

        # Wait until at least one image is visible (opacity > 0)
        print("Waiting for images to load...")
        try:
            await page.wait_for_function("() => Array.from(document.querySelectorAll('img')).some(img => window.getComputedStyle(img).opacity === '1')", timeout=10000)
            print("Detected visible image!")
        except Exception as e:
            print(f"Timeout waiting for visible image: {e}")

        await page.screenshot(path="debug_home_v2.png")

        images = await page.query_selector_all("img")
        for i, img in enumerate(images):
            src = await img.get_attribute("src")
            opacity = await img.evaluate("el => window.getComputedStyle(el).opacity")
            is_visible = await img.is_visible()
            complete = await img.evaluate("el => el.complete")
            natural_width = await img.evaluate("el => el.naturalWidth")
            print(f"Image {i}: src={src}, opacity={opacity}, visible={is_visible}, complete={complete}, naturalWidth={natural_width}")

        canvases = await page.query_selector_all("canvas")
        print(f"Found {len(canvases)} canvases")
        for i, canvas in enumerate(canvases):
            opacity = await canvas.evaluate("el => window.getComputedStyle(el).opacity")
            print(f"Canvas {i}: opacity={opacity}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
