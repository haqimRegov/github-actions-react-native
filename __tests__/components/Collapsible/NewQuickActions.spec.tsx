import { render } from "@testing-library/react-native";
import React from "react";

import { NewQuickActions } from "../../../src/components";

it("render a basic NewQuickActions", () => {
  const mockFn = jest.fn();
  render(<NewQuickActions actions={[{ label: "Test", onPress: mockFn }]} />);
});

it("render a basic NewQuickActions with action labelStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<NewQuickActions actions={[{ label: "Test", labelStyle: { color: testColor }, onPress: mockFn }]} />);
});
it("render a basic NewQuickActions with action style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<NewQuickActions actions={[{ label: "Test", style: { backgroundColor: testColor }, onPress: mockFn }]} />);
});

it("render a disabled NewQuickActions", () => {
  const mockFn = jest.fn();
  render(<NewQuickActions disabled={true} actions={[{ label: "Test", onPress: mockFn }]} />);
});

it("render a NewQuickActions with label", () => {
  const mockFn = jest.fn();
  render(<NewQuickActions actions={[{ label: "Test", onPress: mockFn }]} label="Test" />);
});

it("render a NewQuickActions with label, labelStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<NewQuickActions actions={[{ label: "Test", onPress: mockFn }]} label="Test" labelStyle={{ color: testColor }} />);
});

it("render a NewQuickActions with label, style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<NewQuickActions actions={[{ label: "Test", onPress: mockFn }]} label="Test" style={{ backgroundColor: testColor }} />);
});
