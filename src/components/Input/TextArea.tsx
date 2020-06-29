import React, { FunctionComponent } from "react";
import { ViewStyle, TextStyle } from "react-native";

import { CustomTextInput, ITextInputProps } from "../../components";
import { sh135 } from "../../styles";

export interface textAreaProps extends ITextInputProps {
  style?: ViewStyle;
}

export const TextArea: FunctionComponent<textAreaProps> = (props: textAreaProps) => {
  const defaultStyle: ViewStyle = { height: sh135, ...props.style };
  const defaultTextStyle: TextStyle = { height: sh135, textAlignVertical: "top" };
  return <CustomTextInput {...props} multiline={true} viewStyle={defaultStyle} textInputStyle={defaultTextStyle} />;
};
