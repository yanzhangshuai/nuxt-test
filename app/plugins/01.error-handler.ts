export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    // 处理错误，例如报告给服务
    console.error('我是Vue error:', error, 'Instance:', instance, 'Info:', info)
  })

  nuxtApp.hook('app:error', (error) => {
    // 处理应用错误，例如报告给服务
    console.error('我是App error:', error, 'Context:')
  })
})
