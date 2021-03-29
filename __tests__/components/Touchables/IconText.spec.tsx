import React from "react";
import renderer from "react-test-renderer";

import { IconText } from "../../../src/components";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  renderer.create(<IconText name="test" onPress={() => {}} text="Test" />);
});
