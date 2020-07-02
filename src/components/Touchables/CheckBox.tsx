import React from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerHV, centerVertical, colorBlack, colorBlue, colorWhite, flexRow, fs12RegBlack2, sh10, sw10, sw18, sw2 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface CheckBoxProps {
  label: string;
  onPress: () => void;
  spaceToLabel?: number;
  style?: TextStyle;
  toggle: boolean;
}

export const CheckBox = ({ onPress, spaceToLabel, style, label, toggle }: CheckBoxProps) => {
  const selectedStyle: ViewStyle = toggle ? { backgroundColor: colorBlue._1, borderColor: colorBlue._1 } : {};
  const toggleStyle: ViewStyle = {
    ...centerHV,
    borderColor: colorBlack._2,
    borderRadius: sw2,
    borderWidth: sw2,
    height: sw18,
    width: sw18,
    ...selectedStyle,
  };

  const defaultSpace = spaceToLabel !== undefined ? spaceToLabel : sw10;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ ...flexRow, ...centerVertical }}>
        <View style={toggleStyle}>{toggle ? <IcoMoon color={colorWhite._1} name="check" size={sh10} /> : null}</View>
        <CustomSpacer isHorizontal={true} space={defaultSpace} />
        <Text onPress={onPress} style={{ ...fs12RegBlack2, ...style }}>
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
