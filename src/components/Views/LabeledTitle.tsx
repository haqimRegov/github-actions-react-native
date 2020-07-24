import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { fs12BoldBlack2, fs16RegBlack2 } from "../../styles";
import { CustomSpacer } from "./Spacer";

export interface LabeledTitleProps {
  label: string;
  labelStyle?: TextStyle;
  spaceToBottom?: number;
  spaceToLabel?: number;
  style?: ViewStyle;
  title: string;
  titleStyle?: TextStyle;
}

export const LabeledTitle = ({ label, labelStyle, spaceToBottom, spaceToLabel, style, title, titleStyle }: LabeledTitleProps) => {
  return (
    <View style={style}>
      <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{label}</Text>
      {spaceToLabel === undefined ? null : <CustomSpacer space={spaceToLabel} />}
      <Text style={{ ...fs16RegBlack2, ...titleStyle }}>{title}</Text>
      {spaceToBottom === undefined ? null : <CustomSpacer space={spaceToBottom} />}
    </View>
  );
};
