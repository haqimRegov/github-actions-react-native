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
  LABEL_QUESTION_1,
  QUESTION_1,
  Q1_OPTION_1,
  Q1_OPTION_2,
  Q1_OPTION_3,
  Q1_OPTION_4,
  LABEL_QUESTION_2,
  QUESTION_2,
  Q2_OPTION_1,
  Q2_OPTION_2,
  Q2_OPTION_3,
  Q2_OPTION_4,
  LABEL_QUESTION_3,
  QUESTION_3,
  Q3_OPTION_1,
  Q3_OPTION_2,
  Q3_OPTION_3,
  Q3_OPTION_4,
  LABEL_QUESTION_4,
  QUESTION_4,
  Q4_OPTION_1,
  Q4_OPTION_2,
  Q4_OPTION_3,
  Q4_OPTION_4,
  Q4_OPTION_5,
  BUTTON_CANCEL,
  BUTTON_CONTINUE,
} = Language.PAGE.RISK_ASSESSMENT;

interface QuestionnaireContentProps {
  handleNextStep: (route: string) => void;
}

export const QuestionnaireContent = ({ handleNextStep }: QuestionnaireContentProps) => {
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");
  const [q4, setQ4] = useState<string>("");
  const Q1_OPTIONS = [Q1_OPTION_1, Q1_OPTION_2, Q1_OPTION_3, Q1_OPTION_4];
  const Q2_OPTIONS = [Q2_OPTION_1, Q2_OPTION_2, Q2_OPTION_3, Q2_OPTION_4];
  const Q3_OPTIONS = [Q3_OPTION_1, Q3_OPTION_2, Q3_OPTION_3, Q3_OPTION_4];
  const Q4_OPTIONS = [Q4_OPTION_1, Q4_OPTION_2, Q4_OPTION_3, Q4_OPTION_4, Q4_OPTION_5];
  const scrollStyle: ViewStyle = { ...flexGrow };
  const container: ViewStyle = {
    ...flexChild,
    ...flexCol,
    ...px(sw96),
    backgroundColor: colorGray._3,
  };
  const buttonContainer: ViewStyle = { ...px(sw97) };
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
        <Question label={LABEL_QUESTION_1} options={Q1_OPTIONS} selected={q1} setSelected={setQ1} title={QUESTION_1}>
          <Text>Slider</Text>
        </Question>
        <CustomSpacer space={sh36} />
        <Question label={LABEL_QUESTION_2} options={Q2_OPTIONS} selected={q2} setSelected={setQ2} title={QUESTION_2}>
          <Text>Slider</Text>
        </Question>
        <CustomSpacer space={sh36} />
        <Question
          label={LABEL_QUESTION_3}
          options={Q3_OPTIONS}
          right={<Image source={LocalAssets.graph.risk_assessment_graph_1} style={{ height: sh143, width: sw140 }} />}
          selected={q3}
          setSelected={setQ3}
          title={QUESTION_3}
        />
        <CustomSpacer space={sh35} />
        <Question
          label={LABEL_QUESTION_4}
          options={Q4_OPTIONS}
          right={<Image source={LocalAssets.graph.risk_assessment_graph_2} style={{ height: sh189, width: sw282 }} />}
          selected={q4}
          setSelected={setQ4}
          title={QUESTION_4}
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
