import DB from "./db.js";

export class Memo {
  constructor() {
    this.db = new DB();
  }
  async input(title, content) {
    try {
      await this.db.create();
      await this.db.runQuery(`INSERT INTO memo (title, content) VALUES (?,?)`, [
        title,
        content,
      ]);
      this.db.close();
    } catch {
      await this.db.runQuery(`INSERT INTO memo (title, content) VALUES (?,?)`, [
        title,
        content,
      ]);
      this.db.close();
    }
  }
  async listup() {
    await this.db.create();
    const row = await this.db.getQuery("SELECT title FROM memo");
    return row;
  }
  async searchRead() {
    await this.db.create();
    const row = await this.db.getQuery("SELECT title,content FROM memo");
    return row;
  }
  async searchDelete() {
    await this.db.create();
    const row = await this.db.getQuery("SELECT title,id FROM memo");
    return row;
  }
  async delete(answer) {
    await this.db.create();
    await this.db.runQuery("DELETE FROM memo WHERE id == (?)", [answer]);
  }
}

export default Memo;
