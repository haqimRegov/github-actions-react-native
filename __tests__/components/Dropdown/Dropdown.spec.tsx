import { render } from "@testing-library/react-native";
import React from "react";

import { NewDropdown } from "../../../src/components";

it("render a basic NewDropdown", () => {
  const mockFn = jest.fn();
  render(<NewDropdown handleChange={mockFn} items={[{ label: "Test Item", value: "Test Item" }]} value="" />);
});

it("render a NewDropdown with placeholder", () => {
  const mockFn = jest.fn();
  render(
    <NewDropdown handleChange={mockFn} items={[{ label: "Test Item", value: "Test Item" }]} placeholder="Test Placeholder" value="" />,
  );
});

it("render a disabled NewDropdown", () => {
  const mockFn = jest.fn();
  render(<NewDropdown disabled={true} handleChange={mockFn} items={[{ label: "Test Item", value: "Test Item" }]} value="" />);
});

it("render a NewDropdown with error", () => {
  const mockFn = jest.fn();
  render(<NewDropdown error="Test Error" handleChange={mockFn} items={[{ label: "Test Item", value: "Test Item" }]} value="" />);
});

it("render a NewDropdown with label", () => {
  const mockFn = jest.fn();
  render(<NewDropdown handleChange={mockFn} items={[{ label: "Test Item", value: "Test Item" }]} label="Test Label" value="" />);
});

it("render a NewDropdown with label and labelStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(
    <NewDropdown
      handleChange={mockFn}
      items={[{ label: "Test Item", value: "Test Item" }]}
      label="Test Label"
      labelStyle={{ color: testColor }}
      value=""
    />,
  );
});

it("render a NewDropdown with style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(
    <NewDropdown
      handleChange={mockFn}
      items={[{ label: "Test Item", value: "Test Item" }]}
      style={{ backgroundColor: testColor }}
      value=""
    />,
  );
});

it("render a NewDropdown with viewStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(
    <NewDropdown
      handleChange={mockFn}
      items={[{ label: "Test Item", value: "Test Item" }]}
      value=""
      viewStyle={{ backgroundColor: testColor }}
    />,
  );
});

it("render a NewDropdown with spaceToLabel", () => {
  const mockFn = jest.fn();
  render(<NewDropdown handleChange={mockFn} items={[{ label: "Test Item", value: "Test Item" }]} spaceToLabel={4} value="" />);
});

it("render a NewDropdown with spaceToTop", () => {
  const mockFn = jest.fn();
  render(<NewDropdown handleChange={mockFn} items={[{ label: "Test Item", value: "Test Item" }]} spaceToTop={4} value="" />);
});

it("render a NewDropdown with keyboardAvoidingRef", () => {
  const mockFn = jest.fn();
  const mockRef = jest.fn();
  render(<NewDropdown handleChange={mockFn} items={[{ label: "Test Item", value: "Test Item" }]} keyboardAvoidingRef={mockRef} value="" />);
});
