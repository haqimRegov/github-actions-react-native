import React from "react";
import Modal from "react-native-modal";

import { colorBlack, noMargin } from "../../styles";

export const BasicModal = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  backdropColor,
  backdropOpacity,
  children,
  onClose,
  style,
  visible,
}: IBasicModalProps) => {
  const defaultAnimationIn = animationIn !== undefined ? animationIn : "fadeIn";
  const defaultAnimationOut = animationOut !== undefined ? animationOut : "fadeOut";

  return (
    <Modal
      backdropOpacity={backdropOpacity || 0.7}
      backdropColor={backdropColor || colorBlack._1}
      animationIn={defaultAnimationIn}
      animationInTiming={animationInTiming}
      animationOut={defaultAnimationOut}
      animationOutTiming={animationOutTiming}
      isVisible={visible}
      onModalHide={onClose}
      style={{ ...noMargin, ...style }}>
      {children}
    </Modal>
  );
};
