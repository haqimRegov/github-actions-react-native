import React from "react";
import renderer from "react-test-renderer";

import { RoundedButton } from "../../../src/components";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  renderer.create(<RoundedButton onPress={() => {}} radius={24} text="Test" />);
});
