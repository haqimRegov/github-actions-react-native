import React from "react";
import { Text, View, ViewStyle } from "react-native";

import {
  centerHV,
  colorGray,
  colorWhite,
  flexRowCC,
  fs24BoldBlack1,
  px,
  sh16,
  sh56,
  sh64,
  sh96,
  sw10,
  sw218,
  sw5,
  sw56,
  sw565,
} from "../../styles";
import { ActionButtons, ActionButtonsProps, CustomSpacer } from "../Views";
import { BasicModal } from "./Basic";

interface ModalProps extends ActionButtonsProps {
  children: JSX.Element;
  spaceToButton?: number;
  spaceToContent?: number;
  title: string;
  visible: boolean;
}

export const ConfirmationModal = ({ children, spaceToButton, spaceToContent, title, visible, ...rest }: ModalProps) => {
  const defaultSpaceToContent = spaceToContent === undefined ? sh16 : spaceToContent;
  const defaultSpaceToButton = spaceToButton === undefined ? sh56 : spaceToButton;
  const modelContainer: ViewStyle = {
    backgroundColor: colorGray._5,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
  };

  const cancelButtonStyle: ViewStyle = { width: sw218 };
  const continueButtonStyle: ViewStyle = { width: sw218 };

  const actionButtonProps: ActionButtonsProps = {
    ...rest,
    buttonContainerStyle: buttonContainer,
    cancelButtonStyle: cancelButtonStyle,
    continueButtonStyle: continueButtonStyle,
  };

  return (
    <BasicModal visible={visible}>
      <View style={centerHV}>
        <View style={modelContainer}>
          <View style={px(sw56)}>
            <CustomSpacer space={sh64} />
            <Text style={fs24BoldBlack1}>{title}</Text>
            <CustomSpacer space={defaultSpaceToContent} />
            {children}
            <CustomSpacer space={defaultSpaceToButton} />
          </View>
          <ActionButtons {...actionButtonProps} />
        </View>
      </View>
    </BasicModal>
  );
};
