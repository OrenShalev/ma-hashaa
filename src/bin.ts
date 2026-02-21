#!/usr/bin/env node
import maHashaa, { reverseHebrew } from './index.js';

const args = process.argv.slice(2);
const noNikud = args.includes('--no-nikud');
const timeInput = args.find(arg => !arg.startsWith('--'));

console.log(reverseHebrew(maHashaa(timeInput, !noNikud)));
