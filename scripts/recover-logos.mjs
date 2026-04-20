import fs from 'fs';
import path from 'path';

const downloadsDir = 'c:/Users/wnsdu/Downloads';
const targetDir = 'public/images/logos';

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const files = fs.readdirSync(downloadsDir);
files.forEach(file => {
  if (file.toLowerCase().endsWith('.svg') || file.toLowerCase().endsWith('.ai')) {
    console.log(`Copying: ${file}`);
    try {
      fs.copyFileSync(path.join(downloadsDir, file), path.join(targetDir, file));
    } catch (e) {
      console.error(`Failed to copy ${file}:`, e.message);
    }
  }
});
