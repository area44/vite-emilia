import { encode } from "blurhash";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PROJECTS_DIR = "src/content/projects";
const OUTPUT_FILE = "src/content/image-metadata.json";

async function getImageMetadata(filePath) {
  const image = sharp(filePath);
  const metadata = await image.metadata();

  const { width, height } = metadata;

  // Resize for blurhash (small size is enough)
  const { data, info } = await image
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: "inside" })
    .toBuffer({ resolveWithObject: true });

  const hash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);

  return {
    hash,
    width,
    height,
  };
}

async function walk(dir, fileList = []) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      await walk(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function main() {
  console.log("Generating image metadata...");
  const imageFiles = await walk(PROJECTS_DIR);
  const results = {};

  for (const file of imageFiles) {
    // Normalize path to use forward slashes and be relative to project root
    const normalizedPath = file.replace(/\\/g, "/");
    console.log(`Processing ${normalizedPath}...`);
    try {
      results[normalizedPath] = await getImageMetadata(file);
    } catch (err) {
      console.error(`Error processing ${normalizedPath}:`, err);
    }
  }

  await fs.promises.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`Metadata saved to ${OUTPUT_FILE}`);
}

main().catch(console.error);
