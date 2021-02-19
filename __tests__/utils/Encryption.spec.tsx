// import React from "react";
import { Decrypt, Encrypt } from "../../src/utils";

// global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  const token = "token";
  const value = "test";
  const encryptedValue = Encrypt(value, token);
  const decryptedValue = Decrypt(encryptedValue, token);
  expect(decryptedValue).toBe(value);
});
