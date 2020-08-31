import React, { Fragment, useEffect, useState } from "react";
import { Text, View } from "react-native";

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
  sh16,
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
interface FirstTimeLoginProps {
  setPasswordRecovery: (value: boolean) => void;
  setRootPage: (page: TypeLoginPages) => void;
}

export const FirstTimeLogin = ({ setPasswordRecovery, setRootPage }: FirstTimeLoginProps) => {
  const [emailOTP, setEmailOTP] = useState<IEmailOTP | undefined>(undefined);
  const [inputNRIC, setInputNRIC] = useState<string>("");
  const [inputOTP, setInputOTP] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputNewPassword, setInputNewPassword] = useState<string>("");
  const [inputRetypePassword, setInputRetypePassword] = useState<string>("");
  const [page, setPage] = useState<TypePage>("NRIC");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [resendTimer, setResendTimer] = useState(DICTIONARY_OTP_EXPIRY);
  const maskedEmail = emailOTP !== undefined ? maskedString(emailOTP.email, 0, 4) : "";

  const handleExistingLogin = () => {
    setRootPage("LOGIN");
    setPasswordRecovery(false);
  };

  const handelNewPassword = () => {
    setRootPage("LOGIN");
    setPasswordRecovery(true);
  };

  const handleCheckAgent = () => {
    // TODO integration
    setEmailOTP(SAMPLE_EMAIL_OTP);
    setPage("OTP");
  };

  const handleVerifyOTP = () => {
    // TODO integration
    setPage("PASSWORD");
  };

  const handleResend = () => {
    setResendTimer(DICTIONARY_OTP_EXPIRY);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let baseInput1Props: ITextInputProps = {
    label: LOGIN.LABEL_NRIC,
    maxLength: 12,
    onChangeText: setInputNRIC,
    secureTextEntry: false,
    keyboardType: "numeric",
    value: inputNRIC,
  };

  let baseInput2Props: ITextInputProps = {
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

  let baseButtonProps: CustomButtonProps = {
    disabled: inputNRIC === "",
    onPress: handleCheckAgent,
    buttonStyle: { width: sw360 },
    text: LOGIN.BUTTON_CONTINUE,
  };

  let pageTexts: IPageTexts = {
    heading: LOGIN.HEADING_WELCOME,
    subheading: LOGIN.SUBHEADING_FIRST_TIME,
    subheadingStyle: { width: sw360, ...fs24RegBlack2 },
  };

  if (page === "OTP") {
    baseButtonProps = {
      ...baseButtonProps,
      disabled: emailOTP !== undefined && emailOTP.otp !== inputOTP,
      onPress: handleVerifyOTP,
    };
    baseInput1Props = {
      ...baseInput1Props,
      keyboardType: "numeric",
      label: LOGIN.LABEL_OTP,
      maxLength: 6,
      onChangeText: setInputOTP,
      value: inputOTP,
    };
    pageTexts = {
      ...pageTexts,
      heading: LOGIN.HEADING_OTP,
      subheading: `${LOGIN.SUBHEADING_OTP} ${maskedEmail}`,
      subheadingStyle: {
        ...pageTexts.subheadingStyle,
        ...fs16RegBlack2,
      },
    };
  }

  if (page === "PASSWORD") {
    baseButtonProps = {
      ...baseButtonProps,
      disabled: inputNewPassword === "" || inputNewPassword !== inputRetypePassword,
      onPress: handelNewPassword,
    };
    baseInput1Props = {
      ...baseInput1Props,
      label: LOGIN.LABEL_NEW_PASSWORD,
      onChangeText: setInputNewPassword,
      rightIcon: showPassword ? "eye-show" : "eye-hide",
      rightIconPress: handleShowPassword,
      rightIconSize: sh24,
      secureTextEntry: showPassword,
      keyboardType: "default",
      value: inputNewPassword,
    };
    baseInput2Props = {
      ...baseInput2Props,
      label: LOGIN.LABEL_RETYPE_PASSWORD,
      onChangeText: setInputRetypePassword,
      value: inputRetypePassword,
    };
    pageTexts = {
      ...pageTexts,
      heading: LOGIN.HEADING_PASSWORD,
      subheading: LOGIN.SUBHEADING_PASSWORD,
      subheadingStyle: {
        ...pageTexts.subheadingStyle,
        ...fs24RegBlack2,
      },
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
            <Text style={fs12BoldBlack2}>{baseInput1Props.label}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
            <PasswordInfo />
          </View>
          <CustomSpacer space={sh8} />
        </Fragment>
      ) : null}
      <CustomTextInput {...baseInput1Props} label={page === "PASSWORD" ? undefined : baseInput1Props.label} />
      {page === "PASSWORD" ? (
        <Fragment>
          <CustomTextInput {...baseInput2Props} />
        </Fragment>
      ) : null}
      <CustomSpacer space={sh32} />
      <RoundedButton {...baseButtonProps} />
      <CustomSpacer space={sh32} />
      {page === "NRIC" ? <LinkText onPress={handleExistingLogin} text={LOGIN.LABEL_ALREADY} style={{ height: sh16 }} /> : null}
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
