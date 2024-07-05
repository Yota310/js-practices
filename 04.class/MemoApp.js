#!/usr/bin/env node
import minimist from "minimist";
import readline from "readline";
import Memo from "./memo.js";
import MemoDb from "./memoDb.js";
import enquirer from "enquirer";
const { Select } = enquirer;

class MemoApp {
  constructor() {
    this.db = new MemoDb();
  }

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
    const argv = minimist(process.argv.slice(2));
    const memo = new Memo();
    if (argv.l === undefined && argv.r === undefined && argv.d === undefined) {
      this.createMemo(memo);
    } else {
      if (argv.l) {
        const row = await Memo.listup(this.db);
        row.forEach((element) => console.log(element.title));
      }
      if (argv.r) {
        const row = await Memo.searchRead(this.db);
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

        const answer = await prompt.run();
        try {
          console.log(answer);
        } catch {
          console.error;
        }
      }
      if (argv.d) {
        const row = await Memo.searchDelete(this.db);
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

        const answer = await prompt.run();
        try {
          Memo.delete(answer, this.db);
        } catch (err) {
          console.error(`Error delete memo: ${err.message}`);
        }
      }
    }
  }
  async createMemo(memo) {
    let userInput = await this.receiveUserInput();
    memo.title = userInput[0];
    memo.content = userInput.slice(0).join("\n");
    memo.save(this.db);
  }
}

async function main() {
  const memoApp = new MemoApp();
  memoApp.inputOption();
}

main();
