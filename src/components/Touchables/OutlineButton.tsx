import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { fs14RegBlack2, sh32, sw100 } from "../../styles";
import { RoundedButton, RoundedButtonProps } from "./RoundedButton";

export interface OutlineButtonProps extends RoundedButtonProps {
  color?: string;
}

export const OutlineButton: FunctionComponent<OutlineButtonProps> = ({ color, buttonStyle, textStyle, ...rest }: OutlineButtonProps) => {
  const roundedButtonStyle: ViewStyle = {
    backgroundColor: "transparent",
    borderRadius: sw100,
    height: sh32,
    borderColor: color,
    ...buttonStyle,
  };

  return <RoundedButton buttonStyle={roundedButtonStyle} textStyle={{ ...fs14RegBlack2, ...textStyle }} {...rest} />;
};
