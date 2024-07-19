import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default config;

// export default {
//   preset: "ts-jest",
//   testEnvironment: "jest-environment-jsdom",
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//     // process `*.tsx` files with `ts-jest`
//   },
//   moduleNameMapper: {
//     "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
//   },
// };
