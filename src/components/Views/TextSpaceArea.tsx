import React, { FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { fs12BoldGray6 } from "../../styles";
import { CustomSpacer } from "./Spacer";

interface TextSpaceAreaProps {
  spaceToBottom?: number;
  spaceToTop?: number;
  style?: TextStyle;
  text: string;
}

export const TextSpaceArea: FunctionComponent<TextSpaceAreaProps> = ({ spaceToBottom, spaceToTop, style, text }: TextSpaceAreaProps) => {
  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      <Text style={{ ...fs12BoldGray6, ...style }}>{text}</Text>
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </View>
  );
};
