const fs = require('fs');
const path = require('path');

function getSize(dirPath) {
  let total = 0;
  if (!fs.existsSync(dirPath)) return 0;
  const stats = fs.statSync(dirPath);
  if (stats.isFile()) return stats.size;
  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    try {
      const full = path.join(dirPath, entry);
      total += getSize(full);
    } catch (e) {}
  }
  return total;
}

const root = path.resolve(__dirname, '..');
const targets = ['node_modules', '.firebase', 'dist', 'public', 'src', '.git'];
for (const t of targets) {
  const p = path.join(root, t);
  const s = getSize(p);
  if (s === 0) console.log(`${t.padEnd(20)} not found or empty`);
  else console.log(`${t.padEnd(20)} ${ (s/1024/1024).toFixed(2) } MB`);
}
// total
function getTotal(p) {
  return getSize(p);
}
const total = getTotal(root);
console.log(`TOTAL               ${(total/1024/1024).toFixed(2)} MB`);
