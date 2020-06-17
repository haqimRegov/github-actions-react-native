import React from "react";
import { Text, View, ViewStyle, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";

import { RoundedButton, CustomFlexSpacer, CustomButtonProps, CustomSpacer } from "..";
import {
  borderRadiusBottom,
  centerHV,
  colorGray,
  colorWhite,
  flexRow,
  fs16MedBlack,
  px,
  py,
  sh20,
  sh24,
  spaceAroundHorizontal,
  sw482,
  sw5,
  sw539,
} from "../../styles";

interface ModalProps {
  buttons: CustomButtonProps[];
  children: JSX.Element;
  handleClose: () => void;
  title: string;
  visible: boolean;
}

export const ConformationModal = ({ buttons, children, title, visible, handleClose }: ModalProps) => {
  const ModelContainer: ViewStyle = { backgroundColor: colorGray._2, width: sw482, height: sw539, borderRadius: sw5 };
  const displayInfoContainer: ViewStyle = {
    ...py(sh20),
    ...px(sh20),
  };
  const ButtonContainer: ViewStyle = {
    ...flexRow,
    ...spaceAroundHorizontal,
    backgroundColor: colorWhite._1,
    width: "100%",
    padding: 20,
    ...borderRadiusBottom,
  };
  return (
    <Modal isVisible={visible} style={centerHV}>
      <View style={ModelContainer}>
        <View style={displayInfoContainer}>
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
