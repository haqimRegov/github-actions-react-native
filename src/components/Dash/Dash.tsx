import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";
import RNDash from "react-native-dash";

import { colorBlack, sh1, sw4 } from "../../styles";

interface DashProps {
  color?: string;
  gap?: number;
  length?: number;
  thickness?: number;
  style?: ViewStyle;
}
export const Dash: FunctionComponent<DashProps> = ({ color, gap, length, thickness, style }: DashProps) => {
  const defaultColor = color !== undefined ? color : colorBlack._2_1;
  const defaultGap = gap !== undefined ? gap : sw4;
  const defaultLength = length !== undefined ? length : sw4;
  const defaultThickness = thickness !== undefined ? thickness : sh1;

  return <RNDash dashColor={defaultColor} dashGap={defaultGap} dashLength={defaultLength} dashThickness={defaultThickness} style={style} />;
};
