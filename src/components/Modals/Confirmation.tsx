import React, { Fragment } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { centerHV, colorGray, colorWhite, flexRow, fs16SemiBoldBlack4, px, py, sh24, sw24, sw5 } from "../../styles";
import { ActionButtons, ActionButtonsProps, CustomFlexSpacer, CustomSpacer } from "../Views";
import { BasicModal } from "./Basic";

interface ModalProps extends ActionButtonsProps {
  children: JSX.Element;
  handleClose: () => void;
  title: string;
  visible: boolean;
}

export const ConfirmationModal = ({ children, title, visible, handleClose, ...rest }: ModalProps) => {
  const modelContainer: ViewStyle = {
    backgroundColor: colorGray._2,
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
    buttonContainerStyle: buttonContainer,
  };

  return (
    <BasicModal visible={visible}>
      <Fragment>
        <View style={{ ...centerHV }}>
          <View style={modelContainer}>
            <View style={padding}>
              <View style={flexRow}>
                <Text style={fs16SemiBoldBlack4}>{title}</Text>
                <CustomFlexSpacer />
                <TouchableWithoutFeedback onPress={handleClose}>
                  <Text style={fs16SemiBoldBlack4}>x</Text>
                </TouchableWithoutFeedback>
              </View>
              <CustomSpacer space={sh24} />
              {children}
            </View>
            <ActionButtons {...actionButtonProps} />
          </View>
        </View>
      </Fragment>
    </BasicModal>
  );
};
