import React, { FunctionComponent, useEffect, useState } from "react";
import { Keyboard, TextInput, TextStyle, View, ViewStyle } from "react-native";

import { colorGray, colorTransparent, colorWhite, px, sh05, sh110, sh118, sh120, sw1, sw16, sw20, sw358, sw360 } from "../../styles";
import { CustomTextInput, ITextInputProps } from "./Input";

export interface TextInputAreaProps extends ITextInputProps {
  style?: TextStyle;
}

export const TextInputArea: FunctionComponent<TextInputAreaProps> = ({ style, ...rest }: TextInputAreaProps) => {
  const [textAreaRef, setTextAreaRef] = useState<TextInput | null>(null);
  const [textInputDummy, setTextInputDummy] = useState<TextInput | null>(null);
  const [multilineFocus, setMultilineFocus] = useState(false);

  const handleMultilineFocus = () => {
    if (textInputDummy !== null) {
      if (multilineFocus === false) {
        setTimeout(() => {
          textInputDummy.focus();
          setMultilineFocus(true);
        }, 300);
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
    borderColor: colorGray._7,
    borderRadius: sw20,
    borderWidth: sw1,
    height: sh120,
    width: sw360,
    ...style,
  };

  const defaultInputStyle: ViewStyle = { ...px(0), borderWidth: 0, height: sh118, width: sw358 };
  const dummyInputStyle: ViewStyle = { borderWidth: 0, backgroundColor: colorTransparent, height: sh05 };

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);
    return () => {
      Keyboard.removeListener("keyboardDidHide", handleKeyboardHide);
    };
  }, []);

  return (
    <View style={defaultStyle}>
      <CustomTextInput
        multiline={true}
        onFocus={handleMultilineFocus}
        setRef={setTextAreaRef}
        style={{ ...px(sw16), height: sh110, width: sw360 }}
        textAlignVertical="top"
        viewStyle={defaultInputStyle}
        {...rest}
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
