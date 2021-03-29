import React from "react";
import renderer from "react-test-renderer";

import { MenuItem } from "../../../src/components";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  renderer.create(<MenuItem active={true} name="" title="Test" />);
});
