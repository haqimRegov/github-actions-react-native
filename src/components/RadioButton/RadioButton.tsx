import React, { FunctionComponent, ReactNode } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold, NunitoRegular } from "../../constants";
import {
  centerVertical,
  circle,
  circleBorder,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  flexRow,
  fs16BoldBlack2,
  sw1,
  sw10,
  sw12,
  sw16,
  sw18,
  sw4,
  sw48,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface RadioButtonProps {
  disabled?: boolean;
  selectedColor?: string;
  label: string;
  labelStyle?: TextStyle;
  radioStyle?: ViewStyle;
  right?: ReactNode;
  selected: boolean;
  setSelected: () => void;
}

export const RadioButton: FunctionComponent<RadioButtonProps> = ({
  disabled,
  label,
  labelStyle,
  radioStyle,
  right,
  selected,
  selectedColor,
  setSelected,
}: RadioButtonProps) => {
  const color = selectedColor !== undefined ? selectedColor : colorRed._1;
  const borderColor = selected ? color : colorBlue._1;
  const borderWidth = selected ? sw4 : sw1;
  const circleSize = selected ? sw10 : sw16;
  const disabledColor: TextStyle = disabled === true && selected === false ? { backgroundColor: colorGray._4 } : {};
  const disabledStyle: ViewStyle = disabled === true ? { opacity: 0.6 } : {};
  const fontFamily = selected ? NunitoBold : NunitoRegular;

  const handlePress = () => {
    if (!disabled) {
      setSelected();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ ...centerVertical, ...flexRow, ...disabledStyle }}>
        <View style={{ ...radioStyle }}>
          <View style={circleBorder(sw18, borderWidth, borderColor, colorWhite._1)}>
            <View style={{ ...circle(circleSize), ...disabledColor }} />
          </View>
        </View>
        <CustomSpacer space={sw12} isHorizontal={true} />
        <Text style={{ ...fs16BoldBlack2, fontFamily: fontFamily, minWidth: sw48, ...labelStyle }}>{label}</Text>
        {right}
      </View>
    </TouchableWithoutFeedback>
  );
};
