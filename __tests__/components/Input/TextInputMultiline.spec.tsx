import { render } from "@testing-library/react-native";
import React from "react";

import { TextInputMultiline } from "../../../src/components";

it("render basic TextInputMultiline", () => {
  render(<TextInputMultiline />);
});

it("render a disabled TextInputMultiline", () => {
  render(<TextInputMultiline disabled={true} />);
});

it("render a TextInputMultiline with error", () => {
  render(<TextInputMultiline error="Test Error" />);
});

it("render a TextInputMultiline with inputPrefix", () => {
  render(<TextInputMultiline inputPrefix="Test Prefix" />);
});

it("render a TextInputMultiline with label", () => {
  render(<TextInputMultiline label="Test Label" />);
});

it("render a TextInputMultiline with label and labelStyle", () => {
  const testColor = "#fff";
  render(<TextInputMultiline label="Test Label" labelStyle={{ color: testColor }} />);
});

it("render a TextInputMultiline with leftIcon", () => {
  render(<TextInputMultiline leftIcon="calendar" />);
});

it("render a TextInputMultiline with noBorder", () => {
  render(<TextInputMultiline noBorder={true} />);
});

it("render a TextInputMultiline with containerStyle", () => {
  const testColor = "#fff";
  render(<TextInputMultiline containerStyle={{ backgroundColor: testColor }} />);
});

it("render a TextInputMultiline with clearAll", () => {
  render(<TextInputMultiline clearAll={true} />);
});

it("render a TextInputMultiline with onPressLabel", () => {
  const mockFn = jest.fn();
  render(<TextInputMultiline onPressLabel={mockFn} />);
});

it("render a TextInputMultiline with prefixStyle", () => {
  const testColor = "#fff";
  render(<TextInputMultiline prefixStyle={{ color: testColor }} />);
});

it("render a TextInputMultiline with rightIcon", () => {
  const testColor = "#fff";
  render(<TextInputMultiline rightIcon={{ color: testColor, name: "calendar" }} />);
});

it("render a TextInputMultiline with setRef", () => {
  const mockFn = jest.fn();
  render(<TextInputMultiline setRef={mockFn} />);
});

it("render a TextInputMultiline with spaceToBottom", () => {
  render(<TextInputMultiline spaceToBottom={4} />);
});

it("render a TextInputMultiline with spaceToLabel", () => {
  render(<TextInputMultiline spaceToLabel={4} />);
});

it("render a TextInputMultiline with spaceToTop", () => {
  render(<TextInputMultiline spaceToTop={4} />);
});

it("render a TextInputMultiline with style", () => {
  const testColor = "#fff";
  render(<TextInputMultiline style={{ backgroundColor: testColor }} />);
});

it("render a TextInputMultiline with testID", () => {
  render(<TextInputMultiline testID="test" />);
});

it("render a TextInputMultiline with viewStyle", () => {
  const testColor = "#fff";
  render(<TextInputMultiline viewStyle={{ backgroundColor: testColor }} />);
});

it("render a TextInputMultiline with showLength", () => {
  render(<TextInputMultiline showLength={true} />);
});
