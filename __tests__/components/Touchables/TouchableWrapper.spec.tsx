import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { TouchableWrapper } from "../../../src/components";

it("render basic TouchableWrapper", () => {
  render(<TouchableWrapper children={<Text>Test</Text>} />);
});

it("render basic TouchableWrapper with isTouchable true", () => {
  render(<TouchableWrapper children={<Text>Test</Text>} isTouchable={true} />);
});

it("render basic TouchableWrapper with isTouchable false", () => {
  render(<TouchableWrapper children={<Text>Test</Text>} isTouchable={false} />);
});

it("render basic TouchableWrapper with onPress", () => {
  const mockFn = jest.fn();
  render(<TouchableWrapper children={<Text>Test</Text>} onPress={mockFn} />);
});
