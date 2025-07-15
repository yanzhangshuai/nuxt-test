import { db, tableExists } from '../db'

// Initialize users table if needed
if (!tableExists('users')) {
  db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      avatar TEXT DEFAULT '/images/avatar.png',
      createdAt INTEGER NOT NULL
    )
  `)
}

export async function createUser(userData: {
  email   : string
  password: string
  name    : string
}): Promise<IUser> {
  const stmt = db.prepare(`
    INSERT INTO users (email, password, name, createdAt)
    VALUES (@email, @password, @name, @createdAt)
  `)

  try {
    const result = stmt.run({
      email    : userData.email,
      password : userData.password,
      name     : userData.name,
      createdAt: Date.now(),
    })

    return {
      id       : result.lastInsertRowid as number,
      ...userData,
      avatar   : '/images/avatar.png',
      createdAt: Date.now(),
    }
  }
  catch (err: unknown) {
    if (err instanceof Error && err.message.includes('UNIQUE constraint failed')) {
      throw new Error('Email already exists')
    }
    throw err
  }
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
  return stmt.get(email) as IUser | null
}

export async function findUserById(id: number): Promise<IUser | null> {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
  return stmt.get(id) as IUser | null
}
