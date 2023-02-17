declare interface LabeledTitleProps {
  iconSize?: number;
  headerSideContent?: import("react").ReactNode;
  headerSideText?: string;
  label: string;
  labelStyle?: import("react-native").TextStyle;
  onPress?: () => void;
  spaceToBottom?: number;
  spaceToIcon?: number;
  spaceToLabel?: number;
  style?: import("react-native").ViewStyle;
  subtitle?: string;
  subtitleStyle?: import("react-native").TextStyle;
  title?: string;
  titleIcon?: string;
  titleIconStyle?: import("react-native").ViewStyle;
  titleNumberOfLines?: number;
  titlePrefix?: string;
  titlePrefixStyle?: import("react-native").TextStyle;
  titleStyle?: import("react-native").TextStyle;
}
