import { render } from "@testing-library/react-native";
import React from "react";

import { LabeledTitle } from "../../../src/components";

it("render basic LabeledTitle", () => {
  render(<LabeledTitle label="Test Label" title="Test Title" />);
});

it("render LabeledTitle with labelStyle", () => {
  const testColor = "#fff";
  render(<LabeledTitle label="Test Label" labelStyle={{ color: testColor }} title="Test Title" />);
});

it("render LabeledTitle with labelStyle and titleStyle", () => {
  const testColor = "#fff";
  render(<LabeledTitle label="Test Label" labelStyle={{ color: testColor }} title="Test Title" titleStyle={{ color: testColor }} />);
});

it("render LabeledTitle with titlePrefix", () => {
  render(<LabeledTitle label="Test Label" title="Test Title" titlePrefix="Test" />);
});

it("render LabeledTitle with titlePrefix and titlePrefixStyle", () => {
  const testColor = "#fff";
  render(<LabeledTitle label="Test Label" title="Test Title" titlePrefix="Test" titlePrefixStyle={{ color: testColor }} />);
});

it("render LabeledTitle with subtitle", () => {
  render(<LabeledTitle label="Test Label" title="Test Title" subtitle="Test" />);
});

it("render LabeledTitle with subtitle and subtitleStyle", () => {
  const testColor = "#fff";
  render(<LabeledTitle label="Test Label" title="Test Title" subtitle="Test" subtitleStyle={{ color: testColor }} />);
});

it("render LabeledTitle with style", () => {
  const testColor = "#fff";
  render(<LabeledTitle label="Test Label" title="Test Title" style={{ backgroundColor: testColor }} />);
});

it("render LabeledTitle with spaceToBottom", () => {
  render(<LabeledTitle label="Test Label" title="Test Title" spaceToBottom={4} />);
});

it("render LabeledTitle with spaceToIcon", () => {
  render(<LabeledTitle label="Test Label" title="Test Title" spaceToIcon={4} />);
});

it("render LabeledTitle with spaceToLabel", () => {
  render(<LabeledTitle label="Test Label" title="Test Title" spaceToLabel={4} />);
});

it("render LabeledTitle with onPress", () => {
  const mockFn = jest.fn();
  render(<LabeledTitle label="Test Label" onPress={mockFn} title="Test Title" />);
});

it("render LabeledTitle with titleIcon", () => {
  render(<LabeledTitle label="Test Label" title="Test Title" titleIcon="calendar" />);
});

it("render LabeledTitle with titleIcon and iconSize", () => {
  render(<LabeledTitle iconSize={8} label="Test Label" title="Test Title" titleIcon="calendar" />);
});

it("render LabeledTitle with titleIcon and titleIconStyle", () => {
  const testColor = "#fff";
  render(<LabeledTitle label="Test Label" title="Test Title" titleIcon="calendar" titleIconStyle={{ color: testColor }} />);
});
