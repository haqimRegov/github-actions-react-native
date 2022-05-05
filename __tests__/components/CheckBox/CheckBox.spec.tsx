import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { CheckBox } from "../../../src/components";

it("render a basic CheckBox", () => {
  const mockFn = jest.fn();
  render(<CheckBox onPress={mockFn} toggle={false} />);
});

it("render a CheckBox with label", () => {
  const mockFn = jest.fn();
  render(<CheckBox label="Test CheckBox" onPress={mockFn} toggle={false} />);
});

it("render a CheckBox with label and labelStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CheckBox label="Test CheckBox" labelStyle={{ backgroundColor: testColor }} onPress={mockFn} toggle={false} />);
});

it("render a CheckBox with label and numberOfLines", () => {
  const mockFn = jest.fn();
  render(<CheckBox label="Test CheckBox" numberOfLines={1} onPress={mockFn} toggle={false} />);
});

it("render a disabled CheckBox with label", () => {
  const mockFn = jest.fn();
  render(<CheckBox disabled={true} label="Test CheckBox" onPress={mockFn} toggle={false} />);
});

it("render a CheckBox with toggleColor", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CheckBox label="Test CheckBox" onPress={mockFn} toggle={false} toggleColor={testColor} />);
});

it("render a CheckBox with style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CheckBox label="Test CheckBox" onPress={mockFn} toggle={false} style={{ backgroundColor: testColor }} />);
});

it("render a CheckBox with boxStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CheckBox boxStyle={{ borderColor: testColor }} label="Test CheckBox" onPress={mockFn} toggle={false} />);
});

it("render a CheckBox with checkboxStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CheckBox checkboxStyle={{ backgroundColor: testColor }} label="Test CheckBox" onPress={mockFn} toggle={false} />);
});

it("render a CheckBox with iconSize", () => {
  const mockFn = jest.fn();
  render(<CheckBox iconSize={12} label="Test CheckBox" onPress={mockFn} toggle={false} />);
});

it("render a CheckBox with subLabel", () => {
  const mockFn = jest.fn();
  render(<CheckBox label="Test CheckBox" onPress={mockFn} subLabel="Test Sub Label" toggle={false} />);
});

it("render a CheckBox with subLabel and subLabelStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<CheckBox label="Test CheckBox" onPress={mockFn} subLabel="Test Sub Label" subLabelStyle={{ color: testColor }} toggle={false} />);
});

it("render a CheckBox with subLabel and spaceToSubLabel", () => {
  const mockFn = jest.fn();
  render(<CheckBox label="Test CheckBox" onPress={mockFn} spaceToSubLabel={4} subLabel="Test Sub Label" toggle={false} />);
});

it("render a CheckBox with spaceToLabel", () => {
  const mockFn = jest.fn();
  render(<CheckBox label="Test CheckBox" onPress={mockFn} spaceToLabel={4} toggle={false} />);
});

it("pressing a disabled CheckBox", () => {
  const mockFn = jest.fn();
  const { getByText } = render(<CheckBox disabled={true} label="Test CheckBox" onPress={mockFn} toggle={false} />);
  fireEvent.press(getByText("Test CheckBox"));
  expect(mockFn).not.toHaveBeenCalled();
});

it("pressing a CheckBox", () => {
  const mockFn = jest.fn();
  const { getByText } = render(<CheckBox label="Test CheckBox" onPress={mockFn} toggle={true} />);
  fireEvent.press(getByText("Test CheckBox"));
  expect(mockFn).toHaveBeenCalled();
});
