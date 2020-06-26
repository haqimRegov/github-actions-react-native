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
  sh5,
  sh05,
  sh20,
  sw05,
  sw24,
  sw96,
} from "../../styles";

const { CONFIRMATION } = Language.PAGE;

interface AccordionContentProps {
  text: string;
}
const AccordionContent = ({ text }: AccordionContentProps) => {
  return <Text>{text}</Text>;
};
const SECTIONS = [
  { title: CONFIRMATION.TERMS_HEADING_1, content: <AccordionContent text={CONFIRMATION.TERMS_CONTENT_1} /> },
  { title: CONFIRMATION.TERMS_HEADING_2, content: <AccordionContent text={CONFIRMATION.TERMS_CONTENT_2} /> },
  { title: CONFIRMATION.TERMS_HEADING_3, content: <AccordionContent text={CONFIRMATION.TERMS_CONTENT_3} /> },
  { title: CONFIRMATION.TERMS_HEADING_4, content: <AccordionContent text={CONFIRMATION.TERMS_CONTENT_4} /> },
  { title: CONFIRMATION.TERMS_HEADING_5, content: <AccordionContent text={CONFIRMATION.TERMS_CONTENT_5} /> },
  { title: CONFIRMATION.TERMS_HEADING_6, content: <AccordionContent text={CONFIRMATION.TERMS_CONTENT_6} /> },
  { title: CONFIRMATION.TERMS_HEADING_7, content: <AccordionContent text={CONFIRMATION.TERMS_CONTENT_7} /> },
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
    handleNextStep(ONBOARDING_ROUTES.Payment);
  };
  const divider: ViewStyle = { borderTopColor: colorBlack._6_3, borderTopWidth: sw05, ...flexChild };
  const sectionContainer: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: 10,
    ...customShadow(colorGray._4, sh5, 0, sh05, sh20),
    ...flexChild,
    ...px(sw24),
  };
  const touchableContainer: ViewStyle = { ...centerHorizontal, height: sh56 };
  return (
    <ContentPage
      heading={CONFIRMATION.HEADING}
      handleLeftButton={handleCancel}
      handleRightButton={handleAgree}
      leftButtonText={CONFIRMATION.BUTTON_CANCEL}
      rightButtonText={CONFIRMATION.BUTTON_AGREE}
      subHeading={CONFIRMATION.SUB_HEADING}>
      <View style={{ ...px(sw96) }}>
        <BasicAccordion sections={SECTIONS} />
      </View>
      <View style={divider} />
      <CustomSpacer space={sh31} />
      <View style={{ ...px(sw96) }}>
        <View style={sectionContainer}>
          <TouchableWithoutFeedback onPress={handleSignature} style={touchableContainer}>
            <Text style={fs16RegBlue1}>{CONFIRMATION.SIGNATURE_CLIENT}</Text>
          </TouchableWithoutFeedback>
        </View>
        <CustomSpacer space={sh8} />
        <View style={sectionContainer}>
          <TouchableWithoutFeedback onPress={handleSignature} style={touchableContainer}>
            <Text style={fs16RegBlue1}>{CONFIRMATION.SIGNATURE_AGENT}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <CustomSpacer space={sh43} />
    </ContentPage>
  );
};
