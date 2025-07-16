import { defineVitestConfig } from '@nuxt/test-utils/config'
import { defineConfig } from "vitest/config";
import { config } from "@vue/test-utils";
import Antd from "ant-design-vue";

// 直接在 Vitest 配置中注册 Antd 插件
config.global.plugins = [Antd];

export default defineVitestConfig({
  // 任何您需要的自定义Vitest配置
  test: {
    globals: true,
    environment: 'nuxt',
    coverage: {
      all: true,
      reporter: ['text', 'json', 'html'],
    },
    // inspectBrk     : true,
    // fileParallelism: false,
    // browser        : {
    //   provider : 'playwright',
    //   instances: [{ browser: 'chromium' }],
    // },
  },
})
