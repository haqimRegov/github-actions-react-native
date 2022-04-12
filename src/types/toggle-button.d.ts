declare type TypeToggleButtonValue = -1 | 0 | 1;
declare type TypeAdvanceToggleButtonValue = number;

declare interface IToggleButtonCustomContent {
  buttonStyle?: import("react-native").ViewStyle;
  circleStyle?: import("react-native").ViewStyle;
  disabledBackground?: import("react-native").ViewStyle;
  disabledStyle?: import("react-native").ViewStyle;
  fontFamily?: "NunitoSans-Bold" | "NunitoSans-Regular";
  iconColor?: string;
  iconSize?: number;
  label: string;
  labelStyle?: import("react-native").ViewStyle;
  mainLabelStyle?: import("react-native").ViewStyle;
  selected: boolean;
  textContainer?: import("react-native").ViewStyle;
}
