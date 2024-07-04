import sqlite3 from "sqlite3";

class Db {
  constructor() {
    this.db = new sqlite3.Database("./memo.db");
  }
  async create() {
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
  getQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  async close() {
    try {
      await this.db.close();
    } catch (err) {
      console.error(`Error closeing database: ${err.message}`);
    }
  }
  async saveMemo(title, content){
    await this.db.runQuery(`INSERT INTO memo (title, content) VALUES (?,?)`, [
      title,
      content,
    ]);
  }
  async getListupMemo(){
    const row = await this.getQuery("SELECT title FROM memo");
    return row
  }
  async getReadMemo(){
    const row = await this.getQuery("SELECT title,content FROM memo");
    return row
  }
  async getDeleteMemo(){
    const row = await this.getQuery("SELECT title,id FROM memo");
    return row
  }
  async deleteMemo(answer){
    await this.runQuery("DELETE FROM memo WHERE id == (?)", [answer]);
  }
}

export default Db;
