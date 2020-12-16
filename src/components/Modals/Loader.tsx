import React, { FunctionComponent } from "react";
import { ActivityIndicator, View } from "react-native";

import { centerHV, colorWhite, fullHeight } from "../../styles";
import { BasicModal } from "./Basic";

interface LoaderProps {
  animationIn?: TypeModalAnimation;
  animationInTiming?: number;
  animationOut?: TypeModalAnimation;
  animationOutTiming?: number;
  visible: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  visible,
}: LoaderProps) => {
  return (
    <BasicModal
      animationIn={animationIn || "fadeIn"}
      backdropOpacity={0.4}
      animationInTiming={animationInTiming}
      animationOut={animationOut || "fadeOut"}
      animationOutTiming={animationOutTiming}
      visible={visible}>
      <View style={{ ...fullHeight, ...centerHV }}>
        <ActivityIndicator color={colorWhite._1} size="small" />
      </View>
    </BasicModal>
  );
};
