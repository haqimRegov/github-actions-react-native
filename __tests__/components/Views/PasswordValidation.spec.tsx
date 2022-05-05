import { render } from "@testing-library/react-native";
import React from "react";

import { PasswordValidation } from "../../../src/components";

it("render basic PasswordValidation with empty string", () => {
  render(<PasswordValidation password="" />);
});

it("render basic PasswordValidation with valid password", () => {
  render(<PasswordValidation password="P@ssw0rd123!" />);
});

it("render basic PasswordValidation with only numbers", () => {
  render(<PasswordValidation password="123" />);
});

it("render basic PasswordValidation with only letters", () => {
  render(<PasswordValidation password="ABC" />);
});

it("render basic PasswordValidation with only symbols", () => {
  render(<PasswordValidation password="@@" />);
});

it("render basic PasswordValidation with only numbers and letters", () => {
  render(<PasswordValidation password="123ABC" />);
});

it("render basic PasswordValidation with only letters and symbol", () => {
  render(<PasswordValidation password="ABC@@" />);
});

it("render basic PasswordValidation with only numbers and symbols", () => {
  render(<PasswordValidation password="123@@" />);
});
