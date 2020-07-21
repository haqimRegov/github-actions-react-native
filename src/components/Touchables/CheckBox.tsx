import React, { Fragment } from "react";
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
  checkboxStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  onPress: () => void;
  spaceToLabel?: number;
  style?: ViewStyle;
  toggle: boolean;
}

export const CheckBox = ({ checkboxStyle, label, labelStyle, onPress, spaceToLabel, style, toggle }: CheckBoxProps) => {
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
      <View style={{ ...centerVertical, ...flexRow, ...style }}>
        <View style={checkboxStyle}>
          <View style={toggleStyle}>{toggle ? <IcoMoon color={colorWhite._1} name="check" size={sh12} /> : null}</View>
        </View>
        {label === undefined ? null : (
          <Fragment>
            <CustomSpacer isHorizontal={true} space={defaultSpace} />
            <Text onPress={onPress} style={{ ...fs12RegBlack2, lineHeight: sh24, ...labelStyle }}>
              {label}
            </Text>
          </Fragment>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
