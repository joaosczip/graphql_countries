module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/index.tsx",
    "!<rootDir>/src/**/*.d.ts",
    "!<rootDir>/src/main/**/*",
    "!<rootDir>/src/presentation/@types/**/*",
    "!<rootDir>/src/presentation/styles/*.ts",
    "!<rootDir>/src/**/protocols/*.ts",
    "!<rootDir>/src/**/index.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/main/config/jest-setup.ts"],
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
