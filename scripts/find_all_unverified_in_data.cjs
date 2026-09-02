const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
const content = fs.readFileSync(dataFilePath, 'utf8');

const lines = content.split('\n');
console.log('--- Lines with needs_review: true ---');
lines.forEach((line, idx) => {
  if (line.includes('needs_review: true') || line.includes('sourceApproximate: true')) {
    console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});
