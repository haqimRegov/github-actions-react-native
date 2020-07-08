import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useState } from "react";
import { Alert, Image, ImageStyle, ScrollView, Text, View } from "react-native";

import { LocalAssets } from "../assets/LocalAssets";
import {
  CheckBox,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  LinkText,
  LinkTextGroup,
  LinkTextProps,
  RoundedButton,
  SafeAreaPage,
} from "../components";
import { Language } from "../constants";
import {
  blueShadow,
  centerVertical,
  circle,
  colorBlack,
  colorWhite,
  DEVICE,
  flexChild,
  flexGrow,
  flexRow,
  fs12RegBlack2,
  fs12RegBlue,
  fs24RegBlack2,
  fs36SemiBoldBlack2,
  fsUppercase,
  px,
  py,
  sh12,
  sh14,
  sh16,
  sh23,
  sh30,
  sh32,
  sh56,
  sh70,
  sw16,
  sw167,
  sw24,
  sw278,
  sw4,
  sw56,
  sw590,
  sw73,
} from "../styles";

const { LOGIN } = Language.PAGE;

interface LoginPageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const LoginPage = ({ navigation }: LoginPageProps) => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [inputAgentCode, setInputAgentCode] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleForgotPassword = () => {
    navigation.navigate("Onboarding");
  };

  const handlePrivacyPolicy = () => {
    Alert.alert("PrivacyPolicy");
  };

  const handleTermsAndConditions = () => {
    Alert.alert("TermsAndConditions");
  };

  const handleFingerprint = () => {
    Alert.alert("handleFingerprint");
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = () => {
    navigation.navigate("AddClient");
  };

  const handleRiskAssessment = () => {
    navigation.navigate("Onboarding");
  };

  const topLinks: LinkTextProps[] = [
    {
      onPress: handleLogin,
      style: fsUppercase,
      text: LOGIN.LANGUAGE_BAHASA,
    },
    {
      onPress: handleRiskAssessment,
      style: fsUppercase,
      text: LOGIN.LANGUAGE_ENGLISH,
    },
  ];
  const bottomLinks: LinkTextProps[] = [
    {
      onPress: handlePrivacyPolicy,
      text: LOGIN.PRIVACY_POLICY,
    },
    {
      onPress: handleTermsAndConditions,
      text: LOGIN.TERMS_AND_CONDITIONS,
    },
  ];

  const backgroundStyle: ImageStyle = { width: sw590, height: DEVICE.WINDOW.HEIGHT };
  const logoStyle: ImageStyle = { height: sh70, width: sw167, resizeMode: "contain" };

  return (
    <Fragment>
      <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ ...flexRow, backgroundColor: colorWhite._1 }}>
          <View>
            <Image source={LocalAssets.login.background} style={backgroundStyle} />
          </View>
          <SafeAreaPage bottomBackgroundColor={colorWhite._1} topBackgroundColor={colorWhite._1}>
            <View style={{ ...flexChild, ...px(sw56), ...py(sh32) }}>
              <View style={flexRow}>
                <Image source={LocalAssets.logo.kenanga} style={logoStyle} />
                <CustomFlexSpacer />
                <View style={{ ...centerVertical, ...flexRow, height: sh16 }}>
                  <LinkTextGroup divider={<View style={circle(sw4, colorBlack._3)} />} links={topLinks} spaceToDivider={sw4} />
                </View>
              </View>
              <View style={px(sw16)}>
                <CustomSpacer space={sh56} />
                <Text style={fs36SemiBoldBlack2}>{LOGIN.HEADING}</Text>
                <Text style={fs24RegBlack2}>{LOGIN.SUBHEADING}</Text>
                <CustomTextInput label={LOGIN.LABEL_AGENT_CODE} onChangeText={setInputAgentCode} spaceToTop={sh14} value={inputAgentCode} />
                <CustomTextInput label={LOGIN.LABEL_PASSWORD} onChangeText={setInputPassword} spaceToTop={sh12} value={inputPassword} />
                <CustomSpacer space={sh30} />
                <View style={flexRow}>
                  <RoundedButton onPress={handleRiskAssessment} buttonStyle={{ width: sw278 }} text={LOGIN.BUTTON_LOGIN} />
                  <CustomSpacer isHorizontal={true} space={sw24} />
                  <IconButton name="fingerprint" onPress={handleFingerprint} style={blueShadow} />
                </View>
                <CustomSpacer space={sh23} />
                <View style={flexRow}>
                  <CheckBox label={LOGIN.REMEMBER_ME} onPress={handleRememberMe} toggle={rememberMe} />
                  <CustomSpacer isHorizontal={true} space={sw73} />
                  <LinkText onPress={handleForgotPassword} style={fs12RegBlack2} text={LOGIN.FORGOT_PASSWORD} />
                </View>
              </View>
              <CustomFlexSpacer />
              <View style={flexRow}>
                <LinkTextGroup divider={<Text style={fs12RegBlue}>|</Text>} links={bottomLinks} spaceToDivider={sw4} />
              </View>
            </View>
          </SafeAreaPage>
        </View>
      </ScrollView>
    </Fragment>
  );
};
