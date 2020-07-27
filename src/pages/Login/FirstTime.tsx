import React, { Fragment, useState } from "react";
import { Text, View } from "react-native";

import { CustomButtonProps, CustomSpacer, CustomTextInput, ITextInputProps, LinkText, RoundedButton } from "../../components";
import { Language } from "../../constants";
import { SAMPLE_EMAIL_OTP } from "../../mocks";
import { fs16RegBlack2, fs24BoldBlack2, fs40BoldBlack2, px, sh16, sh24, sh28, sh32, sh40, sh60, sh8, sw360, sw40 } from "../../styles";
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

  const maskedEmail = emailOTP !== undefined ? maskedString(emailOTP.email, 0, 4) : "";

  const handleExistingLogin = () => {
    setRootPage("LOGIN");
    setPasswordRecovery(false);
  };

  const handelNewPassword = () => {
    setRootPage("LOGIN");
    setPasswordRecovery(true);
  };

  const handleNRICNew = () => {
    // TODO integration
    setEmailOTP(SAMPLE_EMAIL_OTP);
    setPage("OTP");
  };

  const handleOTP = (value?: string) => {
    if (emailOTP !== undefined && emailOTP.otp === value) {
      setPage("PASSWORD");
    }
    if (value !== undefined) {
      setInputOTP(value);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let baseInput1Props: ITextInputProps = {
    label: LOGIN.LABEL_NRIC,
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
    onPress: handleNRICNew,
    buttonStyle: { width: sw360 },
    text: LOGIN.BUTTON_CONTINUE,
  };

  let pageTexts: IPageTexts = {
    heading: LOGIN.HEADING_WELCOME,
    subheading: LOGIN.SUBHEADING_FIRST_TIME,
    subheadingStyle: { width: sw360, ...fs24BoldBlack2 },
  };

  if (page === "OTP") {
    baseButtonProps = {
      ...baseButtonProps,
      disabled: emailOTP !== undefined && emailOTP.otp !== inputOTP,
      onPress: handleOTP,
    };
    baseInput1Props = {
      ...baseInput1Props,
      label: LOGIN.LABEL_OTP,
      onChangeText: handleOTP,
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
        ...fs16RegBlack2,
      },
    };
  }

  return (
    <View style={px(sw40)}>
      <CustomSpacer space={sh60} />
      <Text style={fs40BoldBlack2}>{pageTexts.heading}</Text>
      <CustomSpacer space={sh8} />
      <Text style={pageTexts.subheadingStyle}>{pageTexts.subheading}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput {...baseInput1Props} />
      {page === "PASSWORD" ? (
        <Fragment>
          <CustomTextInput {...baseInput2Props} />
        </Fragment>
      ) : null}
      <CustomSpacer space={sh32} />
      <RoundedButton {...baseButtonProps} />
      <CustomSpacer space={sh28} />
      {page === "NRIC" ? <LinkText onPress={handleExistingLogin} text={LOGIN.LABEL_ALREADY} style={{ height: sh16 }} /> : null}
    </View>
  );
};
