import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { SelectionBanner } from "../../../src/components";

it("render a basic SelectionBanner", () => {
  const mockFn = jest.fn();
  render(<SelectionBanner label="Test Banner" submitOnPress={mockFn} />);
});

it("render a basic SelectionBanner with labelCancel and cancelOnPress", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  render(<SelectionBanner cancelOnPress={anotherMockFn} label="Test Banner" labelCancel="Test Cancel" submitOnPress={mockFn} />);
});

it("render a SelectionBanner with labelStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<SelectionBanner label="Test Banner" labelStyle={{ color: testColor }} submitOnPress={mockFn} />);
});

it("render a SelectionBanner with labelSubmit", () => {
  const mockFn = jest.fn();
  render(<SelectionBanner label="Test Banner" labelSubmit="Test Submit" submitOnPress={mockFn} />);
});

it("render a SelectionBanner with containerStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<SelectionBanner containerStyle={{ backgroundColor: testColor }} label="Test Banner" submitOnPress={mockFn} />);
});

it("render a SelectionBanner with continueDisabled", () => {
  const mockFn = jest.fn();
  render(<SelectionBanner continueDisabled={true} label="Test Banner" submitOnPress={mockFn} />);
});

it("render a SelectionBanner with continueLoading", () => {
  const mockFn = jest.fn();
  render(<SelectionBanner continueLoading={true} label="Test Banner" submitOnPress={mockFn} />);
});

it("render a SelectionBanner with continueDebounce", () => {
  const mockFn = jest.fn();
  render(<SelectionBanner continueDebounce={true} label="Test Banner" submitOnPress={mockFn} />);
});

it("render a SelectionBanner with bottomContent", () => {
  const mockFn = jest.fn();
  render(<SelectionBanner bottomContent={<Text>Test Content</Text>} label="Test Banner" submitOnPress={mockFn} />);
});
