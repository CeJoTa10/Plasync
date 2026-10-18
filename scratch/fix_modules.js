const fs = require('fs');
const path = require('path');

const nm = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nm)) {
  console.log('node_modules not found');
  process.exit(1);
}

const entries = fs.readdirSync(nm);
for (const entry of entries) {
  const match = entry.match(/^\.([a-zA-Z0-9_-]+)-[a-zA-Z0-9]+$/);
  if (match) {
    const pkgName = match[1];
    const src = path.join(nm, entry);
    const dest = path.join(nm, pkgName);
    console.log(`Moving ${entry} -> ${pkgName}`);
    try {
      if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
      }
      fs.renameSync(src, dest);
      console.log(`Success: ${pkgName}`);
    } catch (e) {
      console.error(`Error moving ${pkgName}:`, e.message);
    }
  }
}
console.log('Done fixing node_modules!');
