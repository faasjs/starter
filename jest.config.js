/** @type {import('jest').Config} */
module.exports = {
  projects: [
    '<rootDir>/packages/api/jest.config.js',
    '<rootDir>/packages/www/jest.config.js',
  ],
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['.d.ts', '/node_modules/', '/dist/', '/types/'],
  passWithNoTests: true,
}
