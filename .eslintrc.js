module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'accessor-pairs': 1,
    'no-caller': 2,
    'no-multi-spaces': 1,
    'array-bracket-spacing': [ 1, 'always' ],
    'block-spacing': 1,
    'brace-style': [ 1, '1tbs', { 'allowSingleLine': true } ],
    camelcase: 1,
    'comma-spacing': [ 2, { before: false, after: true } ],
    'space-in-parens': [ 1, 'always' ],
    'max-len': [ 2, { tabWidth: 2, code: 108 } ],
    'max-lines': [ 2, 200 ],
    'max-lines-per-function': [ 2, { max: 20, skipBlankLines: true, skipComments: true } ],
    'max-params': [ 2, 4 ],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-tabs': 2,
    'no-whitespace-before-property': 2,
    semi: [ 1, 'never' ],
    'arrow-parens': 2,
    'linebreak-style': [ 2, 'unix' ],
    'keyword-spacing': 1,
    'space-before-blocks': 1,
    'object-curly-spacing': [ 1, 'always' ],
    'class-methods-use-this': 2,
    'no-invalid-this': 0,
    'no-use-before-define': [ 2, { 'functions': false, 'classes': true, variables: true } ],
    'space-before-function-paren': 0,
    'no-trailing-spaces': 1,
    'no-multiple-empty-lines': [ 2, { max: 7 } ],
    'default-case': 0,
    'comma-dangle': [ 1, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    } ],
    'padded-blocks': 0,
    'func-names': 0,
    'computed-property-spacing': [ 1, 'always' ],
    'no-param-reassign': [ 2,
      //   {
      //   props: false
      // }
    ],
    'prefer-destructuring': [ 'error', {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,
        object: false,
      },
    } ],
    'no-mixed-operators': [ 2, {
      allowSamePrecedence: true,
    } ],
    'no-prototype-builtins': 0,


    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/explicit-module-boundary-types': 2,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/consistent-indexed-object-style': [ 2, 'record' ],
    '@typescript-eslint/consistent-type-assertions': 2,
    '@typescript-eslint/explicit-member-accessibility': [ 2, { overrides: { constructors: 'no-public' } } ],
    '@typescript-eslint/member-delimiter-style': [2, {
      "multiline": {
        "delimiter": "comma",
      },
      "singleline": {
        "delimiter": "comma",
        "requireLast": false
      }
    }],
    '@typescript-eslint/method-signature-style': [ 2, 'property' ],
    '@typescript-eslint/no-confusing-void-expression': 2,
    '@typescript-eslint/no-implicit-any-catch': 2,
    '@typescript-eslint/no-invalid-void-type': 2,
    '@typescript-eslint/prefer-nullish-coalescing': 2,
    '@typescript-eslint/prefer-optional-chain': 2,
    '@typescript-eslint/switch-exhaustiveness-check': 2,
    '@typescript-eslint/strict-boolean-expressions': 2,

    'jest/prefer-expect-assertions': [ 2, {
      'onlyFunctionsWithAsyncKeyword': true,
    } ],
    'jest/require-to-throw-message': 0,
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': [
          '.ts',
        ]
      }
    }
  },
  ignorePatterns: [
    '**/dist/**/*.*',
    '*.js',
    '**/examples/**/*.*'
  ],
  overrides: [ {
    files: [ '**/__tests__/**', '**/__test__.ts' ],
    extends: [
      'plugin:jest/all',
    ],
    env: {
      'jest/globals': true,
    },
    plugins: [
      'jest',
    ],
    rules: {
      'max-lines-per-function': 0,
    },
  } ],
}
