import React, { FunctionComponent } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { fs14RegularBlack6, sh32, sw100 } from "../../styles";
import { RoundedButton, RoundedButtonProps } from "./RoundedButton";

export interface OutlineButtonProps extends RoundedButtonProps {
  color?: string;
}

export const OutlineButton: FunctionComponent<OutlineButtonProps> = (props: OutlineButtonProps) => {
  const outlineColor = props.color !== undefined ? { borderColor: props.color } : {};
  const textColor = props.color !== undefined ? { color: props.color } : {};

  const defaultTextStyle: TextStyle = { ...fs14RegularBlack6, ...props.textStyle, ...textColor };
  const roundedButtonStyle: ViewStyle = {
    backgroundColor: "transparent",
    borderRadius: sw100,
    height: sh32,
    ...outlineColor,
    ...props.buttonStyle,
  };

  const defaultProps = {
    noShadow: true,
    textStyle: defaultTextStyle,
    ...props,
    buttonStyle: roundedButtonStyle,
  };

  return <RoundedButton {...defaultProps} />;
};
