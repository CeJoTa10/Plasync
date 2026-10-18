const fs = require('fs');
const path = require('path');

const compiledDir = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'compiled');
if (!fs.existsSync(compiledDir)) {
  console.log('compiled dir not found');
  process.exit(1);
}

const entries = fs.readdirSync(compiledDir, { withFileTypes: true });
for (const entry of entries) {
  if (entry.isDirectory()) {
    const pkgDir = path.join(compiledDir, entry.name);
    const hasIndex = fs.existsSync(path.join(pkgDir, 'index.js')) || fs.existsSync(path.join(pkgDir, 'index.cjs'));
    const hasPkgJson = fs.existsSync(path.join(pkgDir, 'package.json'));

    if (!hasIndex && !hasPkgJson) {
      const files = fs.readdirSync(pkgDir);
      const mainJs = files.find(f => f.endsWith('.js') || f.endsWith('.cjs'));
      if (mainJs) {
        console.log(`Fixing ${entry.name} -> exporting ${mainJs}`);
        fs.writeFileSync(path.join(pkgDir, 'index.js'), `module.exports = require('./${mainJs}');\n`);
      }
    }
  }
}
console.log('Compiled fix complete!');
