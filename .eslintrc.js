module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    quotes: [2, 'single'],
    'max-len': [2, { code: 160, tabWidth: 2 }],
    'handle-callback-err': 2,
    'prefer-rest-params': 0,
    'no-trailing-spaces': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'arrow-body-style': 0,
    'prefer-const': 0,
    'padded-blocks': 0,
    'no-shadow': 0,
    'no-return-assign': 0,
    'prefer-template': 0,
    'comma-dangle': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'func-names': 0,
    'no-path-concat': 0,
    'class-methods-use-this': 0,
    'no-console': 0,
    'no-await-in-loop': 0,
    'no-restricted-syntax': 0,
  }
};
