import assert from 'node:assert';
import maHashaa from './index.js';

console.log('Running tests...');

const cases = [
  { input: '00:00', expected: 'חצות' },
  { input: '00:03', expected: 'חצות ושלוש דקות' },
  { input: '10:00', expected: 'עשר בבוקר' },
  { input: '10:05', expected: 'עשר וחמישה בבוקר' },
  { input: '10:07', expected: 'עשר ושבע דקות בבוקר' },
  { input: '10:10', expected: 'עשר ועשרה בבוקר' },
  { input: '10:15', expected: 'עשר ורבע בבוקר' },
  { input: '10:30', expected: 'עשר וחצי בבוקר' },
  { input: '10:39', expected: 'עשר שלושים ותשע בבוקר' },
  { input: '10:40', expected: 'עשרים לאחת עשרה בבוקר' },
  { input: '13:00', expected: 'אחת בצהריים' },
  { input: '14:15', expected: 'שתיים ורבע בצהריים' },
  { input: '17:30', expected: 'חמש וחצי אחר הצהריים' },
  { input: '19:45', expected: 'רבע לשמונה בערב' },
  { input: '23:50', expected: 'עשרה לחצות' },
  { input: '03:10', expected: 'שלוש ועשרה בלילה' },
];

const startTime = performance.now();
let failures = 0;

for (const { input, expected } of cases) {
  const actual = maHashaa(input);
  // next two lines are so the terminal shows Hebrew like we want (techincally wrong)
  const visualActual = actual.split('').reverse().join('');
  const visualExpected = expected.split('').reverse().join('');
  
  if (actual === expected) {
    console.log(`✅ ${input} -> "${visualActual}"`);
  } else {
    console.log(`❌ ${input} -> "${visualActual}" (expected "${visualExpected}")`);
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
