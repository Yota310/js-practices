import DB from "./db.js";

export class Memo {
  constructor() {
    this.db = new DB();
    this.title;
    this.content;
  }
  async input() {
    this.db.saveMemo(this.title, this.content);
  }
  async listup() {
    const row = this.db.getListupMemo();
    return row;
  }
  async searchRead() {
    const row = this.db.getReadMemo();
    return row;
  }
  async searchDelete() {
    const row = this.db.getDeleteMemo();
    return row;
  }
  async delete(answer) {
    this.db.deleteMemo(answer);
  }
}

export default Memo;
