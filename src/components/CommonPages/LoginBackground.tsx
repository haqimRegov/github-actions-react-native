import React, { Fragment, ReactNode } from "react";
import { Image, ImageStyle, ScrollView, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { version } from "../../../package.json";
import { LocalAssets } from "../../assets/LocalAssets";
import { Language } from "../../constants";
import {
  border,
  colorBlue,
  colorWhite,
  DEVICE,
  flexChild,
  flexGrow,
  flexRow,
  fs12SemiBoldBlue2,
  fs12SemiBoldGray8,
  px,
  sh32,
  sh56,
  sh64,
  sw1,
  sw16,
  sw160,
  sw165,
  sw24,
  sw48,
  sw532,
  sw56,
  sw64,
  sw8,
} from "../../styles";
import { IconText, LinkTextGroup, LinkTextProps } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "../Views";
import { SafeAreaPage } from "./SafeAreaPage";

const { LOGIN } = Language.PAGE;

interface LoginPageProps {
  children: ReactNode;
  page?: TypeLoginPages;
  setPage: (page: TypeLoginPages) => void;
}

export const LoginBackground = ({ children, page, setPage }: LoginPageProps) => {
  // const handlePrivacyPolicy = () => {
  //   LinkUtils.openLink(DICTIONARY_LINK_PRIVACY);
  // };

  // const handleTermsAndConditions = () => {
  //   LinkUtils.openLink(DICTIONARY_LINK_TERMS);
  // };

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
    style: fs12SemiBoldBlue2,
  };

  const backToLoginLink = {
    onPress: handleBackToLogin,
    text: LOGIN.LINK_BACK_TO_LOGIN,
    style: fs12SemiBoldBlue2,
  };

  const bottomLinks: LinkTextProps[] = [
    // {
    //   onPress: handlePrivacyPolicy,
    //   text: LOGIN.LINK_PRIVACY_POLICY,
    //   style: fs12SemiBoldBlue2,
    // },
    {
      text: `Build Version ${version}`,
      style: fs12SemiBoldGray8,
    },
  ];

  // if (page === "LOGIN") {
  //   bottomLinks.push(agentOnboardingLink);
  // }

  if (page === "PASSWORD_RECOVERY") {
    bottomLinks.push(backToLoginLink);
  }

  const backgroundStyle: ImageStyle = { width: sw532, height: DEVICE.WINDOW.HEIGHT };
  const logoStyle: ImageStyle = { height: sh64, width: sw160, resizeMode: "contain" };
  const buttonStyle: ViewStyle = { ...border(colorBlue._2, sw1, sw24), ...px(sw16), width: sw165, height: sh32 };

  return (
    <Fragment>
      <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ ...flexRow, backgroundColor: colorWhite._1 }}>
          <View>
            <Image source={LocalAssets.login.background} style={backgroundStyle} />
          </View>
          <CustomSpacer isHorizontal={true} space={sw56} />
          <SafeAreaPage barStyle="dark-content" bottomBackgroundColor={colorWhite._1} topBackgroundColor={colorWhite._1}>
            <View style={flexChild}>
              <CustomSpacer space={sh32} />
              <View style={flexRow}>
                <CustomFlexSpacer />
                <TouchableWithoutFeedback>
                  <Image source={LocalAssets.logo.kenanga} style={logoStyle} />
                </TouchableWithoutFeedback>
                {/* <View style={{ ...centerVertical, ...flexRow, height: sh16 }}>
                  <LinkTextGroup links={[]} spaceToDivider={sw4} />
                </View> */}
                <CustomSpacer isHorizontal={true} space={sw48} />
              </View>
              {children}
              <CustomFlexSpacer />
              <View style={flexRow}>
                <LinkTextGroup links={bottomLinks} spaceToDivider={sw8} />
                {page === "LOGIN" ? (
                  <Fragment>
                    <CustomFlexSpacer />
                    <IconText
                      color={colorBlue._2}
                      iconPosition="right"
                      name="profile"
                      onPress={handleAgentOnboarding}
                      text={LOGIN.LINK_AGENT_ONBOARDING}
                      style={buttonStyle}
                    />
                    <CustomSpacer isHorizontal={true} space={sw64} />
                  </Fragment>
                ) : null}
              </View>
              <CustomSpacer space={sh56} />
            </View>
          </SafeAreaPage>
        </View>
      </ScrollView>
    </Fragment>
  );
};
