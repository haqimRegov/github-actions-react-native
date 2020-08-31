import React, { Fragment, useEffect, useState } from "react";
import { Text, TextStyle, View } from "react-native";

import { CustomButtonProps, CustomSpacer, CustomTextInput, ITextInputProps, LinkText, PasswordInfo, RoundedButton } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_OTP_EXPIRY } from "../../data/dictionary";
import { SAMPLE_EMAIL_OTP } from "../../mocks";
import {
  centerVertical,
  flexRow,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs12SemiBoldBlack2,
  fs16RegBlack2,
  fs24RegBlack2,
  fs40BoldBlack2,
  px,
  sh24,
  sh32,
  sh40,
  sh60,
  sh8,
  sw16,
  sw360,
  sw4,
  sw40,
  sw8,
} from "../../styles";
import { maskedString } from "../../utils";

const { LOGIN } = Language.PAGE;

interface PasswordRecoveryProps {
  setPasswordRecovery: (value: boolean) => void;
  setRootPage: (page: TypeLoginPages) => void;
}

export const PasswordRecovery = ({ setPasswordRecovery, setRootPage }: PasswordRecoveryProps) => {
  const [inputNRIC, setInputNRIC] = useState<string>("");
  const [inputOTP, setInputOTP] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputNewPassword, setInputNewPassword] = useState<string>("");
  const [inputRetypePassword, setInputRetypePassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [page, setPage] = useState<TypePage>("NRIC");
  const [emailOTP, setEmailOTP] = useState<IEmailOTP | undefined>(undefined);

  const [resendTimer, setResendTimer] = useState(DICTIONARY_OTP_EXPIRY);
  const maskedEmail = emailOTP !== undefined ? maskedString(emailOTP.email, 0, 4) : "";

  const handleCheckAgent = () => {
    // TODO integration
    setEmailOTP(SAMPLE_EMAIL_OTP);
    setPage("OTP");
  };

  const handleVerifyOTP = () => {
    // TODO integration
    setPage("PASSWORD");
  };

  const handelNewPassword = () => {
    // TODO integration
    setPasswordRecovery(true);
    setRootPage("LOGIN");
  };

  const handleResend = () => {
    // TODO integration
    setResendTimer(DICTIONARY_OTP_EXPIRY);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let input1Props: ITextInputProps = {
    label: LOGIN.LABEL_NRIC,
    maxLength: 12,
    onChangeText: setInputNRIC,
    secureTextEntry: false,
    keyboardType: "numeric",
    value: inputNRIC,
  };

  let input2Props: ITextInputProps = {
    label: LOGIN.LABEL_PASSWORD,
    onChangeText: setInputPassword,
    secureTextEntry: showPassword,
    spaceToTop: sh24,
    keyboardType: "default",
    value: inputPassword,
    rightIcon: showPassword ? "eye-show" : "eye-hide",
    rightIconPress: handleShowPassword,
    rightIconSize: sh24,
  };

  let buttonProps: CustomButtonProps = {
    disabled: inputNRIC === "",
    onPress: handleCheckAgent,
    buttonStyle: { width: sw360 },
    text: LOGIN.BUTTON_CONTINUE,
  };

  const subheadingStyle: TextStyle = page === "NRIC" ? fs24RegBlack2 : fs16RegBlack2;

  let pageTexts: IPageTexts = {
    heading: LOGIN.HEADING_RECOVERY,
    subheading: LOGIN.SUBHEADING_RECOVERY,
    subheadingStyle: { width: sw360, ...subheadingStyle },
  };

  if (page === "OTP") {
    buttonProps = {
      ...buttonProps,
      disabled: emailOTP !== undefined && emailOTP.otp !== inputOTP,
      onPress: handleVerifyOTP,
    };
    input1Props = {
      ...input1Props,
      label: LOGIN.LABEL_OTP,
      onChangeText: setInputOTP,
      value: inputOTP,
    };
    pageTexts = {
      ...pageTexts,
      heading: LOGIN.HEADING_RECOVERY,
      subheading: `${LOGIN.SUBHEADING_OTP} ${maskedEmail}`,
    };
  }

  if (page === "PASSWORD") {
    buttonProps = {
      ...buttonProps,
      disabled: inputNewPassword === "" || inputNewPassword !== inputRetypePassword,
      onPress: handelNewPassword,
    };
    input1Props = {
      ...input1Props,
      label: LOGIN.LABEL_NEW_PASSWORD,
      onChangeText: setInputNewPassword,
      rightIcon: showPassword ? "eye-show" : "eye-hide",
      rightIconPress: handleShowPassword,
      rightIconSize: sh24,
      secureTextEntry: showPassword,
      keyboardType: "default",
      value: inputNewPassword,
    };
    input2Props = {
      ...input2Props,
      label: LOGIN.LABEL_RETYPE_PASSWORD,
      onChangeText: setInputRetypePassword,
      value: inputRetypePassword,
    };
    pageTexts = {
      ...pageTexts,
      heading: LOGIN.HEADING_RECOVERY,
      subheading: LOGIN.SUBHEADING_PASSWORD,
    };
  }

  useEffect(() => {
    let otpTimer: number;
    if (page === "OTP" && resendTimer > 0) {
      otpTimer = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [page, resendTimer]);

  return (
    <View style={px(sw40)}>
      <CustomSpacer space={sh60} />
      <Text style={fs40BoldBlack2}>{pageTexts.heading}</Text>
      <CustomSpacer space={sh8} />
      <Text style={pageTexts.subheadingStyle}>{pageTexts.subheading}</Text>
      <CustomSpacer space={sh40} />
      {page === "PASSWORD" ? (
        <Fragment>
          <View style={{ ...centerVertical, ...flexRow, ...px(sw16) }}>
            <Text style={fs12BoldBlack2}>{input1Props.label}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
            <PasswordInfo />
          </View>
          <CustomSpacer space={sh8} />
        </Fragment>
      ) : null}
      <CustomTextInput {...input1Props} label={page === "PASSWORD" ? undefined : input1Props.label} />
      {page === "PASSWORD" ? <CustomTextInput {...input2Props} /> : null}
      <CustomSpacer space={sh32} />
      <RoundedButton {...buttonProps} />
      <CustomSpacer space={sh32} />
      {page === "OTP" ? (
        <View style={flexRow}>
          <Text style={fs12SemiBoldBlack2}>{LOGIN.LABEL_DID_NOT_GET}</Text>
          <CustomSpacer isHorizontal={true} space={sw4} />
          {resendTimer <= 0 ? (
            <LinkText onPress={handleResend} text={LOGIN.LABEL_RESEND_AGAIN} />
          ) : (
            <Text style={fs12RegBlack2}>{`${LOGIN.LABEL_RESEND} ${resendTimer} ${LOGIN.LABEL_SECONDS}`}</Text>
          )}
        </View>
      ) : null}
    </View>
  );
};
