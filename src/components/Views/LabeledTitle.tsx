import React from "react";
import { Text, View, TextStyle } from "react-native";

import { fs12BoldBlack2, fs16RegBlack2 } from "../../styles";

interface LabeledTitleProps {
  label: string;
  labelStyle?: TextStyle;
  title: string;
  titleStyle?: TextStyle;
}

export const LabeledTitle = ({ label, labelStyle, title, titleStyle }: LabeledTitleProps) => {
  return (
    <View>
      <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{label}</Text>
      <Text style={{ ...fs16RegBlack2, ...titleStyle }}>{title}</Text>
    </View>
  );
};
