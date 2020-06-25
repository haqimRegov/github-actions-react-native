import React from "react";
import { Text, View, ViewStyle, Alert } from "react-native";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BasicAccordion, ContentPage, CustomSpacer } from "../../components";
import { ONBOARDING_ROUTES } from "../../constants";
import { Language } from "../../constants/language";
import {
  centerHorizontal,
  colorBlack,
  colorGray,
  colorWhite,
  customShadow,
  flexChild,
  fs16RegBlue1,
  px,
  sh31,
  sh43,
  sh56,
  sh8,
  sw24,
  sw96,
} from "../../styles";

const {
  BUTTON_AGREE,
  BUTTON_CANCEL,
  HEADING,
  SIGNATURE_AGENT,
  SIGNATURE_CLIENT,
  SUB_HEADING,
  TERMS_CONTENT_1,
  TERMS_CONTENT_2,
  TERMS_CONTENT_3,
  TERMS_CONTENT_4,
  TERMS_CONTENT_5,
  TERMS_CONTENT_6,
  TERMS_CONTENT_7,
  TERMS_HEADING_1,
  TERMS_HEADING_2,
  TERMS_HEADING_3,
  TERMS_HEADING_4,
  TERMS_HEADING_5,
  TERMS_HEADING_6,
  TERMS_HEADING_7,
} = Language.PAGE.CONFIRMATION;

const SECTIONS = [
  { title: TERMS_HEADING_1, content: TERMS_CONTENT_1 },
  { title: TERMS_HEADING_2, content: TERMS_CONTENT_2 },
  { title: TERMS_HEADING_3, content: TERMS_CONTENT_3 },
  { title: TERMS_HEADING_4, content: TERMS_CONTENT_4 },
  { title: TERMS_HEADING_5, content: TERMS_CONTENT_5 },
  { title: TERMS_HEADING_6, content: TERMS_CONTENT_6 },
  { title: TERMS_HEADING_7, content: TERMS_CONTENT_7 },
];

interface ConfirmationProps {
  handleNextStep: (route: string) => void;
}

export const Confirmation = ({ handleNextStep }: ConfirmationProps) => {
  const handleSignature = () => {
    Alert.alert("Signature");
  };
  const handleCancel = () => {
    Alert.alert("Cancel");
  };
  const handleAgree = () => {
    Alert.alert("Agree");
  };
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.Payment);
  };
  const divider: ViewStyle = { borderTopColor: colorBlack._6, borderTopWidth: 0.5, ...flexChild, opacity: 0.1 };
  const sectionContainer: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: 10,
    ...customShadow(colorGray._4, 5, 0, 0.5, 20),
    ...flexChild,
    ...px(sw24),
  };
  const touchableContainer: ViewStyle = { ...centerHorizontal, height: sh56 };
  return (
    <ContentPage
      heading={HEADING}
      handleLeftButton={handleCancel}
      handleRightButton={handleAgree}
      leftButtonText={BUTTON_CANCEL}
      rightButtonText={BUTTON_AGREE}
      subHeading={SUB_HEADING}>
      <View style={{ ...px(sw96) }}>
        <BasicAccordion sections={SECTIONS} />
      </View>
      <View style={divider} />
      <CustomSpacer space={sh31} />
      <View style={{ ...px(sw96) }}>
        <View style={sectionContainer}>
          <TouchableWithoutFeedback onPress={handleSignature} style={touchableContainer}>
            <Text style={fs16RegBlue1}>{SIGNATURE_CLIENT}</Text>
          </TouchableWithoutFeedback>
        </View>
        <CustomSpacer space={sh8} />
        <View style={sectionContainer}>
          <TouchableWithoutFeedback onPress={handleSignature} style={touchableContainer}>
            <Text style={fs16RegBlue1}>{SIGNATURE_AGENT}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <CustomSpacer space={sh43} />
    </ContentPage>
  );
};
