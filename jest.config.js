module.exports = {
  verbose: true,
  bail: false,
  roots: [ '<rootDir>/src' ],
  testMatch: [ '<rootDir>/src/**/__tests__/*.ts', '<rootDir>/src/**/__test__.ts' ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: [ 'ts', 'js' ],
}
