#!/usr/bin/env node
import minimist from "minimist";
import readline from "readline";
import dbMemo from "./dbMemo.js";
import enquirer from "enquirer";
const { Select } = enquirer;

class MemoApp {
  async receiveUserInput() {
    var inputLines = [];
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.on("line", function (line) {
        inputLines.push(line);
      });
      rl.on("close", function () {
        resolve(inputLines);
      });
    });
  }

  async inputOption() {
    //ここまではargv.lで呼び出せる
    const argv = minimist(process.argv.slice(2));
    const dm = new dbMemo();
    if (argv.l === undefined && argv.r === undefined && argv.d === undefined) {
      this.createMemo(dm);
    } else {
      //ここでDB関係を呼び出してオプションに合わせて出力したい
      if (argv.l) {
        const row = await dm.listupMemo();
        row.forEach((element) => console.log(element.title));
      }
      if (argv.r) {
        const row = await dm.readMemo();
        const choices = row.map((memo) => ({
          name: memo.title,
          value: memo.content,
        }));
        const prompt = new Select({
          name: "color",
          message: "choose a note you want to see:",
          choices: choices,
          result() {
            return this.focused.value;
          },
        });

        prompt
          .run()
          .then((answer) => console.log(answer))
          .catch(console.error);
      }
      if (argv.d) {
        const row = dm.deleteMemo();
        const choices = row.map((memo) => ({
          name: memo.title,
          value: memo.id,
        }));
        const prompt = new Select({
          name: "color",
          message: "choose a note you want to delete:",
          choices: choices,
          result() {
            return this.focused.value;
          },
        });

        prompt
          .run()
          .then((answer) =>
            this.db.run("DELETE FROM memo WHERE id == (?)", [answer]),
          )
          .catch(console.error);
      }
    }
  }

  async createMemo(dm) {
    let userInput = await this.receiveUserInput();
    const title = userInput[0];
    const content = userInput.slice(0).join("\n");
    //ここでDB関係を呼び出して保存したい
    dm.inputMemo(title, content);
  }
}

async function main() {
  const memo = new MemoApp();
  memo.inputOption();
}

main();
