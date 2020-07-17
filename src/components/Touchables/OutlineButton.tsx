import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { colorBlack, flexChild, fs12RegBlack2, sh32, sw100 } from "../../styles";
import { RoundedButton, RoundedButtonProps } from "./RoundedButton";

export interface OutlineButtonProps extends RoundedButtonProps {
  color?: string;
}

export const OutlineButton: FunctionComponent<OutlineButtonProps> = ({ color, buttonStyle, textStyle, ...rest }: OutlineButtonProps) => {
  const defaultBorderColor: ViewStyle = color !== undefined ? { borderColor: color } : { borderColor: colorBlack._2 };

  const roundedButtonStyle: ViewStyle = {
    backgroundColor: "transparent",
    borderRadius: sw100,
    height: sh32,
    ...defaultBorderColor,
    ...flexChild,
    ...buttonStyle,
  };

  return <RoundedButton buttonStyle={roundedButtonStyle} iconColor={color} textStyle={{ ...fs12RegBlack2, ...textStyle }} {...rest} />;
};
