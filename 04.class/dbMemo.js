import sqlite3 from "sqlite3";
import enquirer from "enquirer";
const { Select } = enquirer;

export class dbMemo {
  constructor() {
    this.db = new sqlite3.Database("./memo.db");
  }
  async inputMemo(title, content) {
    try {
      await this.createMemoDb();
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
    await this.createMemoDb();
    const row = await this.getQuery(this.db, "SELECT title FROM memo");
    row.forEach((element) => console.log(element.title));
  }
  async readMemo() {
    await this.createMemoDb();
    const row = await this.getQuery(this.db, "SELECT title,content FROM memo");
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
  async deleteMemo() {
    await this.createMemoDb();
    const row = await this.getQuery(this.db, "SELECT title,id FROM memo");
    const choices = row.map((memo) => ({ name: memo.title, value: memo.id }));
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

  async createMemoDb(){
    await this.runQuery(
      this.db,
      `CREATE TABLE IF NOT EXISTS memo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    content TEXT
)`,
    );
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
}

export default dbMemo;
