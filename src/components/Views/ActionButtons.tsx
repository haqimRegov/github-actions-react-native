import React from "react";
import { View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { flexRow, sw16 } from "../../styles";
import { RoundedButton } from "../Touchables/RoundedButton";
import { CustomSpacer } from "./Spacer";

const { ACTION_BUTTONS } = Language.PAGE;

export interface ActionButtonsProps {
  buttonContainerStyle?: ViewStyle;
  cancelButtonStyle?: ViewStyle;
  continueButtonStyle?: ViewStyle;
  handleCancel: () => void;
  handleContinue: () => void;
  labelCancel?: string;
  labelContinue?: string;
}

export const ActionButtons = ({
  buttonContainerStyle,
  cancelButtonStyle,
  continueButtonStyle,
  handleCancel,
  handleContinue,
  labelCancel,
  labelContinue,
}: ActionButtonsProps) => {
  const buttonCancel = labelCancel !== undefined ? labelCancel : ACTION_BUTTONS.BUTTON_CANCEL;
  const buttonContinue = labelContinue !== undefined ? labelContinue : ACTION_BUTTONS.BUTTON_CONTINUE;

  return (
    <View style={{ ...flexRow, ...buttonContainerStyle }}>
      <RoundedButton buttonStyle={cancelButtonStyle} onPress={handleCancel} secondary={true} text={buttonCancel} />
      <CustomSpacer isHorizontal={true} space={sw16} />
      <RoundedButton buttonStyle={continueButtonStyle} onPress={handleContinue} text={buttonContinue} />
    </View>
  );
};
