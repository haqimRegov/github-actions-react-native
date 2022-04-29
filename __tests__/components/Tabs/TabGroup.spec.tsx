import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { TabGroup } from "../../../src/components";

it("render TabGroup", () => {
  const mockFn = jest.fn();
  render(<TabGroup activeTab={0} setActiveTab={mockFn} tabs={[{ text: "Test Tab 1" }, { text: "Test Tab 2" }]} />);
});

it("test TabGroup with press", () => {
  const mockFn = jest.fn();
  const { getByText } = render(<TabGroup activeTab={0} setActiveTab={mockFn} tabs={[{ text: "Test Tab 1" }, { text: "Test Tab 2" }]} />);

  fireEvent.press(getByText("Test Tab 2"));
  expect(mockFn).toHaveBeenCalled();
});
