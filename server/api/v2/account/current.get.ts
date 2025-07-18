export default defineEventHandler(async (event) => {
  // 从cookie获取token
  const { user } = await requireUserSession(event)
  return user
})
