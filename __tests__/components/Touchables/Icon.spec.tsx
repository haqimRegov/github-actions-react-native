import { render } from "@testing-library/react-native";
import React from "react";

import { IconButton } from "../../../src/components";

it("render basic IconButton", () => {
  const mockFn = jest.fn();
  render(<IconButton name="calendar" onPress={mockFn} />);
});

it("render a IconButton with custom style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<IconButton name="calendar" onPress={mockFn} style={{ backgroundColor: testColor }} />);
});

it("render a IconButton with size", () => {
  const mockFn = jest.fn();
  render(<IconButton name="calendar" onPress={mockFn} size={16} />);
});

it("render a IconButton with different color", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<IconButton color={testColor} name="calendar" onPress={mockFn} />);
});

it("render a IconButton with debounce", () => {
  const mockFn = jest.fn();
  render(<IconButton name="calendar" onPress={mockFn} withDebounce={true} />);
});

it("render a IconButton with withHover", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<IconButton name="calendar" onPress={mockFn} withHover={{ color: testColor }} />);
});
