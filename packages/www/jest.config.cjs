/** @type {import('jest').Config} */
module.exports = {
  displayName: 'www',
  transform: {
    '.(jsx|tsx?)': '@faasjs/jest'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './src/jest.setup.ts'
  ]
}
