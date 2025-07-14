import { blogPosts } from './data'

export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id)
  const post = blogPosts.find(p => p.id === id)

  console.log('parseCookies', parseCookies(event))

  if (!post) {
    throw createError({
      statusCode   : 404,
      statusMessage: '文章不存在',
    })
  }

  return post
})
