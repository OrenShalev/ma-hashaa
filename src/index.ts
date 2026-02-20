/**
 * Returns the current time in words.
 */
export default function maHashaa(timeStr?: string): string {
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
  // If we are in hour 0 (midnight) and NOT using "to" (relative), we are talking about חצות.
  // If we are in hour 23 and USING "to" (relative), we are talking about חצות.
  const isTargetMidnight = (hours === 0 && !usesRelative) || (hours === 23 && usesRelative);

  const suffix = isTargetMidnight ? "" : getDaySuffix(hours);
  const hourName = (hours === 0 && !usesRelative) ? "חצות" : FEMININE_HOURS[displayHour];
  const nextHourName = (hours === 23 && usesRelative) ? "חצות" : FEMININE_HOURS[nextHour];

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
    result = `${hourName} ורבע`;
  }
  else if (minutes === 30) {
    result = `${hourName} וחצי`;
  }
  // Case 4: Digital (everything else)
  // For minutes 1-19, it's more natural to add the "ו" (vav) connector.
  // Many speakers don't add "ו" for 20+ except for multiples of 5 logic or specific flows.
  else if (minutes < 20) {
    result = `${hourName} ו${getMinutesDigital(minutes)}`;
  }
  else {
    result = `${hourName} ${getMinutesDigital(minutes)}`;
  }

  return result + suffix;
}

function getDaySuffix(h: number): string {
  if (h >= 5 && h < 12) return " בבוקר";
  if (h >= 12 && h < 16) return " בצהריים";
  if (h >= 16 && h < 18) return " אחר הצהריים";
  if (h >= 18 && h < 22) return " בערב";
  return " בלילה";
}

function getMinutesDigital(m: number): string {
  // Case A: Multiples of 5 (tend to use masculine in certain contexts like "וחמישה")
  if (m % 5 === 0) {
    if (m === 5) return "חמישה";
    if (m === 10) return "עשרה";
    if (m === 20) return "עשרים";
    if (m === 30) return "שלושים";
    const ten = Math.floor(m / 10) * 10;
    const unit = m % 10;
    if (unit === 0) return TENS[ten];
    return `${TENS[ten]} וחמישה`; // e.g., 25 -> "עשרים וחמישה"
  }

  // Case B: Not multiples of 5 (feminine)
  if (m === 1) return "דקה אחת";
  if (m === 2) return "שתי דקות";

  let words = "";
  if (m < 12) words = FEMININE_HOURS[m];
  else if (m < 20) words = FEMININE_HOURS[m - 10] + " עשרה";
  else {
    const ten = Math.floor(m / 10) * 10;
    const unit = m % 10;
    if (unit === 0) words = TENS[ten];
    else words = TENS[ten] + " ו" + FEMININE_HOURS[unit];
  }

  // "One word" rule: if the result is one word, add " דקות"
  // Note: Hebrew "ואחת" is considered part of the number phrase, so we check for spaces.
  if (!words.includes(" ")) {
    words += " דקות";
  }
  return words;
}

const TO_WORDS: Record<number, string> = {
  20: "עשרים ל",
  15: "רבע ל",
  10: "עשרה ל",
  5: "חמישה ל",
  4: "ארבע ל",
  3: "שלוש ל",
  2: "שתיים ל",
  1: "אחת ל"
};

const TENS: Record<number, string> = {
  10: "עשר", 20: "עשרים", 30: "שלושים", 40: "ארבעים", 50: "חמישים"
};

const FEMININE_HOURS: Record<number, string> = {
  1: "אחת", 2: "שתיים", 3: "שלוש", 4: "ארבע", 5: "חמש",
  6: "שש", 7: "שבע", 8: "שמונה", 9: "תשע", 10: "עשר",
  11: "אחת עשרה", 12: "שתים עשרה"
};
