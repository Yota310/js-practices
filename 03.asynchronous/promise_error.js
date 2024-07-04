import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

console.log("エラーあり");

let db;

openDatabase()
  .then((result) => {
    db = result;
    console.log("Connected to the in-memory SQLite database.");
    return runQuery(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    );
  })
  .then(() => {
    console.log("Created books table.");
    return runQuery(db, "INSERT INTO books (title) VALUES (?)");
  })
  .then((result) => {
      console.log(`Inserted data id:${result.lastID}`);
    return result;
  })
  .catch((err) => {
    console.error(`Error inserting books: ${err.message}`);
    return err;
  })
  .then((result) => {
    return getQuery(db, "SELECT * FROM user WHERE id = ?", result.lastID);
  })
  .then((response) => {
    console.log("Selected data:", response);
  })
  .catch((errResponse) => {
    console.error(`Error selecting books: ${errResponse.message}`);
  })
  .then(() => {
    return runQuery(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("Dropped table books");
    return closeDatabase(db);
  })
  .then(() => {
    console.log("Closed the database connection.");
  });
