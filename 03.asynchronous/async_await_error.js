import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./async_await_function.js";
let db;
let response;
try {
  db = await openDatabase();
  console.log("Connected to the in-memory SQlite database.");
} catch (err) {
  console.error(`Error opening database: ${err.message}`);
}
try {
  response = await runQuery(
    db,
    `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL
      )`,
  );
  console.log("Created books table.");
} catch (err) {
  console.error(`Error creating table: ${err.message}`);
}
let lastID;
try {
  const db = response.db;
  response = await runQuery(db, `INSERT INTO books (name) VALUES (?)`, [
    "桃太郎",
  ]);
  lastID = response.result.lastID;
  console.log(`Inserted data id:${lastID}`);
} catch (err) {
  console.error(`Error inserting books: ${err.message}`);
}
try {
  response = await getQuery(db, `SELECT * FROM user WHERE id = ?`, [
    response.result.lastID,
  ]);
  console.log(response.row);
} catch (err) {
  console.error(`Error selecting books: ${err.message}`);
}
try {
  await runQuery(response.db, `DROP TABLE books`);
  console.log(`Dropped TABLE books`);
} catch (err) {
  console.error(`Error deleting books: ${err.message}`);
}
try {
  await closeDatabase(response.db);
  console.log("Closed the database connection.");
} catch (err) {
  console.error(`Error closing database: ${err.message}`);
}
