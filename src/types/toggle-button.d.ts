import { ViewStyle } from "react-native";

declare type TypeToggleButtonValue = -1 | 0 | 1;
declare type TypeAdvanceToggleButtonValue = number;

declare interface IToggleButtonCustomContent {
  disabledStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  circleStyle?: ViewStyle;
  disabledBackground?: ViewStyle;
  fontFamily?: "NunitoSans-Bold" | "NunitoSans-Regular";
  iconSize?: number;
  iconColor?: string;
  textContainer?: ViewStyle;
  mainLabelStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  label: string;
  selected: boolean;
}
