/* eslint-disable @typescript-eslint/no-var-requires */
const configIntegration = require('./jest.config')
configIntegration.testMatch = ['**/*.test.ts']
module.exports = configIntegration
