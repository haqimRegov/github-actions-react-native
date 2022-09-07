import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, LinkText, RoundedButton } from "../../../components";
import { Language } from "../../../constants";
import { fs12BoldBlue1, fs24RegGray6, fs40BoldGray6, sh24, sh28, sh32, sh40, sh56, sh8, sw360 } from "../../../styles";
import { isNumber } from "../../../utils";

const { LOGIN } = Language.PAGE;

interface LoginDetailsProps {
  errorMessage?: string;
  handleForgotPassword: () => void;
  handleLogin: () => void;
  inputNRIC: string;
  inputPassword: string;
  nricErrorMessage?: string;
  passwordRecovery?: boolean;
  setInputNRIC: (value: string) => void;
  setInputPassword: (value: string) => void;
}

export const LoginDetails: FunctionComponent<LoginDetailsProps> = ({
  errorMessage,
  handleForgotPassword,
  handleLogin,
  inputNRIC,
  inputPassword,
  nricErrorMessage,
  passwordRecovery,
  setInputNRIC,
  setInputPassword,
}: LoginDetailsProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNric = (value: string) => {
    if (isNumber(value) || value === "") {
      setInputNRIC(value);
    }
  };

  const HEADING = passwordRecovery === true ? LOGIN.HEADING_DONE : LOGIN.HEADING_WELCOME;

  return (
    <Fragment>
      <View>
        <CustomSpacer space={sh56} />
        <Text style={fs40BoldGray6}>{HEADING}</Text>
        <CustomSpacer space={sh8} />
        <Text style={{ width: sw360, ...fs24RegGray6 }}>{LOGIN.SUBHEADING_LOGIN}</Text>
        <CustomSpacer space={sh40} />
        <CustomTextInput
          error={nricErrorMessage}
          keyboardType="numeric"
          label={LOGIN.LABEL_NRIC}
          maxLength={12}
          onChangeText={handleNric}
          secureTextEntry={false}
          value={inputNRIC}
        />
        <CustomTextInput
          error={errorMessage}
          keyboardType="default"
          label={LOGIN.LABEL_PASSWORD}
          onChangeText={setInputPassword}
          rightIcon={{ name: showPassword ? "eye-show" : "eye-hide", onPress: handleShowPassword }}
          secureTextEntry={showPassword}
          spaceToTop={sh24}
          value={inputPassword}
        />
        <CustomSpacer space={sh32} />
        <RoundedButton
          buttonStyle={{ width: sw360 }}
          disabled={inputNRIC === "" || inputPassword === ""}
          onPress={handleLogin}
          text={LOGIN.BUTTON_LOGIN}
          withDebounce={true}
        />
        <CustomSpacer space={sh28} />
        <LinkText onPress={handleForgotPassword} text={LOGIN.FORGOT_PASSWORD} style={fs12BoldBlue1} withUnderline={true} />
      </View>
    </Fragment>
  );
};
