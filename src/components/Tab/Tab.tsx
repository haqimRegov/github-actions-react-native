import React from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { centerHV, colorRed, fs16BoldBlue2, fs16RegBlue25, sh48, sw164, sw2 } from "../../styles";

interface TabProps {
  onPress?: () => void;
  selected: boolean;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const Tab = ({ onPress, selected, style, text, textStyle }: TabProps) => {
  const selectedStyle: ViewStyle = selected ? { borderBottomWidth: sw2, borderBottomColor: colorRed._1 } : {};
  const baseTextStyle: TextStyle = { letterSpacing: -0.44, ...textStyle };
  const defaultTextStyle: TextStyle = selected ? { ...fs16BoldBlue2, ...baseTextStyle } : { ...fs16RegBlue25, ...baseTextStyle };
  const container: ViewStyle = { ...centerHV, height: sh48, width: sw164, ...selectedStyle, ...style };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={container}>
        <Text style={defaultTextStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
