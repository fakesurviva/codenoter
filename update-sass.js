import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для рекурсивного поиска файлов
function findFiles(dir, extension, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, extension, fileList);
    } else if (path.extname(file) === extension) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Функция для обновления импортов в файле
function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Заменяем @import на @use и исправляем пути
  let updatedContent = content;
  
  // Заменяем @import '../_variables' на @use '../variables' as *
  updatedContent = updatedContent.replace(/@import\s+['"](.+)\/(_variables)(.scss)?['"]\s*;/g, '@use \'$1/variables\' as *;');
  
  // Заменяем @import '_variables' на @use 'variables' as *
  updatedContent = updatedContent.replace(/@import\s+['"]_variables(.scss)?['"]\s*;/g, '@use \'variables\' as *;');
  
  // Заменяем @use '../_variables' на @use '../variables'
  updatedContent = updatedContent.replace(/@use\s+['"](.+)\/(_variables)(.scss)?['"]\s+as\s+\*/g, '@use \'$1/variables\' as *');
  
  // Заменяем @use '_variables' на @use 'variables'
  updatedContent = updatedContent.replace(/@use\s+['"]_variables(.scss)?['"]\s+as\s+\*/g, '@use \'variables\' as *');
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// Основная функция
function main() {
  const stylesDir = path.join(__dirname, 'src', 'styles');
  const scssFiles = findFiles(stylesDir, '.scss');
  
  scssFiles.forEach(updateImports);
  
  console.log('All SCSS files have been updated!');
}

main(); 