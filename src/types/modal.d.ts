declare type TGlobalModalTypes = "duplicate" | "expiry";

declare interface IBasicModalProps {
  animationIn?: TypeModalAnimation;
  animationInTiming?: number;
  animationOut?: TypeModalAnimation;
  animationOutTiming?: number;
  backdropColor?: string;
  backdropOpacity?: number;
  children: JSX.Element;
  hasBackdrop?: boolean;
  onClose?: () => void;
  setVisible?: (toggle: boolean) => void;
  style?: import("react-native").ViewStyle;
  visible: boolean;
}

declare type TypeModalAnimation = import("react-native-animatable").Animation | import("react-native-animatable").CustomAnimation;
