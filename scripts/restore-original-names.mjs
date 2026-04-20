import fs from 'fs';
import path from 'path';

const logosDir = 'public/images/logos';

// Mapping based on previous turns and typical naming patterns
const reverseMapping = {
  'logo-24ee3a91ee.svg': '부산상공회의소 1.svg',
  'logo-75cb94b71f.svg': '부산광역시의회 1.svg',
  'logo-3ca8860e7b.svg': '부산조선해양기자재공업협동조합 1.svg',
  'logo-2ccb04e7e4.svg': '부산항도선사회 1.svg',
  'logo-6bf34db203.svg': '크라타연구소 1.svg',
  'logo-702da01dab.svg': '부산광역시의회 1.svg', // duplicate?
  'logo-a5de3d8c9d.svg': '해양주간 로고 2.svg',
};

Object.entries(reverseMapping).forEach(([hashed, original]) => {
  const hashedPath = path.join(logosDir, hashed);
  const originalPath = path.join(logosDir, original);
  
  if (fs.existsSync(hashedPath)) {
    console.log(`Restoring: ${hashed} -> ${original}`);
    fs.renameSync(hashedPath, originalPath);
  }
});
