declare interface IBasicModalProps {
  animationIn?: import("react-native-animatable").Animation | import("react-native-animatable").CustomAnimation;
  animationInTiming?: number;
  animationOut?: import("react-native-animatable").Animation | import("react-native-animatable").CustomAnimation;
  animationOutTiming?: number;
  children: JSX.Element;
  onClose?: () => void;
  visible: boolean;
}
