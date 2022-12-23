import React, { FunctionComponent, useContext } from "react";
import { Modal, View, ViewStyle } from "react-native";

import { ModalContext } from "../../context";
import { colorBlack, fullHW } from "../../styles";
import { DuplicatePrompt, ExpiryPrompt } from "../../templates";

interface RNModalProps {
  animationType?: "none" | "slide" | "fade";
  children: JSX.Element;
  style?: ViewStyle;
  visible: boolean;
}

export const RNModal: FunctionComponent<RNModalProps> = ({ animationType, children, style, visible }: RNModalProps) => {
  const { duplicateModal, expiryModal, loggedOut } = useContext(ModalContext);

  const checkExpiryModal = expiryModal === true ? <ExpiryPrompt /> : children;
  return (
    <Modal animationType={animationType} transparent={true} visible={visible && loggedOut !== true}>
      <View style={{ backgroundColor: colorBlack._1_7, ...fullHW, ...style }}>
        {duplicateModal === true ? <DuplicatePrompt /> : checkExpiryModal}
      </View>
    </Modal>
  );
};
