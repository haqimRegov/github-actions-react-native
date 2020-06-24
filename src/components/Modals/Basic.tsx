import React from "react";
import Modal from "react-native-modal";

import { noMargin } from "../../styles";

export const BasicModal = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  children,
  onClose,
  visible,
}: IBasicModalProps) => {
  const defaultAnimationIn = animationIn !== undefined ? animationIn : "fadeIn";
  const defaultAnimationOut = animationOut !== undefined ? animationOut : "fadeOut";

  return (
    <Modal
      animationIn={defaultAnimationIn}
      animationInTiming={animationInTiming}
      animationOut={defaultAnimationOut}
      animationOutTiming={animationOutTiming}
      isVisible={visible}
      onModalHide={onClose}
      style={noMargin}>
      {children}
    </Modal>
  );
};
