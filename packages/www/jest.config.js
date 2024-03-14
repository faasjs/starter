/** @type {import('jest').Config} */
module.exports = {
  displayName: 'www',
  transform: {
    '.(jsx|tsx?)': '@faasjs/jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^libs(.*)$': '<rootDir>/src/libs$1'
  },
  setupFilesAfterEnv: [
    './src/jest.setup.ts'
  ]
}
