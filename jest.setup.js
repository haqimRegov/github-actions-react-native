import "react-native-gesture-handler/jestSetup";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";
import { format } from "util";

// import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";

// import * as ReactNative from "react-native";
/* eslint-disable no-undef */
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
// jest.mock("react-native-device-info", () => mockRNDeviceInfo);
// jest.mock("react-native-fs");

jest.mock("react-native-image-crop-picker", () => () => ({
  openPicker: jest.fn(),
  openCamera: jest.fn(),
}));
jest.mock("react-native-share", () => ({
  default: jest.fn(),
}));
jest.mock("react-native-text-size", () => ({
  default: jest.fn(),
}));

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  return {
    KeyboardAwareScrollView: jest.fn().mockImplementation(({ children }) => children),
  };
});
// jest.mock("react-native-modal");
// jest.mock("@react-native-firebase/messaging", () => () => ({
//   messaging: jest.fn(),
//   onMessage: jest.fn(),
// }));

// jest.mock("@react-native-firebase/ml-vision", () => () => ({
//   vision: jest.fn(),
// }));

// jest.mock("@react-native-community/push-notification-ios", () => ({
//   addEventListener: jest.fn(),
//   requestPermissions: jest.fn(() => Promise.resolve()),
//   getInitialNotification: jest.fn(() => Promise.resolve()),
// }));

// jest.mock("react-native-share", () => ({
//   default: jest.fn(),
// }));

// jest.mock("react-native-reanimated", () => {
//   // eslint-disable-next-line global-require
//   const Reanimated = require("react-native-reanimated/mock");

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

// jest.mock("react-native-vector-icons", () => ({
//   createIconSetFromIcoMoon: jest.fn(),
// }));

// jest.mock("react-native-splash-screen", () => ({
//   hide: jest.fn(),
//   show: jest.fn(),
// }));

// jest.mock("react-native", () =>
//   // Extend ReactNative
//   Object.setPrototypeOf(
//     {
//       // Mock out properties of an already mocked export
//       LayoutAnimation: {
//         ...ReactNative.LayoutAnimation,
//         configureNext: jest.fn(),
//       },

//       // Mock a native module
//       NativeModules: {
//         ...ReactNative.NativeModules,
//         Override: { great: "success" },
//       },
//     },
//     ReactNative,
//   ),
// );

// Note: Jest doesn't fail a test when the error is handled using console.error
// This function was created to fail a test when there is a console.error
// Reference: https://github.com/facebook/jest/issues/6121
const { error } = global.console;

global.console.error = (...args) => {
  error(...args);
  throw new Error(format(...args));
};
