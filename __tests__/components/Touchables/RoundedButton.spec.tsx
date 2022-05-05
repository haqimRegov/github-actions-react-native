import { render } from "@testing-library/react-native";
import React from "react";

import { RoundedButton } from "../../../src/components";

it("render basic RoundedButton", () => {
  const mockFn = jest.fn();
  render(<RoundedButton radius={16} onPress={mockFn} text="Test Button" />);
});

it("render a disabled RoundedButton", () => {
  const mockFn = jest.fn();
  render(<RoundedButton radius={16} disabled={true} onPress={mockFn} text="Test Button" />);
});

it("render a loading RoundedButton", () => {
  const mockFn = jest.fn();
  render(<RoundedButton radius={16} loading={true} onPress={mockFn} text="Test Button" />);
});

it("render a secondary RoundedButton", () => {
  const mockFn = jest.fn();
  render(<RoundedButton radius={16} onPress={mockFn} secondary={true} text="Test Button" />);
});

it("render a RoundedButton with custom style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<RoundedButton radius={16} buttonStyle={{ backgroundColor: testColor }} onPress={mockFn} text="Test Button" />);
});

it("render a RoundedButton with custom text style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<RoundedButton radius={16} onPress={mockFn} text="Test Button" textStyle={{ color: testColor }} />);
});

it("render a RoundedButton with icon", () => {
  const mockFn = jest.fn();
  render(<RoundedButton radius={16} icon="calendar" onPress={mockFn} text="Test Button" />);
});

it("render a RoundedButton with icon with different color", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<RoundedButton radius={16} icon="calendar" iconColor={testColor} onPress={mockFn} text="Test Button" />);
});

it("render a RoundedButton with debounce", () => {
  const mockFn = jest.fn();
  render(<RoundedButton radius={16} onPress={mockFn} text="Test Button" withDebounce={true} />);
});
