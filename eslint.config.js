import antfu from '@antfu/eslint-config'

export default antfu(
  // {
  //   formatters: true,
  // },
  {
    vue: {
      overrides: {
        'vue/require-typed-ref'                      : 'error',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/component-definition-name-casing'       : ['error', 'PascalCase'],
        'vue/component-name-in-template-casing'      : ['error', 'PascalCase', {
          registeredComponentsOnly: false,
          ignores                 : [],
        }],
        'vue/block-lang': [
          'error',
          {
            script: { lang: ['ts', 'tsx'] },
            style : { lang: ['less', 'css'] },
          },
        ],
        'vue/max-attributes-per-line': ['error', {
          singleline: 3,
          multiline : {
            max           : 1,
            allowFirstLine: false,
          },
        }],
        'vue/attributes-order': ['error', {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        }],
      },
    },
    typescript: {
      overrides: {
        'style/semi'                   : ['error', 'never'],
        'unused-imports/no-unused-vars': 'off',
        'no-console'                   : 'off',
        'ts/no-unused-expressions'     : 'off',
        'perfectionist/sort-imports'   : ['error', { type: 'line-length' }],
        // 'ts/method-signature-style': 'off',
        // 'ts/no-empty-object-type': 'off',
      },
    },
  },
  {
    rules: {
      'style/key-spacing': ['error', {

        align: {
          mode       : 'minimum',
          beforeColon: false,
          afterColon : true,
          on         : 'colon',
        },
        multiLine: {
          beforeColon: false,
          afterColon : true,
        },
      }],
      'style/no-multi-spaces'        : 'off',
      'style/type-annotation-spacing': 'off',

    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'antfu/top-level-function': 'off',
    },
  },
)
