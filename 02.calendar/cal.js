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

const FirstDate = new Date(argv.y, argv.m - 1, 1);
const LastDate = new Date(argv.y, argv.m, 0);
console.log(`      ${argv.m}月 ${argv.y}`);
console.log("日 月 火 水 木 金 土");
for (let i = 0; i < getDay(FirstDate); i++) {
  process.stdout.write("   ");
}

for (let i = FirstDate.getDate(); i <= LastDate.getDate(); i++) {
  const day = new Date(argv.y, argv.m - 1, i)
  if (getDay(day) !== 6 && LastDate !== day) {
    process.stdout.write(`${i} `.padStart(3, " "));
  }
  if (getDay(day) === 6) {
    process.stdout.write(`${i}`.padStart(2, " "));
    console.log();
  }
}
console.log();
