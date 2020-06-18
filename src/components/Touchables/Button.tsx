import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  blueShadow,
  border,
  centerHV,
  colorBlack,
  colorBlue,
  colorWhite,
  fs15BoldWhite,
  fsAlignCenter,
  fsCapitalize,
  px,
  sh48,
  sw100,
  sw2,
  sw40,
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

export interface RoundedButtonProps extends CustomButtonProps {
  radius?: number;
}

export const CustomButton: FunctionComponent<CustomButtonProps> = ({
  secondary,
  buttonStyle,
  disabled,
  noShadow,
  onPress,
  secondary,
  text,
  textStyle,
}: CustomButtonProps) => {
  const buttonShadow = noShadow === true ? {} : blueShadow;

  const defaultButtonStyle: ViewStyle = {
    ...border(colorBlue._1, sw2),
    ...buttonShadow,
    ...centerHV,
    ...px(sw40),
    backgroundColor: secondary ? colorWhite._1 : colorBlue._1,
    height: sh48,
    opacity: disabled === true ? 0.5 : 1,
    ...buttonStyle,
  };
  const textColor = secondary ? { color: colorBlack._1 } : { color: colorWhite._1 };
  const defaultTextStyle: TextStyle = { ...fs15BoldWhite, ...fsAlignCenter, ...fsCapitalize, ...textColor, ...textStyle };

  return (
    <TouchableWithoutFeedback onPress={disabled === true ? undefined : onPress}>
      <View style={defaultButtonStyle}>
        <Text style={defaultTextStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const RoundedButton: FunctionComponent<RoundedButtonProps> = ({ buttonStyle, ...props }: CustomButtonProps) => {
  const roundedButtonStyle: ViewStyle = {
    borderRadius: sw100,
    ...buttonStyle,
  };

  return <CustomButton buttonStyle={roundedButtonStyle} {...props} />;
};
