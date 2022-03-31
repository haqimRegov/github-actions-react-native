import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, circleBorder, colorGreen, colorRed, colorWhite, fs12BoldWhite1, fs12RegGray6, sh16, sw1, sw24 } from "../../styles";

interface StepProps {
  active: boolean;
  step: string;
  visited: boolean;
}

export const Step = ({ active, step, visited }: StepProps) => {
  const stepBGColor = active ? colorRed._1 : colorWhite._1;
  const stepColor: ViewStyle = circleBorder(sw24, sw1, colorRed._1, stepBGColor);

  const activeLabelStyle: TextStyle = active ? { ...fs12BoldWhite1, color: colorWhite._1 } : {};
  const visitedStepStyle: TextStyle = visited && !active ? { backgroundColor: colorGreen._1, borderColor: colorGreen._1 } : {};

  return (
    <View style={{ ...stepColor, ...centerHV, ...visitedStepStyle }}>
      {visited && !active ? (
        <IcoMoon name="success" color={colorWhite._1} size={sh16} />
      ) : (
        <Text style={{ ...fs12RegGray6, ...activeLabelStyle }}>{step}</Text>
      )}
    </View>
  );
};
