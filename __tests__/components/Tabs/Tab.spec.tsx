import { render } from "@testing-library/react-native";
import React from "react";

import { Tab } from "../../../src/components";

it("render basic Tab", () => {
  render(<Tab text="Test Tab" />);
});

it("render Tab with onPress", () => {
  const mockFn = jest.fn();
  render(<Tab onPress={mockFn} text="Test Tab" />);
});

it("render Tab with textStyle", () => {
  const testColor = "#fff";
  render(<Tab text="Test Tab" textStyle={{ color: testColor }} />);
});

it("render Tab with style", () => {
  const testColor = "#fff";
  render(<Tab text="Test Tab" style={{ backgroundColor: testColor }} />);
});

it("render Tab with badgeCount", () => {
  const testColor = "#fff";
  render(<Tab badgeCount={2} text="Test Tab" textStyle={{ color: testColor }} />);
});

it("render Tab with badgeCount and spaceToRight", () => {
  const testColor = "#fff";
  render(<Tab badgeCount={2} spaceToRight={2} text="Test Tab" textStyle={{ color: testColor }} />);
});

it("render selected Tab without badgeCount", () => {
  render(<Tab text="Test Tab" selected={true} />);
});

it("render selected Tab with badgeCount", () => {
  render(<Tab badgeCount={2} text="Test Tab" selected={true} />);
});
