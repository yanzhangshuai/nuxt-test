// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules          : [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
  ],
  devtools: { enabled: true },

  app: {
    head: {
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

  // $development: {
  //   runtimeConfig: {
  //     // 仅在服务器端可用的私有键
  //     apiSecret: 'dev',
  //     // public 中的键也会暴露到客户端
  //     public: {
  //       apiBase: '/dev'
  //     }
  //   },
  // },

  // $test: {
  //   runtimeConfig: {
  //     // 仅在服务器端可用的私有键
  //     apiSecret: 'test',
  //     // public 中的键也会暴露到客户端
  //     public: {
  //       apiBase: '/test'
  //     }
  //   },
  // },

  // $production: {
  //   runtimeConfig: {
  //     // 仅在服务器端可用的私有键
  //     apiSecret: 'pro',
  //     // public 中的键也会暴露到客户端
  //     public: {
  //       apiBase: '/pro'
  //     }
  //   },
  // },

  nitro: {

    // devProxy: {
    //   '/api': {
    //     target: `https://ppt-test-globe-v102.wxbjq.top/api`,
    //     changeOrigin: true,
    //     autoRewrite: false
    //   },
    //   '/users': {
    //     target: `${process.env.NUXT_PUBLIC_API_HOST}/users`,
    //     changeOrigin: true,
    //     autoRewrite: false
    //   }
    // },
    prerender: {
      routes: [],
      // routes: ['/price', '/help-center'],
      // 项目中如果<a>标签是相对路径, 目标页面会被prerendering检测并参与预构建, 导致预构建报错
      // 解决方法: 将不属于此项目的路径添加到以下名单
      ignore: ['/generate', '/log-update', '/help/privacy-policy', '/help/cookies-policy', '/help/terms-of-use'],
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
  },
  css: [
    '~/assets/less/main.less',
  ],
  unocss: {
    configFile: 'uno.config.ts',
  },
  fontMetrics: {
    /* 可选配置 */
    fallbacks: ['Arial', 'sans-serif'], // 备用字体族
  },

})
