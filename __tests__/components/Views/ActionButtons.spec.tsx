import { render } from "@testing-library/react-native";
import React from "react";

import { ActionButtons } from "../../../src/components";

it("render basic ActionButtons with Continue", () => {
  const mockFn = jest.fn();
  render(<ActionButtons handleContinue={mockFn} />);
});

it("render basic ActionButtons with Cancel", () => {
  const mockFn = jest.fn();
  render(<ActionButtons handleCancel={mockFn} />);
});

it("render ActionButtons with custom Continue label", () => {
  const mockFn = jest.fn();
  render(<ActionButtons handleContinue={mockFn} labelContinue="Test" />);
});

it("render basic ActionButtons with custom Cancel label", () => {
  const mockFn = jest.fn();
  render(<ActionButtons handleCancel={mockFn} labelCancel="Test" />);
});

it("render ActionButtons with Continue and Cancel", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  render(<ActionButtons handleContinue={mockFn} handleCancel={mockCancel} />);
});

it("render ActionButtons with Continue and Cancel and custom labels", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  render(<ActionButtons handleContinue={mockFn} handleCancel={mockCancel} labelCancel="Test" labelContinue="Test" />);
});

it("render ActionButtons with Continue and Cancel, text styles", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  const testColor = "#fff";
  render(
    <ActionButtons
      cancelTextStyle={{ color: testColor }}
      continueTextStyle={{ color: testColor }}
      handleContinue={mockFn}
      handleCancel={mockCancel}
    />,
  );
});

it("render ActionButtons with Continue and Cancel, buttons disabled", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  render(<ActionButtons cancelDisabled={true} continueDisabled={true} handleContinue={mockFn} handleCancel={mockCancel} />);
});

it("render ActionButtons with Continue and Cancel, custom button style", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  const testColor = "#fff";
  render(
    <ActionButtons
      cancelButtonStyle={{ backgroundColor: testColor }}
      continueButtonStyle={{ backgroundColor: testColor }}
      handleContinue={mockFn}
      handleCancel={mockCancel}
    />,
  );
});

it("render ActionButtons with Continue and Cancel, custom button container style", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  const testColor = "#fff";
  render(<ActionButtons buttonContainerStyle={{ backgroundColor: testColor }} handleContinue={mockFn} handleCancel={mockCancel} />);
});

it("render ActionButtons with Continue and Cancel, continue loading", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  const testColor = "#fff";
  render(
    <ActionButtons
      buttonContainerStyle={{ backgroundColor: testColor }}
      continueLoading={true}
      handleContinue={mockFn}
      handleCancel={mockCancel}
    />,
  );
});

it("render ActionButtons with Continue and Cancel, continue debounce", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  render(<ActionButtons continueDebounce={true} continueLoading={true} handleContinue={mockFn} handleCancel={mockCancel} />);
});
