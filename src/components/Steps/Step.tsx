import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { centerHV, circleBorder, colorBlack, colorRed, colorWhite, fs12BoldWhite1, fs12RegBlack2, sw1, sw24 } from "../../styles";

interface StepProps {
  active: boolean;
  step: string;
  visited: boolean;
}

export const Step = ({ active, step, visited }: StepProps) => {
  const stepBGColor = active ? colorRed._1 : colorWhite._1;
  const stepBorderColor = active || !visited ? colorRed._1 : colorBlack._2;
  const stepColor: ViewStyle = circleBorder(sw24, sw1, stepBorderColor, stepBGColor);

  const activeLabelStyle: TextStyle = active ? { ...fs12BoldWhite1, color: colorWhite._1 } : {};

  return (
    <View style={{ ...stepColor, ...centerHV }}>
      <Text style={{ ...fs12RegBlack2, ...activeLabelStyle }}>{step}</Text>
    </View>
  );
};
