export default defineNuxtRouteMiddleware(async () => {
  // 客户端直接使用store状态
  try {
    const userStore = useUserStore()
    if (!userStore.user) {
      console.log('Middleware: Fetching user data from server...')
    }

    if (!userStore.user?.id) {
      return navigateTo('/')
    }
  }
  catch (error: any) {
    console.error(error.message)
    return navigateTo('/')
  }
})
