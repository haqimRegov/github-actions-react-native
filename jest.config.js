import { defaults as tsjPreset } from "ts-jest/presets";

export default {
  ...tsjPreset,
  cacheDirectory: ".jest/cache",
  collectCoverage: true,
  globals: { "ts-jest": { babelConfig: true } },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "\\.(css|less)$": "identity-obj-proxy",
  },
  preset: "react-native",
  setupFiles: ["./jest.setup.js"],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  testResultsProcessor: "jest-sonar-reporter",
  transform: { ...tsjPreset.transform, "\\.js$": "./node_modules/react-native/jest/preprocessor.js" },
};
