import React, { FunctionComponent, useCallback, useEffect } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, LinkText, RoundedButton } from "../../../components";
import { Language, OTP_CONFIG } from "../../../constants";
import { ERROR } from "../../../data/dictionary";
import {
  borderBottomBlue3,
  centerHorizontal,
  centerVertical,
  flexRow,
  fs12BoldBlue8,
  fs12RegGray5,
  fs16SemiBoldGray6,
  fs40BoldGray6,
  sh16,
  sh32,
  sh4,
  sh40,
  sh72,
  sw360,
  sw4,
} from "../../../styles";
import { isNumber } from "../../../utils";

const { LOGIN } = Language.PAGE;

interface OTPDetailsProps {
  email: string;
  error?: string;
  handleResend: () => void;
  handleSubmit: () => void;
  heading?: string;
  inputOTP: string;
  resendTimer: number;
  setError: (value?: string) => void;
  setInputOTP: (value: string) => void;
  setPage: (TypeLoginPages) => void;
  setResendTimer: (time: number) => void;
  subheading?: string;
}

export const OTPDetails: FunctionComponent<OTPDetailsProps> = ({
  email,
  error,
  handleResend,
  handleSubmit,
  heading,
  inputOTP,
  resendTimer,
  setError,
  setInputOTP,
  setPage,
  setResendTimer,
  subheading,
}: OTPDetailsProps) => {
  const handleResendOTP = useCallback(() => {
    handleResend();
    setResendTimer(OTP_CONFIG.EXPIRY);
  }, [handleResend, setResendTimer]);

  const handleValidateOTP = () => {
    if (!isNumber(inputOTP)) {
      return setError(ERROR.LOGIN_INVALID_OTP);
    }
    return setError(undefined);
  };

  const handleContinue = () => {
    handleSubmit();
  };

  const resendMinutes = Math.floor(resendTimer / 60);
  const resendSeconds = resendTimer % 60 === 0 ? 0 : resendTimer % 60;
  const formattedResendSeconds = resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds;

  useEffect(() => {
    let otpTimer: ReturnType<typeof setTimeout>;
    if (resendTimer > 0) {
      otpTimer = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [resendTimer, setResendTimer]);

  const handleBackToLogin = () => {
    setPage("LOGIN");
  };

  return (
    <View>
      <CustomSpacer space={sh72} />
      <Text style={fs40BoldGray6}>{heading || LOGIN.HEADING_OTP}</Text>
      <CustomSpacer space={sh4} />
      <Text style={{ ...fs16SemiBoldGray6, width: sw360 }}>{subheading || `${LOGIN.SUBHEADING_OTP} ${email}`}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput
        error={error}
        keyboardType="numeric"
        label={LOGIN.LABEL_OTP}
        maxLength={OTP_CONFIG.LENGTH}
        onBlur={handleValidateOTP}
        onChangeText={setInputOTP}
        placeholder={LOGIN.PLACEHOLDER_OTP}
        value={inputOTP}
      />
      <CustomSpacer space={sh32} />
      <RoundedButton
        buttonStyle={{ width: sw360 }}
        disabled={!isNumber(inputOTP)}
        onPress={handleContinue}
        text={LOGIN.BUTTON_CONTINUE}
        withDebounce={true}
      />
      <CustomSpacer space={sh32} />
      <View style={{ ...flexRow, ...centerHorizontal, width: sw360 }}>
        <Text style={fs12RegGray5}>{LOGIN.LABEL_DID_NOT_GET}</Text>
        <CustomSpacer isHorizontal={true} space={sw4} />
        {resendTimer <= 0 ? (
          <LinkText onPress={handleResendOTP} text={LOGIN.LABEL_RESEND_OTP} style={fs12BoldBlue8} />
        ) : (
          <Text style={fs12RegGray5}>{`${LOGIN.LABEL_RESEND} ${resendMinutes}:${formattedResendSeconds}`}</Text>
        )}
      </View>
      <CustomSpacer space={sh16} />
      <View style={{ ...borderBottomBlue3, width: sw360 }} />
      <CustomSpacer space={sh16} />
      <View style={{ ...centerVertical, width: sw360 }}>
        <LinkText onPress={handleBackToLogin} text={LOGIN.LINK_BACK_TO_LOGIN} style={fs12BoldBlue8} />
      </View>
    </View>
  );
};
