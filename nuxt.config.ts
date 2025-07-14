// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules          : [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@ant-design-vue/nuxt',
  ],
  devtools: { enabled: true },

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

  nitro: {

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

})
