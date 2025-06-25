export default defineEventHandler((event) => {
  // console.log('=============Log middleware called===================', event.path)

  // // 在这里可以添加日志记录逻辑
  // const startTime = Date.now()

  // // 调用下一个中间件或处理程序
  // return event.context.next().then((response) => {
  //   const duration = Date.now() - startTime
  //   console.log(`Request processed in ${duration}ms`)
  //   return response
  // }).catch((error) => {
  //   console.error('Error processing request:', error)
  //   throw error
  // })
})
