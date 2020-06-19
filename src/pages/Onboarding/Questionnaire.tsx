import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View, ViewStyle } from "react-native";

import { ONBOARDING_ROUTES, Language } from "../../constants";
import { LocalAssets } from "../../assets/LocalAssets";
import { CustomSpacer, Question, RoundedButton } from "../../components";
import {
  colorGray,
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
  sw96,
  sw97,
} from "../../styles";

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

interface QuestionnaireContentProps {
  handleNextStep: (route: string) => void;
}

export const QuestionnaireContent = ({ handleNextStep }: QuestionnaireContentProps) => {
  const scrollStyle: ViewStyle = { ...flexGrow };
  const container: ViewStyle = {
    ...flexChild,
    ...flexCol,
    ...px(sw96),
    backgroundColor: colorGray._3,
  };
  const buttonContainer: ViewStyle = { ...px(sw97) };
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");
  const [q4, setQ4] = useState<string>("");
  const handleCancel = () => {
    Alert.alert("Cancel");
  };
  const handleContinue = () => {
    handleNextStep(ONBOARDING_ROUTES.FundingOptions);
  };

  return (
    <ScrollView style={scrollStyle}>
      <View style={container}>
        <CustomSpacer space={sh55} />
        <Text style={fs24RegBlack}>{RISK_ASSESSMENT}</Text>
        <CustomSpacer space={sh24} />
        <Question label={QUESTION_1} title={Q1} selected={q1} setSelected={setQ1}>
          <Text>Slider</Text>
        </Question>
        <CustomSpacer space={sh36} />
        <Question label={QUESTION_2} title={Q2} selected={q2} setSelected={setQ2}>
          <Text>Slider</Text>
        </Question>
        <CustomSpacer space={sh36} />
        <Question
          label={QUESTION_3}
          options={OPTIONS_3}
          right={<Image source={LocalAssets.graph.risk_assessment_graph_1} style={{ height: sh143, width: sw140 }} />}
          selected={q3}
          setSelected={setQ3}
          title={Q3}
        />
        <CustomSpacer space={sh35} />
        <Question
          label={QUESTION_4}
          options={OPTIONS_4}
          right={<Image source={LocalAssets.graph.risk_assessment_graph_2} style={{ height: sh189, width: sw282 }} />}
          selected={q4}
          setSelected={setQ4}
          title={Q4}
        />
        <CustomSpacer space={sh78} />
        <View style={flexRow}>
          <RoundedButton buttonStyle={buttonContainer} secondary={true} onPress={handleCancel} text={BUTTON_CANCEL} />
          <CustomSpacer space={sw16} isHorizontal={true} />
          <RoundedButton buttonStyle={buttonContainer} onPress={handleContinue} text={BUTTON_CONTINUE} />
        </View>
        <CustomSpacer space={sh48} />
      </View>
    </ScrollView>
  );
};
