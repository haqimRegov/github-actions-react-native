import React from "react";
import renderer from "react-test-renderer";

import { OutlineButton } from "../../../src/components";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  renderer.create(<OutlineButton onPress={() => {}} text="Test" />);
});
