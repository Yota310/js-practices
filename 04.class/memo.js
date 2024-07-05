
export class Memo {
  constructor() {
    this.title;
    this.content;
  }
  async save(db) {
    db.saveMemo(this.title, this.content);
  }
  static async listup(db) {
    const row = db.getListupMemo();
    return row;
  }
  static async searchRead(db) {
    const row = db.getReadMemo();
    return row;
  }
  static async searchDelete(db) {
    const row = db.getDeleteMemo();
    return row;
  }
  static async delete(answer,db) {
    db.deleteMemo(answer);
  }
}

export default Memo;
