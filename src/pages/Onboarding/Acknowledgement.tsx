import React, { useState } from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { BasicAccordion, ContentPage, CustomFlexSpacer, CustomSpacer, IconButton } from "../../components";
import { CustomSignature } from "../../components/Signature";
import { ONBOARDING_ROUTES } from "../../constants";
import { Language } from "../../constants/language";
import { ACKNOWLEDGEMENT_MOCK } from "../../mocks/acknowledgement";
import {
  borderBottomBlack21,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorWhite,
  customShadow,
  flexRow,
  fs16BoldBlack2,
  noBorderBottom,
  px,
  py,
  sh20,
  sh24,
  sh5,
  sh56,
  sh8,
  sw05,
  sw12,
  sw24,
  sw28,
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
    ...customShadow(colorGray._6, sh5, 0, 0.5, sh20),
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
      handleCancel={handleCancel}
      handleContinue={handleAgree}
      labelContinue={ACKNOWLEDGEMENT.BUTTON_AGREE}
      subheading={ACKNOWLEDGEMENT.HEADING}
      subtitle={ACKNOWLEDGEMENT.SUBHEADING}>
      <View style={{ ...px(sw24), ...py(sh24) }}>
        <BasicAccordion sections={SECTIONS} />
      </View>
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <TouchableWithoutFeedback onPress={handleSignatureClient}>
          <View onStartShouldSetResponderCapture={() => true} style={clientSignStyle}>
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={fs16BoldBlack2}>{ACKNOWLEDGEMENT.LABEL_CLIENT_SIGNATURE}</Text>
              <CustomFlexSpacer />
              <IconButton color={colorBlue._1} name={clientIcon} size={sw12} style={circleBorder(sw28, sw05, colorBlue._1)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {showClientSign ? <CustomSignature setSignature={setInputClientSign} signature={inputClientSign} /> : null}
        <CustomSpacer space={sh8} />
        <TouchableWithoutFeedback onPress={handleSignatureAgent}>
          <View onStartShouldSetResponderCapture={() => true} style={agentSignStyle}>
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={fs16BoldBlack2}>{ACKNOWLEDGEMENT.LABEL_AGENT_SIGNATURE}</Text>
              <CustomFlexSpacer />
              <IconButton color={colorBlue._1} name={agentIcon} size={sw12} style={circleBorder(sw28, sw05, colorBlue._1)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {showAgentSign ? <CustomSignature setSignature={setInputAgentSign} signature={inputAgentSign} /> : null}
      </View>
    </ContentPage>
  );
};
