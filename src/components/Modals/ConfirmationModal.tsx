import React from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";

import {
  centerHV,
  colorGray,
  colorWhite,
  flexRow,
  fs16MedBlack,
  px,
  py,
  sh24,
  spaceAroundHorizontal,
  sw24,
  sw482,
  sw5,
  sw539,
} from "../../styles";
import { CustomButtonProps, RoundedButton } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "../Views";

interface ModalProps {
  buttons: CustomButtonProps[];
  children: JSX.Element;
  handleClose: () => void;
  title: string;
  visible: boolean;
}

export const ConformationModal = ({ buttons, children, title, visible, handleClose }: ModalProps) => {
  const modelContainer: ViewStyle = {
    backgroundColor: colorGray._2,
    borderRadius: sw5,
    height: sw539,
    width: sw482,
  };
  const padding: ViewStyle = {
    ...py(sh24),
    ...px(sw24),
  };
  const ButtonContainer: ViewStyle = {
    ...flexRow,
    ...padding,
    ...spaceAroundHorizontal,
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw5,
    borderBottomRightRadius: sw5,
  };
  return (
    <Modal isVisible={visible} style={centerHV}>
      <View style={modelContainer}>
        <View style={padding}>
          <View style={flexRow}>
            <Text style={fs16MedBlack}>{title}</Text>
            <CustomFlexSpacer />
            <TouchableWithoutFeedback onPress={handleClose}>
              <Text style={fs16MedBlack}>x</Text>
            </TouchableWithoutFeedback>
          </View>
          <CustomSpacer space={sh24} />
          {children}
        </View>
        <CustomFlexSpacer />
        <View style={ButtonContainer}>
          {buttons.map((button: CustomButtonProps, index: number) => {
            return <RoundedButton key={index} {...button} />;
          })}
        </View>
      </View>
    </Modal>
  );
};
