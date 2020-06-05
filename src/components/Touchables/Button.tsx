import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { centerHV, colorBlue, fs14MedWhite, fsAlignCenter, fsCapitalize, px, sh48, sw100, sw40 } from "../../styles";

export interface CustomButtonProps {
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  onPress: () => void;
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
  text,
  textStyle,
}: CustomButtonProps) => {
  const defaultButtonStyle: ViewStyle = {
    ...centerHV,
    ...px(sw40),
    backgroundColor: colorBlue._1,
    height: sh48,
    opacity: disabled === true ? 0.5 : 1,
    ...buttonStyle,
  };

  const defaultTextStyle: TextStyle = { ...fs14MedWhite, ...fsAlignCenter, ...fsCapitalize, ...textStyle };

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
