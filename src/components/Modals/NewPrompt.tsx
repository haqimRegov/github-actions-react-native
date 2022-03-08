import React, { FunctionComponent } from "react";
import { ActivityIndicator, KeyboardAvoidingView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { centerHV, colorWhite, flexChild, fullHW } from "../../styles";
import { NewPrompt, NewPromptProps } from "../Views/NewPrompt";
import { BasicModal } from "./Basic";

interface NewPromptModalProps extends NewPromptProps {
  animationIn?: TypeModalAnimation;
  animationInTiming?: number;
  animationOut?: TypeModalAnimation;
  animationOutTiming?: number;
  backdropOpacity?: number;
  isLoading?: boolean;
  keyboardAvoidingRef?: (ref: KeyboardAvoidingView | null) => void;
  visible: boolean;
}

export const NewPromptModal: FunctionComponent<NewPromptModalProps> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  backdropOpacity,
  isLoading,
  visible,
  ...rest
}: NewPromptModalProps) => {
  return (
    <BasicModal
      animationIn={animationIn}
      animationInTiming={animationInTiming}
      animationOut={animationOut}
      animationOutTiming={animationOutTiming}
      backdropOpacity={backdropOpacity}
      visible={visible}>
      <KeyboardAwareScrollView bounces={false} contentContainerStyle={flexChild} scrollEnabled={false} keyboardShouldPersistTaps="handled">
        <View style={{ ...centerHV, ...fullHW }}>
          {isLoading === true ? <ActivityIndicator color={colorWhite._1} size="small" /> : <NewPrompt {...rest} />}
        </View>
      </KeyboardAwareScrollView>
    </BasicModal>
  );
};
