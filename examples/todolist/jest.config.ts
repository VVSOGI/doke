import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/services/(.*)$': '<rootDir>/src/services/$1',
    '^src/entities$': '<rootDir>/src/entities/index',
    '^src/utils$': '<rootDir>/src/utils/index',
    '^src/common$': '<rootDir>/src/common/index',
  },
};

export default config;
