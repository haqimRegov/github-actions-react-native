import React, { FunctionComponent, useCallback, useEffect } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, LinkText, RoundedButton } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_OTP_EXPIRY, DICTIONARY_OTP_LENGTH, ERROR } from "../../../data/dictionary";
import { flexRow, fs12SemiBoldBlue2, fs16SemiBoldBlack2, fs40BoldBlack2, sh32, sh40, sh56, sh8, sw360, sw4 } from "../../../styles";
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
  setResendTimer,
  subheading,
}: OTPDetailsProps) => {
  const handleResendOTP = useCallback(() => {
    handleResend();
    setResendTimer(DICTIONARY_OTP_EXPIRY);
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
    let otpTimer: number;
    if (resendTimer > 0) {
      otpTimer = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [resendTimer, setResendTimer]);

  return (
    <View>
      <CustomSpacer space={sh56} />
      <Text style={fs40BoldBlack2}>{heading || LOGIN.HEADING_OTP}</Text>
      <CustomSpacer space={sh8} />
      <Text style={{ ...fs16SemiBoldBlack2, width: sw360 }}>{subheading || `${LOGIN.SUBHEADING_OTP} ${email}`}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput
        error={error}
        keyboardType="numeric"
        label={LOGIN.LABEL_OTP}
        maxLength={DICTIONARY_OTP_LENGTH}
        onBlur={handleValidateOTP}
        onChangeText={setInputOTP}
        placeholder={LOGIN.PLACEHOLDER_OTP}
        value={inputOTP}
      />
      <CustomSpacer space={sh32} />
      <RoundedButton buttonStyle={{ width: sw360 }} disabled={!isNumber(inputOTP)} onPress={handleContinue} text={LOGIN.BUTTON_CONTINUE} />
      <CustomSpacer space={sh32} />
      <View style={flexRow}>
        <Text style={fs12SemiBoldBlue2}>{LOGIN.LABEL_DID_NOT_GET}</Text>
        <CustomSpacer isHorizontal={true} space={sw4} />
        {resendTimer <= 0 ? (
          <LinkText onPress={handleResendOTP} text={LOGIN.LABEL_RESEND_OTP} />
        ) : (
          <Text style={fs12SemiBoldBlue2}>{`${LOGIN.LABEL_RESEND} ${resendMinutes}:${formattedResendSeconds}`}</Text>
        )}
      </View>
    </View>
  );
};
