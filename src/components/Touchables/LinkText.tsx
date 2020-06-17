import React from "react";
import { Text, TextStyle } from "react-native";

import { fs12RegBlue, fsAlignCenter, fsCapitalize } from "../../styles";

interface LinkTextProps {
  onPress?: () => void;
  style?: TextStyle;
  text: string;
}

export const LinkText = ({ onPress, style, text }: LinkTextProps) => {
  const textLinkStyle: TextStyle = { ...fs12RegBlue, ...fsAlignCenter, ...fsCapitalize, ...style };

  return (
    <Text onPress={onPress} style={textLinkStyle}>
      {text}
    </Text>
  );
};
