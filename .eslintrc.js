module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-return-await': 'off',
    'consistent-return': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'no-prototype-builtins': 0,
    'max-len': [2, 120, 4],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
