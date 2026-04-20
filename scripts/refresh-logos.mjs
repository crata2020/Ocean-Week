import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\wnsdu\\Desktop\\로고';
const targetDir = 'c:\\Users\\wnsdu\\Desktop\\해양주간\\public\\images\\logos';

// 1. Delete all files in target
if (fs.existsSync(targetDir)) {
  fs.readdirSync(targetDir).forEach(file => {
    const fullPath = path.join(targetDir, file);
    if (fs.lstatSync(fullPath).isFile()) {
      fs.unlinkSync(fullPath);
    }
  });
  console.log('Cleaned target directory.');
}

// 2. Copy all files from source
if (fs.existsSync(sourceDir)) {
  fs.readdirSync(sourceDir).forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    fs.copyFileSync(sourcePath, targetPath);
  });
  console.log('Copied all files from source to target.');
} else {
  console.error('Source directory does not exist!');
}
