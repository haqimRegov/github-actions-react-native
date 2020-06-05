import React from "react";
import { Alert, Image, ImageStyle, Text, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { LocalAssets } from "../assets/LocalAssets";
import { CustomFlexSpacer, CustomSpacer, CustomTextInput, LinkText, RoundedButton, SafeAreaPage } from "../components";
import { Language } from "../constants";
import {
  alignSelfCenter,
  centerHV,
  centerVertical,
  colorWhite,
  flexChild,
  flexRow,
  fs13MedBlue2,
  fs24MedBlack,
  fsAlignCenter,
  px,
  sh10,
  sh11,
  sh23,
  sh24,
  sh32,
  sh44,
  sh80,
  shadow,
  sw200,
  sw304,
  sw80,
} from "../styles";

const { INPUT_AGENT_CODE, INPUT_PASSWORD, BUTTON_LOGIN, FORGOT_PASSWORD, TITLE, PRIVACY_TERMS } = Language.PAGE.LOGIN;

export const LoginPage = () => {
  const container: ViewStyle = { ...centerHV, ...flexChild, backgroundColor: colorWhite._1 };
  const formContainer: ViewStyle = { ...px(sw80), ...shadow, backgroundColor: colorWhite._1 };
  const inputStyle: ViewStyle = { minWidth: sw304 };
  const logoStyle: ImageStyle = { ...alignSelfCenter, height: sh80, resizeMode: "contain", width: sw200 };

  const handleLogin = () => {
    Alert.alert("Login");
  };

  const handleForgotPassword = () => {
    Alert.alert("ForgotPassword");
  };

  const handlePrivacyTerms = () => {
    Alert.alert("PrivacyTerms");
  };

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={container} keyboardShouldPersistTaps="handled">
        <View style={formContainer}>
          <CustomSpacer space={sh23} />
          <Image source={LocalAssets.logo.kib} style={logoStyle} />
          <CustomSpacer space={sh11} />
          <Text style={{ ...fs24MedBlack, ...fsAlignCenter }}>{TITLE}</Text>
          <CustomSpacer space={sh10} />
          <LinkText onPress={handlePrivacyTerms} style={{ ...fs13MedBlue2, ...fsAlignCenter }} text={PRIVACY_TERMS} />
          <CustomSpacer space={sh44} />
          <CustomTextInput placeholder={INPUT_AGENT_CODE} viewStyle={inputStyle} />
          <CustomSpacer space={sh24} />
          <CustomTextInput placeholder={INPUT_PASSWORD} secureTextEntry={true} viewStyle={inputStyle} />
          <CustomSpacer space={sh32} />
          <View style={{ ...flexRow, ...centerVertical }}>
            <LinkText onPress={handleForgotPassword} text={FORGOT_PASSWORD} />
            <CustomFlexSpacer />
            <RoundedButton onPress={handleLogin} text={BUTTON_LOGIN} />
          </View>
          <CustomSpacer space={sh80} />
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
};
