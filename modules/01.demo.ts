// `nuxt/kit` 是一个辅助子路径导入，你在定义本地模块时可以使用它
// 这意味着你无需将 `@nuxt/kit` 添加到项目的依赖中
import { addServerHandler, createResolver, defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'hello',
  },
  setup() {
    const resolver = createResolver(import.meta.url)

    console.log('===========', import.meta.url)
    // 添加一个 API 路由
  },
})
