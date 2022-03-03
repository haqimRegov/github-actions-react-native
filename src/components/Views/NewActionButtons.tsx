import React, { Fragment, FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { flexRow, sw16 } from "../../styles";
import { RoundedButton, RoundedButtonProps } from "../Touchables/RoundedButton";
import { CustomSpacer } from "./Spacer";

const { ACTION_BUTTONS } = Language.PAGE;

export interface NewActionButtonProps extends Omit<RoundedButtonProps, "text"> {
  text?: string;
}

export interface NewActionButtonsProps {
  buttonContainerStyle?: ViewStyle;
  primary?: NewActionButtonProps;
  secondary?: NewActionButtonProps;
}

export const NewActionButtons: FunctionComponent<NewActionButtonsProps> = ({
  buttonContainerStyle,
  primary,
  secondary,
}: NewActionButtonsProps) => {
  return (
    <View style={{ ...flexRow, ...buttonContainerStyle }}>
      {secondary !== undefined ? (
        <Fragment>
          <RoundedButton secondary={true} {...secondary} text={secondary.text || ACTION_BUTTONS.BUTTON_CANCEL} />
          <CustomSpacer isHorizontal={true} space={sw16} />
        </Fragment>
      ) : null}
      {primary !== undefined ? <RoundedButton {...primary} text={primary.text || ACTION_BUTTONS.BUTTON_CONTINUE} /> : null}
    </View>
  );
};
