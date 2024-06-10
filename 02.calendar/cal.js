#!/usr/bin/env node

import minimist from "minimist";
import getDay from "date-fns/getDay";

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
const argv = minimist(process.argv.slice(2), {
  default: {
    y: year,
    m: month,
  },
});

console.log(`      ${argv.m}月 ${argv.y}`);
console.log("日 月 火 水 木 金 土");

const FirstDate = new Date(argv.y, argv.m - 1, 1);
const LastDate = new Date(argv.y, argv.m, 0);
for (let i = 0; i < getDay(FirstDate); i++) {
  process.stdout.write("   ");
}
for (let day = FirstDate; day <= LastDate; day.setDate(day.getDate() + 1)) {
  if (getDay(day) !== 6 && LastDate !== day) {
    process.stdout.write(`${day.getDate()} `.padStart(3, " "));
  }
  if (getDay(day) === 6) {
    process.stdout.write(`${day.getDate()}`.padStart(2, " "));
    console.log();
  }
}
console.log();
