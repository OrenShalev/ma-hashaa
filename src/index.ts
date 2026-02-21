/**
 * Returns the current time in words.
 */
export default function maHashaa(timeStr?: string, useNikud: boolean = true): string {
  let hours: number;
  let minutes: number;

  if (timeStr) {
    const [hStr, mStr] = timeStr.split(':');
    hours = parseInt(hStr, 10);
    minutes = parseInt(mStr, 10);
  } else {
    const now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
  }

  const displayHour = hours % 12 || 12;
  const nextHour = (displayHour % 12) + 1;
  const remaining = 60 - minutes;
  const usesRelative = !!TO_WORDS[remaining];

  // Target midnight logic: 
  // If we are in hour 0 (midnight) and NOT using "to" (relative), we are talking about חֲצוֹת.
  // If we are in hour 23 and USING "to" (relative), we are talking about חֲצוֹת.
  const isTargetMidnight = (hours === 0 && !usesRelative) || (hours === 23 && usesRelative);

  const suffix = isTargetMidnight ? "" : getDaySuffix(hours);
  const hourName = (hours === 0 && !usesRelative) ? "חֲצוֹת" : FEMININE_HOURS[displayHour];
  const nextHourName = (hours === 23 && usesRelative) ? "חֲצוֹת" : FEMININE_HOURS[nextHour];

  let result = "";

  // Case 1: Relative "To" (20, 15, 10, 5, <5)
  if (usesRelative) {
    result = `${TO_WORDS[remaining]}${nextHourName}`;
  }
  // Case 2: Exact Hour
  else if (minutes === 0) {
    result = hourName;
  }
  // Case 3: Spoken "And a quarter" / "And a half"
  else if (minutes === 15) {
    result = `${hourName} וָרֶבַע`;
  }
  else if (minutes === 30) {
    result = `${hourName} וְחֵצִי`;
  }
  // Case 4: Digital (everything else)
  // For minutes 1-19, it's more natural to add the "ו" (vav) connector.
  // Many speakers don't add "ו" for 20+ except for multiples of 5 logic or specific flows.
  else if (minutes < 20) {
    result = `${hourName} וְ${getMinutesDigital(minutes)}`;
  }
  else {
    result = `${hourName} ${getMinutesDigital(minutes)}`;
  }

  const finalResult = (result + suffix).normalize('NFC');
  
  // Hebrew grammar fix: 'vav' and 'lamed' take the vowel of the following hataf-patah
  const corrected = finalResult
    .replace(/וְעֲ/g, 'וַעֲ')
    .replace(/וְחֲ/g, 'וַחֲ')
    .replace(/לְחֲ/g, 'לַחֲ');
    
  return useNikud ? corrected : stripNikud(corrected);
}

function stripNikud(text: string): string {
  return text.replace(/[\u0591-\u05C7]/g, "");
}

/**
 * Reverses a Hebrew string while keeping nikud (diacritics) attached to their letters.
 */
export function reverseHebrew(text: string): string {
  // Reverse the entire string, then move any sequence of nikud characters
  // (U+0591-U+05C7) to follow the character they were originally attached to.
  return text.split('').reverse().join('').replace(/([\u0591-\u05C7]+)(.)/g, '$2$1');
}

function getDaySuffix(h: number): string {
  if (h >= 5 && h < 12) return " בַּבּוֹקֶר";
  if (h >= 12 && h < 16) return " בַּצָּהֳרַיִים";
  if (h >= 16 && h < 18) return " אַחַר הַצָּהֳרַיִים";
  if (h >= 18 && h < 22) return " בָּעֶרֶב";
  return " בַּלַּיְלָה";
}

function getMinutesDigital(m: number): string {
  // Case A: Multiples of 5 (tend to use masculine in certain contexts like "וחמישה")
  if (m % 5 === 0) {
    if (m === 5) return "חֲמִישָּׁה";
    if (m === 10) return "עֲשָׂרָה";
    if (m === 20) return "עֶשְׂרִים";
    if (m === 30) return "שְׁלוֹשִׁים";
    const ten = Math.floor(m / 10) * 10;
    const unit = m % 10;
    if (unit === 0) return TENS[ten];
    return `${TENS[ten]} וַחֲמִישָּׁה`; // e.g., 25 -> "עשרים וחמישה"
  }

  // Case B: Not multiples of 5 (feminine)
  if (m === 1) return "דַּקָּה אַחַת";
  if (m === 2) return "שְׁתֵּי דַּקּוֹת";

  let words = "";
  if (m < 12) words = FEMININE_HOURS[m];
  else if (m < 20) words = FEMININE_HOURS[m - 10] + " עֶשְׂרֵה";
  else {
    const ten = Math.floor(m / 10) * 10;
    const unit = m % 10;
    if (unit === 0) words = TENS[ten];
    else words = TENS[ten] + " וְ" + FEMININE_HOURS[unit];
  }

  // "One word" rule: if the result is one word, add " דקות"
  // Note: Hebrew "ואחת" is considered part of the number phrase, so we check for spaces.
  if (!words.includes(" ")) {
    words += " דַּקּוֹת";
  }
  return words;
}

const TO_WORDS: Record<number, string> = {
  20: "עֶשְׂרִים לְ",
  15: "רֶבַע לְ",
  10: "עֲשָׂרָה לְ",
  5: "חֲמִישָּׁה לְ",
  4: "אַרְבַּע לְ",
  3: "שָׁלוֹשׁ לְ",
  2: "שְׁתַּיִים לְ",
  1: "אַחַת לְ"
};

const TENS: Record<number, string> = {
  10: "עֶשֶׂר", 20: "עֶשְׂרִים", 30: "שְׁלוֹשִׁים", 40: "אַרְבָּעִים", 50: "חֲמִישִּׁים"
};

const FEMININE_HOURS: Record<number, string> = {
  1: "אַחַת", 2: "שְׁתַּיִים", 3: "שָׁלוֹשׁ", 4: "אַרְבַּע", 5: "חָמֵשׁ",
  6: "שֵׁשׁ", 7: "שֶׁבַע", 8: "שְׁמוֹנֶה", 9: "תֵּשַׁע", 10: "עֶשֶׂר",
  11: "אַחַת עֶשְׂרֵה", 12: "שְׁתֵּים עֶשְׂרֵה"
};
