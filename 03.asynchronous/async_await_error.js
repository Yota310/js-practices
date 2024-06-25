import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

console.log("エラーあり");
let db;
let response;

  db = await openDatabase();
  console.log("Connected to the in-memory SQlite database.");

  response = await runQuery(db,"CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)");
  console.log("Created books table.");

let lastID;
try {
  const db = response.db;
  response = await runQuery(db, "INSERT INTO books (title) VALUES (?)", []);
  lastID = response.result.lastID;
  console.log(`Inserted data id:${lastID}`);
} catch (err) {
  console.error(`Error inserting books: ${err.message}`);
}
try {
  response = await getQuery(db, "SELECT * FROM user WHERE id = ?", [
    response.result.lastID,
  ]);
  console.log(response.row);
} catch (err) {
  console.error(`Error selecting books: ${err.message}`);
}

  await runQuery(response.db, "DROP TABLE books");
  console.log("DROP TABLE books");

  await closeDatabase(response.db);
  console.log("Closed the database connection.");
