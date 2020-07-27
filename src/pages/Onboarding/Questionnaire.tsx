import React, { Fragment, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { ConfirmationModal, ContentPage, CustomSpacer, LabeledTitle, Question } from "../../components";
import { CustomSlider } from "../../components/Slider/Slider";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import {
  flexRow,
  fs12SemiBoldBlack2,
  fs16BoldBlack1,
  fs16RegBlack1,
  fs16SemiBoldBlack2,
  sh143,
  sh16,
  sh189,
  sh24,
  sh32,
  sh8,
  sw140,
  sw24,
  sw256,
  sw282,
} from "../../styles";

const { RISK_ASSESSMENT } = Language.PAGE;

interface QuestionnaireContentProps {
  handleNextStep: (route: string) => void;
  navigation: IStackNavigationProp;
}

const Q1_OPTIONS = [
  RISK_ASSESSMENT.Q1_OPTION_1,
  RISK_ASSESSMENT.Q1_OPTION_2,
  RISK_ASSESSMENT.Q1_OPTION_3,
  RISK_ASSESSMENT.Q1_OPTION_4,
  RISK_ASSESSMENT.Q1_OPTION_5,
];
const Q2_OPTIONS = [RISK_ASSESSMENT.Q2_OPTION_1, RISK_ASSESSMENT.Q2_OPTION_2, RISK_ASSESSMENT.Q2_OPTION_3];
const Q3_OPTIONS = [RISK_ASSESSMENT.Q3_OPTION_1, RISK_ASSESSMENT.Q3_OPTION_2, RISK_ASSESSMENT.Q3_OPTION_3, RISK_ASSESSMENT.Q3_OPTION_4];
const Q4_OPTIONS = [RISK_ASSESSMENT.Q4_OPTION_1, RISK_ASSESSMENT.Q4_OPTION_2, RISK_ASSESSMENT.Q4_OPTION_3, RISK_ASSESSMENT.Q4_OPTION_4];
const Q5_OPTIONS = [RISK_ASSESSMENT.Q5_OPTION_1, RISK_ASSESSMENT.Q5_OPTION_2, RISK_ASSESSMENT.Q5_OPTION_3, RISK_ASSESSMENT.Q5_OPTION_4];
const Q6_OPTIONS = [
  RISK_ASSESSMENT.Q6_OPTION_1,
  RISK_ASSESSMENT.Q6_OPTION_2,
  RISK_ASSESSMENT.Q6_OPTION_3,
  RISK_ASSESSMENT.Q6_OPTION_4,
  RISK_ASSESSMENT.Q6_OPTION_5,
];

export const QuestionnaireContent = ({ handleNextStep, navigation }: QuestionnaireContentProps) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [q1, setQ1] = useState<string>(RISK_ASSESSMENT.Q1_OPTION_1);
  const [q2, setQ2] = useState<string>(RISK_ASSESSMENT.Q2_OPTION_1);
  const [q3, setQ3] = useState<string>(RISK_ASSESSMENT.Q3_OPTION_1);
  const [q4, setQ4] = useState<string>(RISK_ASSESSMENT.Q4_OPTION_1);
  const [q5, setQ5] = useState<string>(RISK_ASSESSMENT.Q5_OPTION_1);
  const [q6, setQ6] = useState<string>(RISK_ASSESSMENT.Q6_OPTION_1);

  const handleCancel = () => {
    navigation.goBack();
  };

  // TODO temporary
  const handleConfirmAssessment = () => {
    Alert.alert(`q3: ${q3} , q4: ${q4}`);
    handleNextStep(ONBOARDING_ROUTES.ProductRecommendation);
  };

  const handleRetakeAssessment = () => {
    setConfirm(!confirm);
  };

  // TODO temporary
  const handleContinue = () => {
    setConfirm(!confirm);
  };

  return (
    <Fragment>
      <ContentPage handleCancel={handleCancel} handleContinue={handleContinue} subheading={RISK_ASSESSMENT.HEADING}>
        <View style={flexRow}>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <View>
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_1}
              options={Q1_OPTIONS}
              selected={q1}
              setSelected={setQ1}
              title={RISK_ASSESSMENT.QUESTION_1}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_2}
              options={Q2_OPTIONS}
              selected={q2}
              setSelected={setQ2}
              title={RISK_ASSESSMENT.QUESTION_2}
            />
            <CustomSpacer space={sh32} />
            <LabeledTitle label={RISK_ASSESSMENT.LABEL_QUESTION_3} title={RISK_ASSESSMENT.QUESTION_3} titleStyle={fs16SemiBoldBlack2} />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q3_OPTIONS} setSelected={setQ3} />
            <CustomSpacer space={sh32} />
            <LabeledTitle label={RISK_ASSESSMENT.LABEL_QUESTION_4} title={RISK_ASSESSMENT.QUESTION_4} titleStyle={fs16SemiBoldBlack2} />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q4_OPTIONS} setSelected={setQ4} />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_5}
              options={Q5_OPTIONS}
              right={<Image style={{ height: sh143, width: sw140 }} source={LocalAssets.graph.risk_assessment_graph_1} />}
              selected={q5}
              setSelected={setQ5}
              title={RISK_ASSESSMENT.QUESTION_5}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_6}
              options={Q6_OPTIONS}
              right={<Image style={{ height: sh189, width: sw282 }} source={LocalAssets.graph.risk_assessment_graph_2} />}
              selected={q6}
              setSelected={setQ6}
              title={RISK_ASSESSMENT.QUESTION_6}
            />
          </View>
          <CustomSpacer isHorizontal={true} space={sw256} />
        </View>
      </ContentPage>
      {confirm === true ? (
        <ConfirmationModal
          handleCancel={handleRetakeAssessment}
          handleContinue={handleConfirmAssessment}
          labelCancel={RISK_ASSESSMENT.BUTTON_RETAKE}
          labelContinue={RISK_ASSESSMENT.BUTTON_CONTINUE}
          title={RISK_ASSESSMENT.CONFIRM_MODAL_TITLE}
          visible={confirm}>
          <Fragment>
            <LabeledTitle
              label={RISK_ASSESSMENT.CONFIRM_MODAL_APPETITE}
              labelStyle={fs12SemiBoldBlack2}
              spaceToLabel={sh8}
              title="Medium"
              titleStyle={fs16BoldBlack1}
            />
            <CustomSpacer space={sh24} />
            <LabeledTitle
              label={RISK_ASSESSMENT.CONFIRM_MODAL_LABEL_PROFILE}
              labelStyle={fs12SemiBoldBlack2}
              spaceToLabel={sh8}
              title={RISK_ASSESSMENT.CONFIRM_MODAL_PROFILE}
              titleStyle={fs16RegBlack1}
            />
            <CustomSpacer space={sh32} />
            <Text>{RISK_ASSESSMENT.LABEL_CONFIRM_MODAL_SUGGESTION}</Text>
            <CustomSpacer space={sh8} />
            <Text style={fs16BoldBlack1}>a) {RISK_ASSESSMENT.CONFIRM_MODAL_SUGGESTION_1}</Text>
            <CustomSpacer space={sh8} />
            <Text style={fs16BoldBlack1}>b) {RISK_ASSESSMENT.CONFIRM_MODAL_SUGGESTION_2}</Text>
          </Fragment>
        </ConfirmationModal>
      ) : null}
    </Fragment>
  );
};
