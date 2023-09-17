/* eslint-disable @typescript-eslint/no-var-requires */
const configUnit = require('./jest.config')
configUnit.testMatch = ['**/*.spec.ts']
module.exports = configUnit
