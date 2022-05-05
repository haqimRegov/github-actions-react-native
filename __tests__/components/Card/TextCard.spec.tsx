import { render } from "@testing-library/react-native";
import React from "react";

import { TextCard } from "../../../src/components";

it("render basic TextCard", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} />);
});

it("render TextCard with spaceBetweenGroup", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} spaceBetweenGroup={4} />);
});

it("render TextCard with spaceBetweenItem", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} spaceBetweenItem={4} />);
});

it("render TextCard with spaceToLabel", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} spaceToLabel={4} />);
});

it("render TextCard with direction row", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} direction="row" />);
});

it("render TextCard with direction column", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} direction="column" />);
});

it("render TextCard with  noLastIndexSpace", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} noLastIndexSpace={true} />);
});

it("render TextCard with itemStyle", () => {
  const testColor = "#fff";
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} itemStyle={{ backgroundColor: testColor }} />);
});

it("render TextCard with labelStyle", () => {
  const testColor = "#fff";
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} labelStyle={{ color: testColor }} />);
});

it("render TextCard with titleStyle", () => {
  const testColor = "#fff";
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} titleStyle={{ color: testColor }} />);
});

it("render TextCard with itemsPerGroup", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title" }]} itemsPerGroup={1} />);
});

it("render TextCard with item spaceToLabel", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title", spaceToLabel: 2 }]} />);
});

it("render TextCard with item iconSize", () => {
  render(<TextCard data={[{ label: "Test Label", title: "Test Title", iconSize: 12 }]} />);
});
