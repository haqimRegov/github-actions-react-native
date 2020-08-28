import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";

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
  sw234,
  sw40,
  sw5,
  sw56,
  sw565,
} from "../../styles";
import { ActionButtons, ActionButtonsProps } from "../Views/ActionButtons";
import { CustomSpacer } from "../Views/Spacer";
import { BasicModal } from "./Basic";

interface ModalProps extends ActionButtonsProps {
  children: JSX.Element;
  keyboardAvoidingRef?: (ref: KeyboardAvoidingView | null) => void;
  spaceToButton?: number;
  spaceToContent?: number;
  title: string;
  titleStyle?: TextStyle;
  visible: boolean;
}

type TypeBehavior = "height" | "position" | "padding" | undefined;

export const ConfirmationModal = ({
  children,
  keyboardAvoidingRef,
  spaceToButton,
  spaceToContent,
  title,
  titleStyle,
  visible,
  ...rest
}: ModalProps) => {
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

  const buttonStyle: ViewStyle = { width: sw234 };

  const actionButtonProps: ActionButtonsProps = {
    ...rest,
    buttonContainerStyle: buttonContainer,
    cancelButtonStyle: buttonStyle,
    continueButtonStyle: buttonStyle,
  };

  // TODO: fix KeyboardAvoidingView behavior, for now if number of TextInput become more it pushes top fields out of screen
  const behavior: TypeBehavior = Platform.select({ ios: "position" });

  return (
    <BasicModal visible={visible}>
      <KeyboardAvoidingView ref={keyboardAvoidingRef} behavior={behavior}>
        <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
          <View style={{ ...centerHV, ...fullHW }}>
            <View style={modalContainer}>
              <View style={px(sw40)}>
                <CustomSpacer space={sh32} />
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
