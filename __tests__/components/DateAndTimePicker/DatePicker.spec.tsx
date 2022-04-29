import { render } from "@testing-library/react-native";
import React from "react";

import { NewDatePicker } from "../../../src/components";

// uttonStyle?: ViewStyle;
//   datePickerStyle?: ViewStyle;
//   initialDate?: Date;
//   keyboardAvoidingRef?: TypeKeyboardAvoidingView;
//   maximumDate?: Date;
//   minimumDate?: Date;
//   selectedFormat?: string;

it("render NewDatePicker with type date", () => {
  const mockFn = jest.fn();
  render(<NewDatePicker mode="date" setValue={mockFn} value={undefined} />);
});

it("render NewDatePicker with type time", () => {
  const mockFn = jest.fn();
  render(<NewDatePicker mode="time" setValue={mockFn} value={undefined} />);
});

it("render NewDatePicker with type date, disabled", () => {
  const mockFn = jest.fn();
  render(<NewDatePicker disabled={true} mode="time" setValue={mockFn} value={undefined} />);
});

it("render NewDatePicker with type date, error", () => {
  const mockFn = jest.fn();
  render(<NewDatePicker error="Test Error" mode="time" setValue={mockFn} value={undefined} />);
});

it("render NewDatePicker with type date, buttonText", () => {
  const mockFn = jest.fn();
  render(<NewDatePicker buttonText="Test" mode="time" setValue={mockFn} value={undefined} />);
});

it("render NewDatePicker with type date, placeholder", () => {
  const mockFn = jest.fn();
  render(<NewDatePicker placeholder="Test Placeholder" mode="time" setValue={mockFn} value={undefined} />);
});
