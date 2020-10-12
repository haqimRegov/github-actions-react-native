import React, { ReactNode } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View } from "react-native";

import {
  centerVertical,
  circle,
  circleBorder,
  colorBlue,
  colorRed,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  sw1,
  sw12,
  sw14,
  sw16,
  sw4,
  sw48,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface RadioButtonProps {
  label: string;
  labelStyle?: TextStyle;
  right?: ReactNode;
  selected: boolean;
  setSelected: () => void;
}

export const RadioButton = ({ label, labelStyle, right, selected, setSelected }: RadioButtonProps) => {
  const borderColor = selected ? colorRed._1 : colorBlue._3_8;
  const borderWidth = selected ? sw4 : sw1;
  const circleSize = selected ? sw8 : sw14;

  return (
    <TouchableWithoutFeedback onPress={setSelected}>
      <View style={{ ...centerVertical, ...flexRow }}>
        <View style={circleBorder(sw16, borderWidth, borderColor, colorWhite._1)}>
          <View style={circle(circleSize)} />
        </View>
        <CustomSpacer space={sw12} isHorizontal={true} />
        <Text style={{ ...fs12BoldBlack2, minWidth: sw48, ...labelStyle }}>{label}</Text>
        {right}
      </View>
    </TouchableWithoutFeedback>
  );
};
