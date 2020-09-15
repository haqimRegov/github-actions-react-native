import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, LinkText, RoundedButton } from "../../components";
import { Language } from "../../constants";
import { updateStorageData } from "../../integrations";
import { fs24RegBlack2, fs40BoldBlack2, px, sh24, sh28, sh32, sh40, sh60, sh8, sw360, sw40 } from "../../styles";

const { LOGIN } = Language.PAGE;

interface NormalLoginProps {
  navigation: IStackNavigationProp;
  passwordRecovery?: boolean;
  setRootPage: (page: TypeLoginPages) => void;
}

export const NormalLogin = ({ navigation, passwordRecovery, setRootPage }: NormalLoginProps) => {
  const [inputNRIC, setInputNRIC] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleForgotPassword = () => {
    setRootPage("PASSWORD_RECOVERY");
  };

  const handleLogin = async () => {
    // TODO integration
    await updateStorageData("visited", true);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      }),
    );
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const HEADING = passwordRecovery === true ? LOGIN.HEADING_DONE : LOGIN.HEADING_WELCOME;

  return (
    <View style={px(sw40)}>
      <CustomSpacer space={sh60} />
      <Text style={fs40BoldBlack2}>{HEADING}</Text>
      <CustomSpacer space={sh8} />
      <Text style={{ width: sw360, ...fs24RegBlack2 }}>{LOGIN.SUBHEADING_LOGIN}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput
        keyboardType={"numeric"}
        label={LOGIN.LABEL_NRIC}
        maxLength={12}
        onChangeText={setInputNRIC}
        secureTextEntry={false}
        value={inputNRIC}
      />
      <CustomTextInput
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
  );
};
