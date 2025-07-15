export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id)
  const post = getBlogPostById(id)

  if (!post) {
    throw createError({
      statusCode   : 404,
      statusMessage: '文章不存在',
    })
  }

  return post
})
