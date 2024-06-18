import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

openDatabase()
  .then((db) => {
    console.log("Connected to the in-memory SQlite database.");
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
    return runQuery(db, `INSERT INTO books (name) VALUES (?)`, ["桃太郎"]);
  })
  .then((response) => {
    const db = response.db;
    const lastID = response.result.lastID;
    console.log(`Inserted data id:${lastID}`);
    return getQuery(db, `SELECT * FROM user WHERE id = ?`, lastID);
  })
  .then((response) => {
    console.log(response.row);
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
