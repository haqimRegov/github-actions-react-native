import { useNavigation } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { LocalAssets } from "../../../assets/images/LocalAssets";
import { ActionButtons, CustomFlexSpacer, CustomSpacer, CustomTextInput, LinkText, PromptModal, SafeAreaPage } from "../../../components";
import { Language, OTP_CONFIG } from "../../../constants";
import { ERROR, ERROR_CODE } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
import { emailOtpVerification } from "../../../network-actions";
import {
  centerHorizontal,
  colorBlue,
  flexGrow,
  flexRow,
  fs16SemiBoldBlue8,
  fs16SemiBoldGray6,
  fs24BoldGray6,
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
  details?: IClientDetailsState;
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
  details,
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
  const fetching = useRef<boolean>(false);
  const [resendTimer, setResendTimer] = useState(OTP_CONFIG.EXPIRY);
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

  const handleFetching = (loading: boolean) => {
    fetching.current = loading;
  };

  const handleVerifyOTP = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setPrincipalError(undefined);
      const jointRequest = jointEmailCheck === true ? { email: jointEmail, code: jointOtp } : undefined;
      const request: IEmailOtpVerificationRequest = {
        initId: details!.initId!,
        isForceUpdate: false,
        clientId: principalClientId,
        principalHolder: { email: principalEmail, code: principalOtp },
        jointHolder: jointRequest,
      };
      const response: IEmailOtpVerificationResponse = await emailOtpVerification(request, navigation, handleFetching);
      fetching.current = false;
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          if (data.result.status === true) {
            setShowModal(true);
          }
        }
        if (error !== null) {
          setPrincipalError(error.message);
          setJointError(error.message);
          if (error.errorCode === ERROR_CODE.otpAttempt) {
            setResendTimer(OTP_CONFIG.COOL_OFF);
          }
        }
      }
    }
    return true;
  };

  const handleResendOtp = () => {
    handleResend();
    setResendTimer(OTP_CONFIG.EXPIRY);
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

  useEffect(() => {
    let redirectTimer: ReturnType<typeof setTimeout>;
    if (showModal === true) {
      redirectTimer = setTimeout(() => {
        handleNavigate();
      }, 5000);
    }
    return () => {
      return clearTimeout(redirectTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  return (
    <SafeAreaPage>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ ...px(sw24), backgroundColor: colorBlue._2 }}>
        <CustomSpacer space={sh56} />
        <View style={flexRow}>
          <CustomSpacer space={sw4} />
          <View style={{ ...centerHorizontal, height: sh32 }}>
            <IcoMoon name="arrow-left" onPress={handleBack} size={sw20} suppressHighlighting={true} />
          </View>
          <CustomSpacer isHorizontal={true} space={sw20} />
          <View>
            <Text style={fs24BoldGray6}>{EMAIL_VERIFICATION.HEADING}</Text>
            <CustomSpacer space={sh8} />
            <Text style={fs16SemiBoldGray6}>{otpLabel}</Text>
            <CustomSpacer space={sh24} />
            <CustomTextInput
              keyboardType="numeric"
              error={principalError}
              label={principalOtpLabel}
              maxLength={OTP_CONFIG.LENGTH}
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
                  maxLength={OTP_CONFIG.LENGTH}
                  onChangeText={setJointOtp}
                  placeholder={EMAIL_VERIFICATION.LABEL_OTP_PLACEHOLDER}
                  value={jointOtp}
                />
                <CustomSpacer space={sh32} />
              </Fragment>
            ) : null}
            <View style={flexRow}>
              <Text style={fs16SemiBoldGray6}>{EMAIL_VERIFICATION.LABEL_RESEND}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              {resendTimer <= 0 ? (
                <LinkText onPress={handleResendOtp} style={fs16SemiBoldBlue8} text={EMAIL_VERIFICATION.LINK_RESEND} />
              ) : (
                <Text style={fs16SemiBoldGray6}>{`${EMAIL_VERIFICATION.LABEL_RESEND_IN} ${resendMinutes}:${formattedResendSeconds}`}</Text>
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
