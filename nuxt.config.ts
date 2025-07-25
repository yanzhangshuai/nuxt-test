// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules          : [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@ant-design-vue/nuxt',
    // 'nuxt-lodash',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    // '@sidebase/nuxt-auth',
  ],
  devtools: { enabled: true },

  imports: {
    // scan: false,
  },

  runtimeConfig: {
    jwtSecret: '',
    public   : {
      // 客户端可访问的配置
      apiBase: '/api',
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: 'fade', mode: 'in-out' },
    head          : {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: 'A Nuxt 3 application' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // imports: {
  //   dirs: [
  //     'services/**/index.{ts,js,mjs,mts}',
  //     'stores/**/index.{ts,js,mjs,mts}',
  //   ],
  // },

  devServer: {
    port: 4010,
  },
  routeRules: {
    '/'       : { prerender: true },
    '/contact': {
      redirect: { to: '/about', statusCode: 302 },
    },
    // 博客文章页面按需生成，后台重新验证，在 CDN 上缓存 1 小时（3600 秒）
    '/blog'   : { isr: 3600 },
    // 博客文章页面按需生成，直到下次部署，缓存在 CDN 上
    '/blog/**': { isr: true },
    '/api/**' : { cors: true },
  },
  nitro: {
    hooks: {
      'prerender:generate': function (route) {
        if (route.route?.includes('private')) {
          route.skip = true
        }
      },
    },
  },

  vite: {
    css: {
      preprocessorMaxWorkers: true,
      preprocessorOptions   : {
        less: {
          additionalData: `@import "~/assets/less/variables.less";`,
          // additionalData: '@use "~/assets/theme/colors.less" as *;',
        },
      },
    },
    resolve: {
      alias: {
        'ant-design-vue/dist': 'ant-design-vue/dist',
        'ant-design-vue/es'  : 'ant-design-vue/es',
        'ant-design-vue/lib' : 'ant-design-vue/es',
        'ant-design-vue'     : 'ant-design-vue/es',
      },
    },
  },
  css: [
    '~/assets/less/main.less',
    'ant-design-vue/dist/reset.css',
  ],
  unocss: {
    configFile: 'uno.config.ts',
  },
  fontMetrics: {
    /* 可选配置 */
    fallbacks: ['Arial', 'sans-serif'], // 备用字体族
  },

  antd: {
    extractStyle: true,
  },

  // auth: {
  //   provider: {
  //     type: 'authjs',
  //   },
  //   sessionDataType: { id: 'string' }, // 自定义 session 类型
  // },

})
