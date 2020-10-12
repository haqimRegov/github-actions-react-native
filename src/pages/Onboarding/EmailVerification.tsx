import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, CustomTextInput, LinkText, TextSpaceArea } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_OTP_EXPIRY } from "../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../store";
import { flexRow, fs12RegBlack2, fs16SemiBoldBlack2, fs16SemiBoldBlue1, px, sh16, sh24, sh32, sh8, sw12, sw24, sw4 } from "../../styles";

const { EMAIL_VERIFICATION } = Language.PAGE;

interface EmailVerificationProps extends OnboardingContentProps, PersonalInfoStoreProps {}

const EmailVerificationComponent: FunctionComponent<EmailVerificationProps> = ({
  accountType,
  addPersonalInfo,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
}: EmailVerificationProps) => {
  const [resendTimer, setResendTimer] = useState(DICTIONARY_OTP_EXPIRY);
  const handleResend = () => {
    setResendTimer(DICTIONARY_OTP_EXPIRY);
  };

  useEffect(() => {
    let otpTimer: number;
    if (resendTimer > 0) {
      otpTimer = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [resendTimer]);

  const { joint, principal } = personalInfo!;

  const inputPrincipalEmail = principal!.contactDetails!.emailAddress!;
  const inputJointEmail = joint!.contactDetails!.emailAddress!;

  const setInputPrincipalEmail = (value: string) =>
    addPersonalInfo({
      ...personalInfo,
      principal: { ...principal, contactDetails: { ...principal?.contactDetails, emailAddress: value } },
    });

  const setInputJointEmail = (value: string) =>
    addPersonalInfo({
      ...personalInfo,
      joint: { ...joint, contactDetails: { ...joint?.contactDetails, emailAddress: value } },
    });

  const handleContinue = () => {
    handleNextStep("IdentityVerification");
  };

  const principalEmailLabel = accountType === "Individual" ? EMAIL_VERIFICATION.LABEL_EMAIL : EMAIL_VERIFICATION.LABEL_EMAIL_PRINCIPAL;

  return (
    <ContentPage
      handleCancel={handleCancelOnboarding!}
      handleContinue={handleContinue}
      noBounce={true}
      subheading={EMAIL_VERIFICATION.HEADING}
      subtitle={EMAIL_VERIFICATION.SUBHEADING}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <CustomTextInput
          autoCapitalize="none"
          label={principalEmailLabel}
          onChangeText={setInputPrincipalEmail}
          spaceToBottom={sh8}
          value={inputPrincipalEmail}
        />
        <Text style={{ ...fs12RegBlack2, ...px(sw12) }}> {EMAIL_VERIFICATION.NOTE_LINK}</Text>
        {accountType === "Individual" ? null : (
          <Fragment>
            <CustomSpacer space={sh32} />
            <CustomTextInput
              autoCapitalize="none"
              label={EMAIL_VERIFICATION.LABEL_EMAIL_JOINT}
              onChangeText={setInputJointEmail}
              spaceToBottom={sh8}
              value={inputJointEmail}
            />
            <Text style={{ ...fs12RegBlack2, ...px(sw12) }}> {EMAIL_VERIFICATION.NOTE_LINK}</Text>
          </Fragment>
        )}
        <CustomSpacer space={sh32} />
        <View style={flexRow}>
          <Text style={fs16SemiBoldBlack2}>{EMAIL_VERIFICATION.LABEL_RESEND}</Text>
          <CustomSpacer isHorizontal={true} space={sw4} />
          {resendTimer <= 0 ? (
            <LinkText onPress={handleResend} style={fs16SemiBoldBlue1} text={EMAIL_VERIFICATION.LINK_RESEND} />
          ) : (
            <Text
              style={fs16SemiBoldBlack2}>{`${EMAIL_VERIFICATION.LABEL_RESEND_IN} ${resendTimer} ${EMAIL_VERIFICATION.LABEL_SECONDS}`}</Text>
          )}
        </View>
        <TextSpaceArea spaceToBottom={sh32} spaceToTop={sh16} style={fs12RegBlack2} text={EMAIL_VERIFICATION.NOTE_SPAM} />
      </View>
    </ContentPage>
  );
};

export const EmailVerification = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmailVerificationComponent);
