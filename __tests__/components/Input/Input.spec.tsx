import { render } from "@testing-library/react-native";
import React from "react";

import { CustomTextInput } from "../../../src/components";

it("render basic CustomTextInput", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} />);
});

it("render a disabled CustomTextInput", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} disabled={true} />);
});

it("render a CustomTextInput with error", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} error="Test Error" />);
});

it("render a CustomTextInput with inputPrefix", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} inputPrefix="Test Prefix" />);
});

it("render a CustomTextInput with label", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} label="Test Label" />);
});

it("render a CustomTextInput with label and labelStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} label="Test Label" labelStyle={{ color: testColor }} />);
});

it("render a CustomTextInput with leftIcon", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} leftIcon="calendar" />);
});

it("render a CustomTextInput with noBorder", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} noBorder={true} />);
});

it("render a CustomTextInput with containerStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} containerStyle={{ backgroundColor: testColor }} />);
});

it("render a CustomTextInput with clearAll", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} clearAll={true} value="Test" />);
});

it("render a CustomTextInput with onPressLabel", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} onPressLabel={anotherMockFn} />);
});

it("render a CustomTextInput with prefixStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} prefixStyle={{ color: testColor }} />);
});

it("render a CustomTextInput with rightIcon", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} rightIcon={{ color: testColor, name: "calendar" }} />);
});

it("render a CustomTextInput with setRef", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} setRef={anotherMockFn} />);
});

it("render a CustomTextInput with spaceToBottom", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} spaceToBottom={4} />);
});

it("render a CustomTextInput with spaceToLabel", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} spaceToLabel={4} />);
});

it("render a CustomTextInput with spaceToTop", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} spaceToTop={4} />);
});

it("render a CustomTextInput with style", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} style={{ backgroundColor: testColor }} />);
});

it("render a CustomTextInput with testID", () => {
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} testID="test" />);
});

it("render a CustomTextInput with viewStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} viewStyle={{ backgroundColor: testColor }} />);
});

it("render a CustomTextInput for password", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  render(<CustomTextInput onChangeText={mockFn} rightIcon={{ name: "eye-hide", onPress: anotherMockFn }} />);
});
