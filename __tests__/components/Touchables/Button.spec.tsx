import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { CustomButton } from "../../../src/components";

it("render basic CustomButton", () => {
  const mockFn = jest.fn();
  render(<CustomButton onPress={mockFn} text="Test Button" />);
});

it("render a disabled CustomButton", () => {
  const mockFn = jest.fn();
  render(<CustomButton disabled={true} onPress={mockFn} text="Test Button" />);
});

it("render a loading CustomButton", () => {
  const mockFn = jest.fn();
  render(<CustomButton loading={true} onPress={mockFn} text="Test Button" />);
});

it("render a secondary CustomButton", () => {
  const mockFn = jest.fn();
  render(<CustomButton onPress={mockFn} secondary={true} text="Test Button" />);
});

it("render a CustomButton with custom style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CustomButton buttonStyle={{ backgroundColor: testColor }} onPress={mockFn} text="Test Button" />);
});

it("render a CustomButton with custom text style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CustomButton onPress={mockFn} text="Test Button" textStyle={{ color: testColor }} />);
});

it("render a CustomButton with icon", () => {
  const mockFn = jest.fn();
  render(<CustomButton icon="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a CustomButton with icon with different color", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CustomButton icon="calendar" iconColor={testColor} onPress={mockFn} text="Test Button" />);
});

it("render a CustomButton with debounce", () => {
  const mockFn = jest.fn();
  render(<CustomButton onPress={mockFn} text="Test Button" withDebounce={true} />);
});

it("render a CustomButton that can be pressed", () => {
  const mockFn = jest.fn();
  const { getByText } = render(<CustomButton onPress={mockFn} text="Test Button" />);

  fireEvent.press(getByText("Test Button"));
  expect(mockFn).toHaveBeenCalled();
});

it("render a CustomButton that can be pressed with debounce", () => {
  const mockFn = jest.fn();
  const { getByText } = render(<CustomButton onPress={mockFn} text="Test Button" withDebounce={true} />);

  fireEvent.press(getByText("Test Button"));
  expect(mockFn).toHaveBeenCalled();
});
