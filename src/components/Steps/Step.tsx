import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { centerHV, circleBorder, colorBlack, colorBlue, colorWhite, fs12SemiBoldBlack2, sw1, sw24 } from "../../styles";

interface StepProps {
  active: boolean;
  step: string;
  visited: boolean;
}

export const Step = ({ active, step, visited }: StepProps) => {
  const stepBGColor = active ? colorBlue._1 : colorWhite._1;
  const stepBorderColor = active || !visited ? colorBlue._1 : colorBlack._2;
  const stepColor: ViewStyle = circleBorder(sw24, sw1, stepBorderColor, stepBGColor);

  const stepOpacity = active || !visited ? { opacity: 1 } : { opacity: 0.5 };

  const container: ViewStyle = { ...stepOpacity, ...stepColor, ...centerHV };

  const labelColor: TextStyle = active ? { color: colorWhite._1 } : {};
  const textStyle: TextStyle = { ...fs12SemiBoldBlack2, ...labelColor, ...stepOpacity };

  return (
    <View style={container}>
      <Text style={textStyle}>{step}</Text>
    </View>
  );
};
