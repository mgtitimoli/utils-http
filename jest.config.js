// eslint-disable-next-line no-undef
module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  roots: ["<rootDir>"],
  snapshotResolver: "./jestSnapshotResolver",
  testMatch: ["**/__tests__/*.test.ts?(x)"],
  transform: {
    // to be able to use jest setup files with typescript
    "^.+\\.tsx?$": "ts-jest"
  }
};
