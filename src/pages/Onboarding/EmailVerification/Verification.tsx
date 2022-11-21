import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { ColorCard, ContentPage, CustomSpacer, CustomTextInput, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { ERROR } from "../../../data/dictionary";
import {
  borderBottomGray2,
  flexRow,
  fs12BoldGray5,
  fs12RegGray5,
  fs16RegGray5,
  fs18BoldGray6,
  fsTransformNone,
  px,
  sh1,
  sh16,
  sh24,
  sh4,
  sh8,
  sw24,
  sw4,
} from "../../../styles";
import { isEmail } from "../../../utils";

const { EMAIL_VERIFICATION, INVESTOR_INFORMATION } = Language.PAGE;

declare interface VerificationProps {
  accountType: TypeAccountChoices;
  addPersonalInfo: (state: IPersonalInfoState) => void;
  handleCancel?: () => void;
  handleContinue: () => void;
  jointEmailCheck: boolean;
  jointError: string | undefined;
  personalInfo: IPersonalInfoState;
  principalError: string | undefined;
  resendTimer: number;
  setJointError: (value: string | undefined) => void;
  setPrincipalError: (value: string | undefined) => void;
}

export const Verification: FunctionComponent<VerificationProps> = ({
  accountType,
  addPersonalInfo,
  handleCancel,
  handleContinue,
  jointEmailCheck,
  jointError,
  personalInfo,
  principalError,
  resendTimer,
  setJointError,
  setPrincipalError,
}: VerificationProps) => {
  const { joint, principal } = personalInfo;
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

  const validateEmail = (value: string) => {
    if (isEmail(value) === false) {
      return ERROR.INVESTMENT_INVALID_EMAIL;
    }
    return undefined;
  };

  const checkPrincipalEmail = () => {
    setPrincipalError(validateEmail(inputPrincipalEmail));
  };

  const checkJointEmail = () => {
    if (inputJointEmail !== "" || jointEmailCheck === true) {
      setJointError(validateEmail(inputJointEmail));
    } else {
      setJointError(undefined);
    }
  };

  const disabled =
    jointEmailCheck === false
      ? inputPrincipalEmail === "" || principalError !== undefined || validateEmail(inputPrincipalEmail) !== undefined || resendTimer !== 0
      : inputPrincipalEmail === "" ||
        inputJointEmail === "" ||
        principalError !== undefined ||
        jointError !== undefined ||
        validateEmail(inputPrincipalEmail) !== undefined ||
        validateEmail(inputJointEmail) !== undefined ||
        resendTimer !== 0;
  const subtitle = jointEmailCheck === true ? EMAIL_VERIFICATION.SUBHEADING_JOINT : EMAIL_VERIFICATION.SUBHEADING;

  const principalLabel = accountType !== "Joint" ? EMAIL_VERIFICATION.ADD_EMAIL : EMAIL_VERIFICATION.ADD_EMAIL_PRINCIPAL;
  const otpLabel = resendTimer === 0 ? EMAIL_VERIFICATION.NOTE_LINK : EMAIL_VERIFICATION.LABEL_OTP_REQUEST;
  const resendMinutes = Math.floor(resendTimer / 60);
  const resendSeconds = resendTimer % 60 === 0 ? 0 : resendTimer % 60;
  const formattedResendSeconds = resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds;

  return (
    <ContentPage
      continueTextStyle={fsTransformNone}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      labelContinue={EMAIL_VERIFICATION.LABEL_GET_OTP}
      noBounce={false}
      subheading={EMAIL_VERIFICATION.HEADING}
      subheadingStyle={fs18BoldGray6}
      subtitle={subtitle}
      subtitleStyle={fs16RegGray5}
      spaceToTitle={sh1}
      continueDisabled={disabled}>
      <View style={px(sw24)}>
        <CustomSpacer isHorizontal={true} space={sw24} />
        <View>
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{
              label: principalLabel,
              title: EMAIL_VERIFICATION.CARD_EMAIL_TITLE,
            }}
            content={
              <Fragment>
                <CustomTextInput
                  autoCapitalize="none"
                  error={principalError}
                  keyboardType="email-address"
                  label={INVESTOR_INFORMATION.LABEL_EMAIL}
                  onBlur={checkPrincipalEmail}
                  onChangeText={setInputPrincipalEmail}
                  value={inputPrincipalEmail}
                />
                <TextSpaceArea spaceToTop={sh4} style={fs12RegGray5} text={otpLabel} />
                {resendTimer !== 0 ? (
                  <Fragment>
                    <CustomSpacer space={sh16} />
                    <View style={borderBottomGray2} />
                    <CustomSpacer space={sh16} />
                    <View style={flexRow}>
                      <Text style={fs12RegGray5}>{EMAIL_VERIFICATION.LABEL_PLEASE_TRY_AGAIN}</Text>
                      <CustomSpacer space={sw4} isHorizontal />
                      <Text style={fs12BoldGray5}>
                        {resendMinutes}:{formattedResendSeconds}
                      </Text>
                    </View>
                  </Fragment>
                ) : null}
              </Fragment>
            }
          />

          {accountType === "Joint" ? (
            <Fragment>
              <CustomSpacer space={sh24} />
              <ColorCard
                header={{ label: EMAIL_VERIFICATION.ADD_EMAIL_JOINT, title: INVESTOR_INFORMATION.CARD_TITLE_EMAIL }}
                content={
                  <Fragment>
                    <CustomTextInput
                      autoCapitalize="none"
                      error={jointError}
                      keyboardType="email-address"
                      label={INVESTOR_INFORMATION.LABEL_EMAIL}
                      onBlur={checkJointEmail}
                      onChangeText={setInputJointEmail}
                      value={inputJointEmail}
                    />
                    <TextSpaceArea spaceToTop={sh8} style={{ ...fs12RegGray5 }} text={otpLabel} />
                    {resendTimer !== 0 ? (
                      <Fragment>
                        <CustomSpacer space={sh16} />
                        <View style={borderBottomGray2} />
                        <CustomSpacer space={sh16} />
                        <View style={flexRow}>
                          <Text style={fs12RegGray5}>{EMAIL_VERIFICATION.LABEL_PLEASE_TRY_AGAIN}</Text>
                          <CustomSpacer space={sw4} isHorizontal />
                          <Text style={fs12BoldGray5}>
                            {resendMinutes}:{formattedResendSeconds}
                          </Text>
                        </View>
                      </Fragment>
                    ) : null}
                  </Fragment>
                }
              />
            </Fragment>
          ) : null}
        </View>
      </View>
    </ContentPage>
  );
};
