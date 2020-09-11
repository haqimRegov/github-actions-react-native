import { useNavigation } from "@react-navigation/native";
import React, { Fragment, ReactNode } from "react";
import { Alert, Image, ImageStyle, ScrollView, View } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { Language } from "../../constants";
import {
  centerVertical,
  colorWhite,
  DEVICE,
  flexChild,
  flexGrow,
  flexRow,
  py,
  sh16,
  sh56,
  sh64,
  sw16,
  sw160,
  sw4,
  sw532,
  sw56,
} from "../../styles";
import { LinkTextGroup, LinkTextProps } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "../Views";
import { SafeAreaPage } from "./SafeAreaPage";

const { LOGIN } = Language.PAGE;

interface LoginPageProps {
  children: ReactNode;
  page?: TypeLoginPages;
  setPage: (page: TypeLoginPages) => void;
}

export const LoginBackground = ({ children, page, setPage }: LoginPageProps) => {
  const navigation = useNavigation();
  const handlePrivacyPolicy = () => {
    // TODO
    navigation.navigate("Dashboard");
  };

  const handleTermsAndConditions = () => {
    // TODO
    Alert.alert("TermsAndConditions");
  };

  const handleAgentOnboarding = () => {
    setPage("FIRST_TIME_LOGIN");
  };

  const handleBackToLogin = () => {
    setPage("LOGIN");
  };

  // TODO Module 1A will only support English language
  // const topLinks: LinkTextProps[] = [
  //   {
  //     onPress: undefined,
  //     style: fsUppercase,
  //     text: LOGIN.LANGUAGE_BAHASA,
  //   },
  //   {
  //     onPress: undefined,
  //     style: fs12RegBlack2,
  //     text: LOGIN.LANGUAGE_ENGLISH,
  //   },
  // ];

  const agentOnboardingLink = {
    onPress: handleAgentOnboarding,
    text: LOGIN.LINK_AGENT_ONBOARDING,
  };

  const backToLoginLink = {
    onPress: handleBackToLogin,
    text: LOGIN.LINK_BACK_TO_LOGIN,
  };

  const bottomLinks: LinkTextProps[] = [
    {
      onPress: handlePrivacyPolicy,
      text: LOGIN.LINK_PRIVACY_POLICY,
    },
    {
      onPress: handleTermsAndConditions,
      text: LOGIN.LINK_TERMS_AND_CONDITIONS,
    },
  ];

  if (page === "LOGIN") {
    bottomLinks.push(agentOnboardingLink);
  }

  if (page === "PASSWORD_RECOVERY") {
    bottomLinks.push(backToLoginLink);
  }

  const backgroundStyle: ImageStyle = { width: sw532, height: DEVICE.WINDOW.HEIGHT };
  const logoStyle: ImageStyle = { height: sh64, width: sw160, resizeMode: "contain" };

  return (
    <Fragment>
      <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ ...flexRow, backgroundColor: colorWhite._1 }}>
          <View>
            <Image source={LocalAssets.login.background} style={backgroundStyle} />
          </View>
          <CustomSpacer isHorizontal={true} space={sw16} />
          <SafeAreaPage bottomBackgroundColor={colorWhite._1} topBackgroundColor={colorWhite._1}>
            <View style={{ ...flexChild, ...py(sh56) }}>
              <View style={flexRow}>
                <Image source={LocalAssets.logo.kenanga_investors} style={logoStyle} />
                <CustomFlexSpacer />
                <View style={{ ...centerVertical, ...flexRow, height: sh16 }}>
                  <LinkTextGroup links={[]} spaceToDivider={sw4} />
                </View>
                <CustomSpacer isHorizontal={true} space={sw56} />
              </View>
              {children}
              <CustomFlexSpacer />
              <View style={flexRow}>
                <LinkTextGroup links={bottomLinks} spaceToDivider={sw4} />
              </View>
            </View>
          </SafeAreaPage>
        </View>
      </ScrollView>
    </Fragment>
  );
};
