import sqlite3 from "sqlite3";

export class DbMemo {
  constructor() {
    this.db = new sqlite3.Database("./memo.db");
  }
  async inputMemo(title, content) {
    try {
      await this.createMemoDb();
      await this.runQuery(
        `INSERT INTO memo (title, content) VALUES (?,?)`,
        [title, content],
      );
      this.closeDatabase(this.db);
    } catch {
      await this.runQuery(
        `INSERT INTO memo (title, content) VALUES (?,?)`,
        [title, content],
      );
      this.closeDatabase(this.db);
    }
  }
  async listupMemo() {
    await this.createMemoDb();
    const row = await this.getQuery(this.db, "SELECT title FROM memo");
    return row;
  }
  async readMemo() {
    await this.createMemoDb();
    const row = await this.getQuery(this.db, "SELECT title,content FROM memo");
    return row;
  }
  async searchDeleteMemo() {
    await this.createMemoDb();
    const row = await this.getQuery(this.db, "SELECT title,id FROM memo");
    return row;
  }

  async createMemoDb() {
    await this.runQuery(
      `CREATE TABLE IF NOT EXISTS memo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    content TEXT
)`,
    );
  }

  runQuery(query, params = []) {
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

export default DbMemo;
