const config = {
  verbose: true,
  cacheDirectory: ".jest/cache",
  collectCoverage: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "\\.(css|less)$": "identity-obj-proxy",
  },
  preset: "react-native",
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testResultsProcessor: "jest-sonar-reporter",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-progress|react-native-collapsible|@react-native-firebase|@react-native-community/push-notification-ios|react-native-push-notification|react-native-image-crop-picker|react-native-inappbrowser-reborn|react-native-modal|react-native-animatable|react-native-keyboard-aware-scroll-view|react-native-iphone-x-helper|react-native-view-pdf|react-native-signature-capture|react-native-enhanced-popup-menu|@react-native-community/blur|react-native-dash|@react-native-community/datetimepicker|react-native-walkthrough-tooltip|@miblanchard/react-native-slider)/)",
  ],
};

module.exports = config;
