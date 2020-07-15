import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { ContentPage, CustomSpacer, LabeledTitle, Question } from "../../components";
import { CustomSlider } from "../../components/Slider/Slider";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { colorWhite, px, sh143, sh16, sh189, sh24, sh35, sh36, shadow, sw140, sw24, sw282 } from "../../styles";
import { AlertDialog } from "../../utils";

const { RISK_ASSESSMENT } = Language.PAGE;

interface QuestionnaireContentProps {
  handleNextStep: (route: string) => void;
  navigation: StackNavigationProp<RootNavigatorType>;
}

const Q1_OPTIONS = [RISK_ASSESSMENT.Q1_OPTION_1, RISK_ASSESSMENT.Q1_OPTION_2, RISK_ASSESSMENT.Q1_OPTION_3, RISK_ASSESSMENT.Q1_OPTION_4];
const Q2_OPTIONS = [RISK_ASSESSMENT.Q2_OPTION_1, RISK_ASSESSMENT.Q2_OPTION_2, RISK_ASSESSMENT.Q2_OPTION_3, RISK_ASSESSMENT.Q2_OPTION_4];
const Q3_OPTIONS = [RISK_ASSESSMENT.Q3_OPTION_1, RISK_ASSESSMENT.Q3_OPTION_2, RISK_ASSESSMENT.Q3_OPTION_3, RISK_ASSESSMENT.Q3_OPTION_4];
const Q4_OPTIONS = [
  RISK_ASSESSMENT.Q4_OPTION_1,
  RISK_ASSESSMENT.Q4_OPTION_2,
  RISK_ASSESSMENT.Q4_OPTION_3,
  RISK_ASSESSMENT.Q4_OPTION_4,
  RISK_ASSESSMENT.Q4_OPTION_5,
];

export const QuestionnaireContent = ({ handleNextStep, navigation }: QuestionnaireContentProps) => {
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");
  const [q4, setQ4] = useState<string>("");

  const handleCancel = () => {
    navigation.goBack();
  };

  // TODO temporary
  const handleConfirm = () => {
    handleNextStep(ONBOARDING_ROUTES.ProductRecommendation);
  };

  // TODO temporary
  const handleContinue = () => {
    AlertDialog(`q1: ${q1}, q2: ${q2}, q3: ${q3}, q4: ${q4}`, handleConfirm);
  };

  const sliderContainer: ViewStyle = { ...shadow, backgroundColor: colorWhite._1, borderRadius: 10 };

  return (
    <ContentPage handleCancel={handleCancel} handleContinue={handleContinue} subheading={RISK_ASSESSMENT.HEADING}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <LabeledTitle label={RISK_ASSESSMENT.LABEL_QUESTION_1} title={RISK_ASSESSMENT.QUESTION_1} />
        <CustomSpacer space={sh16} />
        <View style={sliderContainer}>
          <CustomSpacer space={sh24} />
          <View style={px(sh24)}>
            <CustomSlider options={Q1_OPTIONS} setSelected={setQ1} />
          </View>
          <CustomSpacer space={sh24} />
        </View>
        <CustomSpacer space={sh36} />
        <LabeledTitle label={RISK_ASSESSMENT.LABEL_QUESTION_2} title={RISK_ASSESSMENT.QUESTION_2} />
        <CustomSpacer space={sh16} />
        <View style={sliderContainer}>
          <CustomSpacer space={sh24} />
          <View style={px(sh24)}>
            <CustomSlider options={Q2_OPTIONS} setSelected={setQ2} />
          </View>
          <CustomSpacer space={sh24} />
        </View>
        <CustomSpacer space={sh36} />
        <Question
          label={RISK_ASSESSMENT.LABEL_QUESTION_3}
          options={Q3_OPTIONS}
          right={<Image style={{ height: sh143, width: sw140 }} source={LocalAssets.graph.risk_assessment_graph_1} />}
          selected={q3}
          setSelected={setQ3}
          title={RISK_ASSESSMENT.QUESTION_3}
        />
        <CustomSpacer space={sh35} />
        <Question
          label={RISK_ASSESSMENT.LABEL_QUESTION_4}
          options={Q4_OPTIONS}
          right={<Image style={{ height: sh189, width: sw282 }} source={LocalAssets.graph.risk_assessment_graph_2} />}
          selected={q4}
          setSelected={setQ4}
          title={RISK_ASSESSMENT.QUESTION_4}
        />
      </View>
    </ContentPage>
  );
};
