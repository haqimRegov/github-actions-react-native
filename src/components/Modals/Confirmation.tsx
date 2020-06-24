import React, { Fragment } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { centerHV, colorGray, colorWhite, flexRow, fs16SemiBoldBlack4, px, py, sh24, sw24, sw5 } from "../../styles";
import { CustomButtonProps, RoundedButton } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "../Views";
import { BasicModal } from "./Basic";

interface ModalProps {
  buttons: CustomButtonProps[];
  children: JSX.Element;
  handleClose: () => void;
  title: string;
  visible: boolean;
}

export const ConfirmationModal = ({ buttons, children, title, visible, handleClose }: ModalProps) => {
  const modelContainer: ViewStyle = {
    backgroundColor: colorGray._2,
    borderRadius: sw5,
  };
  const padding: ViewStyle = {
    ...py(sh24),
    ...px(sw24),
  };
  const buttonContainer: ViewStyle = {
    ...flexRow,
    ...padding,
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw5,
    borderBottomRightRadius: sw5,
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
            <View style={buttonContainer}>
              {buttons.map((button: CustomButtonProps, index: number) => {
                const space = index === 0 ? 0 : sw24;
                return (
                  <Fragment key={index}>
                    <CustomSpacer isHorizontal={true} space={space} />
                    <RoundedButton {...button} />
                  </Fragment>
                );
              })}
            </View>
          </View>
        </View>
      </Fragment>
    </BasicModal>
  );
};
