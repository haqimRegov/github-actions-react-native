import React, { Fragment, ReactNode } from "react";
import { Image, ImageStyle, ScrollView, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { version } from "../../../package.json";
import { LocalAssets } from "../../assets/images/LocalAssets";
import { Language } from "../../constants";
import {
  border,
  colorBlue,
  colorWhite,
  DEVICE,
  flexChild,
  flexGrow,
  flexRow,
  fs12RegBlue1,
  fs12RegGray6,
  fs12SemiBoldBlue1,
  imageContain,
  px,
  scaleHeight,
  sh12,
  sh32,
  sh64,
  sw1,
  sw16,
  sw164,
  sw168,
  sw24,
  sw48,
  sw532,
  sw56,
  sw64,
  sw8,
} from "../../styles";
import { IconText, LinkTextGroup, LinkTextProps } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer, TextSpaceArea } from "../Views";
import { SafeAreaPage } from "./SafeAreaPage";

const { LOGIN } = Language.PAGE;

interface LoginPageProps {
  children: ReactNode;
  page?: TypeLoginPages;
  setPage: (page: TypeLoginPages) => void;
}

export const LoginBackground = ({ children, page, setPage }: LoginPageProps) => {
  const { bottom } = useSafeAreaInsets();
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
  //     style: fs12RegGray6,
  //     text: LOGIN.LANGUAGE_ENGLISH,
  //   },
  // ];

  // const agentOnboardingLink = {
  //   onPress: handleAgentOnboarding,
  //   text: LOGIN.LINK_AGENT_ONBOARDING,
  //   style: fs12SemiBoldBlue1,
  // };

  const backToLoginLink = {
    onPress: handleBackToLogin,
    text: LOGIN.LINK_BACK_TO_LOGIN,
    style: fs12SemiBoldBlue1,
  };

  const bottomLinks: LinkTextProps[] = [
    // {
    //   onPress: handlePrivacyPolicy,
    //   text: LOGIN.LINK_PRIVACY_POLICY,
    //   style: fs12SemiBoldBlue1,
    // },
    {
      text: `Build Version ${version}`,
      style: fs12RegGray6,
    },
  ];

  // if (page === "LOGIN") {
  //   bottomLinks.push(agentOnboardingLink);
  // }

  if (page === "PASSWORD_RECOVERY") {
    bottomLinks.push(backToLoginLink);
  }

  const backgroundStyle: ImageStyle = { width: sw532, height: DEVICE.WINDOW.HEIGHT };
  const logoStyle: ImageStyle = { ...imageContain, height: sh64, width: sw168 };
  const buttonStyle: ViewStyle = { ...border(colorBlue._1, sw1, sw24), ...px(sw16), width: sw164, height: sh32 };

  // issue with importing scaled size
  const bottomSpace = scaleHeight(24) + bottom;

  return (
    <Fragment>
      <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ ...flexRow, backgroundColor: colorWhite._1 }}>
          <View>
            <Image source={LocalAssets.login.background} style={backgroundStyle} />
          </View>
          <CustomSpacer isHorizontal={true} space={sw56} />
          <SafeAreaPage bottomBackgroundColor={colorWhite._1} topBackgroundColor={colorWhite._1}>
            <View style={flexChild}>
              <CustomSpacer space={sh32} />
              <View style={flexRow}>
                <CustomFlexSpacer />
                <TouchableWithoutFeedback>
                  <Image source={LocalAssets.logo.kenangaBrand} style={logoStyle} />
                </TouchableWithoutFeedback>
                {/* <View style={{ ...centerVertical, ...flexRow, height: sh16 }}>
                  <LinkTextGroup links={[]} spaceToDivider={sw4} />
                </View> */}
                <CustomSpacer isHorizontal={true} space={sw48} />
              </View>
              {children}
              <CustomFlexSpacer />
              <View style={flexRow}>
                <LinkTextGroup links={bottomLinks} style={{ minHeight: sh32 }} spaceToDivider={sw8} />
                {page === "LOGIN" ? (
                  <Fragment>
                    <CustomFlexSpacer />
                    <IconText
                      iconPosition="right"
                      name="profile"
                      onPress={handleAgentOnboarding}
                      style={buttonStyle}
                      text={LOGIN.LINK_AGENT_ONBOARDING}
                      textStyle={fs12RegBlue1}
                    />
                    <CustomSpacer isHorizontal={true} space={sw64} />
                  </Fragment>
                ) : null}
              </View>
              <TextSpaceArea spaceToBottom={bottomSpace} spaceToTop={sh12} style={fs12RegGray6} text={LOGIN.FOOTER_KIB} />
            </View>
          </SafeAreaPage>
        </View>
      </ScrollView>
    </Fragment>
  );
};
