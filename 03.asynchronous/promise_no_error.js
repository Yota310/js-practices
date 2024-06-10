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
      `CREATE TABLE books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT UNIQUE NOT NULL
      )`,
    ).then(() => {
      return db;
    });
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then((db) => {
    console.log("Created books table.");
    return runQuery(db, `INSERT INTO books (title) VALUES (?)`, [
      "桃太郎",
    ]).then(function (result) {
      console.log(`Inserted data id:${result.lastID}`);
      return { db, lastID: result.lastID };
    });
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then((context) => {
    const { db, lastID } = context;
    return getQuery(db, `SELECT * FROM books WHERE id = ?`, [lastID]).then(
      (row) => {
        console.log(row);
        return { db, lastID };
      },
    );
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then((context) => {
    const { db } = context;
    return runQuery(db, `DROP TABLE books`).then(function () {
      console.log(`DROP TABLE books`);
      return db;
    });
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then((db) => {
    return closeDatabase(db).then(() => {
      console.log("Closed the database connection.");
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
