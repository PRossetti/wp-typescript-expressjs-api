module.exports = {
  testEnvironment: 'node',
  verbose: true,
  transform: { '^.+\\.ts$': 'ts-jest' },
  testRegex: '\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['./'],
  moduleNameMapper: {
    '@root(.*)$': '<rootDir>/src/$1',
    '@services(.*)$': '<rootDir>/src/services$1',
    '@utils(.*)$': '<rootDir>/src/utils$1',
  },
  modulePathIgnorePatterns: ['/node_modules/.*'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverage: true,
  reporters: ['default'],
  coverageReporters: ['lcov', 'html', 'json', 'text'],
  setupFiles: ['./jest.setup.js'],
};