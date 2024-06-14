import sqlite3 from "sqlite3";

console.log("エラーなし");
// データベースに接続
const db = new sqlite3.Database(":memory:", () => {
  console.log("Connected to the in-memory SQlite database.");
});
// テーブルの作成
db.run(
  `CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL 
)`,
  () => {
    console.log("Created books table.");
    // データの挿入
    db.run(`INSERT INTO books (title) VALUES (?)`, ["桃太郎"], function () {
      console.log(`Inserted data id:${this.lastID}`);
      // データの読み込み
      db.get(`SELECT * FROM books WHERE id = ?`, [this.lastID], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(row);
        // テーブルの削除
        db.run(`DROP TABLE books`, function () {
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
