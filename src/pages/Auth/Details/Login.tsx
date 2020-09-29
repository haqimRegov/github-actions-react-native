import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, LinkText, RoundedButton } from "../../../components";
import { Language } from "../../../constants";
import { fs24RegBlack2, fs40BoldBlack2, px, sh24, sh28, sh32, sh40, sh56, sh8, sw360, sw40 } from "../../../styles";

const { LOGIN } = Language.PAGE;

interface LoginDetailsProps {
  errorMessage?: string;
  handleForgotPassword: () => void;
  handleLogin: () => void;
  inputNRIC: string;
  inputPassword: string;
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
  passwordRecovery,
  setInputNRIC,
  setInputPassword,
}: LoginDetailsProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const HEADING = passwordRecovery === true ? LOGIN.HEADING_DONE : LOGIN.HEADING_WELCOME;

  return (
    <Fragment>
      <View style={px(sw40)}>
        <CustomSpacer space={sh56} />
        <Text style={fs40BoldBlack2}>{HEADING}</Text>
        <CustomSpacer space={sh8} />
        <Text style={{ width: sw360, ...fs24RegBlack2 }}>{LOGIN.SUBHEADING_LOGIN}</Text>
        <CustomSpacer space={sh40} />
        <CustomTextInput
          keyboardType="numeric"
          label={LOGIN.LABEL_NRIC}
          maxLength={12}
          onChangeText={setInputNRIC}
          secureTextEntry={false}
          value={inputNRIC}
        />
        <CustomTextInput
          error={errorMessage}
          keyboardType={"default"}
          label={LOGIN.LABEL_PASSWORD}
          onChangeText={setInputPassword}
          rightIcon={showPassword ? "eye-show" : "eye-hide"}
          rightIconPress={handleShowPassword}
          rightIconSize={sh24}
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
        />
        <CustomSpacer space={sh28} />
        <LinkText onPress={handleForgotPassword} text={LOGIN.FORGOT_PASSWORD} />
      </View>
    </Fragment>
  );
};
