import sqlite3 from "sqlite3";

class Db {
  constructor() {
    this.db = new sqlite3.Database("./memo.db");
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
  
}

export default Db;
