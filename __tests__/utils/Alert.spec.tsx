import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Alert, Text } from "react-native";

import { AlertDialog } from "../../src/utils";

test("given button is pressed, alert should be visible", () => {
  jest.spyOn(Alert, "alert");
  const mockFn = jest.fn();

  const showAlert = () => {
    AlertDialog("Test Message", mockFn, "Test Title");
  };

  const buttonText = "Test Alert";

  const { getByText } = render(<Text onPress={showAlert}>{buttonText}</Text>);

  fireEvent.press(getByText(buttonText));

  expect(Alert.alert).toHaveBeenCalled();
});
