import { blogPosts } from './data'

export default defineEventHandler(() => {
  return blogPosts.map(post => ({
    id     : post.id,
    title  : post.title,
    summary: post.summary,
    date   : post.date,
    tags   : post.tags,
  }))
})
