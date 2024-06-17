import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

openDatabase()
  .then((db) => {
    return runQuery(
      db,
      `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)`,
    );
  })
  .then((response) => {
    console.log("Created books table.");
    return response;
  })
  .then((response) => {
    const db = response.db;
    return runQuery(db, `INSERT INTO books (title) VALUES (?)`, ["桃太郎"]);
  })
  .then((response) => {
    const db = response.db;
    const lastID = response.result.lastID;
    console.log(response);
    return getQuery(db, `SELECT * FROM books WHERE id = ?`, lastID);
  })
  .then((response) => {
    console.log("all books:", response.row);
    return response;
  })
  .then((response) => {
    const db = response.db;
    return runQuery(db, `DROP TABLE books`);
  })
  .then(function (response) {
    const db = response.db;
    console.log(`DROP TABLE books`);
    return closeDatabase(db);
  })
  .then(() => {
    console.log("Closed the database connection.");
  });
