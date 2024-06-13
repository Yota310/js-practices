#!/usr/bin/env node
import minimist from "minimist";
import readline from "readline";
import dbMemo from "./dbMemo.js";

class Memo {
  async receveMemo() {
    var lines = [];
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.on("line", function (line) {
        lines.push(line);
      });
      rl.on("close", function () {
        resolve(lines);
      });
    });
  }

  async inputOption() {
    //ここまではargv.lで呼び出せる
    const argv = minimist(process.argv.slice(2));
    const dm = new dbMemo();
    if (argv.l === undefined && argv.r === undefined && argv.d === undefined) {
      let memo = await this.receveMemo();
      const title = memo[0];
      const content = memo.slice(0).join("\n");
      //ここでDB関係を呼び出して保存したい
      dm.inputMemo(title, content);
    } else {
      //ここでDB関係を呼び出してオプションに合わせて出力したい
      if (argv.l) {
        dm.listupMemo();
      }
      if (argv.r) {
        dm.readMemo();
      }
      if (argv.d) {
        dm.deleteMemo();
      }
    }
  }
}

async function main() {
  const memo = new Memo();
  memo.inputOption();
}

main();
