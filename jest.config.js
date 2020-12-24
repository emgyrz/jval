module.exports = {
  verbose: true,
  bail: false,
  roots: [ '<rootDir>/packages/*/src' ],
  testMatch: [
    '<rootDir>/packages/*/src/**/__tests__/*.ts',
  ],
  moduleFileExtensions: [ 'ts', 'js' ],
}
