export default defineEventHandler(async (event) => {
  // 从cookie获取token
  const token = getCookie(event, COOKIE_NAME)
  if (!token) {
    throw createError({
      statusCode   : 401,
      statusMessage: 'Unauthorized',
    })
  }

  try {
    // 验证token
    const payload = verifyToken(token)
    if (!payload?.id) {
      throw createError({
        statusCode   : 401,
        statusMessage: 'Invalid token',
      })
    }

    // 获取用户信息
    const user = await findUserById(payload.id)
    if (!user) {
      throw createError({
        statusCode   : 404,
        statusMessage: 'User not found',
      })
    }

    return user
  }
  catch (err) {
    throw createError({
      statusCode   : 401,
      statusMessage: 'Invalid token',
    })
  }
})
