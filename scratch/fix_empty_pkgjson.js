const fs = require('fs');
const path = require('path');

// Fix all empty package.json files in next/dist/compiled/**
const compiledDir = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'compiled');
let fixed = 0;

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      walkDir(path.join(dir, entry.name));
    } else if (entry.name === 'package.json') {
      const filePath = path.join(dir, 'package.json');
      const content = fs.readFileSync(filePath, 'utf-8').trim();
      if (!content || content === '') {
        console.log('Fixing empty package.json at:', filePath);
        fs.writeFileSync(filePath, '{}');
        fixed++;
      }
    }
  }
}

walkDir(compiledDir);
console.log(`Fixed ${fixed} empty package.json files.`);
