declare interface IBasicModalProps {
  animationIn?: import("react-native-animatable").Animation | import("react-native-animatable").CustomAnimation;
  animationInTiming?: number;
  animationOut?: import("react-native-animatable").Animation | import("react-native-animatable").CustomAnimation;
  animationOutTiming?: number;
  backdropColor?: string;
  backdropOpacity?: number;
  children: JSX.Element;
  hasBackdrop?: boolean;
  onClose?: () => void;
  style?: import("react-native").ViewStyle;
  visible: boolean;
}
