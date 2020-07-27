import React, { useState } from "react";
import { Text, TextStyle, View } from "react-native";

import { CustomButtonProps, CustomSpacer, CustomTextInput, ITextInputProps, RoundedButton } from "../../components";
import { Language } from "../../constants";
import { SAMPLE_EMAIL_OTP } from "../../mocks";
import { fs16RegBlack2, fs24BoldBlack2, fs40BoldBlack2, px, sh24, sh32, sh40, sh60, sh8, sw360, sw40 } from "../../styles";
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

  const maskedEmail = emailOTP !== undefined ? maskedString(emailOTP.email, 0, 4) : "";

  const handleNRICRecovery = () => {
    // TODO integration
    setEmailOTP(SAMPLE_EMAIL_OTP);
    setPage("OTP");
  };

  const handleOTPRecovery = (value?: string) => {
    if (emailOTP !== undefined && emailOTP.otp === value) {
      setPage("PASSWORD");
    }
    if (value !== undefined) {
      setInputOTP(value);
    }
  };

  const handelNewPassword = () => {
    // TODO integration
    setPasswordRecovery(true);
    setRootPage("LOGIN");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let input1Props: ITextInputProps = {
    label: LOGIN.LABEL_NRIC,
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
    onPress: handleNRICRecovery,
    buttonStyle: { width: sw360 },
    text: LOGIN.BUTTON_CONTINUE,
  };

  const subheadingStyle: TextStyle = page === "NRIC" ? fs24BoldBlack2 : fs16RegBlack2;

  let pageTexts: IPageTexts = {
    heading: LOGIN.HEADING_RECOVERY,
    subheading: LOGIN.SUBHEADING_RECOVERY,
    subheadingStyle: { width: sw360, ...subheadingStyle },
  };

  if (page === "OTP") {
    buttonProps = {
      ...buttonProps,
      disabled: emailOTP !== undefined && emailOTP.otp !== inputOTP,
      onPress: handleOTPRecovery,
    };
    input1Props = {
      ...input1Props,
      label: LOGIN.LABEL_OTP,
      onChangeText: handleOTPRecovery,
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

  return (
    <View style={px(sw40)}>
      <CustomSpacer space={sh60} />
      <Text style={fs40BoldBlack2}>{pageTexts.heading}</Text>
      <CustomSpacer space={sh8} />
      <Text style={pageTexts.subheadingStyle}>{pageTexts.subheading}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput {...input1Props} />
      {page === "PASSWORD" ? <CustomTextInput {...input2Props} /> : null}
      <CustomSpacer space={sh32} />
      <RoundedButton {...buttonProps} />
    </View>
  );
};
