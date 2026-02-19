import assert from 'node:assert';
import maHashaa from './index.js';

console.log('Running tests...');

const cases = [
  { input: { h: 16, m: 0 }, expected: 'The time is 16:00' },
  { input: { h: 9, m: 30 }, expected: 'The time is 09:30' },
  { input: { h: 0, m: 0 }, expected: 'The time is 00:00' },
];

const startTime = performance.now();
let failures = 0;

for (const { input, expected } of cases) {
  const actual = maHashaa(input);
  if (actual === expected) {
    console.log(`✅ {h:${input.h}, m:${input.m}} -> "${actual}"`);
  } else {
    console.log(`❌ {h:${input.h}, m:${input.m}} -> "${actual}" (expected "${expected}")`);
    failures++;
  }
}

const duration = (performance.now() - startTime).toFixed(2);

if (failures > 0) {
  console.log(`❌ [${duration}ms] ${failures} test case(s) failed.`);
  process.exit(1);
} else {
  console.log(`✅ [${duration}ms] All tests passed!`);
}
