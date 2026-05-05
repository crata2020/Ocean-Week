import sharp from 'sharp';

import { renameSync } from 'fs';

const INPUT = 'public/images/로고 모음.jpg';
const TEMP_OUTPUT = 'public/images/로고 모음_new.jpg';
const OUTPUT = 'public/images/로고 모음.jpg';
const GAP = 50;      // px gap between rows
const PADDING = 20;  // top/bottom padding

async function findRowBoundaries(imgBuffer, width, height) {
  // Convert to greyscale raw pixels to find horizontal white/near-white bands
  const rawBuf = await sharp(imgBuffer)
    .greyscale()
    .raw()
    .toBuffer();

  const WHITE_THRESHOLD = 240; // pixels brighter than this are considered "white"
  const WHITE_RATIO_THRESHOLD = 0.97; // 97% of row must be white to be a separator

  const rowWhiteness = [];
  for (let y = 0; y < height; y++) {
    let whiteCount = 0;
    for (let x = 0; x < width; x++) {
      if (rawBuf[y * width + x] >= WHITE_THRESHOLD) whiteCount++;
    }
    rowWhiteness.push(whiteCount / width);
  }

  // Find bands of near-white rows (separators between logo rows)
  // Group consecutive white rows into separator bands
  const separators = [];
  let inSep = false;
  let sepStart = 0;
  for (let y = 0; y < height; y++) {
    if (rowWhiteness[y] >= WHITE_RATIO_THRESHOLD) {
      if (!inSep) { inSep = true; sepStart = y; }
    } else {
      if (inSep) {
        inSep = false;
        const mid = Math.floor((sepStart + y - 1) / 2);
        separators.push({ start: sepStart, end: y - 1, mid });
      }
    }
  }
  if (inSep) separators.push({ start: sepStart, end: height - 1, mid: Math.floor((sepStart + height - 1) / 2) });

  console.log('Detected separator bands:', separators);

  // Build logo row slices from the non-separator areas
  // We want rows that contain actual logos (non-white bands)
  const slices = [];
  let prevEnd = 0;
  for (const sep of separators) {
    if (sep.start > prevEnd) {
      slices.push({ top: prevEnd, bottom: sep.start - 1 });
    }
    prevEnd = sep.end + 1;
  }
  if (prevEnd < height) slices.push({ top: prevEnd, bottom: height - 1 });

  // Filter out tiny slices (less than 10px)
  const logoSlices = slices.filter(s => (s.bottom - s.top) > 10);
  console.log('Logo row slices:', logoSlices);
  return logoSlices;
}

async function main() {
  const imgBuffer = await sharp(INPUT).jpeg({ quality: 95 }).toBuffer();
  const meta = await sharp(imgBuffer).metadata();
  const { width, height } = meta;
  console.log(`Image: ${width}x${height}`);

  const slices = await findRowBoundaries(imgBuffer, width, height);

  if (slices.length < 2) {
    console.log('Could not detect multiple rows. Falling back to equal split into 4.');
    const rowH = Math.floor(height / 4);
    slices.length = 0;
    for (let i = 0; i < 4; i++) {
      slices.push({ top: i * rowH, bottom: (i + 1) * rowH - 1 });
    }
  }

  console.log(`Found ${slices.length} logo rows, adding ${GAP}px gap between rows`);

  // Extract each row as a buffer
  const rowBuffers = await Promise.all(
    slices.map(s =>
      sharp(imgBuffer)
        .extract({ left: 0, top: s.top, width, height: s.bottom - s.top + 1 })
        .toBuffer()
    )
  );

  // Build composite: stack rows with white gap strips
  const newHeight = slices.reduce((acc, s) => acc + (s.bottom - s.top + 1), 0)
    + GAP * (slices.length - 1)
    + PADDING * 2;  // top and bottom padding

  // Create a white canvas of full size
  const whiteCanvas = await sharp({
    create: { width, height: newHeight, channels: 3, background: { r: 255, g: 255, b: 255 } }
  }).jpeg({ quality: 95 }).toBuffer();

  // Composite all rows on top of the canvas
  const composites = [];
  let y = PADDING;  // start from padding offset
  for (let i = 0; i < rowBuffers.length; i++) {
    composites.push({ input: rowBuffers[i], top: y, left: 0 });
    y += slices[i].bottom - slices[i].top + 1 + GAP;
  }

  await sharp(whiteCanvas)
    .composite(composites)
    .jpeg({ quality: 95 })
    .toFile(TEMP_OUTPUT);

  // Replace the original with the new file
  renameSync(TEMP_OUTPUT, OUTPUT);

  const outMeta = await sharp(OUTPUT).metadata();
  console.log(`✅ Done! Output: ${OUTPUT} (${outMeta.width}x${outMeta.height})`);
}

main().catch(console.error);
