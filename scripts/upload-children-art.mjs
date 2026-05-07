import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET_NAME = 'exhibitions';
const LOCAL_DIR = 'C:/Users/wnsdu/OneDrive/문서/카카오톡 받은 파일/어린이그림전/어린이그림';
const REMOTE_FOLDER = 'children';

async function main() {
  const files = fs.readdirSync(LOCAL_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));
  const artData = [];

  for (const fileName of files) {
    const filePath = path.join(LOCAL_DIR, fileName);
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    
    let award = '입선';
    let name = '';
    let title = baseName;
    let rank = 4;

    const parts = baseName.replace(/^\d+\.?\s*/, '').split('_');
    if (parts.length >= 3) {
      award = parts[0];
      name = parts[1];
      title = parts.slice(2).join('_');
    } else if (parts.length === 2) {
      award = parts[0];
      title = parts[1];
    }
    
    if (award.includes('대상')) rank = 1;
    else if (award.includes('우수')) rank = 2;
    else if (award.includes('장려')) rank = 3;

    const safeName = Buffer.from(baseName).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const remotePath = `${REMOTE_FOLDER}/${safeName}${ext}`;

    console.log(`Processing: ${fileName}...`);

    try {
      const buffer = await sharp(filePath)
        .resize(2048, 2048, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .toBuffer();

      const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(remotePath, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

      if (uploadError) {
        console.error(`  Upload error:`, uploadError.message);
      } else {
        console.log(`  Uploaded to ${remotePath}`);
        const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(remotePath);
        
        artData.push({
          id: safeName,
          originalName: fileName,
          award: award.trim(),
          name: name.trim(),
          title: title.trim(),
          rank: rank,
          url: publicUrlData.publicUrl
        });
      }
    } catch (err) {
      console.error(`  Error processing:`, err.message);
    }
  }

  artData.sort((a, b) => a.rank - b.rank || a.originalName.localeCompare(b.originalName, 'ko-KR', {numeric: true}));

  fs.writeFileSync('src/lib/children-art-data.json', JSON.stringify(artData, null, 2), 'utf-8');
  console.log('Finished uploading and saved metadata to src/lib/children-art-data.json');
}

main();
