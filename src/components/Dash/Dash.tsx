import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";
import RNDash from "react-native-dash";

import { colorGray, sh1, sw4, sw8 } from "../../styles";

interface DashProps {
  color?: string;
  gap?: number;
  length?: number;
  thickness?: number;
  style?: ViewStyle;
}
export const Dash: FunctionComponent<DashProps> = ({ color, gap, length, thickness, style }: DashProps) => {
  const defaultColor = color !== undefined ? color : colorGray._2;
  const defaultGap = gap !== undefined ? gap : sw4;
  const defaultLength = length !== undefined ? length : sw8;
  const defaultThickness = thickness !== undefined ? thickness : sh1;

  return <RNDash dashColor={defaultColor} dashGap={defaultGap} dashLength={defaultLength} dashThickness={defaultThickness} style={style} />;
};
