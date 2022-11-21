import React, { FunctionComponent } from "react";
import { ActivityIndicator, KeyboardAvoidingView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { EventPrompt, EventPromptProps } from "..";
import { centerHV, colorWhite, flexChild, fullHW } from "../../styles";
import { BasicModal } from "./Basic";

interface EventModalProps extends EventPromptProps {
  animationIn?: TypeModalAnimation;
  animationInTiming?: number;
  animationOut?: TypeModalAnimation;
  animationOutTiming?: number;
  backdropOpacity?: number;
  isLoading?: boolean;
  keyboardAvoidingRef?: (ref: KeyboardAvoidingView | null) => void;
  visible: boolean;
}

export const EventModal: FunctionComponent<EventModalProps> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  backdropOpacity,
  isLoading,
  visible,
  ...rest
}: EventModalProps) => {
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
          {isLoading === true ? <ActivityIndicator color={colorWhite._1} size="small" /> : <EventPrompt {...rest} />}
        </View>
      </KeyboardAwareScrollView>
    </BasicModal>
  );
};
