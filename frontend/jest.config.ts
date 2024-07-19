import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default config;
