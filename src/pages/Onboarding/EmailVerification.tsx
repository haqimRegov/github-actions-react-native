import React, { FunctionComponent, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, CustomTextInput, LinkText, TextSpaceArea } from "../../components";
import { Language } from "../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../store";
import { flexRow, fs12RegBlack2, fs16SemiBoldBlack2, fs16SemiBoldBlue1, px, sh16, sh24, sh32, sh8, sw12, sw24, sw4 } from "../../styles";

const { EMAIL_VERIFICATION } = Language.PAGE;

interface EmailVerificationProps extends PersonalInfoStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

const EmailVerificationComponent: FunctionComponent<EmailVerificationProps> = ({
  addPersonalInfo,
  handleNextStep,
}: EmailVerificationProps) => {
  const [inputEmail, setInputEmail] = useState<string>("");

  const handleCancel = () => {
    Alert.alert("Cancel");
  };

  const handleContinue = () => {
    handleNextStep("IdentityVerification");
    addPersonalInfo({ principal: { contactDetails: { emailAddress: inputEmail } } });
  };

  return (
    <ContentPage
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      noBounce={true}
      subheading={EMAIL_VERIFICATION.HEADING}
      subtitle={EMAIL_VERIFICATION.SUBHEADING}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <CustomTextInput
          autoCapitalize="none"
          label={EMAIL_VERIFICATION.LABEL_EMAIL}
          onChangeText={setInputEmail}
          spaceToBottom={sh8}
          value={inputEmail}
        />
        <Text style={{ ...fs12RegBlack2, ...px(sw12) }}> {EMAIL_VERIFICATION.NOTE_LINK}</Text>
        <CustomSpacer space={sh32} />
        <View style={flexRow}>
          <Text style={fs16SemiBoldBlack2}>{EMAIL_VERIFICATION.LABEL_RESEND}</Text>
          <CustomSpacer isHorizontal={true} space={sw4} />
          <LinkText style={fs16SemiBoldBlue1} text={EMAIL_VERIFICATION.LINK_RESEND} />
        </View>
        <TextSpaceArea spaceToBottom={sh32} spaceToTop={sh16} style={fs12RegBlack2} text={EMAIL_VERIFICATION.NOTE_SPAM} />
      </View>
    </ContentPage>
  );
};

export const EmailVerification = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmailVerificationComponent);
