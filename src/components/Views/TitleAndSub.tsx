import React from "react";
import { Text, View, TextStyle } from "react-native";

import { fs12BoldBlack2, fs16RegBlack2 } from "../../styles";

interface TitleAndSubProps {
  title: string;
  titleStyle?: TextStyle;
  subtitle: string;
  subtitleStyle?: TextStyle;
}

export const TitleAndSub = ({ title, titleStyle, subtitle, subtitleStyle }: TitleAndSubProps) => {
  return (
    <View>
      <Text style={[fs12BoldBlack2, titleStyle]}>{title}</Text>
      <Text style={[fs16RegBlack2, subtitleStyle]}>{subtitle}</Text>
    </View>
  );
};
