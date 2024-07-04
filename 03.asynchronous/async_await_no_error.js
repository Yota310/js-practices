import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

console.log("エラーなし");
let db;
let result;

db = await openDatabase();
console.log("Connected to the in-memory SQLite database.");

result = await runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
);
console.log("Created books table.");

let lastID;

result = await runQuery(db, "INSERT INTO books (title) VALUES (?)", [
  "桃太郎",
]);
lastID = result.lastID;
console.log(`Inserted data id:${lastID}`);

const row = await getQuery(db, "SELECT * FROM books WHERE id = ?", [
  result.lastID,
]);
console.log("Selected data:", row);

await runQuery(db, "DROP TABLE books");
console.log("Dropped table books");

await closeDatabase(db);
console.log("Closed the database connection.");
