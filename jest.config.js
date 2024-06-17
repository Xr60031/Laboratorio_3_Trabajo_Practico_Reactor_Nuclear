module.exports = {
  automock: false,
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: ["clover", "json", "lcov", ["text", { "skipFull": true }]],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: [
    "node_modules",
    "tests/data.ts",
    "tests/common.mocks.ts",
    "tests/integ"
  ],
  testTimeout: 22000,
  verbose: false,
  reporters: [
    ["jest-compact-reporter", { diffs: false, colours: true, showPassingTests: true }],
    ["jest-junit", { outputDirectory: "coverage", usePathForSuiteName: true, reportedFilePath: "absolute" }],
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },
};