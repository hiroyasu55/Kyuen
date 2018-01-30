module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  /*
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      classes: true
    }
  },
  */
  plugins: [
    'node',
    'flowtype'
  ],
  rules: {
    'global-require': 'off',
    'no-mixed-operators': [
      'error',
      {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}
    ],
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'object-shorthand': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prefer-stateless-function': false,
    'react/no-array-index-key': 'off',
    'react/no-multi-comp': 'off',
    'no-console': 'warn'
  },
  env: {
    node: true
  }
}
