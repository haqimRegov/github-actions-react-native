import React from "react";
import renderer from "react-test-renderer";

import { CustomButton } from "../../../src/components";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  renderer.create(<CustomButton disabled={false} onPress={() => {}} secondary={true} text="Test" />);
});
