import React, { FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

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
      <Text style={style}>{text}</Text>
      {spaceToBottom !== undefined ? <CustomSpacer space={spaceToBottom} /> : null}
    </View>
  );
};
