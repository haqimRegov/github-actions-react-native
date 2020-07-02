import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  blueShadow,
  border,
  centerHV,
  colorBlack,
  colorBlue,
  colorTransparent,
  colorWhite,
  fs15BoldWhite,
  fsAlignCenter,
  fsCapitalize,
  sh48,
  sw1,
  sw240,
} from "../../styles";

export interface CustomButtonProps {
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  noShadow?: boolean;
  onPress: () => void;
  secondary?: boolean;
  text: string;
  textStyle?: TextStyle;
}

export const CustomButton: FunctionComponent<CustomButtonProps> = ({
  buttonStyle,
  disabled,
  noShadow,
  onPress,
  secondary,
  text,
  textStyle,
}: CustomButtonProps) => {
  const buttonShadow = noShadow === true || secondary === true ? {} : blueShadow;

  const defaultButtonStyle: ViewStyle = {
    ...border(colorBlue._1, sw1),
    ...buttonShadow,
    ...centerHV,
    backgroundColor: secondary ? colorTransparent : colorBlue._1,
    height: sh48,
    opacity: disabled === true ? 0.5 : 1,
    width: sw240,
    ...buttonStyle,
  };
  const textColor = secondary ? { color: colorBlack._4 } : { color: colorWhite._1 };
  const defaultTextStyle: TextStyle = { ...fs15BoldWhite, ...fsAlignCenter, ...fsCapitalize, ...textColor, ...textStyle };

  return (
    <TouchableWithoutFeedback onPress={disabled === true ? undefined : onPress}>
      <View style={defaultButtonStyle}>
        <Text style={defaultTextStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
