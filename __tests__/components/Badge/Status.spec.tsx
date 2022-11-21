import { render } from "@testing-library/react-native";
import React from "react";

import { StatusBadge } from "../../../src/components";

it("render basic StatusBadge", () => {
  render(<StatusBadge text="Test Status" />);
});

it("render StatusBadge with color", () => {
  render(<StatusBadge color="complete" text="Test Status" />);
});

it("render StatusBadge with onPress", () => {
  const mockFn = jest.fn();
  render(<StatusBadge onPress={mockFn} text="Test Status" />);
});

it("render StatusBadge with textStyle", () => {
  const testColor = "#fff";
  render(<StatusBadge text="Test Status" textStyle={{ color: testColor }} />);
});

it("render StatusBadge with style", () => {
  const testColor = "#fff";
  render(<StatusBadge text="Test Status" style={{ backgroundColor: testColor }} />);
});

it("render StatusBadge with icon", () => {
  render(<StatusBadge text="Test Status" icon="calendar" />);
});

it("render StatusBadge with icon and iconSize", () => {
  render(<StatusBadge text="Test Status" icon="calendar" iconSize={8} />);
});
