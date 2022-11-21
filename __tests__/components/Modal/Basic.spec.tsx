import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { BasicModal } from "../../../src/components";

it("render basic Modal not visible", () => {
  render(
    <BasicModal visible={false}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render basic Modal visible", () => {
  render(
    <BasicModal visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal visible, style", () => {
  const testColor = "#fff";
  render(
    <BasicModal style={{ backgroundColor: testColor }} visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal backdropColor", () => {
  const testColor = "#fff";
  render(
    <BasicModal backdropColor={testColor} visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal no backdrop", () => {
  render(
    <BasicModal hasBackdrop={false} visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal backdropOpacity", () => {
  render(
    <BasicModal backdropOpacity={0.1} visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal children", () => {
  render(
    <BasicModal visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal animationInTiming", () => {
  render(
    <BasicModal animationInTiming={1000} visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal animationOutTiming", () => {
  render(
    <BasicModal animationOutTiming={1000} visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal animationIn", () => {
  render(
    <BasicModal animationIn="fadeOut" visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});

it("render Modal animationOut", () => {
  render(
    <BasicModal animationOut="fadeIn" visible={true}>
      <Text>Test</Text>
    </BasicModal>,
  );
});
