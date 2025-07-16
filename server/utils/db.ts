import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import Database from 'better-sqlite3'

// Initialize database synchronously
const dataDir = path.join(process.cwd(), 'data')
try {
  fs.mkdirSync(dataDir, { recursive: true })
}
catch (err) {
  console.error('Failed to create data directory:', err)
}

const dbPath = path.join(dataDir, 'app.db')
const db = new Database(dbPath, {
  // verbose: console.log, // Log SQL queries for debugging
})


// Initialize tables if needed
function tableExists(tableName: string): boolean {
  const stmt = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name=?
  `)
  return stmt.get(tableName) !== undefined
}

export { db, tableExists }
