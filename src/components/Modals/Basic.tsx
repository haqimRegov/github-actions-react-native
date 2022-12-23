import React, { FunctionComponent, useContext } from "react";
import Modal from "react-native-modal";

import { ModalContext } from "../../context";
import { colorBlack, noMargin } from "../../styles";
import { DuplicatePrompt, ExpiryPrompt } from "../../templates";

export const BasicModal: FunctionComponent<IBasicModalProps> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  backdropColor,
  backdropOpacity,
  hasBackdrop,
  children,
  onClose,
  style,
  visible,
}: IBasicModalProps) => {
  const { duplicateModal, expiryModal, loggedOut } = useContext(ModalContext);
  const defaultAnimationIn = animationIn !== undefined ? animationIn : "fadeIn";
  const defaultAnimationOut = animationOut !== undefined ? animationOut : "fadeOut";

  const handleClose = () => {
    if (onClose !== undefined) {
      onClose();
    }
  };

  const checkExpiryModal = expiryModal === true && duplicateModal !== true ? <ExpiryPrompt /> : children;
  return (
    <Modal
      backdropOpacity={backdropOpacity || 0.7}
      hasBackdrop={hasBackdrop}
      backdropColor={backdropColor || colorBlack._1}
      animationIn={defaultAnimationIn}
      animationInTiming={animationInTiming}
      animationOut={defaultAnimationOut}
      animationOutTiming={animationOutTiming}
      isVisible={visible && loggedOut !== true}
      onModalHide={handleClose}
      style={{ ...noMargin, ...style }}>
      {duplicateModal === true ? <DuplicatePrompt /> : checkExpiryModal}
    </Modal>
  );
};
