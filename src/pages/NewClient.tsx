import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, ImageStyle, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../assets/LocalAssets";
import { CustomSpacer, CustomTextInput, RadioButton, RoundedButton, SafeAreaPage } from "../components";
import { Language } from "../constants";
import {
  centerHV,
  centerVertical,
  circle,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs12SemiBoldBlack2,
  fs16SemiBoldBlack2,
  fs16SemiBoldGray8,
  fs16SemiBoldWhite,
  fs18SemiBoldBlack2,
  fs24RegBlack2,
  fs36SemiBoldBlack2,
  px,
  py,
  sh10,
  sh16,
  sh20,
  sh24,
  sh273,
  sh30,
  sh32,
  sh376,
  sh56,
  sh60,
  sh70,
  sh8,
  sh96,
  sw10,
  sw12,
  sw126,
  sw16,
  sw20,
  sw32,
  sw36,
  sw498,
  sw96,
} from "../styles";

interface PageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

const pageTexts = Language.PAGE.NEW_CLIENT;

export const NewClientPage = ({ navigation }: PageProps) => {
  const [radioNRIC, setRadioNRIC] = useState<boolean>(true);
  const [radioPassport, setRadioPassport] = useState<boolean>(false);

  // Stylings
  const logoStyle: ImageStyle = { height: sh60, resizeMode: "contain", width: sw126 };

  const uploadIconBigStyle: ImageStyle = {
    resizeMode: "contain",
    width: sw96,
  };

  const uploadIconSmallStyle: ImageStyle = {
    height: sh20,
    resizeMode: "contain",
    width: sw16,
  };

  const cardStyle: ViewStyle = {
    ...px(sw32),
    ...py(sh32),
    backgroundColor: colorWhite._1,
    borderRadius: sh10,
    height: sh376,
  };
  const cardInfoStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw36),
    backgroundColor: colorWhite._1,
    borderRadius: sh10,
    height: sh70,
  };

  const innerCardStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorGray._7,
    borderColor: colorGray._8,
    borderRadius: sh10,
    borderStyle: "dashed",
    borderWidth: 1,
    height: sh273,
  };

  // Handlers
  const handleStart = () => {
    navigation.navigate("Onboarding");
  };

  const handleNric = () => {
    setRadioNRIC(!radioNRIC);
  };

  const handlePassport = () => {
    setRadioPassport(!radioPassport);
  };

  return (
    <SafeAreaPage bottomBackgroundColor={colorGray._3} topBackgroundColor={colorGray._3}>
      <View style={{ ...flexChild, backgroundColor: colorGray._3 }}>
        <CustomSpacer space={sh30} />
        <View style={px(sw36)}>
          <Image source={LocalAssets.logo.kenanga} style={logoStyle} />
        </View>
        <CustomSpacer space={sh96} />
        <View style={{ ...flexRow, ...px(sw96) }}>
          <View>
            <Text style={fs36SemiBoldBlack2}>{pageTexts.HELLO}</Text>
            <Text style={fs24RegBlack2}>{pageTexts.HELLO_LINE2}</Text>
            <CustomSpacer space={sh24} />
            <View style={px(sw12)}>
              <Text style={fs12SemiBoldBlack2}>{pageTexts.ID_TYPE}</Text>
              <CustomSpacer space={sh8} />
              <View style={{ ...centerVertical, ...flexRow }}>
                <RadioButton selected={radioNRIC} setSelected={handleNric} label={pageTexts.NRIC} />
                <CustomSpacer isHorizontal={true} space={sh56} />
                <RadioButton selected={radioPassport} setSelected={handlePassport} label={pageTexts.NRIC} />
              </View>
            </View>
            <CustomSpacer space={sh16} />
            <CustomTextInput label={pageTexts.NAME_LABEL} labelStyle={fs12SemiBoldBlack2} onChangeText={undefined} spaceToLabel={sh10} />
            <CustomSpacer space={sh20} />
            <CustomTextInput label={pageTexts.NRIC_LABEL} labelStyle={fs12SemiBoldBlack2} onChangeText={undefined} spaceToLabel={sh10} />
            <CustomSpacer space={sh30} />
            <RoundedButton onPress={handleStart} text={pageTexts.BUTTON_TEXT} />
          </View>
          <View style={{ ...centerHV, ...flexChild, ...flexRow }}>
            <Text style={fs18SemiBoldBlack2}>{pageTexts.OR}</Text>
          </View>
          <View style={{ width: sw498 }}>
            <View style={cardStyle}>
              <View style={{ ...flexChild, ...flexRow }}>
                <CustomSpacer isHorizontal={true} space={sw10} />
                <Image source={LocalAssets.newClient.uploadICSmall} style={uploadIconSmallStyle} />
                <CustomSpacer isHorizontal={true} space={sh20} />
                <Text style={fs16SemiBoldBlack2}>{pageTexts.UPLOAD_IC}</Text>
              </View>
              <View style={innerCardStyle}>
                <Image source={LocalAssets.newClient.uploadICBig} style={uploadIconBigStyle} />
                <CustomSpacer space={sh32} />
                <Text style={fs16SemiBoldBlack2}>{pageTexts.UPLOAD_DOCUMENT}</Text>
                <CustomSpacer space={sh8} />
                <Text style={fs16SemiBoldGray8}>{pageTexts.UPLOAD_DOCUMENT_HINT}</Text>
              </View>
            </View>
            <CustomSpacer space={sh30} />
            <View style={cardInfoStyle}>
              <View style={{ ...centerHV, ...circle(sw20, colorBlue._4) }}>
                <Text style={fs16SemiBoldWhite}>i</Text>
              </View>
              <CustomSpacer isHorizontal={true} space={sw10} />
              <Text style={fs16SemiBoldBlack2}>{pageTexts.UPLOAD_DOCUMENT_GUIDE}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaPage>
  );
};
