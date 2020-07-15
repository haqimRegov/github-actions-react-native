import React from "react";
import { Text, View, ViewStyle } from "react-native";

import { centerHV, colorGray, colorWhite, flexRow, fs24BoldBlack1, px, py, sh24, sw24, sw5 } from "../../styles";
import { ActionButtons, ActionButtonsProps, CustomSpacer } from "../Views";
import { BasicModal } from "./Basic";

interface ModalProps extends ActionButtonsProps {
  children: JSX.Element;
  handleClose: () => void;
  title: string;
  visible: boolean;
}

export const ConfirmationModal = ({ children, title, visible, handleClose, ...rest }: ModalProps) => {
  const modelContainer: ViewStyle = {
    backgroundColor: colorGray._5,
    borderRadius: sw5,
  };

  const padding: ViewStyle = {
    ...py(sh24),
    ...px(sw24),
  };

  const buttonContainer: ViewStyle = {
    ...padding,
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw5,
    borderBottomRightRadius: sw5,
  };

  const actionButtonProps: ActionButtonsProps = {
    ...rest,
    handleCancel: handleClose,
    buttonContainerStyle: buttonContainer,
  };

  return (
    <BasicModal visible={visible}>
      <View style={centerHV}>
        <View style={modelContainer}>
          <View style={padding}>
            <View style={flexRow}>
              <Text style={fs24BoldBlack1}>{title}</Text>
            </View>
            <CustomSpacer space={sh24} />
            {children}
          </View>
          <ActionButtons {...actionButtonProps} />
        </View>
      </View>
    </BasicModal>
  );
};
