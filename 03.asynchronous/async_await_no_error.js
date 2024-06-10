import {
  openDatabase,
  runQuery,
  getQuery,
  closeDatabase,
} from "./async_await_function.js";

async function main() {
  let db;
  try {
    db = await openDatabase();
    console.log("Connected to the in-memory SQlite database.");
  } catch (err) {
    console.error(`Error opening database: ${err.message}`);
    return;
  }
  try {
    await runQuery(
      db,
      `CREATE TABLE books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT UNIQUE NOT NULL
      )`,
    );
    console.log("Created books table.");
  } catch (err) {
    console.error(`Error creating table: ${err.message}`);
  }
  let lastID;
  try {
    const result = await runQuery(db, `INSERT INTO books (title) VALUES (?)`, [
      "桃太郎",
    ]);
    lastID = result.lastID;
    console.log(`Inserted data id:${lastID}`);
  } catch (err) {
    console.error(`Error inserting books: ${err.message}`);
    lastID = null;
  }
  if (lastID !== null) {
    try {
      const row = await getQuery(db, `SELECT * FROM books WHERE id = ?`, [
        lastID,
      ]);
      await console.log(`id: ${row.id}, title: ${row.title}`);
    } catch (err) {
      console.error(`Error selecting books: ${err.message}`);
    }
    try {
      await runQuery(db, `DROP TABLE books`);
      await console.log(`Droped TABLE books`);
    } catch (err) {
      console.error(`Error deleting books: ${err.message}`);
    }
  }
  try {
    await closeDatabase(db);
    await console.log("Closed the database connection.");
  } catch (err) {
    console.error(`Error closing database: ${err.message}`);
  }
}
main();
