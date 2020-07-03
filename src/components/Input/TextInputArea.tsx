import React, { FunctionComponent, useEffect, useState } from "react";
import { Keyboard, TextInput, TextStyle, View, ViewStyle } from "react-native";

import { colorBlack, colorTransparent, colorWhite, sh05, sh133, sh135, sw1, sw20, sw326, sw348, sw350 } from "../../styles";
import { CustomTextInput, ITextInputProps } from "./Input";

export interface TextInputAreaProps extends ITextInputProps {
  style?: TextStyle;
}

export const TextInputArea: FunctionComponent<TextInputAreaProps> = (props: TextInputAreaProps) => {
  const [textAreaRef, setTextAreaRef] = useState<TextInput | null>(null);
  const [textInputDummy, setTextInputDummy] = useState<TextInput | null>(null);
  const [multilineFocus, setMultilineFocus] = useState(false);

  const handleMultilineFocus = () => {
    if (textInputDummy !== null) {
      if (multilineFocus === false) {
        textInputDummy.focus();
        setMultilineFocus(true);
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

  const defaultStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderColor: colorBlack._2,
    borderRadius: sw20,
    borderWidth: sw1,
    height: sh135,
    width: sw350,
  };

  const defaultInputStyle: ViewStyle = { borderWidth: 0, height: sh133, width: sw348 };
  const dummyInputStyle: ViewStyle = { borderWidth: 0, backgroundColor: colorTransparent, height: sh05 };

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);
    return () => {
      Keyboard.removeListener("keyboardDidHide", () => {});
    };
  }, []);

  return (
    <View style={defaultStyle}>
      <CustomTextInput
        multiline={true}
        onFocus={handleMultilineFocus}
        setRef={setTextAreaRef}
        style={{ height: sh135, width: sw326 }}
        textAlignVertical="top"
        viewStyle={defaultInputStyle}
        {...props}
      />
      <CustomTextInput
        onFocus={handleDummyInputFocus}
        setRef={setTextInputDummy}
        style={{ height: sh05 }}
        selectionColor={colorTransparent}
        viewStyle={dummyInputStyle}
      />
    </View>
  );
};
