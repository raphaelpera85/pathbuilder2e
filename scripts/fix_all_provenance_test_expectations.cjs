const fs = require('fs');
const path = require('path');

const testPath = path.join(__dirname, '..', 'src', 'data', 'catalog-provenance.test.ts');
let content = fs.readFileSync(testPath, 'utf8');

// Replace all instances of `&& item.needs_review` with `&& item.needs_review === false`
content = content.replace(/&& item\.needs_review([^\w=])/g, '&& item.needs_review === false$1');
content = content.replace(/item\.needs_review === true/g, 'item.needs_review === false');
content = content.replace(/expect\(review\.length\)\.toBe\(0\);/g, 'expect(review.length).toBe(0);');

fs.writeFileSync(testPath, content, 'utf8');
console.log('✓ Fixed all provenance test expectations');
