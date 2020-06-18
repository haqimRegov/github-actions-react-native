import React, { useState } from "react";
import { Alert, Image, ImageStyle, ScrollView, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../assets/LocalAssets";
import { CustomSpacer, Question, RadioButtonGroup, RoundedButton, SafeAreaPage, SliderWithLabels } from "../components";
import { Language } from "../constants";
import {
  colorGray,
  colorWhite,
  flexChild,
  flexCol,
  flexGrow,
  flexRow,
  fs24RegBlack,
  px,
  sh143,
  sh189,
  sh24,
  sh35,
  sh36,
  sh48,
  sh55,
  sh78,
  sw140,
  sw16,
  sw282,
  sw398,
  sw96,
  sw97,
} from "../styles";

const {
  RISK_ASSESSMENT,
  QUESTION_1,
  Q1,
  QUESTION_2,
  Q2,
  QUESTION_3,
  Q3,
  OPTIONS_3,
  QUESTION_4,
  Q4,
  OPTIONS_4,
  BUTTON_CANCEL,
  BUTTON_CONTINUE,
} = Language.PAGE.RISK_ASSESSMENT;
export const RiskAssessment = () => {
  const navContainer: ViewStyle = { backgroundColor: colorWhite._1, width: sw398 };
  const scrollStyle: ViewStyle = { ...flexGrow };
  const container: ViewStyle = {
    ...flexChild,
    ...flexCol,
    ...px(sw96),
    backgroundColor: colorGray._3,
  };
  const buttonContainer: ViewStyle = { ...px(sw97) };
  const containerStyle: ViewStyle = { ...flexRow, justifyContent: "space-between" };
  const graph1Style: ImageStyle = { height: sh143, width: sw140 };
  const graph2Style: ImageStyle = { height: sh189, width: sw282 };
  const [q3, setQ3] = useState<string>("");
  const [q4, setQ4] = useState<string>("");
  const handleCancel = () => {
    Alert.alert("Cancel");
  };
  const handleContinue = () => {
    Alert.alert("Continue");
  };
  return (
    <SafeAreaPage bottomBackgroundColor="#d3d3d3">
      <View style={flexRow}>
        <View style={navContainer} />
        <ScrollView style={scrollStyle}>
          <View style={container}>
            <CustomSpacer space={sh55} />
            <Text style={fs24RegBlack}>{RISK_ASSESSMENT}</Text>
            <CustomSpacer space={sh24} />
            <Question title={QUESTION_1} subtitle={Q1}>
              <CustomSpacer space={sh24} />
            </Question>
            <CustomSpacer space={sh36} />
            <Question title={QUESTION_2} subtitle={Q2}>
              <CustomSpacer space={sh24} />
            </Question>
            <CustomSpacer space={sh36} />
            <Question title={QUESTION_3} subtitle={Q3} containerStyle={containerStyle}>
              <RadioButtonGroup direction="row" labels={OPTIONS_3} selected={q3} setSelection={setQ3} />
              <Image source={LocalAssets.graph.risk_assessment_graph_1} style={graph1Style} />
            </Question>
            <CustomSpacer space={sh35} />
            <Question title={QUESTION_4} subtitle={Q4} containerStyle={containerStyle}>
              <RadioButtonGroup labels={OPTIONS_4} selected={q4} setSelection={setQ4} />
              <Image source={LocalAssets.graph.risk_assessment_graph_2} style={graph2Style} />
            </Question>
            <CustomSpacer space={sh78} />
            <View style={flexRow}>
              <RoundedButton buttonStyle={buttonContainer} secondary={true} onPress={handleCancel} text={BUTTON_CANCEL} />
              <CustomSpacer space={sw16} isHorizontal={true} />
              <RoundedButton buttonStyle={buttonContainer} onPress={handleContinue} text={BUTTON_CONTINUE} />
            </View>
            <CustomSpacer space={sh48} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaPage>
  );
};
