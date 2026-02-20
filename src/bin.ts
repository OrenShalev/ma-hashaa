#!/usr/bin/env node
import maHashaa from './index.js';

const input = process.argv[2];
console.log(maHashaa(input).split('').reverse().join(''));
