import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { circle, colorRed, sw8 } from "../../styles";

export interface CircleBadgeProps {
  color?: string;
  style?: ViewStyle;
}

export const CircleBadge: FunctionComponent<CircleBadgeProps> = ({ color, style }: CircleBadgeProps) => {
  const badgeColor = color !== undefined ? color : colorRed._1;
  return <View style={{ ...circle(sw8, badgeColor), ...style }} />;
};
