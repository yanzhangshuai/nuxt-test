import { defineConfig, presetAttributify, presetWind4, transformerDirectives } from 'unocss'

export default defineConfig({

  presets: [
    presetWind4(),
    presetAttributify({
      prefix      : 'un-',
      prefixedOnly: true,
    }),
  ],

  transformers: [
    transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }),
  ],

  theme: {
    fontFamily: {
      system                : 'system-ui, -apple-system, sans-serif',
      serif                 : 'Georgia, serif',
      mono                  : 'Menlo, Monaco, monospace',
      duanNingYingBiXingShu2: ['DuanNingYingBiXingShu-2', 'sans-serif'],
    },
    colors: {
    },
    screens: {},
  },
  rules: [
    ['font-duanNingYingBiXingShu2', { 'font-family': 'DuanNingYingBiXingShu-2, sans-serif' }],
  ],
})
