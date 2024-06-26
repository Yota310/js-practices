import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./promise_function.js";

console.log("エラーなし");
let db;
let response;

db = await openDatabase();
console.log("Connected to the in-memory SQlite database.");

response = await runQuery(db,"CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)");
console.log("Created books table.");

let lastID;

response = await runQuery(db, "INSERT INTO books (title) VALUES (?)", [
  "桃太郎",
]);
lastID = response.lastID;
console.log(`Inserted data id:${lastID}`);

const row = await getQuery(db, "SELECT * FROM books WHERE id = ?", [
  response.lastID,
]);
console.log(row);

await runQuery(db, "DROP TABLE books");
console.log("DROP TABLE books");

await closeDatabase(db);
console.log("Closed the database connection.");
