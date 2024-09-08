export default {
    clearMocks: true,
    verbose: true,
    transform: {
      '^.+\\.m?js$': 'babel-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testEnvironment: 'node',
  };
  