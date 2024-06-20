import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

console.log("エラーあり");
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
    return runQuery(db, `INSERT INTO books (title) VALUES (?)`, [])
  })
  .catch((errResponse) => {
    const db = errResponse.db
    const err = errResponse.err
    console.error(`Error inserting books: ${err.message}`);
    
    const response = {result: {lastID: 0}, db, err}
    return response
  })
  .then((response) => {
    if (response.err === undefined) {
    const lastID = response.result.lastID;
    console.log(`Inserted data id:${lastID}`);
    }
    return response
  })
  .then((response) => {
    const db = response.db;
    const lastID = response.result.lastID;
    return getQuery(db, `SELECT * FROM user WHERE id = ?`, lastID)
  })
  .catch((errResponse) => {
    const db = errResponse.db
    const err = errResponse.err
    console.error(`Error selecting books: ${err.message}`);
    const response = {result: {lastID: 0}, db}
    return response
  })
  
  .then((response) => {
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
