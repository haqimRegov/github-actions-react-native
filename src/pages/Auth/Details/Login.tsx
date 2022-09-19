import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, LinkText, RoundedButton } from "../../../components";
import { Language } from "../../../constants";
import {
  borderBottomBlue3,
  flexRow,
  fs12BoldBlue8,
  fs12RegGray5,
  fs24RegGray6,
  fs40BoldGray6,
  sh16,
  sh24,
  sh32,
  sh4,
  sh40,
  sh72,
  sw128,
  sw360,
  sw4,
  sw68,
  sw80,
} from "../../../styles";
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
  setPage: (page: TypeLoginPages) => void;
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
  setPage,
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

  const handleAgentOnboarding = () => {
    setPage("FIRST_TIME_LOGIN");
  };

  return (
    <Fragment>
      <View>
        <CustomSpacer space={sh72} />
        <Text style={fs40BoldGray6}>{HEADING}</Text>
        <CustomSpacer space={sh4} />
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
        <CustomSpacer space={sh32} />
        <LinkText onPress={handleForgotPassword} text={LOGIN.FORGOT_PASSWORD} style={{ ...fs12BoldBlue8, marginLeft: sw128 }} />
        {passwordRecovery === false ? (
          <Fragment>
            <View style={{ ...borderBottomBlue3, marginRight: sw68, marginTop: sh16, marginBottom: sh16 }} />
            <View style={{ ...flexRow, marginLeft: sw80 }}>
              <Text style={fs12RegGray5}>{LOGIN.LABEL_FIRST_TIME_HERE}</Text>
              <CustomSpacer isHorizontal space={sw4} />
              <LinkText style={fs12BoldBlue8} onPress={handleAgentOnboarding} text={LOGIN.LINK_AGENT_ONBOARDING} />
            </View>
          </Fragment>
        ) : null}
      </View>
    </Fragment>
  );
};
