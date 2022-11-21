import { render } from "@testing-library/react-native";
import React from "react";

import { AdvanceTextInputArea } from "../../../src/components";

it("render basic AdvanceTextInputArea", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} />);
});

it("render a disabled AdvanceTextInputArea", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} disabled={true} />);
});

it("render a AdvanceTextInputArea with error", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} error="Test Error" />);
});

it("render a AdvanceTextInputArea with inputPrefix", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} inputPrefix="Test Prefix" />);
});

it("render a AdvanceTextInputArea with label", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} label="Test Label" />);
});

it("render a AdvanceTextInputArea with label and labelStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(
    <AdvanceTextInputArea
      handleContinue={mockFn}
      handleSave={anotherMockFn}
      saved={true}
      label="Test Label"
      labelStyle={{ color: testColor }}
    />,
  );
});

it("render a AdvanceTextInputArea with leftIcon", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} leftIcon="calendar" />);
});

it("render a AdvanceTextInputArea with noBorder", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} noBorder={true} />);
});

it("render a AdvanceTextInputArea with containerStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(
    <AdvanceTextInputArea
      handleContinue={mockFn}
      handleSave={anotherMockFn}
      saved={true}
      containerStyle={{ backgroundColor: testColor }}
    />,
  );
});

it("render a AdvanceTextInputArea with clearAll", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} clearAll={true} />);
});

it("render a AdvanceTextInputArea with onPressLabel", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();
  const mockPress = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} onPressLabel={mockPress} />);
});

it("render a AdvanceTextInputArea with prefixStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} prefixStyle={{ color: testColor }} />);
});

it("render a AdvanceTextInputArea with rightIcon", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(
    <AdvanceTextInputArea
      handleContinue={mockFn}
      handleSave={anotherMockFn}
      saved={true}
      rightIcon={{ color: testColor, name: "calendar" }}
    />,
  );
});

it("render a AdvanceTextInputArea with setRef", () => {
  const mockRef = jest.fn();
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} setRef={mockRef} />);
});

it("render a AdvanceTextInputArea with spaceToBottom", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} spaceToBottom={4} />);
});

it("render a AdvanceTextInputArea with spaceToLabel", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} spaceToLabel={4} />);
});

it("render a AdvanceTextInputArea with spaceToTop", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} spaceToTop={4} />);
});

it("render a AdvanceTextInputArea with style", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} style={{ backgroundColor: testColor }} />);
});

it("render a AdvanceTextInputArea with testID", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} testID="test" />);
});

it("render a AdvanceTextInputArea with viewStyle", () => {
  const testColor = "#fff";
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(
    <AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} viewStyle={{ backgroundColor: testColor }} />,
  );
});

it("render a AdvanceTextInputArea with showLength", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={true} showLength={true} />);
});

it("render a AdvanceTextInputArea with loading", () => {
  const mockFn = jest.fn();
  const anotherMockFn = jest.fn();

  render(<AdvanceTextInputArea handleContinue={mockFn} handleSave={anotherMockFn} saved={false} />);
});
