import { useNavigation } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { LocalAssets } from "../../../assets/LocalAssets";
import { ActionButtons, CustomFlexSpacer, CustomSpacer, CustomTextInput, LinkText, PromptModal, SafeAreaPage } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_OTP_COOL_OFF, DICTIONARY_OTP_EXPIRY, DICTIONARY_OTP_LENGTH, ERROR, ERROR_CODE } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
import { emailOtpVerification } from "../../../network-actions";
import {
  colorWhite,
  flexGrow,
  flexRow,
  fs16SemiBoldBlack2,
  fs16SemiBoldBlue1,
  fs24BoldBlack2,
  px,
  sh24,
  sh32,
  sh56,
  sh8,
  sw20,
  sw24,
  sw4,
} from "../../../styles";
import { isNumber } from "../../../utils";

const { EMAIL_VERIFICATION } = Language.PAGE;
declare interface EmailOTPProps {
  accountType: TypeAccountChoices;
  handleCancel?: () => void;
  handleNavigate: () => void;
  handleResend: () => void;
  jointEmail: string;
  jointEmailCheck: boolean;
  jointOtp: string;
  principalClientId: string;
  principalEmail: string;
  principalOtp: string;
  setJointOtp: (value: string) => void;
  setPage: (page: "verification" | "otp") => void;
  setPrincipalOtp: (value: string) => void;
}

export const EmailOTP: FunctionComponent<EmailOTPProps> = ({
  handleCancel,
  handleNavigate,
  handleResend,
  jointEmail,
  jointEmailCheck,
  jointOtp,
  principalClientId,
  principalEmail,
  principalOtp,
  setJointOtp,
  setPage,
  setPrincipalOtp,
}: EmailOTPProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [resendTimer, setResendTimer] = useState(DICTIONARY_OTP_EXPIRY);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [principalError, setPrincipalError] = useState<string | undefined>(undefined);
  const [jointError, setJointError] = useState<string | undefined>(undefined);

  const validateOtp = (value: string) => {
    if (isNumber(value) === false) {
      return ERROR.LOGIN_INVALID_OTP;
    }
    return undefined;
  };

  const checkPrincipalOtp = () => {
    setPrincipalError(validateOtp(principalOtp));
  };

  const checkJointOtp = () => {
    setJointError(validateOtp(jointOtp));
  };

  const handleVerifyOTP = async () => {
    setPrincipalError(undefined);
    const jointRequest = jointEmailCheck === true ? { email: jointEmail, code: jointOtp } : undefined;
    const request = {
      clientId: principalClientId,
      principalHolder: { email: principalEmail, code: principalOtp },
      jointHolder: jointRequest,
    };
    // eslint-disable-next-line no-console
    console.log("emailOtpVerification request", request);
    const response: IEmailOtpVerificationResponse = await emailOtpVerification(request, navigation);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        if (data.result.status === true) {
          setShowModal(true);
          setTimeout(() => {
            if (showModal === true) {
              setShowModal(false);
            }
            handleNavigate();
          }, 5000);
        }
      }
      if (error !== null) {
        setPrincipalError(error.message);
        setJointError(error.message);
        if (error.errorCode === ERROR_CODE.otpAttempt) {
          setResendTimer(DICTIONARY_OTP_COOL_OFF);
        }
      }
    }
    return true;
  };

  const handleResendOtp = () => {
    handleResend();
    setResendTimer(DICTIONARY_OTP_EXPIRY);
  };

  const handleBack = () => {
    setPage("verification");
  };

  const resendMinutes = Math.floor(resendTimer / 60);
  const resendSeconds = resendTimer % 60 === 0 ? 0 : resendTimer % 60;
  const formattedResendSeconds = resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds;
  const disabled = jointEmailCheck === false ? principalOtp === "" : principalOtp === "" || jointOtp === "";
  const principalOtpLabel = jointEmailCheck === true ? EMAIL_VERIFICATION.LABEL_OTP_PRINCIPAL : EMAIL_VERIFICATION.LABEL_OTP;
  const otpLabel =
    jointEmailCheck === true
      ? `${EMAIL_VERIFICATION.LABEL_OTP_SENT_JOINT} ${principalEmail} & ${jointEmail}.`
      : `${EMAIL_VERIFICATION.LABEL_OTP_SEND_TO} ${principalEmail}`;

  useEffect(() => {
    let otpTimer: ReturnType<typeof setTimeout>;
    if (resendTimer > 0) {
      otpTimer = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [resendTimer]);

  return (
    <SafeAreaPage>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ ...px(sw24), backgroundColor: colorWhite._4 }}>
        <CustomSpacer space={sh56} />
        <View style={flexRow}>
          <CustomSpacer space={sw4} />
          <View>
            <IcoMoon name="arrow-left" onPress={handleBack} size={sw20} />
          </View>
          <CustomSpacer isHorizontal={true} space={sw20} />
          <View>
            <Text style={fs24BoldBlack2}>{EMAIL_VERIFICATION.HEADING}</Text>
            <CustomSpacer space={sh8} />
            <Text style={fs16SemiBoldBlack2}>{otpLabel}</Text>
            <CustomSpacer space={sh24} />
            <CustomTextInput
              keyboardType="numeric"
              error={principalError}
              label={principalOtpLabel}
              maxLength={DICTIONARY_OTP_LENGTH}
              onBlur={checkPrincipalOtp}
              onChangeText={setPrincipalOtp}
              placeholder={EMAIL_VERIFICATION.LABEL_OTP_PLACEHOLDER}
              value={principalOtp}
            />
            <CustomSpacer space={sh32} />
            {jointEmailCheck === true || jointEmail !== "" ? (
              <Fragment>
                <CustomTextInput
                  keyboardType="numeric"
                  error={jointError}
                  label={EMAIL_VERIFICATION.LABEL_OTP_JOINT}
                  onBlur={checkJointOtp}
                  maxLength={DICTIONARY_OTP_LENGTH}
                  onChangeText={setJointOtp}
                  placeholder={EMAIL_VERIFICATION.LABEL_OTP_PLACEHOLDER}
                  value={jointOtp}
                />
                <CustomSpacer space={sh32} />
              </Fragment>
            ) : null}
            <View style={flexRow}>
              <Text style={fs16SemiBoldBlack2}>{EMAIL_VERIFICATION.LABEL_RESEND}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              {resendTimer <= 0 ? (
                <LinkText onPress={handleResendOtp} style={fs16SemiBoldBlue1} text={EMAIL_VERIFICATION.LINK_RESEND} />
              ) : (
                <Text style={fs16SemiBoldBlack2}>{`${EMAIL_VERIFICATION.LABEL_RESEND_IN} ${resendMinutes}:${formattedResendSeconds}`}</Text>
              )}
            </View>
          </View>
        </View>

        <CustomFlexSpacer />
        <CustomSpacer space={sh56} />
        <ActionButtons
          continueDisabled={disabled}
          labelContinue={EMAIL_VERIFICATION.LABEL_VERIFY}
          handleCancel={handleCancel}
          handleContinue={handleVerifyOTP}
        />
        <CustomSpacer space={sh56} />
      </ScrollView>
      <PromptModal
        handleContinue={handleNavigate}
        illustration={LocalAssets.illustration.emailVerified}
        label={EMAIL_VERIFICATION.LABEL_EMAIL_VERIFIED}
        title={EMAIL_VERIFICATION.LABEL_EMAIL_VERIFIED_TITLE}
        visible={showModal}
      />
    </SafeAreaPage>
  );
};
