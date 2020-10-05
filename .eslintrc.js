module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': 'tsconfig.json',
    'sourceType': 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:unicorn/recommended',
  ],
  'plugins': [
    '@typescript-eslint',
    '@typescript-eslint/tslint',
    'import',
    'prefer-arrow',
    'unicorn',
  ],
  'rules': {
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
        readonly: 'array-simple',
      },
    ],
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/interface-name-prefix': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'semi',
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': false,
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
    ],
    '@typescript-eslint/semi': [
      'error',
      'always',
    ],
    '@typescript-eslint/triple-slash-reference': 'error',
    // Rule blocked jests method mocking and using mock
    '@typescript-eslint/unbound-method': 'off',
    'arrow-body-style': 'error',
    'camelcase': 'error',
    'curly': [
      'error',
      'multi-line',
    ],
    'default-case': 'error',
    'eqeqeq': [
      'error',
      'smart',
    ],
    'guard-for-in': 'error',
    'id-blacklist': [
      'error',
      'any',
      'parseInt',
    ],
    'id-match': 'error',
    'import/no-default-export': 'error',
    'import/no-unresolved': 'off',
    'new-parens': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-debugger': 'error',
    'no-new-wrappers': 'error',
    'no-redeclare': 'error',
    'no-throw-literal': 'error',
    'no-underscore-dangle': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow/prefer-arrow-functions': 'error',
    'prefer-const': 'error',
    'radix': 'error',
    'unicorn/filename-case': 'error',
    // Changed from 'error', this rule blocked me to create test file (e2e => end2end)
    'unicorn/prevent-abbreviations': [
      'warn',
      { 'checkFilenames': false }
    ],
    'use-isnan': 'error',
    '@typescript-eslint/tslint/config': [
      'error',
      {
        'rules': {
          'ban': [
            true,
            {
              'name': 'parseInt',
              'message': 'tsstyle#type-coercion',
            },
            {
              'name': 'parseFloat',
              'message': 'tsstyle#type-coercion',
            },
            {
              'name': 'Array',
              'message': 'tsstyle#array-constructor',
            },
          ],
          'whitespace': [
            true,
            'check-branch',
            'check-module',
            'check-operator',
            'check-typecast',
          ],
        },
      },
    ],
  },
};
