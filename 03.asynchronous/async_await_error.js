import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

console.log("エラーあり");
let db;
let result;

db = await openDatabase();
console.log("Connected to the in-memory SQLite database.");

result = await runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
);
console.log("Created books table.");

try {
  result = await runQuery(db, "INSERT INTO books (title) VALUES (?)");
  console.log(`Inserted data id:${result.lastID}`);
} catch (err) {
  console.error(`Error inserting books: ${err.message}`);
  throw err;
}
try {
  const row = await getQuery(db, "SELECT * FROM user WHERE id = ?", [
    result.lastID,
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
