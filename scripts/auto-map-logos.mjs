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
  
  const updatedArrayContent = arrayContent.replace(/{[\s\S]*?name: "([^"]+)"[\s\S]*?}/g, (entry, name) => {
    let matchingFile = files.find(f => f.startsWith(name) && f.endsWith('.svg'));
    
    if (matchingFile) {
      if (entry.includes('logo:')) {
        return entry.replace(/logo: "[^"]+"/, `logo: "${matchingFile}"`);
      } else {
        return entry.replace(/name: "[^"]+"/, `name: "${name}",\n    logo: "${matchingFile}"`);
      }
    }
    return entry;
  });

  siteContent = siteContent.replace(partnerLogosRegex, `export const partnerLogos: Partner[] = [${updatedArrayContent}];`);
  fs.writeFileSync(siteContentPath, siteContent);
  console.log('Automated mapping complete.');
}
