export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 验证输入
  const { error, value } = validateRegister(body)
  if (error) {
    throw createError({
      statusCode   : 400,
      statusMessage: error.message,
    })
  }

  try {
    // 创建用户
    const user = await createUser(value)

    // 设置登录
    await setUserSession(event, {
      user,
      loggedInAt: new Date(),
    })

    // 生成token并设置cookie
    // const token = generateToken({
    //   id   : user.id,
    //   email: user.email,
    // })

    // setCookie(event, COOKIE_NAME, token, {
    //   httpOnly: true,
    //   maxAge  : 60 * 60 * 24, // 1 day
    //   path    : '/',
    //   secure  : !import.meta.dev,
    //   sameSite: 'strict',
    // })

    return {}
  }
  catch (err) {
    throw createError({
      statusCode   : 500,
      statusMessage: 'Registration failed',
    })
  }
})
