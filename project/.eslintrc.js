module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }],
  },
};
