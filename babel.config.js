
const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  presets: [
    [ '@babel/preset-env', {
      modules: isTest ? 'cjs' : false,
    } ],
    '@babel/preset-typescript'
  ],

  plugins: [
    '@babel/plugin-proposal-class-properties',
  ]
}
