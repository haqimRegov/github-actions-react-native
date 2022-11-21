import { render } from "@testing-library/react-native";
import React from "react";

import { IconText } from "../../../src/components";

it("render basic IconText", () => {
  const mockFn = jest.fn();
  render(<IconText name="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a IconText with custom style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<IconText name="calendar" onPress={mockFn} style={{ backgroundColor: testColor }} text="Test Button" />);
});

it("render a IconText with text style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<IconText name="calendar" onPress={mockFn} text="Test Button" textStyle={{ color: testColor }} />);
});

it("render a IconText with size", () => {
  const mockFn = jest.fn();
  render(<IconText iconSize={16} name="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a IconText with different color", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<IconText color={testColor} name="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a IconText with iconPosition left", () => {
  const mockFn = jest.fn();
  render(<IconText iconPosition="left" name="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a IconText with iconPosition right", () => {
  const mockFn = jest.fn();
  render(<IconText iconPosition="right" name="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a IconText with spaceBetween", () => {
  const mockFn = jest.fn();
  render(<IconText name="calendar" onPress={mockFn} spaceBetween={16} text="Test Button" />);
});
