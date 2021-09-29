import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, TextInput, View, ViewStyle } from "react-native";

import {
  colorBlack,
  colorTransparent,
  flexRow,
  fs12BoldBlack2,
  fs12SemiBoldGray8,
  sh05,
  sh24,
  sh8,
  sh80,
  sh88,
  sw02,
  sw360,
  sw8,
} from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";
import { CustomTextInput, CustomTextInputProps } from "./Input";

export interface TextInputMultilineProps extends CustomTextInputProps {
  showLength?: boolean;
  width?: number;
}

export const TextInputMultiline: FunctionComponent<TextInputMultilineProps> = ({
  label,
  labelStyle,
  onPressLabel,
  placeholder,
  showLength,
  spaceToBottom,
  spaceToLabel,
  spaceToTop,
  width,
  ...rest
}: TextInputMultilineProps) => {
  const [textAreaRef, setTextAreaRef] = useState<TextInput | null>(null);
  const [textInputDummy, setTextInputDummy] = useState<TextInput | null>(null);
  const [multilineFocus, setMultilineFocus] = useState(false);

  const inputWidth = width !== undefined ? width : sw360;

  const handleMultilineFocus = () => {
    if (textInputDummy !== null) {
      if (multilineFocus === false) {
        setTimeout(() => {
          textInputDummy.focus();
          if (multilineFocus === false) {
            setMultilineFocus(true);
          }
        }, 350);
      }
    }
  };

  const handleDummyInputFocus = () => {
    if (textAreaRef !== null) {
      textAreaRef.focus();
    }
  };

  const handleKeyboardHide = () => {
    setMultilineFocus(false);
  };

  const dummyInputStyle: ViewStyle = { borderWidth: 0, backgroundColor: colorTransparent, height: sh05 };

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);
    return () => {
      Keyboard.removeListener("keyboardDidHide", handleKeyboardHide);
    };
  }, []);

  const defaultLabelSpace = spaceToLabel === undefined ? 0 : spaceToLabel;
  const charRemaining = showLength === true && rest.maxLength !== undefined ? `${rest.value?.length}/${rest.maxLength}` : "";

  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <Text onPress={onPressLabel} style={{ ...fs12BoldBlack2, ...labelStyle }}>
            {label}
          </Text>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <CustomTextInput
        multiline={true}
        onFocus={handleMultilineFocus}
        placeholder={placeholder}
        selectionColor={colorBlack._2}
        setRef={setTextAreaRef}
        style={{ height: sh80, lineHeight: sh24, letterSpacing: sw02 }}
        underlineColorAndroid={colorTransparent}
        {...rest}
        viewStyle={{ borderRadius: sw8, height: sh88, width: inputWidth, ...rest.viewStyle }}
      />
      <CustomTextInput
        onFocus={handleDummyInputFocus}
        setRef={setTextInputDummy}
        style={{ height: sh05 }}
        selectionColor={colorTransparent}
        value=""
        viewStyle={dummyInputStyle}
      />
      {showLength === true && rest.maxLength !== undefined ? (
        <View style={{ ...flexRow, width: inputWidth }}>
          <CustomFlexSpacer />
          <Text style={{ ...fs12SemiBoldGray8, paddingTop: sh8 }}>{charRemaining}</Text>
        </View>
      ) : null}
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </View>
  );
};
