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

async function setupBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;

  if (!buckets.find(b => b.name === BUCKET_NAME)) {
    console.log(`Creating bucket: ${BUCKET_NAME}`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png'],
      fileSizeLimit: 52428800 // 50MB
    });
    if (createError) throw createError;
  } else {
    console.log(`Bucket ${BUCKET_NAME} already exists.`);
  }
}

async function processAndUpload(localDir, remoteFolder) {
  console.log(`\nProcessing folder: ${localDir} -> ${remoteFolder}`);
  const files = fs.readdirSync(localDir).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const fileName of files) {
    const filePath = path.join(localDir, fileName);
    
    // To avoid "Invalid key" with Korean characters, we'll base64 encode the filename
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    const safeName = Buffer.from(baseName).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const remotePath = `${remoteFolder}/${safeName}${ext}`;

    console.log(`Processing: ${fileName} (${safeName})...`);

    try {
      const buffer = await sharp(filePath)
        .resize(2048, 2048, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .toBuffer();

      console.log(`  Compressed: ${(buffer.length / 1024).toFixed(2)} KB`);

      const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(remotePath, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

      if (uploadError) {
        console.error(`  Upload error:`, uploadError.message);
      } else {
        console.log(`  Uploaded to ${remotePath}`);
      }
    } catch (err) {
      console.error(`  Error processing:`, err.message);
    }
  }
}

async function main() {
  try {
    await setupBucket();

    const mappings = [
      { local: 'c:/Users/wnsdu/Desktop/해양주간/극지', remote: 'polar' },
      { local: 'c:/Users/wnsdu/Desktop/해양주간/우리나라 바다', remote: 'underwater' },
      { local: 'c:/Users/wnsdu/Desktop/해양주간/열대', remote: 'underwater' }
    ];

    for (const mapping of mappings) {
      if (fs.existsSync(mapping.local)) {
        await processAndUpload(mapping.local, mapping.remote);
      } else {
        console.warn(`Local directory not found: ${mapping.local}`);
      }
    }
    console.log('\nMigration completed!');
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
}

main();
