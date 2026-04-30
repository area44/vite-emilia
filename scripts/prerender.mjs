import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, "..", p);

async function prerender() {
  const dist = toAbsolute("dist");
  const serverEntry = toAbsolute("dist/server/entry.server.js");

  if (!fs.existsSync(serverEntry)) {
    console.error("Server entry not found. Did you run the SSR build?");
    process.exit(1);
  }

  const { default: handleRequest } = await import(serverEntry);

  // Get project slugs for prerendering
  const contentDir = toAbsolute("src/content");
  const directories = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  const routes = ["/"];

  for (const dirent of directories) {
    const mdxPath = path.join(contentDir, dirent.name, "index.mdx");
    if (!fs.existsSync(mdxPath)) continue;

    try {
      const content = fs.readFileSync(mdxPath, "utf-8");
      const match = content.match(/slug:\s*["']?([^"'\n]+)["']?/);
      if (match && match[1]) {
        const s = match[1];
        routes.push(s.startsWith("/") ? s : `/${s}`);
      } else {
        routes.push(`/${dirent.name}`);
      }
    } catch {
      routes.push(`/${dirent.name}`);
    }
  }

  console.log("Prerendering routes:", routes);

  const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");
  const base = (process.env.BASE || "/").replace(/\/$/, "");

  for (const url of routes) {
    const requestUrl = `http://localhost${base}${url}`;
    const request = new Request(requestUrl);
    const responseHeaders = new Headers();

    const response = await handleRequest(request, 200, responseHeaders);
    const fullHtml = await streamToString(response.body);

    const headTags = [];
    const headEndIndex = fullHtml.indexOf("<!--$-->");
    let contentToScan = fullHtml;
    let bodyHtml = fullHtml;

    if (headEndIndex !== -1) {
      contentToScan = fullHtml.substring(0, headEndIndex);
      bodyHtml = fullHtml.substring(headEndIndex);
    }

    const tagRegex = /<(title|meta|link)[^>]*>(?:.*?<\/title>)?/gi;
    let match;
    while ((match = tagRegex.exec(contentToScan)) !== null) {
      headTags.push(match[0]);
    }

    const filePath = path.join(dist, url === "/" ? "index.html" : `${url}/index.html`);
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let finalHtml = template.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

    if (headTags.length > 0) {
      finalHtml = finalHtml.replace(/<title>[^<]*<\/title>/gi, "");
      finalHtml = finalHtml.replace(/<meta name="description"[^>]*>/gi, "");
      finalHtml = finalHtml.replace("</head>", `  ${headTags.join("\n    ")}\n  </head>`);
    }

    fs.writeFileSync(filePath, finalHtml);
    console.log("Prerendered:", url, "using URL:", requestUrl);
  }
}

async function streamToString(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }

  return result;
}

prerender();
