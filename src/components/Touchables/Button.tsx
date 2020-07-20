import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  border,
  colorBlack,
  colorRed,
  colorTransparent,
  colorWhite,
  flexRowCC,
  fs16SemiBoldWhite1,
  fsCapitalize,
  sh16,
  sh48,
  sw2,
  sw240,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface CustomButtonProps {
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  icon?: string;
  iconColor?: string;
  onPress: () => void;
  secondary?: boolean;
  text: string;
  textStyle?: TextStyle;
}

export const CustomButton: FunctionComponent<CustomButtonProps> = ({
  buttonStyle,
  disabled,
  icon,
  iconColor,
  onPress,
  secondary,
  text,
  textStyle,
}: CustomButtonProps) => {
  const defaultButtonStyle: ViewStyle = {
    ...border(colorRed._1, sw2),
    ...flexRowCC,
    backgroundColor: secondary ? colorTransparent : colorRed._1,
    height: sh48,
    opacity: disabled === true ? 0.5 : 1,
    width: sw240,
    ...buttonStyle,
  };

  const defaultIconColor = iconColor !== undefined ? iconColor : colorWhite._1;
  const textColor = secondary ? colorBlack._2 : colorWhite._1;

  return (
    <TouchableWithoutFeedback onPress={disabled === true ? undefined : onPress}>
      <View style={defaultButtonStyle}>
        {icon === undefined ? null : (
          <Fragment>
            <IcoMoon color={defaultIconColor} name={icon} size={sh16} />
            <CustomSpacer isHorizontal={true} space={sw8} />
          </Fragment>
        )}
        <Text style={{ ...fs16SemiBoldWhite1, ...fsCapitalize, color: textColor, ...textStyle }}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
