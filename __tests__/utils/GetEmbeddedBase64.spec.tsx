// import React from "react";
import { GetBase64String, GetEmbeddedBase64 } from "../../src/utils";

// global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  const file = {
    base64: "test",
    name: "test.png",
    type: "image/png",
  };
  const embeddedBase64 = GetEmbeddedBase64(file);
  const base64String = GetBase64String(embeddedBase64);
  expect(base64String).toBe(file.base64);
});
