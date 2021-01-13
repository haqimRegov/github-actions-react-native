import React, { FunctionComponent, ReactNode } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

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
  selectedColor?: string;
  label: string;
  labelStyle?: TextStyle;
  radioStyle?: ViewStyle;
  right?: ReactNode;
  selected: boolean;
  setSelected: () => void;
}

export const RadioButton: FunctionComponent<RadioButtonProps> = ({
  label,
  labelStyle,
  radioStyle,
  right,
  selected,
  selectedColor,
  setSelected,
}: RadioButtonProps) => {
  const color = selectedColor !== undefined ? selectedColor : colorRed._1;
  const borderColor = selected ? color : colorBlue._3_8;
  const borderWidth = selected ? sw4 : sw1;
  const circleSize = selected ? sw8 : sw14;

  return (
    <TouchableWithoutFeedback onPress={setSelected}>
      <View style={{ ...centerVertical, ...flexRow }}>
        <View style={radioStyle}>
          <View style={circleBorder(sw16, borderWidth, borderColor, colorWhite._1)}>
            <View style={circle(circleSize)} />
          </View>
        </View>
        <CustomSpacer space={sw12} isHorizontal={true} />
        <Text style={{ ...fs12BoldBlack2, minWidth: sw48, ...labelStyle }}>{label}</Text>
        {right}
      </View>
    </TouchableWithoutFeedback>
  );
};
