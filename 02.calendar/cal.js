#!/usr/bin/env node

import minimist from "minimist";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const argv = minimist(process.argv.slice(2), {
  default: {
    y: year,
    m: month,
  },
});

console.log(`      ${argv.m}月 ${argv.y}`);
console.log("日 月 火 水 木 金 土");

const firstDate = new Date(argv.y, argv.m - 1, 1);
const lastDate = new Date(argv.y, argv.m, 0);
for (let i = 0; i < firstDate.getDay(); i++) {
  process.stdout.write("   ");
}
for (let date = new Date(firstDate); date <= lastDate; date.setDate(date.getDate() + 1)) {
  if (date.getDay() !== 6 || lastDate !== date) {
    process.stdout.write(`${date.getDate()} `.padStart(3, " "));
  }
  if (date.getDay() === 6) {
    process.stdout.write(`${date.getDate()}`.padStart(2, " "));
    console.log();
  }
}
console.log();
