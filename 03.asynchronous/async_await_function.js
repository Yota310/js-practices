import sqlite3 from "sqlite3";

export async function openDatabase() {
  try{
    const db = await new sqlite3.Database(":test3:")
    return db
  } catch (err){
    console.error(`Error openning database: ${err.message}`);
  }
   
      
}
export function runQuery(db, query, params = []) {
  return new Promise((resolve, reject) => {
      db.run(query, params, function(err) {
          if (err) {
              reject(err);
          } else {
              resolve(this);
          }
      });
  });
}
export function getQuery(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
export async function closeDatabase(db) {
try {
  await db.close(); 
} catch (err){
  console.error(`Error closeing database: ${err.message}`);
}  
}
