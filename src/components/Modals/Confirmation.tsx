import React from "react";
import { KeyboardAvoidingView, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";

import {
  centerHV,
  colorGray,
  colorWhite,
  flexGrow,
  flexRowCC,
  fs24BoldBlack1,
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
import { ActionButtons, ActionButtonsProps, CustomSpacer } from "../Views";
import { BasicModal } from "./Basic";

interface ModalProps extends ActionButtonsProps {
  children: JSX.Element;
  spaceToButton?: number;
  spaceToContent?: number;
  title: string;
  titleStyle?: TextStyle;
  visible: boolean;
}

export const ConfirmationModal = ({ children, spaceToButton, spaceToContent, title, titleStyle, visible, ...rest }: ModalProps) => {
  const defaultSpaceToContent = spaceToContent === undefined ? sh32 : spaceToContent;
  const defaultSpaceToButton = spaceToButton === undefined ? sh56 : spaceToButton;

  const modalContainer: ViewStyle = {
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
  // TODO: fix KeyboardAvoidingView behavior, for now if number of TextInput become more it pushes top fields out of screen
  return (
    <BasicModal visible={visible}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
          <View style={{ ...centerHV, ...fullHW }}>
            <View style={modalContainer}>
              <View style={px(sw56)}>
                <CustomSpacer space={sh56} />
                <Text style={{ ...fs24BoldBlack1, ...titleStyle }}>{title}</Text>
                <CustomSpacer space={defaultSpaceToContent} />
                {children}
                <CustomSpacer space={defaultSpaceToButton} />
              </View>
              <ActionButtons {...actionButtonProps} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BasicModal>
  );
};
