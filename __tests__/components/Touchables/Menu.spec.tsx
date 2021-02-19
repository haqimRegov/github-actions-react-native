import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import renderer from "react-test-renderer";

import { MenuPopup } from "../../../src/components";
import { IcoMoon } from "../../../src/icons";
import { px, py, sh24, sh4, sw4 } from "../../../src/styles";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  renderer.create(
    <MenuPopup
      RenderButton={({ show }) => {
        return (
          <TouchableWithoutFeedback onPress={show}>
            <View style={{ ...px(sw4), ...py(sh4) }}>
              <IcoMoon name="action-menu" size={sh24} />
            </View>
          </TouchableWithoutFeedback>
        );
      }}
      RenderContent={({ hide }) => {
        return <Text onPress={hide}>Test</Text>;
      }}
    />,
  );
});
