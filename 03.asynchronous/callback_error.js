import sqlite3 from "sqlite3";

console.log("エラーあり");
const db = new sqlite3.Database(":memory:", () => {
  console.log("Connected to the in-memory SQLite database.");
  db.run(
    `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)`,
    () => {
      console.log("Created books table.");
      db.run(`INSERT INTO books (title) VALUES (?)`, function (err) {
        if (err) {
          console.error(`Error inserting books: ${err.message}`);
        } else {
          console.log(`Inserted data id:${this.lastID}`);
        }
        db.get(`SELECT * FROM user WHERE id = ?`, [this.lastID], (err, row) => {
          if (err) {
            console.error(`Error selecting books: ${err.message}`);
          } else {
            console.log("Selected data:", row);
          }
          db.run(`DROP TABLE books`, () => {
            console.log(`Dropped table books`);
            db.close(() => {
              console.log("Closed the database connection.");
            });
          });
        });
      });
    },
  );
});
