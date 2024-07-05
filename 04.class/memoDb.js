import Db from "./db.js";

class MemoDb {
  constructor() {
    this.db = new Db();
  }
  async create() {
    await this.db.runQuery(
      `CREATE TABLE IF NOT EXISTS memo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT UNIQUE NOT NULL,
  content TEXT
)`,
    );
  }
  async saveMemo(title, content) {
    await this.create();
    await this.db.runQuery(`INSERT INTO memo (title, content) VALUES (?,?)`, [
      title,
      content,
    ]);
    this.db.close();
  }
  async getListupMemo() {
    await this.create();
    const row = await this.db.getQuery("SELECT title FROM memo");
    this.db.close();
    return row;
  }
  async getReadMemo() {
    await this.create();
    const row = await this.db.getQuery("SELECT title,content FROM memo");
    this.db.close();
    return row;
  }
  async getDeleteMemo() {
    await this.create();
    const row = await this.db.getQuery("SELECT title,id FROM memo");
    return row;
  }
  async deleteMemo(answer) {
    await this.create();
    await this.db.runQuery("DELETE FROM memo WHERE id == (?)", [answer]);
    this.db.close();
  }
}

export default MemoDb;
