import sqlite3 from "sqlite3";

console.log("エラーなし");
const db = new sqlite3.Database(":memory:", () => {
  console.log("Connected to the in-memory SQLite database.");
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    () => {
      console.log("Created books table.");
      db.run("INSERT INTO books (title) VALUES (?)", ["桃太郎"], function () {
        console.log(`Inserted data id:${this.lastID}`);
        db.get(
          "SELECT * FROM books WHERE id = ?",
          [this.lastID],
          (_, row) => {
            console.log(row);
            db.run("DROP TABLE books", () => {
              console.log("Dropped table books");
              db.close(() => {
                console.log("Closed the database connection.");
              });
            });
          },
        );
      });
    },
  );
});
