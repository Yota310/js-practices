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
  .then((db) => {
    console.log("Created books table.");
    return runQuery(db, `INSERT INTO books (name) VALUES (?)`, ["桃太郎"])
      .then(function (result) {
        console.log(`Inserted data id:${result.lastID}`);
        return { db, lastID: result.lastID };
      })
      .catch((err) => {
        console.error(err.message);
        return { db, lastID: null };
      });
  })

  .then((context) => {
    const { db, lastID } = context;
    return getQuery(db, `SELECT * FROM user WHERE id = ?`, [lastID])
      .then((row) => {
        console.log(row);
        return { db, lastID };
      })
      .catch((err) => {
        console.error(err.message);
        return { db, lastID };
      });
  })
  .then((context) => {
    const { db } = context;
    return runQuery(db, `DROP TABLE books`)
      .then(function () {
        console.log(`DROP TABLE books`);
        return db;
      })
      .catch((err) => {
        console.error(err.message);
        return db;
      });
  })

  .then((db) => {
    return closeDatabase(db).then(() => {
      console.log("Closed the database connection.");
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
