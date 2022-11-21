import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

import { MenuPopup } from "../../../src/components";

// Note: test renderer must be required after react-native.
it("render a MenuPopup", () => {
  const testSize = 4;
  render(
    <MenuPopup
      RenderButton={({ show }) => {
        return (
          <TouchableWithoutFeedback onPress={show}>
            <View style={{ padding: testSize }}>
              <Text>Test Button</Text>
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

it("show a MenuPopup", () => {
  const testSize = 4;
  const { getByText } = render(
    <MenuPopup
      RenderButton={({ show }) => {
        return (
          <TouchableWithoutFeedback onPress={show}>
            <View style={{ padding: testSize }}>
              <Text>Test Button</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      }}
      RenderContent={({ hide }) => {
        return <Text onPress={hide}>Test</Text>;
      }}
    />,
  );

  fireEvent.press(getByText("Test Button"));
});
