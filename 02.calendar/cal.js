#!/usr/bin/env node

import minimist from "minimist";
import getDay from "date-fns/getDay";

let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
const argv = minimist(process.argv.slice(2), {
  default: {
    y: year,
    m: month,
  },
});

let target_first_date = new Date(argv.y, argv.m - 1, 1);
let target_last_date = new Date(argv.y, argv.m, 0);
console.log(`      ${argv.m}月 ${argv.y}`);
console.log("日 月 火 水 木 金 土");
for (let i = 0; i < getDay(target_first_date); i++) {
  process.stdout.write("   ");
}

for (
  let i = target_first_date.getDate();
  i <= target_last_date.getDate();
  i++
) {
  process.stdout.write(`${i} `.padStart(3, " "));
  if (getDay(new Date(argv.y, argv.m - 1, i)) === 6) {
    console.log("");
  }
}
console.log("");
