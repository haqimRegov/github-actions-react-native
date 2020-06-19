import * as React from "react";
import { Text, View, ViewStyle, Image, Alert } from "react-native";

import { LocalAssets } from "../assets/LocalAssets";
import {
  colorGray,
  fs32SemiBoldBlack4,
  flexRow,
  fs12BoldBlack4,
  fs16RegBlack2,
  fs16RegBlack4,
  fs24RegBlack2,
  fs36SemiBoldBlack2,
  fullHeight,
  fullWidth,
  sh12,
  sh16,
  sh184,
  sh24,
  sh40,
  sh48,
  sh72,
  sh8,
  sh91,
  sw16,
  sw36,
  sw400,
  sw96,
  sw24,
  colorWhite,
  sw240,
} from "../styles";
import { CustomSpacer, CustomFlexSpacer, CheckBox, RoundedButton } from "../components";
import { Language } from "../constants";

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
} = Language.PAGE.NET_WORTH_ASSESSMENT;
const USER_NAME: string = "Edgar";
const HELLO_USER: string = `${HELLO} ${USER_NAME}`;
const STEP_INFO = ["Risk Assessment", "Product Recommendation", "Personal Information", "Conformation", "Payment"];
const RISK_ASSESSMENT_ANSWER = [ANSWER_1, ANSWER_2, ANSWER_3];

export const NetWorthAssessment = () => {
  const handlePress = () => Alert.alert("alert");
  const pageContainer: ViewStyle = { ...flexRow, ...fullHeight, backgroundColor: colorGray._3 };
  return (
    <View style={pageContainer}>
      <View style={{ backgroundColor: colorWhite._2 }}>
        <View style={{ paddingLeft: sw36, width: sw400 }}>
          <CustomSpacer space={sh72} />
          <Image source={LocalAssets.logo.kenanga} />
          <CustomSpacer space={sh91} />
          <Text style={{ ...fs32SemiBoldBlack4, width: sw240 }}>{HEADING}</Text>
          <CustomSpacer space={sh24} />
          {STEP_INFO.map((INFO: string, index: number) => (
            <View style={flexRow} key={index}>
              <Text style={fs12BoldBlack4}>STEP {index + 1}</Text>
              <CustomSpacer space={sw24} isHorizontal={true} />
              <Text style={fs16RegBlack4}>{INFO}</Text>
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
        <CustomSpacer space={sh12} />
        {RISK_ASSESSMENT_ANSWER.map((INFO: string, index: number) => (
          <React.Fragment key={index}>
            <CheckBox label={INFO} toggle={true} />
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
