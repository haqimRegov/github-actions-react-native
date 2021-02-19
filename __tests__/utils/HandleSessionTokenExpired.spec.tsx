import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";

import { HandleSessionTokenExpired } from "../../src/utils";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  const navigation = { dispatch: jest.fn() };
  const error = {
    errorCode: "EMXXX",
    errorList: ["error 1", "error 2"],
    message: "test error",
    statusCode: "400",
  };
  HandleSessionTokenExpired(navigation as any, error);
  renderer.create(<View />);
});
