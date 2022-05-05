import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { PromptModal } from "../../../src/components";

it("render basic PromptModal not visible", () => {
  render(
    <PromptModal visible={false}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

it("render basic PromptModal visible", () => {
  render(
    <PromptModal visible={true}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

it("render PromptModal backdropOpacity", () => {
  render(
    <PromptModal backdropOpacity={0.1} visible={true}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

it("render PromptModal children", () => {
  render(
    <PromptModal visible={true}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

it("render PromptModal animationInTiming", () => {
  render(
    <PromptModal animationInTiming={1000} visible={true}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

it("render PromptModal animationOutTiming", () => {
  render(
    <PromptModal animationOutTiming={1000} visible={true}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

it("render PromptModal animationIn", () => {
  render(
    <PromptModal animationIn="fadeOut" visible={true}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

it("render PromptModal animationOut", () => {
  render(
    <PromptModal animationOut="fadeIn" visible={true}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

it("render PromptModal isLoading", () => {
  render(
    <PromptModal isLoading={true} visible={true}>
      <Text>Test</Text>
    </PromptModal>,
  );
});

// keyboardAvoidingRef?: (ref: KeyboardAvoidingView | null) => void;
