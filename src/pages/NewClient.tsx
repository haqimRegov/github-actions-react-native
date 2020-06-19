import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, ImageStyle, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../assets/LocalAssets";
import { CustomSpacer, CustomTextInput, RoundedButton, SafeAreaPage } from "../components";
import { Language } from "../constants";
import {
  centerHV,
  centerVertical,
  circle,
  circleBorder,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs12RegBlack2,
  fs12SemiBoldBlack2,
  fs16SemiBoldBlack2,
  fs16SemiBoldGrey6,
  fs16SemiBoldWhite,
  fs18SemiBoldBlack2,
  fs24RegBlack2,
  fs36SemiBoldBlack2,
  px,
  py,
  sh1,
  sh10,
  sh12,
  sh20,
  sh24,
  sh273,
  sh30,
  sh376,
  sh4,
  sh50,
  sh56,
  sh70,
  sh90,
  sh96,
  sw10,
  sw150,
  sw16,
  sw18,
  sw20,
  sw278,
  sw30,
  sw433,
  sw498,
  sw70,
  sw96,
} from "../styles";

interface PageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

const pageTexts = Language.PAGE.NEW_CLIENT;

export const NewClientPage = ({ navigation }: PageProps) => {
  // Stylings
  const logoStyle: ImageStyle = {
    height: sh50,
    marginLeft: sw18,
    resizeMode: "contain",
    width: sw150,
  };

  const uploadIconBigStyle: ImageStyle = {
    height: sh90,
    marginLeft: sw10,
    resizeMode: "contain",
    width: sw70,
  };

  const uploadIconSmallStyle: ImageStyle = {
    height: sh20,
    marginLeft: sw10,
    resizeMode: "contain",
    width: sw16,
  };

  const cardStyle: ViewStyle = {
    ...px(sw30),
    ...py(sh30),
    backgroundColor: colorWhite._1,
    borderRadius: sh10,
    height: sh376,
    width: sw498,
  };
  const cardInfoStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw20),
    ...py(sh20),
    backgroundColor: colorWhite._1,
    borderRadius: sh10,
    height: sh70,
    width: sw498,
  };
  const innerCardStyle: ViewStyle = {
    ...centerHV,
    ...px(sw20),
    ...py(sh20),
    backgroundColor: colorGray._5,
    borderColor: colorGray._4,
    borderRadius: sh10,
    borderStyle: "dashed",
    borderWidth: 1,
    height: sh273,
    width: sw433,
  };

  // Handlers
  const handleStart = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <SafeAreaPage>
      <View style={{ ...flexChild, backgroundColor: colorGray._3 }}>
        <CustomSpacer space={sh30} />
        <Image source={LocalAssets.logo.kenanga} style={logoStyle} />
        <CustomSpacer space={sh96} />
        <View style={{ ...flexRow, ...px(sw96) }}>
          <View>
            <View style={flexChild}>
              <Text style={fs36SemiBoldBlack2}>{pageTexts.HELLO}</Text>
              <Text style={fs24RegBlack2}>{pageTexts.HELLO_LINE2}</Text>
              <CustomSpacer space={sh24} />
              <Text style={fs12SemiBoldBlack2}>{pageTexts.ID_TYPE}</Text>
              <View style={{ ...centerVertical, ...flexRow }}>
                <View style={{ ...circleBorder(sh20, sh4, colorBlue._1, colorWhite._1) }} />
                <CustomSpacer space={sw10} isHorizontal={true} />
                <Text style={{ ...fs12RegBlack2, ...py(sh10) }}>{pageTexts.NRIC}</Text>
                <CustomSpacer isHorizontal={true} space={sh56} />
                <View style={{ ...circleBorder(sh20, sh1, colorGray._1, colorWhite._1) }} />
                <CustomSpacer space={sw10} isHorizontal={true} />
                <Text style={{ ...fs12RegBlack2, ...py(sh10) }}>{pageTexts.PASSPORT}</Text>
              </View>
              <CustomTextInput
                label={pageTexts.NAME_LABEL}
                labelStyle={fs12SemiBoldBlack2}
                onChangeText={undefined}
                spaceToLabel={sh10}
                spaceToTop={sh12}
              />
              <CustomTextInput
                label={pageTexts.NRIC_LABEL}
                labelStyle={fs12SemiBoldBlack2}
                onChangeText={undefined}
                spaceToLabel={sh10}
                spaceToTop={sh20}
              />
              <CustomSpacer space={sh30} />
              <RoundedButton onPress={handleStart} buttonStyle={{ width: sw278 }} text={pageTexts.BUTTON_TEXT} />
            </View>
          </View>
          <View style={{ ...flexChild, ...flexRow, ...centerHV }}>
            <Text style={fs18SemiBoldBlack2}>{pageTexts.OR}</Text>
          </View>
          <View>
            <View style={cardStyle}>
              <View style={{ ...flexChild, ...flexRow }}>
                <Image source={LocalAssets.newClient.uploadICSmall} style={uploadIconSmallStyle} />
                <CustomSpacer space={sh20} isHorizontal={true} />
                <Text style={fs16SemiBoldBlack2}>{pageTexts.UPLOAD_IC}</Text>
              </View>
              <View style={innerCardStyle}>
                <Image source={LocalAssets.newClient.uploadICBig} style={uploadIconBigStyle} />
                <CustomSpacer space={sh30} />
                <Text style={fs16SemiBoldBlack2}>{pageTexts.UPLOAD_DOCUMENT}</Text>
                <CustomSpacer space={sh20} />
                <Text style={fs16SemiBoldGrey6}>{pageTexts.UPLOAD_DOCUMENT_HINT}</Text>
              </View>
            </View>
            <CustomSpacer space={sh30} />
            <View style={cardInfoStyle}>
              <View style={{ ...circle(sw20, colorBlue._4), ...centerHV }}>
                <Text style={fs16SemiBoldWhite}>{"i"}</Text>
              </View>
              <CustomSpacer space={sw10} isHorizontal={true} />
              <Text style={fs16SemiBoldBlack2}>{pageTexts.UPLOAD_DOCUMENT_GUIDE}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaPage>
  );
};
