import React, { FunctionComponent } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { centerHV, colorWhite, flexGrow, fullHW } from "../../styles";
import { Prompt, PromptProps } from "../Views";
import { BasicModal } from "./Basic";

interface PromptModalProps extends PromptProps {
  animationIn?: TypeModalAnimation;
  animationInTiming?: number;
  animationOut?: TypeModalAnimation;
  animationOutTiming?: number;
  backdropOpacity?: number;
  keyboardAvoidingRef?: (ref: KeyboardAvoidingView | null) => void;

  isLoading?: boolean;
  visible: boolean;
}

type TypeBehavior = "height" | "position" | "padding" | undefined;

export const PromptModal: FunctionComponent<PromptModalProps> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  backdropOpacity,
  keyboardAvoidingRef,
  isLoading,
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
      backdropOpacity={backdropOpacity}
      visible={visible}>
      <KeyboardAvoidingView ref={keyboardAvoidingRef} behavior={behavior}>
        <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
          <View style={{ ...centerHV, ...fullHW }}>
            {isLoading === true ? <ActivityIndicator color={colorWhite._1} size="small" /> : <Prompt {...rest} />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BasicModal>
  );
};
