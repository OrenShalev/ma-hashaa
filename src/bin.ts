#!/usr/bin/env node
import maHashaa from './index.js';

function reverseHebrew(text: string): string {
  return text.split('').reverse().join('').replace(/([\u0591-\u05C7]+)(.)/g, '$2$1');
}

const input = process.argv[2];
console.log(reverseHebrew(maHashaa(input)));
