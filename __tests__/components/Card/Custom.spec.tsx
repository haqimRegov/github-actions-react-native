import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { CustomCard } from "../../../src/components";

it("render basic CustomCard", () => {
  render(<CustomCard items={[<Text>Test 1</Text>, <Text>Test 2</Text>]} />);
});

it("render CustomCard with spaceBetweenGroup", () => {
  render(<CustomCard items={[<Text>Test 1</Text>, <Text>Test 2</Text>]} spaceBetweenGroup={4} />);
});

it("render CustomCard with spaceBetweenItem", () => {
  render(<CustomCard items={[<Text>Test 1</Text>, <Text>Test 2</Text>]} spaceBetweenItem={4} />);
});

it("render CustomCard with direction row", () => {
  render(<CustomCard items={[<Text>Test 1</Text>, <Text>Test 2</Text>]} direction="row" />);
});

it("render CustomCard with direction column", () => {
  render(<CustomCard items={[<Text>Test 1</Text>, <Text>Test 2</Text>]} direction="column" />);
});

it("render CustomCard with noLastIndexSpace", () => {
  render(<CustomCard items={[<Text>Test 1</Text>, <Text>Test 2</Text>]} noLastIndexSpace={true} />);
});

it("render basic CustomCard with itemsPerGroup", () => {
  render(<CustomCard items={[<Text>Test 1</Text>, <Text>Test 2</Text>]} itemsPerGroup={1} />);
});
