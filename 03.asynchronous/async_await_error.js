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
console.log("Connected to the in-memory SQLite database.");

response = await runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
);
console.log("Created books table.");

let lastID;
try {
  response = await runQuery(db, "INSERT INTO books (title) VALUES (?)");
  lastID = response.lastID;
  console.log(`Inserted data id:${lastID}`);
} catch (err) {
  console.error(`Error inserting books: ${err.message}`);
  throw err;
}
try {
  const row = await getQuery(db, "SELECT * FROM user WHERE id = ?", [
    response.lastID,
  ]);
  console.log("Selected data:", row);
} catch (err) {
  console.error(`Error selecting books: ${err.message}`);
  throw err;
}

await runQuery(db, "DROP TABLE books");
console.log("Dropped table books");

await closeDatabase(db);
console.log("Closed the database connection.");
