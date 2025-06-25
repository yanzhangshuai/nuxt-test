import type { UseFetchOptions } from '#app'

import process from 'node:process'

export function isServer() {
  // 在服务端渲染时，process.server 为 true
  return import.meta.server
}

export const request = {
  get<T = any>(key: string, url: string, options: UseFetchOptions<T> = {}) {
    options.method = 'GET'
    return request.request<T>(key, url, options)
  },

  post<T = any>(key: string, url: string, options: UseFetchOptions<T> = {}) {
    options.method = 'POST'
    return request.request<T>(key, url, options)
  },

  async request<T = any>(key: string, url: string, options: any = {}) {
    const runtimeConfig = useRuntimeConfig()

    options.headers = options.headers ?? {}
    // 禁止响应式
    if (options.body) {
      const rawBody = toRaw(options.body)
      options.body = typeof rawBody === 'object' ? { ...rawBody } : rawBody
    }

    const fetchRes = await useFetch<T>(url, {
      ...options,
      baseURL: isServer() ? runtimeConfig.public.apiHost : '/',
      key,
    })

    return fetchRes
  },
}
