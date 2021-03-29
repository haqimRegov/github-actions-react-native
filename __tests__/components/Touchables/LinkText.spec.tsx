import React from "react";
import renderer from "react-test-renderer";

import { LinkText } from "../../../src/components";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  renderer.create(<LinkText onPress={() => {}} text="Test" />);
});
