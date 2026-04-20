import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const logosDir = 'public/images/logos';
const files = fs.readdirSync(logosDir).filter(f => f.endsWith('.svg'));

const mapping = {};

files.forEach(file => {
  // We rename EVERYTHING to be safe and consistent
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  
  // Hash the whole name
  const hash = crypto.createHash('md5').update(file).digest('hex').slice(0, 10);
  const newName = `logo-${hash}${ext}`;
  
  mapping[file] = newName;
  
  const oldPath = path.join(logosDir, file);
  const newPath = path.join(logosDir, newName);
  
  console.log(`Renaming: "${file}" -> "${newName}"`);
  fs.renameSync(oldPath, newPath);
});

fs.writeFileSync('scripts/logo-mapping.json', JSON.stringify(mapping, null, 2));
console.log('Mapping saved to scripts/logo-mapping.json');
