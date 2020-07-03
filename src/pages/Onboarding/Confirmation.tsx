import React from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { BasicAccordion, ContentPage, CustomSpacer } from "../../components";
import { ONBOARDING_ROUTES } from "../../constants";
import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import { CONFIRMATIONS_MOCK } from "../../mocks/confirmation";
import {
  centerHorizontal,
  colorBlack,
  colorGray,
  colorWhite,
  customShadow,
  flexChild,
  flexRow,
  fs16RegBlue,
  px,
  sh05,
  sh20,
  sh31,
  sh43,
  sh5,
  sh56,
  sh8,
  spaceBetweenHorizontal,
  sw05,
  sw11,
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
  { title: CONFIRMATION.TERMS_HEADING_1, content: <AccordionContent text={CONFIRMATIONS_MOCK.termsContent} /> },
  { title: CONFIRMATION.TERMS_HEADING_2, content: <AccordionContent text={CONFIRMATIONS_MOCK.termsContent} /> },
  { title: CONFIRMATION.TERMS_HEADING_3, content: <AccordionContent text={CONFIRMATIONS_MOCK.termsContent} /> },
  { title: CONFIRMATION.TERMS_HEADING_4, content: <AccordionContent text={CONFIRMATIONS_MOCK.termsContent} /> },
  { title: CONFIRMATION.TERMS_HEADING_5, content: <AccordionContent text={CONFIRMATIONS_MOCK.termsContent} /> },
  { title: CONFIRMATION.TERMS_HEADING_6, content: <AccordionContent text={CONFIRMATIONS_MOCK.termsContent} /> },
  { title: CONFIRMATION.TERMS_HEADING_7, content: <AccordionContent text={CONFIRMATIONS_MOCK.termsContent} /> },
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
    ...customShadow(colorGray._4, sh5, 0, sh05, sh20),
    ...px(sw24),
    ...centerHorizontal,
    backgroundColor: colorWhite._1,
    borderRadius: 10,
    height: sh56,
  };
  const titleStyle: ViewStyle = { ...flexRow, ...spaceBetweenHorizontal };
  return (
    <ContentPage
      heading={CONFIRMATION.HEADING}
      handleLeftButton={handleCancel}
      handleRightButton={handleAgree}
      leftButtonText={CONFIRMATION.BUTTON_CANCEL}
      rightButtonText={CONFIRMATION.BUTTON_AGREE}
      subHeading={CONFIRMATION.SUBHEADING}>
      <View style={{ ...px(sw96) }}>
        <BasicAccordion sections={SECTIONS} icon="back-arrow" />
      </View>
      <View style={divider} />
      <CustomSpacer space={sh31} />
      <View style={{ ...px(sw96) }}>
        <View style={sectionContainer}>
          <TouchableWithoutFeedback onPress={handleSignature}>
            <View style={titleStyle}>
              <Text style={fs16RegBlue}>{CONFIRMATION.SIGNATURE_CLIENT}</Text>
              <IcoMoon name={"back-arrow"} size={sw11} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <CustomSpacer space={sh8} />
        <View style={sectionContainer}>
          <TouchableWithoutFeedback onPress={handleSignature}>
            <View style={titleStyle}>
              <Text style={fs16RegBlue}>{CONFIRMATION.SIGNATURE_AGENT}</Text>
              <IcoMoon name={"back-arrow"} size={sw11} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <CustomSpacer space={sh43} />
    </ContentPage>
  );
};
