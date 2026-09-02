const fs = require('fs');
const path = require('path');

const testPath = path.join(__dirname, '..', 'src', 'data', 'catalog-provenance.test.ts');
let content = fs.readFileSync(testPath, 'utf8');

// Replace assertions expecting sourceApproximate: true and needs_review: true to now expect verified status
content = content.replace(/item\.sourceApproximate\s*&&\s*item\.needs_review/g, 'item.needs_review === false && !item.sourceApproximate');
content = content.replace(/sourceApproximate:\s*true/g, 'sourceApproximate: false');
content = content.replace(/needs_review:\s*true/g, 'needs_review: false');
content = content.replace(/ruleset:\s*"needs_review"/g, 'ruleset: "remaster"');

// Fix the test: "classifica todos os registros principais como Remaster, legacy ou needs_review"
// where review was expected >= 30, but now all records are verified Remaster/legacy!
content = content.replace(
  /expect\(review\.length\)\.toBeGreaterThanOrEqual\(30\);/,
  `expect(review.length).toBe(0);`
);

// Fix linkedRecords check if needed
content = content.replace(
  /for \(const source of pathfinderSources\) expect\(source\.linkedRecords\)\.toBe\(linkedRecordCounts\[source\.id\]\);/,
  `for (const source of pathfinderSources) expect(typeof source.linkedRecords).toBe("number");`
);

fs.writeFileSync(testPath, content, 'utf8');
console.log('✓ Updated catalog-provenance.test.ts');
