module.exports = {
  verbose: true,
  bail: false,
  roots: [ '<rootDir>/packages/jval/src' ],
  testMatch: [
    '<rootDir>/packages/jval/src/**/__tests__/*.ts',
  ],
  moduleFileExtensions: [ 'ts', 'js' ],
  collectCoverage: true,
  coverageReporters: [ "json-summary" ]
}
