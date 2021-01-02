import { BlurView as RNBlurView } from "@react-native-community/blur";
import React, { FunctionComponent, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import { fullHW, sw8 } from "../../styles";

interface BlurViewProps {
  blurAmount?: number;
  children: ReactNode;
  visible: boolean;
}

export const BlurView: FunctionComponent<BlurViewProps> = ({ blurAmount, children, visible }: BlurViewProps) => {
  const blurStyle: ViewStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: sw8,
    ...fullHW,
  };

  return (
    <View>
      {children}
      {visible === true ? null : <RNBlurView style={blurStyle} blurAmount={blurAmount || 3} blurType="light" />}
    </View>
  );
};
