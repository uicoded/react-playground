import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'src', 'examples');
const targetDir = path.join(rootDir, 'dist', 'react-playground', 'examples');

// Function to recursively find all CSS files
function findCssFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findCssFiles(filePath, fileList);
    } else if (path.extname(file) === '.css') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to copy a file ensuring the directory exists
function copyFile(source, target) {
  const targetDir = path.dirname(target);

  // Create directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(source, target);
  console.log(`Copied: ${source} -> ${target}`);
}

// Main function
function copyCssFiles() {
  console.log('Copying CSS files from examples...');

  // Find all CSS files
  const cssFiles = findCssFiles(sourceDir);

  // Copy each file
  cssFiles.forEach(file => {
    const relativePath = path.relative(sourceDir, file);
    const targetPath = path.join(targetDir, relativePath);
    copyFile(file, targetPath);
  });

  console.log(`Copied ${cssFiles.length} CSS files.`);
}

copyCssFiles();
