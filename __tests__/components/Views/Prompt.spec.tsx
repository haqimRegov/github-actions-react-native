import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { Prompt } from "../../../src/components";

// children?: JSX.Element;
// illustration?: ImageSourcePropType;

it("render basic Prompt", () => {
  render(<Prompt />);
});

it("render basic Prompt with title", () => {
  render(<Prompt title="Test" />);
});

it("render basic Prompt with label", () => {
  render(<Prompt label="Test" />);
});

it("render basic Prompt with title and titleStyle", () => {
  const testColor = "#fff";
  render(<Prompt title="Test" titleStyle={{ color: testColor }} />);
});

it("render basic Prompt with label and labelStyle", () => {
  const testColor = "#fff";
  render(<Prompt label="Test" labelStyle={{ color: testColor }} />);
});

it("render basic Prompt with title, label", () => {
  render(<Prompt title="Test" label="Test" />);
});

it("render basic Prompt with title, label, spaceToTop", () => {
  render(<Prompt title="Test" label="Test" spaceToTop={8} />);
});

it("render basic Prompt with title, label, spaceToTitle", () => {
  render(<Prompt title="Test" label="Test" spaceToTitle={8} />);
});

it("render basic Prompt with title, label, closable, handleClose", () => {
  const mockFn = jest.fn();
  render(<Prompt title="Test" label="Test" closable={true} handleClose={mockFn} />);
});

it("render basic Prompt with title, label,  handleCancel, handleClose", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  render(<Prompt title="Test" label="Test" handleContinue={mockFn} handleCancel={mockCancel} />);
});

it("render basic Prompt with title, label,  handleCancel, handleClose, spaceToButton", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  render(<Prompt title="Test" label="Test" handleContinue={mockFn} handleCancel={mockCancel} spaceToButton={8} />);
});

it("render basic Prompt with title, label, handleCancel, handleClose, contentStyle", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  const testColor = "#fff";
  render(
    <Prompt title="Test" label="Test" handleContinue={mockFn} handleCancel={mockCancel} contentStyle={{ backgroundColor: testColor }} />,
  );
});

it("render basic Prompt with title, label, children, handleCancel, handleClose, contentStyle", () => {
  const mockFn = jest.fn();
  const mockCancel = jest.fn();
  const testColor = "#fff";
  render(
    <Prompt title="Test" label="Test" handleContinue={mockFn} handleCancel={mockCancel} contentStyle={{ backgroundColor: testColor }}>
      <Text>Test</Text>
    </Prompt>,
  );
});
