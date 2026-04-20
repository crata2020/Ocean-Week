import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const logosDir = 'public/images/logos';
const contentFile = 'src/lib/site-content.ts';

if (!fs.existsSync(logosDir)) {
  console.error('Logos directory not found');
  process.exit(1);
}

const files = fs.readdirSync(logosDir).filter(f => f.endsWith('.svg'));
let content = fs.readFileSync(contentFile, 'utf8');

files.forEach(file => {
  // If it's already ASCII safe (logo-...), skip hashing but still keep in list?
  // No, we want to map original names to new names.
  // Wait! We don't know the "original" name if we already renamed it once? 
  // No, I just restored some from Downloads with Korean names.

  if (/[^\x00-\x7F]/.test(file)) {
    const ext = path.extname(file);
    const hash = crypto.createHash('md5').update(file).digest('hex').slice(0, 10);
    const newName = `logo-${hash}${ext}`;
    
    console.log(`Mapping: "${file}" -> "${newName}"`);
    
    // Rename file
    fs.renameSync(path.join(logosDir, file), path.join(logosDir, newName));
    
    // Replace in content. 
    // We need to match the filename exactly in the string.
    // e.g. logo: "해양주간 로고 2.svg"
    // We use a regex to replace occurrences.
    const escapedFile = file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedFile, 'g');
    content = content.replace(regex, newName);
  }
});

fs.writeFileSync(contentFile, content);
console.log('Site content updated with new logo names.');
