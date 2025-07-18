export default defineNuxtRouteMiddleware(async () => {
  // 客户端直接使用store状态

  const { loggedIn } = useUserSession()

  if (!unref(loggedIn)) {
    return navigateTo('/')
  }
})
