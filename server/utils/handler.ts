import type { EventHandler, EventHandlerRequest } from 'h3'

export function defineWrappedResponseHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>): EventHandler<T, D> {
  console.log('=============Wrapped Response Handler===================')
  return defineEventHandler<T>(async (event) => {
    try {
      // 在路由处理程序之前执行某些操作
      const response = await handler(event)
      // 在路由处理程序之后执行某些操作
      return { response }
    }
    catch (err) {
      // 错误处理
      return { err }
    }
  })
}
