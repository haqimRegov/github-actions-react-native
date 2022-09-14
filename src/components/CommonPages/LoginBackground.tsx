import React, { Fragment, ReactNode, version } from "react";
import { Image, ImageStyle, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Language } from "../../constants";
import { DICTIONARY_LINK_PLATFORM_AGREEMENT, DICTIONARY_LINK_PRIVACY } from "../../data/dictionary";
import { RNInAppBrowser } from "../../integrations";
import {
  colorWhite,
  DEVICE,
  flexChild,
  flexGrow,
  flexRow,
  fs10RegGray3,
  fs10RegGray5,
  fs12BoldBlue1,
  imageContain,
  scaleHeight,
  sh32,
  sh64,
  sw1,
  sw16,
  sw160,
  sw164,
  sw168,
  sw24,
  sw48,
  sw532,
  sw56,
  sw72,
  sw8,
} from "../../styles";
import { LinkTextGroup, LinkTextProps } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer, TextSpaceArea } from "../Views";
import { SafeAreaPage } from "./SafeAreaPage";

const { LOGIN } = Language.PAGE;

interface LoginPageProps {
  children: ReactNode;
}

export const LoginBackground = ({ children }: LoginPageProps) => {
  const { bottom } = useSafeAreaInsets();
  const handlePrivacyPolicy = () => {
    RNInAppBrowser.openLink(DICTIONARY_LINK_PRIVACY);
  };

  const handlePlatformAgreement = () => {
    RNInAppBrowser.openLink(DICTIONARY_LINK_PLATFORM_AGREEMENT);
  };

  // const handleTermsAndConditions = () => {
  //   LinkUtils.openLink(DICTIONARY_LINK_TERMS);
  // };

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

  const bottomLinks: LinkTextProps[] = [
    {
      onPress: handlePlatformAgreement,
      text: LOGIN.LABEL_PLATFORM_AGREEMENT,
      style: fs12BoldBlue1,
    },
    {
      onPress: handlePrivacyPolicy,
      text: LOGIN.LINK_PRIVACY_POLICY,
      style: fs12BoldBlue1,
    },
  ];

  // if (page === "LOGIN") {
  //   bottomLinks.push(agentOnboardingLink);
  // }

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
              </View>
              <View style={flexRow}>
                <TextSpaceArea spaceToBottom={bottomSpace} style={fs10RegGray5} text={LOGIN.FOOTER_KIB} />
                <CustomSpacer isHorizontal space={sw72} />
                <TextSpaceArea spaceToBottom={bottomSpace} style={fs10RegGray3} text={`Build Version ${version}`} />
              </View>
            </View>
          </SafeAreaPage>
        </View>
      </ScrollView>
    </Fragment>
  );
};
