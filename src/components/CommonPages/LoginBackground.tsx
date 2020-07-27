import React, { Fragment, ReactNode } from "react";
import { Alert, Image, ImageStyle, ScrollView, Text, View } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { Language } from "../../constants";
import {
  centerVertical,
  circle,
  colorBlack,
  colorWhite,
  DEVICE,
  flexChild,
  flexGrow,
  flexRow,
  fs12RegBlue1,
  fsUppercase,
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
}

export const LoginBackground = ({ children }: LoginPageProps) => {
  const handlePrivacyPolicy = () => {
    // TODO
    Alert.alert("PrivacyPolicy");
  };

  const handleTermsAndConditions = () => {
    // TODO
    Alert.alert("TermsAndConditions");
  };

  const topLinks: LinkTextProps[] = [
    {
      onPress: undefined,
      style: fsUppercase,
      text: LOGIN.LANGUAGE_BAHASA,
    },
    {
      onPress: undefined,
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
                  <LinkTextGroup divider={<View style={circle(sw4, colorBlack._2)} />} links={topLinks} spaceToDivider={sw4} />
                </View>
                <CustomSpacer isHorizontal={true} space={sw56} />
              </View>
              {children}
              <CustomFlexSpacer />
              <View style={flexRow}>
                <LinkTextGroup divider={<Text style={fs12RegBlue1}>|</Text>} links={bottomLinks} spaceToDivider={sw4} />
              </View>
            </View>
          </SafeAreaPage>
        </View>
      </ScrollView>
    </Fragment>
  );
};
