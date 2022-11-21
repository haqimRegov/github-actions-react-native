import { render } from "@testing-library/react-native";
import React from "react";

import { LocalAssets } from "../../../src/assets/images/LocalAssets";
import { Avatar } from "../../../src/components";

it("render Avatar with type agent", () => {
  render(<Avatar text="AC" type="agent" />);
});

it("render Avatar with type branch", () => {
  render(<Avatar text="AC" type="branch" />);
});

it("render Avatar with type system", () => {
  render(<Avatar text="AC" type="system" />);
});

it("render Avatar with type hq", () => {
  render(<Avatar text="AC" type="hq" />);
});

it("render Avatar with type client", () => {
  render(<Avatar text="AC" type="client" />);
});

it("render Avatar with type custom", () => {
  render(<Avatar text="AC" type="custom" />);
});

it("render Avatar with textStyle", () => {
  const testColor = "#fff";
  render(<Avatar text="AC" textStyle={{ color: testColor }} type="client" />);
});

it("render Avatar with size", () => {
  render(<Avatar size={24} text="AC" type="client" />);
});

it("render Avatar with color", () => {
  const testColor = "#fff";
  render(<Avatar color={testColor} text="AC" type="client" />);
});

it("render Avatar with image", () => {
  render(<Avatar image={LocalAssets.logo.kenangaBrand} text="AC" type="client" />);
});
