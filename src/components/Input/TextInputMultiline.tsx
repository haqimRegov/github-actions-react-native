import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, TextInput, View, ViewStyle } from "react-native";

import {
  colorGray,
  colorTransparent,
  flexChild,
  flexRow,
  fs12BoldGray6,
  fs12RegGray5,
  fullWidth,
  sh05,
  sh4,
  sh8,
  sh88,
  sh96,
  sw8,
} from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";
import { CustomTextInput, CustomTextInputProps } from "./Input";

export interface TextInputMultilineProps extends CustomTextInputProps {
  showLength?: boolean;
  style?: ViewStyle;
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
  viewStyle,
  ...rest
}: TextInputMultilineProps) => {
  const [textAreaRef, setTextAreaRef] = useState<TextInput | null>(null);
  const [textInputDummy, setTextInputDummy] = useState<TextInput | null>(null);
  const [multilineFocus, setMultilineFocus] = useState(false);

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
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);
    return () => {
      keyboardDidHide.remove();
    };
  }, []);

  const defaultLabelSpace = spaceToLabel === undefined ? sh4 : spaceToLabel;
  const defaultCharLength = rest.value !== undefined ? rest.value.length : 0;
  const charRemaining = showLength === true && rest.maxLength !== undefined ? `${defaultCharLength} / ${rest.maxLength}` : "";

  return (
    <View style={flexChild}>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label === undefined ? null : (
        <Fragment>
          <Text onPress={onPressLabel} style={{ ...fs12BoldGray6, ...labelStyle }} suppressHighlighting={true}>
            {label}
          </Text>
          <CustomSpacer space={defaultLabelSpace} />
        </Fragment>
      )}
      <CustomTextInput
        clearAll={false}
        containerStyle={{ ...fullWidth, ...viewStyle }}
        multiline={true}
        onFocus={handleMultilineFocus}
        placeholder={placeholder}
        selectionColor={colorGray._6}
        setRef={setTextAreaRef}
        style={{ height: sh88 }}
        underlineColorAndroid={colorTransparent}
        viewStyle={{ borderRadius: sw8, height: sh96, ...fullWidth, ...viewStyle }}
        {...rest}
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
        <View style={{ ...flexRow, ...fullWidth, ...viewStyle }}>
          <CustomFlexSpacer />
          <Text style={{ ...fs12RegGray5, paddingTop: sh8 }}>{charRemaining}</Text>
        </View>
      ) : null}
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </View>
  );
};
