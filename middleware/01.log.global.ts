export default defineNuxtRouteMiddleware((to, from) => {
  console.log('=============这是01.log全局路由拦截器===================', to.path)
})
