import React from "react";
import { Text, View, ViewStyle, TextStyle } from "react-native";
import Modal from "react-native-modal";

import { RoundedButton, CustomFlexSpacer } from "../components";
import {
  centerHV,
  colorBlue,
  colorWhite,
  flexRow,
  fs20MedBlack,
  fs20MedWhite,
  colorGray,
  sh450,
  sh48,
  sh20,
  spaceAroundHorizontal,
  sw200,
  sw500,
  sh28,
  py,
  px,
} from "../styles";

interface ModalProps {
  visible: boolean;
  buttonLR: string[];
  Title: string;
  handleClose: () => void;
  content: () => void;
}

export const CustomModal = ({ visible, handleClose, buttonLR, Title, content }: ModalProps) => {
  const groupHeight: TextStyle = { marginBottom: sh28, ...fs20MedBlack };
  const ModelContainer: ViewStyle = { backgroundColor: colorWhite._1, width: sw500, height: sh450 };
  const buttonStyleBlue: ViewStyle = { width: sw200, height: sh48 };
  const buttonStyleWhite: ViewStyle = {
    width: sw200,
    height: sh48,
    backgroundColor: colorWhite._1,
    borderColor: colorBlue._3,
    borderWidth: 2,
  };
  const modalBorder: ViewStyle = { ...centerHV };
  const displayInfoContainer: ViewStyle = {
    backgroundColor: colorGray._2,
    ...py(sh20),
    ...px(sh20),
  };
  const ButtonContainer: ViewStyle = { ...flexRow, ...spaceAroundHorizontal, backgroundColor: colorWhite._1, width: "100%", padding: 20 };
  return (
    <Modal isVisible={visible} style={modalBorder}>
      <View style={ModelContainer}>
        <View style={displayInfoContainer}>
          <Text style={groupHeight}>{Title}</Text>
          {content()}
          {}
        </View>
        <CustomFlexSpacer />
        <View style={ButtonContainer}>
          <RoundedButton onPress={handleClose} text={buttonLR[0]} buttonStyle={buttonStyleWhite} textStyle={fs20MedBlack} />
          <RoundedButton onPress={handleClose} text={buttonLR[1]} buttonStyle={buttonStyleBlue} textStyle={fs20MedWhite} />
        </View>
      </View>
    </Modal>
  );
};
