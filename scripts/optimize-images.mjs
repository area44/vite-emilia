import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { optimize } from "svgo";

const DIST_DIR = "dist/client/assets";

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath).toLowerCase();
  const buffer = await fs.promises.readFile(filePath);

  if (ext === ".svg") {
    // Explicitly skip bg-pattern.svg as requested by user to keep original fidelity
    if (fileName.startsWith("bg-pattern")) {
      console.log(`Skipped ${filePath}: User requested original version`);
      return;
    }

    // Be extremely conservative with other SVGs to avoid breaking masks, filters, or P3 colors
    const result = optimize(buffer.toString(), {
      path: filePath,
      multipass: true,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              convertColors: false,
              cleanupIds: false,
              minifyStyles: false,
            },
          },
        },
      ],
    });

    const optimizedBuffer = Buffer.from(result.data);

    if (optimizedBuffer.length < buffer.length) {
      await fs.promises.writeFile(filePath, optimizedBuffer);
      const savings = ((1 - optimizedBuffer.length / buffer.length) * 100).toFixed(2);
      console.log(
        `Optimized ${filePath}: ${savings}% savings (${(buffer.length / 1024).toFixed(2)}KB -> ${(optimizedBuffer.length / 1024).toFixed(2)}KB)`,
      );
    } else {
      console.log(`Skipped ${filePath}: Already optimized`);
    }
    return;
  }

  const image = sharp(buffer);
  let pipeline = image;

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: 90, progressive: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({ quality: 90, palette: true });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: 90 });
  } else {
    return;
  }

  const optimizedBuffer = await pipeline.toBuffer();

  if (optimizedBuffer.length < buffer.length) {
    await fs.promises.writeFile(filePath, optimizedBuffer);
    const savings = ((1 - optimizedBuffer.length / buffer.length) * 100).toFixed(2);
    console.log(
      `Optimized ${filePath}: ${savings}% savings (${(buffer.length / 1024).toFixed(2)}KB -> ${(optimizedBuffer.length / 1024).toFixed(2)}KB)`,
    );
  } else {
    console.log(`Skipped ${filePath}: Already optimized`);
  }
}

async function walk(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory ${dir} does not exist. Skipping optimization.`);
    return [];
  }
  const files = await fs.promises.readdir(dir);
  const fileList = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      fileList.push(...(await walk(filePath)));
    } else if (/\.(jpg|jpeg|png|webp|svg)$/i.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function main() {
  console.log("Optimizing distribution images...");
  const imageFiles = await walk(DIST_DIR);

  for (const file of imageFiles) {
    try {
      await optimizeImage(file);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }
  console.log("Image optimization complete.");
}

main().catch(console.error);
