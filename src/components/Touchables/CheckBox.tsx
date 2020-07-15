import React from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  colorBlue,
  colorRed,
  colorWhite,
  flexRow,
  fs12RegBlack2,
  sh12,
  sh24,
  sw1,
  sw10,
  sw16,
  sw4,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface CheckBoxProps {
  label: string;
  onPress: () => void;
  spaceToLabel?: number;
  style?: TextStyle;
  toggle: boolean;
}

export const CheckBox = ({ onPress, spaceToLabel, style, label, toggle }: CheckBoxProps) => {
  const selectedStyle: ViewStyle = toggle ? { backgroundColor: colorRed._1, borderColor: colorRed._1 } : {};
  const toggleStyle: ViewStyle = {
    ...centerHV,
    borderColor: colorBlue._2,
    borderRadius: sw4,
    borderWidth: sw1,
    height: sw16,
    width: sw16,
    ...selectedStyle,
  };

  const defaultSpace = spaceToLabel !== undefined ? spaceToLabel : sw10;

  // TODO fix Checkbox width taking the whole view

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ ...centerVertical, ...flexRow }}>
        <View style={toggleStyle}>{toggle ? <IcoMoon color={colorWhite._1} name="check" size={sh12} /> : null}</View>
        <CustomSpacer isHorizontal={true} space={defaultSpace} />
        <Text onPress={onPress} style={{ ...fs12RegBlack2, lineHeight: sh24, ...style }}>
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
