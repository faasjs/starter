/** @type {import('jest').Config} */
module.exports = {
  displayName: 'api',
  transform: {
    '.(jsx|tsx?)': '@faasjs/jest'
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^libs(.*)$': '<rootDir>/src/libs$1'
  },
  setupFilesAfterEnv: [
    '@faasjs/jest/jest.setup.js',
    './libs/jest.setup.ts'
  ]
}
