import { render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";

import { LinkText, LinkTextGroup } from "../../../src/components";

it("render basic LinkText", () => {
  const mockFn = jest.fn();
  render(<LinkText onPress={mockFn} text="Test Button" />);
});

it("render a LinkText with custom style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<LinkText onPress={mockFn} style={{ backgroundColor: testColor }} text="Test Button" />);
});

it("render a LinkText with text style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(<LinkText onPress={mockFn} text="Test Button" style={{ color: testColor }} />);
});

it("render a LinkText with withUnderline true", () => {
  const mockFn = jest.fn();
  render(<LinkText onPress={mockFn} text="Test Button" withUnderline={true} />);
});

it("render a LinkText with withUnderline false", () => {
  const mockFn = jest.fn();
  render(<LinkText onPress={mockFn} text="Test Button" withUnderline={false} />);
});

it("render a basic LinkTextGroup", () => {
  const mockFn = jest.fn();
  render(
    <LinkTextGroup
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
    />,
  );
});

it("render a LinkTextGroup with direction column", () => {
  const mockFn = jest.fn();
  render(
    <LinkTextGroup
      direction="column"
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
    />,
  );
});

it("render a LinkTextGroup with direction row", () => {
  const mockFn = jest.fn();
  render(
    <LinkTextGroup
      direction="row"
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
    />,
  );
});

it("render a LinkTextGroup with custom divider", () => {
  const mockFn = jest.fn();
  const testSize = 1;
  render(
    <LinkTextGroup
      divider={<View style={{ width: testSize, height: testSize }} />}
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
    />,
  );
});

it("render a LinkTextGroup with no divider", () => {
  const mockFn = jest.fn();
  render(
    <LinkTextGroup
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
      noDivider={true}
    />,
  );
});

it("render a LinkTextGroup with divider", () => {
  const mockFn = jest.fn();
  render(
    <LinkTextGroup
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
      noDivider={false}
    />,
  );
});

it("render a LinkTextGroup with spaceToDivider", () => {
  const mockFn = jest.fn();
  render(
    <LinkTextGroup
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
      spaceToDivider={4}
    />,
  );
});

it("render a LinkTextGroup with style", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(
    <LinkTextGroup
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
      style={{ backgroundColor: testColor }}
    />,
  );
});

it("render a LinkTextGroup with textStyle", () => {
  const mockFn = jest.fn();
  const testColor = "#fff";
  render(
    <LinkTextGroup
      links={[
        { onPress: mockFn, text: "Test Button" },
        { onPress: mockFn, text: "Test Button" },
      ]}
      textStyle={{ color: testColor }}
    />,
  );
});
