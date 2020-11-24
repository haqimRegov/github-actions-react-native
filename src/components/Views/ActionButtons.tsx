import React, { Fragment } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { flexRow, sw16 } from "../../styles";
import { RoundedButton } from "../Touchables/RoundedButton";
import { CustomSpacer } from "./Spacer";

const { ACTION_BUTTONS } = Language.PAGE;

export interface ActionButtonsProps {
  buttonContainerStyle?: ViewStyle;
  cancelButtonStyle?: ViewStyle;
  cancelDisabled?: boolean;
  cancelTextStyle?: TextStyle;
  continueButtonStyle?: ViewStyle;
  continueDisabled?: boolean;
  continueTextStyle?: TextStyle;
  handleCancel?: () => void;
  handleContinue?: () => void;
  labelCancel?: string;
  labelContinue?: string;
}

export const ActionButtons = ({
  buttonContainerStyle,
  cancelButtonStyle,
  cancelDisabled,
  cancelTextStyle,
  continueButtonStyle,
  continueDisabled,
  continueTextStyle,
  handleCancel,
  handleContinue,
  labelCancel,
  labelContinue,
}: ActionButtonsProps) => {
  const buttonCancel = labelCancel !== undefined ? labelCancel : ACTION_BUTTONS.BUTTON_CANCEL;
  const buttonContinue = labelContinue !== undefined ? labelContinue : ACTION_BUTTONS.BUTTON_CONTINUE;

  return (
    <View style={{ ...flexRow, ...buttonContainerStyle }}>
      {handleCancel !== undefined ? (
        <RoundedButton
          buttonStyle={cancelButtonStyle}
          disabled={cancelDisabled}
          onPress={handleCancel}
          secondary={true}
          text={buttonCancel}
          textStyle={cancelTextStyle}
        />
      ) : null}
      {handleContinue !== undefined ? (
        <Fragment>
          <CustomSpacer isHorizontal={true} space={sw16} />
          <RoundedButton
            buttonStyle={continueButtonStyle}
            disabled={continueDisabled}
            onPress={handleContinue}
            text={buttonContinue}
            textStyle={continueTextStyle}
          />
        </Fragment>
      ) : null}
    </View>
  );
};
