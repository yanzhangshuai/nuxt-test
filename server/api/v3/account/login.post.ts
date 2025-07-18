import z from 'zod'

const bodySchema = z.object({
  email   : z.string().trim().pipe(z.email()),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  const user = await findUserByEmail(email)

  if (!user || user.password !== password) {
    throw createError({
      statusCode   : 401,
      statusMessage: '账号或密码错误',
    })
  }

  await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  })

  return {}
})
