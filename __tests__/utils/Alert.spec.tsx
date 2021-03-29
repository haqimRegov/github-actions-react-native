import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";

import { AlertDialog } from "../../src/utils";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  AlertDialog("Test", () => {}, "Test");
  renderer.create(<View />);
});
