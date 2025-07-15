import { COOKIE_NAME } from '~/server/utils/const'
import { generateToken } from '~/server/utils/account/jwt'
import { findUserByEmail } from '~/server/utils/account/service'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const user = await findUserByEmail(email)

  if (!user || user.password !== password) {
    throw createError({
      statusCode   : 401,
      statusMessage: '账号或密码错误',
    })
  }

  const token = generateToken({
    id   : user.id,
    email: user.email,
  })

  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    maxAge  : 60 * 60 * 24, // 1 day
    secure  : !import.meta.dev,
    path    : '/',
    sameSite: 'strict',
  })

  return {}
})
