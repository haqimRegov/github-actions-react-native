import React, { FunctionComponent } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { flexGrow } from "../../styles";
import { Prompt, PromptProps } from "../Views";
import { BasicModal } from "./Basic";

interface PromptModalProps extends PromptProps {
  animationIn?: TypeModalAnimation;
  animationInTiming?: number;
  animationOut?: TypeModalAnimation;
  animationOutTiming?: number;

  keyboardAvoidingRef?: (ref: KeyboardAvoidingView | null) => void;

  visible: boolean;
}

type TypeBehavior = "height" | "position" | "padding" | undefined;

export const PromptModal: FunctionComponent<PromptModalProps> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,

  keyboardAvoidingRef,
  visible,
  ...rest
}: PromptModalProps) => {
  // TODO: fix KeyboardAvoidingView behavior, for now if number of TextInput become more it pushes top fields out of screen
  const behavior: TypeBehavior = Platform.select({ ios: "padding" });

  return (
    <BasicModal
      animationIn={animationIn}
      animationInTiming={animationInTiming}
      animationOut={animationOut}
      animationOutTiming={animationOutTiming}
      visible={visible}>
      <KeyboardAvoidingView ref={keyboardAvoidingRef} behavior={behavior}>
        <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
          <Prompt {...rest} />
        </ScrollView>
      </KeyboardAvoidingView>
    </BasicModal>
  );
};
