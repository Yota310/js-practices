import sqlite3 from "sqlite3";
import { select } from "@inquirer/prompts";
import Enquirer from "enquirer";

export class dbMemo {
  constructor() {
    this.db = new sqlite3.Database("./test3.txt");
  }
  async inputMemo(title, content) {
    try {
      await this.runQuery(
        this.db,
        `CREATE TABLE memo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      content TEXT
  )`,
      );
      await this.runQuery(
        this.db,
        `INSERT INTO memo (title, content) VALUES (?,?)`,
        [title, content],
      );
      this.closeDatabase(this.db);
    } catch {
      await this.runQuery(
        this.db,
        `INSERT INTO memo (title, content) VALUES (?,?)`,
        [title, content],
      );
      this.closeDatabase(this.db);
    }
  }
  async listupMemo() {
    const row = await this.getQuery(this.db, "SELECT title FROM memo");
    row.forEach((element) => console.log(element.title));
  }
  async readMemo() {
    const row = await this.getQuery(this.db, "SELECT title,content FROM memo");
    const answer = await this.choiceMemo(row);
    // this.db.get("SELECT * FROM memo WHERE id == (?)", [answer.id]);
  }
  deleteMemo(id) {
    this.db.run("DELETE FROM memo WHERE id == (?)", [id]);
  }
  runQuery(db, query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }
  getQuery(db, query, params = []) {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  async closeDatabase(db) {
    try {
      await db.close();
    } catch (err) {
      console.error(`Error closeing database: ${err.message}`);
    }
  }
  choiceMemo(row) {
    // console.log(row[1].content);
    (async ()=> {
      const choices = row.map(memo => ({ name: memo.title, value: memo.content }));
      const question = {
        type: 'select',
        name: 'selected',
        message: 'choose a note you want to see',
        choices: choices
      };
      const answer = await Enquirer.prompt(question);
      console.log(answer);
    })();
  }
}

export default dbMemo;
