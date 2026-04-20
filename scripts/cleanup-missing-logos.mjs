import fs from 'fs';
import path from 'path';

const logosDir = 'public/images/logos';
const siteContentPath = 'src/lib/site-content.ts';

const files = fs.readdirSync(logosDir);
let siteContent = fs.readFileSync(siteContentPath, 'utf8');

const partnerLogosRegex = /export const partnerLogos: Partner\[\] = \[([\s\S]*?)\];/;
const match = siteContent.match(partnerLogosRegex);

if (match) {
  let arrayContent = match[1];
  
  const optimizedArrayContent = arrayContent.replace(/{[\s\S]*?name: "([^"]+)"[\s\S]*?logo: "([^"]+)"[\s\S]*?}/g, (entry, name, logo) => {
    // If the referenced logo file doesn't exist, remove the logo property
    if (!files.includes(logo)) {
      console.log(`Removing missing logo reference: ${logo} for ${name}`);
      return entry.replace(/logo: "[^"]+",?\n?\s*/, '');
    }
    return entry;
  });

  siteContent = siteContent.replace(partnerLogosRegex, `export const partnerLogos: Partner[] = [${optimizedArrayContent}];`);
  fs.writeFileSync(siteContentPath, siteContent);
  console.log('Cleanup of missing logo references complete.');
}
