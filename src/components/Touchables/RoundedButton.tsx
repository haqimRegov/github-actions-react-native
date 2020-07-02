import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { sw100 } from "../../styles";
import { CustomButton, CustomButtonProps } from "./Button";

export interface RoundedButtonProps extends CustomButtonProps {
  radius?: number;
}

export const RoundedButton: FunctionComponent<RoundedButtonProps> = (props: RoundedButtonProps) => {
  const defaultBorderRadius = props.radius !== undefined ? { borderRadius: props.radius } : { borderRadius: sw100 };

  const roundedButtonStyle: ViewStyle = {
    ...defaultBorderRadius,
    ...props.buttonStyle,
  };
  const defaultProps = {
    ...props,
    buttonStyle: roundedButtonStyle,
  };

  return <CustomButton {...defaultProps} />;
};
