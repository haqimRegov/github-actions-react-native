import React from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { border, centerVertical, colorBlack, flexRow, fs12SemiBoldBlack2, px, sh16, sh32, sw1, sw10, sw156, sw20, sw5 } from "../../styles";
import { CustomSpacer } from "../Views";
import { OutlineButtonProps } from "./OutlineButton";

interface IconTextProps extends OutlineButtonProps {
  color?: string;
  name: string;
  position?: "left" | "right";
  spaceBetween?: number;
  size?: number;
}

export const IconText = ({ buttonStyle, color, disabled, name, onPress, position, size, spaceBetween, text, textStyle }: IconTextProps) => {
  const flexDirection: ViewStyle = position === "right" ? { flexDirection: "row-reverse" } : flexRow;

  const defaultButtonStyle: ViewStyle = {
    ...border(colorBlack._2, sw1, sw20),
    ...centerVertical,
    ...flexDirection,
    ...px(sw10),
    height: sh32,
    opacity: disabled === true ? 0.5 : 1,
    width: sw156,
    ...buttonStyle,
  };
  const textColor = color ? { color: color } : {};
  const defaultTextStyle: TextStyle = {
    ...fs12SemiBoldBlack2,
    ...textColor,
    ...textStyle,
  };

  const defaultSpaceBetween = spaceBetween !== undefined ? spaceBetween : sw5;
  const defaultSize = size !== undefined ? size : sh16;
  const defaultColor = color !== undefined ? color : colorBlack._2;
  return (
    <TouchableWithoutFeedback onPress={disabled === true ? undefined : onPress}>
      <View style={defaultButtonStyle}>
        <IcoMoon color={defaultColor} name={name} size={defaultSize} />
        <CustomSpacer isHorizontal={true} space={defaultSpaceBetween} />
        <Text style={defaultTextStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
