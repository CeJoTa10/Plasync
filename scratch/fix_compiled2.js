const fs = require('fs');
const path = require('path');

const compiledDir = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'compiled');

// These packages need index.js created to point to their actual file
const manualFixes = {
  'constants-browserify': 'constants.js',
  'domain-browser': 'source.js',
  'is-animated': 'index.js',
  'is-docker': 'index.js',
  'is-wsl': 'index.js',
  'async-retry': 'index.js',
  'async-sema': 'index.js',
};

for (const [pkg, main] of Object.entries(manualFixes)) {
  const pkgDir = path.join(compiledDir, pkg);
  if (!fs.existsSync(pkgDir)) {
    console.log(`${pkg} dir doesn't exist, skipping`);
    continue;
  }

  const indexPath = path.join(pkgDir, 'index.js');
  if (fs.existsSync(indexPath)) {
    console.log(`${pkg} already has index.js`);
    continue;
  }

  // List files
  const files = fs.readdirSync(pkgDir);
  const jsFile = files.find(f => f.endsWith('.js'));
  if (jsFile) {
    const content = `module.exports = require('./${jsFile}');\n`;
    fs.writeFileSync(indexPath, content);
    console.log(`Fixed ${pkg} -> ${jsFile}`);
  } else {
    console.log(`${pkg}: no JS file found, files: ${files.join(', ')}`);
  }
}

// Fix constants-browserify specifically
const constDir = path.join(compiledDir, 'constants-browserify');
if (fs.existsSync(constDir)) {
  const files = fs.readdirSync(constDir);
  console.log('constants-browserify files:', files);
  if (!fs.existsSync(path.join(constDir, 'index.js')) && files.length > 0) {
    const jsFile = files.find(f => f.endsWith('.js'));
    if (jsFile) {
      fs.writeFileSync(path.join(constDir, 'index.js'), `module.exports = require('./${jsFile}');\n`);
      console.log('Fixed constants-browserify');
    }
  }
}

console.log('Done!');
