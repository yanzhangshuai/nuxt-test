import type { BlogPost } from './types'

import { db, tableExists } from '../db'

// Initialize blog_posts table if needed
if (!tableExists('blog_posts')) {
  db.exec(`
    CREATE TABLE blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      summary TEXT NOT NULL,
      date TEXT NOT NULL,
      tags TEXT NOT NULL
    )
  `)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const stmt = db.prepare<void[], BlogPost & { tags: string }>('SELECT * FROM blog_posts ORDER BY id DESC')
  return stmt.all()
  .map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags) as string[] 
    }
  })
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  const stmt = db.prepare<number, BlogPost & { tags: string }>('SELECT * FROM blog_posts WHERE id = ?')
  const data = stmt.get(id)
  if (!data) {
    return null
  }

  return {
    ...data,
    tags: JSON.parse(data.tags) as string[] 
  }
}

export async function createBlogPost(postData: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const stmt = db.prepare(`
    INSERT INTO blog_posts (title, content, summary, date, tags)
    VALUES (@title, @content, @summary, @date, @tags)
  `)

  const result = stmt.run({
    title: postData.title,
    content: postData.content,
    summary: postData.summary,
    date: postData.date,
    tags: JSON.stringify(postData.tags)
  })

  return {
    id: result.lastInsertRowid as number,
    ...postData
  }
}



const samplePosts = [
  {
    title: 'Nuxt3入门指南',
    content: '本文将介绍如何使用Nuxt3构建现代化Web应用...',
    summary: 'Nuxt3基础教程',
    date: '2025-07-10',
    tags: ['Nuxt', '前端']
  },
  {
    title: 'TypeScript最佳实践',
    content: 'TypeScript可以显著提升代码质量和开发体验...',
    summary: 'TypeScript使用技巧',
    date: '2025-07-15', 
    tags: ['TypeScript', '编程']
  },
  {
    title: 'SQLite在Node.js中的应用',
    content: 'SQLite是一个轻量级的嵌入式数据库...',
    summary: 'SQLite使用教程',
    date: '2025-07-20',
    tags: ['数据库', 'Node.js']
  }
]

// Check if posts exist
const stmt = db.prepare('SELECT COUNT(*) as count FROM blog_posts')
const { count } = stmt.get() as { count: number }

if (count === 0) {
  console.log('Inserting sample blog posts...')
  const insert = db.prepare(`
    INSERT INTO blog_posts (title, content, summary, date, tags)
    VALUES (@title, @content, @summary, @date, @tags)
  `)
  
  const insertMany = db.transaction((posts) => {
    for (const post of posts) {
      insert.run({
        ...post,
        tags: JSON.stringify(post.tags)
      })
    }
  })

  insertMany(samplePosts)
  console.log('Successfully inserted sample posts')
} else {
  console.log(`Blog posts already exist (${count} posts)`)
}
