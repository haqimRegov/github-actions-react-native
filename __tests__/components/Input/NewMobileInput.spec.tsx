import { render } from "@testing-library/react-native";
import React from "react";

import { NewMobileInput } from "../../../src/components";
import { DICTIONARY_MOBILE_CODE } from "../../../src/data/dictionary";

const mockData = {
  code: DICTIONARY_MOBILE_CODE[0].value,
  id: DICTIONARY_MOBILE_CODE[0].id,
  label: "Mobile Number",
  value: "",
};

it("render basic NewMobileInput", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} />);
});

it("render a disabled NewMobileInput", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} disabled={true} />);
});

it("render a NewMobileInput with error", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} error="Test Error" />);
});

it("render a NewMobileInput with inputPrefix", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} inputPrefix="Test Prefix" />);
});

it("render a NewMobileInput with label", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} label="Test Label" />);
});

it("render a NewMobileInput with label and labelStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} label="Test Label" labelStyle={{ color: testColor }} />);
});

it("render a NewMobileInput with leftIcon", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} leftIcon="calendar" />);
});

it("render a NewMobileInput with noBorder", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} noBorder={true} />);
});

it("render a NewMobileInput with containerStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} containerStyle={{ backgroundColor: testColor }} />);
});

it("render a NewMobileInput with clearAll", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} clearAll={true} />);
});

it("render a NewMobileInput with onPressLabel", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} onPressLabel={anotherMockFn} />);
});

it("render a NewMobileInput with prefixStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} prefixStyle={{ color: testColor }} />);
});

it("render a NewMobileInput with rightIcon", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} rightIcon={{ color: testColor, name: "calendar" }} />);
});

it("render a NewMobileInput with setRef", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} setRef={anotherMockFn} />);
});

it("render a NewMobileInput with spaceToBottom", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} spaceToBottom={4} />);
});

it("render a NewMobileInput with spaceToLabel", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} spaceToLabel={4} />);
});

it("render a NewMobileInput with spaceToTop", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} spaceToTop={4} />);
});

it("render a NewMobileInput with style", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} style={{ backgroundColor: testColor }} />);
});

it("render a NewMobileInput with testID", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} testID="test" />);
});

it("render a NewMobileInput with viewStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} viewStyle={{ backgroundColor: testColor }} />);
});

it("render a NewMobileInput with keyboardAvoidingRef", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} keyboardAvoidingRef={anotherMockFn} />);
});

it("render a NewMobileInput with withSearch", () => {
  const mockFn = jest.fn();
  render(<NewMobileInput data={mockData} handleContactNumber={mockFn} withSearch={true} />);
});
