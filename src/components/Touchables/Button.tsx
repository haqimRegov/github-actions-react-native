import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  centerHV,
  colorBlue,
  fs14MedWhite,
  fsAlignCenter,
  fsCapitalize,
  px,
  sh48,
  sw100,
  sw40,
  border,
  colorWhite,
  fs14MedBlack,
  colorBlack,
  sw2,
} from "../../styles";

export interface CustomButtonProps {
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  onPress: () => void;
  secondary?: boolean;
  text: string;
  textStyle?: TextStyle;
}

export interface RoundedButtonProps extends CustomButtonProps {
  radius?: number;
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
    ...border(colorBlue._4, sw2),
    ...centerHV,
    ...px(sw40),
    backgroundColor: secondary ? colorWhite._1 : colorBlue._4,
    height: sh48,
    opacity: disabled === true ? 0.5 : 1,
    ...buttonStyle,
  };
  const textColor = secondary ? { color: colorBlack._1 } : { color: colorWhite._1 };
  const defaultTextStyle: TextStyle = { ...fs14MedWhite, ...fsAlignCenter, ...fsCapitalize, ...textColor, ...textStyle };

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
