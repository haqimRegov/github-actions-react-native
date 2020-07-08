import React, { useState } from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { BasicAccordion, ContentPage, CustomFlexSpacer, CustomSpacer, IconButton } from "../../components";
import { CustomSignature } from "../../components/Signature";
import { ONBOARDING_ROUTES } from "../../constants";
import { Language } from "../../constants/language";
import { ACKNOWLEDGEMENT_MOCK } from "../../mocks/acknowledgement";
import {
  borderBottomBlack61,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorWhite,
  customShadow,
  flexRow,
  fs16RegBlue,
  noBorderBottom,
  px,
  sh20,
  sh31,
  sh5,
  sh56,
  sh72,
  sh8,
  sw05,
  sw12,
  sw24,
  sw28,
  sw96,
} from "../../styles";

const { ACKNOWLEDGEMENT } = Language.PAGE;

interface AccordionContentProps {
  text: string;
}
const AccordionContent = ({ text }: AccordionContentProps) => {
  return <Text>{text}</Text>;
};

interface IBasicAccordion {
  title: string;
  content: JSX.Element;
}

const SECTIONS: IBasicAccordion[] = [
  { title: ACKNOWLEDGEMENT.TERMS_HEADING_1, content: <AccordionContent text={ACKNOWLEDGEMENT_MOCK.termsContent} /> },
  { title: ACKNOWLEDGEMENT.TERMS_HEADING_2, content: <AccordionContent text={ACKNOWLEDGEMENT_MOCK.termsContent} /> },
  { title: ACKNOWLEDGEMENT.TERMS_HEADING_3, content: <AccordionContent text={ACKNOWLEDGEMENT_MOCK.termsContent} /> },
  { title: ACKNOWLEDGEMENT.TERMS_HEADING_4, content: <AccordionContent text={ACKNOWLEDGEMENT_MOCK.termsContent} /> },
  { title: ACKNOWLEDGEMENT.TERMS_HEADING_5, content: <AccordionContent text={ACKNOWLEDGEMENT_MOCK.termsContent} /> },
  { title: ACKNOWLEDGEMENT.TERMS_HEADING_6, content: <AccordionContent text={ACKNOWLEDGEMENT_MOCK.termsContent} /> },
  { title: ACKNOWLEDGEMENT.TERMS_HEADING_7, content: <AccordionContent text={ACKNOWLEDGEMENT_MOCK.termsContent} /> },
];

interface AcknowledgementProps {
  handleNextStep: (route: string) => void;
}

export const Acknowledgement = ({ handleNextStep }: AcknowledgementProps) => {
  const [inputAgentSign, setInputAgentSign] = useState<string>("");
  const [inputClientSign, setInputClientSign] = useState<string>("");
  const [showAgentSign, setShowAgentSign] = useState<boolean>(false);
  const [showClientSign, setShowClientSign] = useState<boolean>(false);

  const handleSignatureClient = () => {
    setShowClientSign(!showClientSign);
    setShowAgentSign(false);
  };

  const handleSignatureAgent = () => {
    setShowAgentSign(!showAgentSign);
    setShowClientSign(false);
  };

  const handleCancel = () => {
    Alert.alert("Cancel");
  };

  const handleAgree = () => {
    handleNextStep(ONBOARDING_ROUTES.Payment);
  };

  const signatureBaseStyle: ViewStyle = {
    ...centerVertical,
    ...customShadow(colorGray._4, sh5, 0, 0.5, sh20),
    ...flexRow,
    ...px(sw24),
    backgroundColor: colorWhite._1,
    borderRadius: 10,
    height: sh56,
  };

  const clientSignStyle = showClientSign ? { ...signatureBaseStyle, ...noBorderBottom } : signatureBaseStyle;
  const agentSignStyle = showAgentSign ? { ...signatureBaseStyle, ...noBorderBottom } : signatureBaseStyle;
  const clientIcon = showClientSign ? "close" : "plus";
  const agentIcon = showAgentSign ? "close" : "plus";

  return (
    <ContentPage
      heading={ACKNOWLEDGEMENT.HEADING}
      handleLeftButton={handleCancel}
      handleRightButton={handleAgree}
      leftButtonText={ACKNOWLEDGEMENT.BUTTON_CANCEL}
      rightButtonText={ACKNOWLEDGEMENT.BUTTON_AGREE}
      subHeading={ACKNOWLEDGEMENT.SUBHEADING}>
      <View style={px(sw96)}>
        <BasicAccordion sections={SECTIONS} />
        <CustomSpacer space={sh31} />
      </View>
      <View style={borderBottomBlack61} />
      <CustomSpacer space={sh31} />
      <View style={px(sw96)}>
        <TouchableWithoutFeedback onPress={handleSignatureClient}>
          <View style={clientSignStyle}>
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={fs16RegBlue}>{ACKNOWLEDGEMENT.LABEL_CLIENT_SIGNATURE}</Text>
              <CustomFlexSpacer />
              <IconButton color={colorBlue._1} name={clientIcon} size={sw12} style={circleBorder(sw28, sw05, colorBlue._1)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {showClientSign ? <CustomSignature setSignature={setInputClientSign} signature={inputClientSign} /> : null}
        <CustomSpacer space={sh8} />
        <TouchableWithoutFeedback onPress={handleSignatureAgent}>
          <View style={agentSignStyle}>
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={fs16RegBlue}>{ACKNOWLEDGEMENT.LABEL_AGENT_SIGNATURE}</Text>
              <CustomFlexSpacer />
              <IconButton color={colorBlue._1} name={agentIcon} size={sw12} style={circleBorder(sw28, sw05, colorBlue._1)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {showAgentSign ? <CustomSignature setSignature={setInputAgentSign} signature={inputAgentSign} /> : null}
      </View>
      <CustomSpacer space={sh72} />
    </ContentPage>
  );
};
