import sqlite3 from "sqlite3";

console.log("エラーあり");
// データベースに接続
const db = new sqlite3.Database(":memory:", () => {
  console.log("Connected to the in-memory SQlite database.");
});
// テーブルの作成
db.run(
  `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)`,
  () => {
    console.log("Created books table.");
    // データの挿入
    db.run(`INSERT INTO books (title) VALUES (?)`, function (err) {
      if (err) {
        console.error(`Error inserting books: ${err.message}`);
      } else {
        console.log(`Inserted data id:${this.lastID}`);
      }
      // データの読み込み
      db.get(`SELECT * FROM user WHERE id = ?`, [this.lastID], (err, row) => {
        if (err) {
          console.error(`Error selecting books: ${err.message}`);
        } else {
          console.log(row);
        }
        // データの削除
        db.run(`DROP TABLE books`, () => {
          console.log(`DROP TABLE books`);
          // データベースの切断
          db.close(() => {
            console.log("Closed the database connection.");
          });
        });
      });
    });
  },
);
