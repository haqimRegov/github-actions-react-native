import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { centerVertical, colorBlack, flexRow, fs12RegBlack2, fsAlignCenter, sh18, sw10, sw18, sw2 } from "../../styles";
import { CustomSpacer } from "../Views";

interface CheckBoxProps {
  label: string;
  onPress?: () => void;
  spaceToLabel?: number;
  style?: TextStyle;
  toggle: boolean;
}

export const CheckBox = ({ onPress, spaceToLabel, style, label, toggle }: CheckBoxProps) => {
  const labelStyle: TextStyle = { ...fs12RegBlack2, ...fsAlignCenter, ...style };
  // TODO proper design for toggle
  const toggleStyle: ViewStyle = toggle ? { ...flexRow, ...centerVertical } : { ...flexRow, ...centerVertical };
  const defaultSpace = spaceToLabel !== undefined ? spaceToLabel : sw10;

  return (
    <View style={toggleStyle}>
      <View style={{ borderWidth: sw2, borderColor: colorBlack._2, borderRadius: sw2, height: sh18, width: sw18 }} />
      <CustomSpacer isHorizontal={true} space={defaultSpace} />
      <Text onPress={onPress} style={labelStyle}>
        {label}
      </Text>
    </View>
  );
};
