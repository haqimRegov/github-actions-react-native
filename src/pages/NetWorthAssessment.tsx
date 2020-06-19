import * as React from "react";
import { Text, View, ViewStyle, Image, Alert, ImageStyle, TextStyle } from "react-native";

import { LocalAssets } from "../assets/LocalAssets";
import {
  centerVertical,
  colorGray,
  colorWhite,
  flexRow,
  fs12BoldBlack4,
  fs16RegBlack2,
  fs16RegBlack4,
  fs24RegBlack2,
  fs32SemiBoldBlack4,
  fs36SemiBoldBlack2,
  fullHeight,
  fullWidth,
  px,
  sh16,
  sh184,
  sh24,
  sh40,
  sh48,
  sh60,
  sh72,
  sh8,
  sh91,
  sw126,
  sw16,
  sw24,
  sw240,
  sw36,
  sw400,
  sw96,
} from "../styles";
import { CustomSpacer, CustomFlexSpacer, CheckBox, RoundedButton } from "../components";
import { Language } from "../constants";
import { ONBOARDING } from "./Onboarding";

const { HEADING } = Language.PAGE.ONBOARDING;
const {
  ANSWER_1,
  ANSWER_2,
  ANSWER_3,
  BEFORE_WE_CONTINUE,
  BUTTON_SKIP_RISK_ASSESSMENT,
  BUTTON_TAKE_RISK_ASSESSMENT,
  HELLO,
  QUESTION,
  STEP,
} = Language.PAGE.NET_WORTH_ASSESSMENT;
const USER_NAME: string = "Edgar";
const HELLO_USER: string = `${HELLO} ${USER_NAME}`;
const RISK_ASSESSMENT_ANSWER = [ANSWER_1, ANSWER_2, ANSWER_3];

export const NetWorthAssessment = () => {
  const handlePress = () => Alert.alert("alert");
  const pageContainer: ViewStyle = { ...flexRow, ...fullHeight, backgroundColor: colorGray._3 };
  const logoStyle: ImageStyle = { width: sw126, resizeMode: "contain", height: sh60 };
  const optionsTextStyle: TextStyle = { ...fs16RegBlack2 };
  return (
    <View style={pageContainer}>
      <View style={{ backgroundColor: colorWhite._2 }}>
        <View style={{ ...px(sw36), width: sw400 }}>
          <CustomSpacer space={sh72} />
          <Image source={LocalAssets.logo.kenanga} style={logoStyle} />
          <CustomSpacer space={sh91} />
          <Text style={{ ...fs32SemiBoldBlack4, width: sw240 }}>{HEADING}</Text>
          <CustomSpacer space={sh24} />
          {ONBOARDING.map((item: IOnboarding, index: number) => (
            <View style={{ ...centerVertical, ...flexRow }} key={index}>
              <Text style={fs12BoldBlack4}>
                {STEP} {index + 1}
              </Text>
              <CustomSpacer space={sw24} isHorizontal={true} />
              <Text style={fs16RegBlack4}>{item.label}</Text>
              <CustomSpacer space={sh40} />
            </View>
          ))}
        </View>
        <CustomFlexSpacer />
        <Image source={LocalAssets.onboarding.people} />
      </View>
      <View style={{ paddingLeft: sw96, ...fullWidth }}>
        <CustomSpacer space={sh184} />
        <Text style={fs36SemiBoldBlack2}>{HELLO_USER}</Text>
        <Text style={fs24RegBlack2}>{BEFORE_WE_CONTINUE}</Text>
        <CustomSpacer space={sh8} />
        <Text style={fs16RegBlack2}>{QUESTION}</Text>
        <CustomSpacer space={sh24} />
        {RISK_ASSESSMENT_ANSWER.map((INFO: string, index: number) => (
          <React.Fragment key={index}>
            <CheckBox label={INFO} toggle={true} style={optionsTextStyle} />
            <CustomSpacer space={sh16} />
          </React.Fragment>
        ))}
        <CustomFlexSpacer />
        <View style={flexRow}>
          <RoundedButton text={BUTTON_SKIP_RISK_ASSESSMENT} onPress={handlePress} secondary={true} />
          <CustomSpacer space={sw16} isHorizontal={true} />
          <RoundedButton text={BUTTON_TAKE_RISK_ASSESSMENT} onPress={handlePress} />
        </View>
        <CustomSpacer space={sh48} />
      </View>
    </View>
  );
};
