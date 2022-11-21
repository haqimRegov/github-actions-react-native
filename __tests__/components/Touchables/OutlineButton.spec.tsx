import { render } from "@testing-library/react-native";
import React from "react";

import { OutlineButton } from "../../../src/components";

it("render basic OutlineButton", () => {
  const mockFn = jest.fn();
  render(<OutlineButton onPress={mockFn} text="Test Button" />);
});

it("render a disabled OutlineButton", () => {
  const mockFn = jest.fn();
  render(<OutlineButton disabled={true} onPress={mockFn} text="Test Button" />);
});

it("render a OutlineButton with custom style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<OutlineButton buttonStyle={{ backgroundColor: testColor }} onPress={mockFn} text="Test Button" />);
});

it("render a OutlineButton with custom text style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<OutlineButton onPress={mockFn} text="Test Button" textStyle={{ color: testColor }} />);
});

it("render a OutlineButton with icon", () => {
  const mockFn = jest.fn();
  render(<OutlineButton icon="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a OutlineButton with icon with different color", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<OutlineButton color={testColor} icon="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a OutlineButton with solid button type", () => {
  const mockFn = jest.fn();
  render(<OutlineButton buttonType="solid" onPress={mockFn} text="Test Button" />);
});

it("render a OutlineButton with dashed button type", () => {
  const mockFn = jest.fn();
  render(<OutlineButton buttonType="dashed" onPress={mockFn} text="Test Button" />);
});

it("render a OutlineButton with spaceToIcon", () => {
  const mockFn = jest.fn();
  render(<OutlineButton onPress={mockFn} spaceToIcon={16} text="Test Button" />);
});
