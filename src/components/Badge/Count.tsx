import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { centerHV, colorRed, fs10BoldWhite1, sh16, sw24, sw4 } from "../../styles";

export interface BadgeCountProps {
  count: number;
  countStyle?: ViewStyle;
  style?: ViewStyle;
}

export const BadgeCount: FunctionComponent<BadgeCountProps> = ({ count, countStyle, style }: BadgeCountProps) => {
  const badgeStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorRed._1,
    borderRadius: sw4,
    height: sh16,
    minWidth: sw24,
    ...style,
  };
  return count === 0 ? (
    <View />
  ) : (
    <View style={badgeStyle}>
      <Text style={{ ...fs10BoldWhite1, ...countStyle }}>{count}</Text>
    </View>
  );
};
