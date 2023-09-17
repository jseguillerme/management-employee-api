import { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/test', '<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.module.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  clearMocks: true,
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/test/$1',
    '@/src/(.*)': '<rootDir>/src/$1',
  },
}

export default config
