import React, { useState } from "react";
import { Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  BasicAccordion,
  CheckBox,
  ContentPage,
  CustomFlexSpacer,
  CustomPopup,
  CustomSpacer,
  IconButton,
  RadioButtonGroup,
} from "../../components";
import { CustomSignature } from "../../components/Signature";
import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import { ACKNOWLEDGEMENT_MOCK } from "../../mocks";
import {
  borderBottomBlack21,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorWhite,
  customShadow,
  flexRow,
  fs12BoldBlack2,
  fs16BoldBlack2,
  fs16SemiBoldBlack2,
  noBorderBottom,
  px,
  py,
  sh16,
  sh20,
  sh24,
  sh32,
  sh40,
  sh5,
  sh56,
  sh8,
  sw05,
  sw12,
  sw24,
  sw28,
  sw32,
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
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

export const Acknowledgement = ({ handleNextStep }: AcknowledgementProps) => {
  const [inputAgentSign, setInputAgentSign] = useState<string>("");
  const [inputClientSign, setInputClientSign] = useState<string>("");
  const [showAgentSign, setShowAgentSign] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);
  const [showClientSign, setShowClientSign] = useState<boolean>(false);
  const [inputConsent, setInputConsent] = useState<string>(ACKNOWLEDGEMENT.OPTION_CONSENT_NO);

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

  const handleContinue = () => {
    handleNextStep("Payment");
  };

  const handleAgree = () => {
    setAgree(!agree);
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
      handleContinue={handleContinue}
      labelContinue={ACKNOWLEDGEMENT.BUTTON_AGREE}
      subheading={ACKNOWLEDGEMENT.HEADING}
      subtitle={ACKNOWLEDGEMENT.SUBHEADING}>
      <View style={{ ...px(sw24), ...py(sh24) }}>
        <BasicAccordion sections={SECTIONS} />
      </View>
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
      <CustomSpacer space={sh32} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <View style={{ ...centerVertical, ...flexRow }}>
          <Text style={fs16SemiBoldBlack2}>{ACKNOWLEDGEMENT.LABEL_SERVICES}</Text>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <CustomPopup popupText={ACKNOWLEDGEMENT.POPUP_CONSENT}>
            <IcoMoon name="info" size={sw32} />
          </CustomPopup>
        </View>
        <CustomSpacer space={sh16} />
        <RadioButtonGroup
          direction="row"
          labels={[ACKNOWLEDGEMENT.OPTION_CONSENT_NO, ACKNOWLEDGEMENT.OPTION_CONSENT_YES]}
          selected={inputConsent}
          setSelected={setInputConsent}
          space={sh40}
        />
        <CustomSpacer space={sh32} />
        <CheckBox label={ACKNOWLEDGEMENT.LABEL_AGREE} labelStyle={fs12BoldBlack2} onPress={handleAgree} toggle={agree} />
      </View>
    </ContentPage>
  );
};
