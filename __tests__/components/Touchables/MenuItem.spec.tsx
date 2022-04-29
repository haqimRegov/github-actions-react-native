import { render } from "@testing-library/react-native";
import React from "react";

import { MenuItem } from "../../../src/components";

it("render basic MenuItem", () => {
  render(<MenuItem name="calendar" title="Test Item" />);
});

it("render a MenuItem with onPress", () => {
  const mockFn = jest.fn();
  render(<MenuItem name="calendar" onPress={mockFn} title="Test Item" />);
});

it("render a MenuItem with active true", () => {
  render(<MenuItem active={true} name="calendar" title="Test Item" />);
});

it("render a MenuItem with active false", () => {
  render(<MenuItem active={false} name="calendar" title="Test Item" />);
});

it("render a MenuItem with badgeCount", () => {
  render(<MenuItem badgeCount={4} name="calendar" title="Test Item" />);
});

it("render a MenuItem with color", () => {
  const testColor = "#fff";
  render(<MenuItem color={testColor} name="calendar" title="Test Item" />);
});

it("render a MenuItem with iconSize", () => {
  render(<MenuItem iconSize={4} name="calendar" title="Test Item" />);
});

it("render a MenuItem with spaceBetween", () => {
  render(<MenuItem name="calendar" spaceBetween={4} title="Test Item" />);
});

it("render a MenuItem with style", () => {
  const testColor = "#fff";
  render(<MenuItem name="calendar" style={{ backgroundColor: testColor }} title="Test Item" />);
});

it("render a MenuItem with subtitle", () => {
  render(<MenuItem name="calendar" subtitle="Test Subtitle" title="Test Item" />);
});

it("render a MenuItem with subtitleStyle", () => {
  const testColor = "#fff";
  render(<MenuItem name="calendar" subtitleStyle={{ color: testColor }} title="Test Item" />);
});

it("render a MenuItem with titleStyle", () => {
  const testColor = "#fff";
  render(<MenuItem name="calendar" title="Test Item" titleStyle={{ color: testColor }} />);
});
