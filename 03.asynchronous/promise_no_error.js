import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

console.log("エラーなし");
let db;
openDatabase()
  .then((responseDb) => {
    db = responseDb;
    console.log("Connected to the in-memory SQLite database.");
    return runQuery(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    );
  })
  .then(() => {
    console.log("Created books table.");
    return runQuery(db, "INSERT INTO books (title) VALUES (?)", ["桃太郎"]);
  })
  .then((response) => {
    const lastID = response.lastID;
    console.log(`Inserted data id:${lastID}`);
    return getQuery(db, "SELECT * FROM books WHERE id = ?", lastID);
  })
  .then((response) => {
    console.log("Selected data:", response);
    return runQuery(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("Dropped table books");
    return closeDatabase(db);
  })
  .then(() => {
    console.log("Closed the database connection.");
  });
