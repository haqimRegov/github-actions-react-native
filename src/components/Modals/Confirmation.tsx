import React, { Fragment, FunctionComponent } from "react";
import { KeyboardAvoidingView, Text, TextStyle, View, ViewStyle } from "react-native";

import {
  centerHV,
  colorGray,
  colorWhite,
  flexRowCC,
  fs24BoldBlue1,
  fullHW,
  px,
  sh32,
  sh56,
  sh96,
  sw10,
  sw218,
  sw5,
  sw56,
  sw565,
} from "../../styles";
import { ActionButtons, ActionButtonsProps } from "../Views/ActionButtons";
import { CustomSpacer } from "../Views/Spacer";
import { BasicModal } from "./Basic";

interface ConfirmationModalProps extends ActionButtonsProps {
  children: JSX.Element;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  keyboardAvoidingRef?: (ref: KeyboardAvoidingView | null) => void;
  modalContainerStyle?: ViewStyle;
  spaceToButton?: number;
  spaceToContent?: number;
  spaceToTitle?: number;
  title?: string;
  titleStyle?: TextStyle;
  visible: boolean;
}

export const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = ({
  children,
  containerStyle,
  headerStyle,
  modalContainerStyle,
  spaceToButton,
  spaceToContent,
  spaceToTitle,
  title,
  titleStyle,
  visible,
  ...rest
}: ConfirmationModalProps) => {
  const defaultSpaceToContent = spaceToContent === undefined ? sh32 : spaceToContent;
  const defaultSpaceToButton = spaceToButton === undefined ? sh56 : spaceToButton;

  const modalContainer: ViewStyle = {
    backgroundColor: colorGray._1,
    borderRadius: sw5,
    width: sw565,
    ...modalContainerStyle,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
  };

  const buttonStyle: ViewStyle = { width: sw218 };

  const actionButtonProps: ActionButtonsProps = {
    ...rest,
    buttonContainerStyle: buttonContainer,
    cancelButtonStyle: buttonStyle,
    continueButtonStyle: buttonStyle,
  };

  const defaultSpaceToTitle = spaceToTitle !== undefined ? spaceToTitle : sh32;

  return (
    <BasicModal visible={visible}>
      <View style={{ ...centerHV, ...fullHW, ...containerStyle }}>
        <View style={modalContainer}>
          <View style={{ ...px(sw56), ...headerStyle }}>
            {title !== undefined ? (
              <Fragment>
                <CustomSpacer space={defaultSpaceToTitle} />
                <Text style={{ ...fs24BoldBlue1, ...titleStyle }}>{title}</Text>
              </Fragment>
            ) : null}
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
