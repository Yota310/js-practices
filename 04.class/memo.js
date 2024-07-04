import DB from "./db.js";

export class Memo {
  constructor() {
    this.db = new DB();
    this.title
    this.content
  }
  async input() {
    await this.db.create();
    this.db.saveMemo(this.title, this.content)
    this.db.close();
  }
  async listup() {
    await this.db.create();
    const row = this.db.getListupMemo()
    return row;
  }
  async searchRead() {
    await this.db.create();
    const row = this.db.getReadMemo()
    return row;
  }
  async searchDelete() {
    await this.db.create();
    const row = this.db.getDeleteMemo()
    return row;
  }
  async delete(answer) {
    await this.db.create();
    this.db.deleteMemo(answer)
  }
}

export default Memo;
