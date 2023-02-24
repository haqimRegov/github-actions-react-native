import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { AccountHeader, ColorCard, ContentPage, CustomSpacer, CustomTextInput } from "../../../components";
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
  sw24,
  sw4,
} from "../../../styles";
import { isEmail } from "../../../utils";

const { EMAIL_VERIFICATION, INVESTOR_INFORMATION } = Language.PAGE;

declare interface VerificationProps {
  accountType: TypeAccountChoices;
  addPersonalInfo: (state: IPersonalInfoState) => void;
  checkIsEdit?: boolean;
  handleCancel?: () => void;
  handleContinue: () => void;
  handleNavigate: () => void;
  isEtbJoint: boolean;
  isEtbPrincipal: boolean;
  jointAgeCheck: boolean;
  jointEmail: string;
  jointEmailCheck: boolean;
  jointError: string | undefined;
  personalInfo: IPersonalInfoState;
  principalEmail: string;
  principalError: string | undefined;
  resendTimer: number;
  setJointEmail: (value: string) => void;
  setJointError: (value: string | undefined) => void;
  setPrincipalEmail: (value: string) => void;
  setPrincipalError: (value: string | undefined) => void;
}

export const Verification: FunctionComponent<VerificationProps> = ({
  accountType,
  checkIsEdit,
  handleCancel,
  handleContinue,
  handleNavigate,
  isEtbJoint,
  isEtbPrincipal,
  jointAgeCheck,
  jointEmail,
  jointEmailCheck,
  jointError,
  personalInfo,
  principalEmail,
  principalError,
  resendTimer,
  setJointEmail,
  setJointError,
  setPrincipalEmail,
  setPrincipalError,
}: VerificationProps) => {
  const { joint, principal, editMode } = personalInfo;

  const setInputPrincipalEmail = (value: string) => setPrincipalEmail(value);

  const setInputJointEmail = (value: string) => setJointEmail(value);

  const validateEmail = (value: string) => {
    if (isEmail(value) === false) {
      return ERROR.INVESTMENT_INVALID_EMAIL;
    }
    return undefined;
  };

  const checkPrincipalEmail = () => {
    setPrincipalError(validateEmail(principalEmail));
  };

  const checkJointEmail = () => {
    if (jointEmail !== "" || jointEmailCheck === true) {
      setJointError(validateEmail(jointEmail));
    } else {
      setJointError(undefined);
    }
  };

  const checkSkippable = isEtbPrincipal === true && jointAgeCheck === false;
  const checkMinor = jointAgeCheck === false && isEtbPrincipal === true;
  const disabled =
    jointEmailCheck === false && checkMinor === false
      ? principalEmail === "" || principalError !== undefined || validateEmail(principalEmail) !== undefined || resendTimer !== 0
      : (isEtbPrincipal === false &&
          (principalEmail === "" || principalError !== undefined || validateEmail(principalEmail) !== undefined)) ||
        jointEmail === "" ||
        jointError !== undefined ||
        validateEmail(jointEmail) !== undefined ||
        resendTimer !== 0;

  const principalLabel = accountType !== "Joint" ? EMAIL_VERIFICATION.ADD_EMAIL : EMAIL_VERIFICATION.ADD_EMAIL_PRINCIPAL;
  const resendMinutes = Math.floor(resendTimer / 60);
  const resendSeconds = resendTimer % 60 === 0 ? 0 : resendTimer % 60;
  const formattedResendSeconds = resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds;
  const jointLabel =
    accountType === "Joint" && jointAgeCheck === false
      ? `${INVESTOR_INFORMATION.LABEL_EMAIL} ${EMAIL_VERIFICATION.LABEL_OPTIONAL}`
      : INVESTOR_INFORMATION.LABEL_EMAIL;

  const checkContinueLabel =
    editMode === true && checkIsEdit !== undefined && checkIsEdit ? EMAIL_VERIFICATION.LABEL_CONTINUE : EMAIL_VERIFICATION.LABEL_GET_OTP;

  return (
    <ContentPage
      continueTextStyle={fsTransformNone}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      handleSkip={handleNavigate}
      skippable={checkSkippable}
      labelContinue={checkContinueLabel}
      noBounce={false}
      subheading={EMAIL_VERIFICATION.HEADING}
      subheadingStyle={fs18BoldGray6}
      subtitle={EMAIL_VERIFICATION.SUBHEADING}
      subtitleStyle={fs16RegGray5}
      spaceToTitle={sh1}
      continueDisabled={disabled}>
      <View style={px(sw24)}>
        <CustomSpacer isHorizontal={true} space={sw24} />
        <View>
          {isEtbPrincipal === false ? (
            <Fragment>
              <CustomSpacer space={sh24} />
              {accountType === "Joint" ? (
                <AccountHeader title={EMAIL_VERIFICATION.LABEL_PRINCIPAL_HOLDER} subtitle={principal?.personalDetails?.name!} />
              ) : null}
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
                      value={principalEmail}
                    />
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
          {accountType === "Joint" && isEtbJoint === false ? (
            <Fragment>
              <CustomSpacer space={sh24} />
              <AccountHeader title={EMAIL_VERIFICATION.LABEL_JOINT_HOLDER} subtitle={joint?.personalDetails?.name!} />
              <ColorCard
                header={{ label: EMAIL_VERIFICATION.ADD_EMAIL_JOINT, title: EMAIL_VERIFICATION.CARD_EMAIL_TITLE }}
                content={
                  <Fragment>
                    <CustomTextInput
                      autoCapitalize="none"
                      error={jointError}
                      keyboardType="email-address"
                      label={jointLabel}
                      onBlur={checkJointEmail}
                      onChangeText={setInputJointEmail}
                      value={jointEmail}
                    />
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
