import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  border,
  centerHV,
  colorBlack,
  colorRed,
  colorTransparent,
  colorWhite,
  fs16SemiBoldWhite1,
  fsCapitalize,
  sh48,
  sw1,
  sw240,
} from "../../styles";

export interface CustomButtonProps {
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  onPress: () => void;
  secondary?: boolean;
  text: string;
  textStyle?: TextStyle;
}

export const CustomButton: FunctionComponent<CustomButtonProps> = ({
  buttonStyle,
  disabled,
  onPress,
  secondary,
  text,
  textStyle,
}: CustomButtonProps) => {
  const defaultButtonStyle: ViewStyle = {
    ...border(colorRed._1, sw1),
    ...centerHV,
    backgroundColor: secondary ? colorTransparent : colorRed._1,
    height: sh48,
    opacity: disabled === true ? 0.5 : 1,
    width: sw240,
    ...buttonStyle,
  };
  const textColor = secondary ? { color: colorBlack._2 } : { color: colorWhite._1 };

  return (
    <TouchableWithoutFeedback onPress={disabled === true ? undefined : onPress}>
      <View style={defaultButtonStyle}>
        <Text style={{ ...fs16SemiBoldWhite1, ...fsCapitalize, ...textColor, ...textStyle }}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
