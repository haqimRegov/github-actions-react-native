import React from "react";
import Modal from "react-native-modal";

import { noMargin } from "../../styles";

interface ModalProps {
  children?: JSX.Element;
  handleClose: () => void;
  visible: boolean;
}

export const CustomModal = ({ children, visible, handleClose }: ModalProps) => {
  return (
    <Modal isVisible={visible} onBackdropPress={handleClose} style={noMargin}>
      {children}
    </Modal>
  );
};
