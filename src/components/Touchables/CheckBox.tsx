import React from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { centerVertical, colorBlack, colorBlue, flexRow, fs12RegBlack2, fsAlignCenter, sw10, sw18, sw2 } from "../../styles";
import { CustomSpacer } from "../Views";

export interface CheckBoxProps {
  label: string;
  onPress: () => void;
  spaceToLabel?: number;
  style?: TextStyle;
  toggle: boolean;
}

export const CheckBox = ({ onPress, spaceToLabel, style, label, toggle }: CheckBoxProps) => {
  const labelStyle: TextStyle = { ...fs12RegBlack2, ...fsAlignCenter, ...style };
  // TODO proper design for toggle
  const toggleStyle: ViewStyle = toggle
    ? { backgroundColor: colorBlue._1, borderWidth: sw2, borderColor: colorBlue._1, borderRadius: sw2, height: sw18, width: sw18 }
    : { borderWidth: sw2, borderColor: colorBlack._2, borderRadius: sw2, height: sw18, width: sw18 };
  const defaultSpace = spaceToLabel !== undefined ? spaceToLabel : sw10;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ ...flexRow, ...centerVertical }}>
        <View style={toggleStyle} />
        <CustomSpacer isHorizontal={true} space={defaultSpace} />
        <Text onPress={onPress} style={labelStyle}>
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
