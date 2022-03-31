import React, { FunctionComponent } from "react";
import { Modal, View, ViewStyle } from "react-native";

import { colorBlack, fullHW } from "../../styles";

interface RNModalProps {
  animationType?: "none" | "slide" | "fade";
  children: JSX.Element;
  style?: ViewStyle;
  visible: boolean;
}

export const RNModal: FunctionComponent<RNModalProps> = ({
  animationType,

  children,
  style,
  visible,
}: RNModalProps) => {
  return (
    <Modal animationType={animationType} transparent={true} visible={visible}>
      <View style={{ backgroundColor: colorBlack._1_7, ...fullHW, ...style }}>{children}</View>
    </Modal>
  );
};
