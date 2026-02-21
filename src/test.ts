import assert from 'node:assert';
import maHashaa, { reverseHebrew } from './index.js';

console.log('Running tests...');

const cases = [
  { input: '00:00', useNikud: true, expected: 'חֲצוֹת' },
  { input: '00:03', useNikud: false, expected: 'חצות ושלוש דקות' },
  { input: '10:00', useNikud: true, expected: 'עֶשֶׂר בַּבּוֹקֶר' },
  { input: '10:05', useNikud: false, expected: 'עשר וחמישה בבוקר' },
  { input: '10:07', useNikud: false, expected: 'עשר ושבע דקות בבוקר' },
  { input: '10:10', useNikud: true, expected: 'עֶשֶׂר וַעֲשָׂרָה בַּבּוֹקֶר' },
  { input: '10:15', useNikud: false, expected: 'עשר ורבע בבוקר' },
  { input: '10:30', useNikud: true, expected: 'עֶשֶׂר וְחֵצִי בַּבּוֹקֶר' },
  { input: '10:39', useNikud: false, expected: 'עשר שלושים ותשע בבוקר' },
  { input: '10:40', useNikud: false, expected: 'עשרים לאחת עשרה בבוקר' },
  { input: '13:00', useNikud: true, expected: 'אַחַת בַּצָּהֳרַיִים' },
  { input: '14:15', useNikud: false, expected: 'שתיים ורבע בצהריים' },
  { input: '17:30', useNikud: true, expected: 'חָמֵשׁ וְחֵצִי אַחַר הַצָּהֳרַיִים' },
  { input: '19:45', useNikud: true, expected: 'רֶבַע לְשְׁמוֹנֶה בָּעֶרֶב' },
  { input: '23:50', useNikud: true, expected: 'עֲשָׂרָה לַחֲצוֹת' },
  { input: '03:10', useNikud: false, expected: 'שלוש ועשרה בלילה' },
  { input: '03:08', useNikud: true, expected: 'שָׁלוֹשׁ וְשְׁמוֹנֶה דַּקּוֹת בַּלַּיְלָה' },
];

const startTime = performance.now();
let failures = 0;

// Regular cases with explicit parameter
for (const { input, useNikud, expected } of cases) {
  const actual = maHashaa(input, useNikud);
  
  if (actual.normalize('NFC') === expected.normalize('NFC')) {
    console.log(`✅ ${input} (${useNikud ? 'מנוקד' : 'נקי'}) -> "${reverseHebrew(actual)}"`);
  } else {
    console.log(`❌ ${input} (${useNikud ? 'מנוקד' : 'נקי'}) -> "${reverseHebrew(actual)}" (expected "${reverseHebrew(expected)}")`);
    failures++;
  }
}

// Special case for default parameter (should be useNikud: true)
console.log('\nChecking default parameter value...');
const defaultInput = '10:15';
const defaultExpected = 'עֶשֶׂר וָרֶבַע בַּבּוֹקֶר';
const defaultActual = maHashaa(defaultInput);
if (defaultActual.normalize('NFC') === defaultExpected.normalize('NFC')) {
  console.log(`✅ Default parameter (useNikud: true) works: "${reverseHebrew(defaultActual)}"`);
} else {
  console.log(`❌ Default parameter check failed: "${reverseHebrew(defaultActual)}" (expected "${reverseHebrew(defaultExpected)}")`);
  failures++;
}

const duration = (performance.now() - startTime).toFixed(2);

if (failures > 0) {
  console.log(`\n❌ [${duration}ms] ${failures} test case(s) failed.`);
  process.exit(1);
} else {
  console.log(`\n✅ [${duration}ms] All tests passed!`);
}
