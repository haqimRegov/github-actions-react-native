import React, { Fragment, useEffect, useState } from "react";
import { Image, Text, TextStyle, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import { ConfirmationModal, ContentPage, CustomSlider, CustomSpacer, LabeledTitle, Question, TextSpaceArea } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { Q1_OPTIONS, Q2_OPTIONS, Q3_OPTIONS, Q4_OPTIONS, Q5_OPTIONS, Q6_OPTIONS } from "../../data/dictionary/risk-assessment-questions";
import { getRiskScore } from "../../network-actions";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  flexRow,
  fs12SemiBoldBlack2,
  fs16BoldBlack1,
  fs16BoldBlack2,
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
  sw432,
} from "../../styles";
import { isObjectEqual } from "../../utils";

const { RISK_ASSESSMENT } = Language.PAGE;

interface QuestionnaireContentProps extends OnboardingContentProps, RiskStoreProps {
  navigation: IStackNavigationProp;
}

const QuestionnaireContentComponent = (props: QuestionnaireContentProps) => {
  const { finishedSteps, handleNextStep, navigation, questionnaire, riskScore, setFinishedSteps } = props;

  const [confirmModal, setConfirmModal] = useState<TypeRiskAssessmentModal>(undefined);
  const [prevQuestionnaire, setPrevQuestionnaire] = useState<IRiskAssessmentQuestions | undefined>(undefined);

  const q1 = questionnaire.questionOne;
  const q2 = questionnaire.questionTwo;
  const q3 = questionnaire.questionThree;
  const q4 = questionnaire.questionFour;
  const q5 = questionnaire.questionFive;
  const q6 = questionnaire.questionSix;

  const setQ1 = (index: number) => props.addAssessmentQuestions({ questionOne: index });
  const setQ2 = (index: number) => props.addAssessmentQuestions({ questionTwo: index });
  const setQ3 = (index: number) => props.addAssessmentQuestions({ questionThree: index });
  const setQ4 = (index: number) => props.addAssessmentQuestions({ questionFour: index });
  const setQ5 = (index: number) => props.addAssessmentQuestions({ questionFive: index });
  const setQ6 = (index: number) => props.addAssessmentQuestions({ questionSix: index });

  const handlePageCancel = () => {
    navigation.goBack();
  };

  const handleConfirmAssessment = () => {
    const updatedSteps: TypeOnboardingRoute[] = [...finishedSteps];
    updatedSteps.push(ONBOARDING_ROUTES.Questionnaire);
    setConfirmModal(undefined);
    setFinishedSteps(updatedSteps);
    handleNextStep(ONBOARDING_ROUTES.ProductRecommendation);
  };

  const handleRetakeAssessment = () => {
    setConfirmModal(undefined);
    props.resetRiskAssessment();
  };

  const handlePageContinue = () => {
    setConfirmModal("assessment");
    getRiskScore(props, questionnaire);
  };

  const handleEdit = () => {
    setConfirmModal(undefined);
    setFinishedSteps([]);
    props.resetRiskAssessment();
  };

  const handleCancelEdit = () => {
    if (prevQuestionnaire !== undefined) {
      setConfirmModal(undefined);
      props.addAssessmentQuestions(prevQuestionnaire);
    }
  };

  const isAssessment = confirmModal === "assessment";

  const labelCancel = isAssessment ? RISK_ASSESSMENT.BUTTON_RETAKE : RISK_ASSESSMENT.BUTTON_NO;
  const labelContinue = isAssessment ? RISK_ASSESSMENT.BUTTON_CONFIRM : RISK_ASSESSMENT.BUTTON_YES;
  const modalTitle = isAssessment ? RISK_ASSESSMENT.PROFILE_TITLE : RISK_ASSESSMENT.EDIT_TITLE;
  const handleCancel = isAssessment ? handleRetakeAssessment : handleCancelEdit;
  const handleContinue = isAssessment ? handleConfirmAssessment : handleEdit;
  const modalTitleStyle: TextStyle = isAssessment ? {} : { width: sw432 };

  const riskProfile = [
    { label: RISK_ASSESSMENT.PROFILE_APPETITE, title: riskScore.appetite },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_PROFILE, title: riskScore.profile },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_RETURN, title: riskScore.return },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_TYPE, title: riskScore.type },
  ];

  useEffect(() => {
    if (prevQuestionnaire === undefined && finishedSteps.includes(ONBOARDING_ROUTES.Questionnaire)) {
      setPrevQuestionnaire(questionnaire);
    }

    if (prevQuestionnaire !== undefined && !isObjectEqual(questionnaire, prevQuestionnaire)) {
      setConfirmModal("prompt");
    }
  }, [finishedSteps, prevQuestionnaire, questionnaire]);

  return (
    <Fragment>
      <ContentPage handleCancel={handlePageCancel} handleContinue={handlePageContinue} subheading={RISK_ASSESSMENT.HEADING}>
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
            <CustomSlider disabled={true} options={Q3_OPTIONS} selected={q3} setSelected={setQ3} />
            <CustomSpacer space={sh32} />
            <LabeledTitle label={RISK_ASSESSMENT.LABEL_QUESTION_4} title={RISK_ASSESSMENT.QUESTION_4} titleStyle={fs16SemiBoldBlack2} />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q4_OPTIONS} selected={q4} setSelected={setQ4} />
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
      <ConfirmationModal
        handleCancel={handleCancel}
        handleContinue={handleContinue}
        labelCancel={labelCancel}
        labelContinue={labelContinue}
        title={modalTitle}
        titleStyle={modalTitleStyle}
        visible={confirmModal !== undefined}>
        {confirmModal === "assessment" ? (
          <Fragment>
            {riskProfile.map((item, index) => (
              <LabeledTitle
                key={index}
                label={item.label}
                labelStyle={fs12SemiBoldBlack2}
                spaceToBottom={sh24}
                spaceToLabel={sh8}
                title={item.title}
                titleStyle={fs16BoldBlack1}
              />
            ))}
            <Text style={fs12SemiBoldBlack2}>{RISK_ASSESSMENT.PROFILE_LABEL_SUGGESTION}</Text>
            {riskScore !== undefined &&
              riskScore.suggestedFunds.map((fund: string, index: number) => (
                <TextSpaceArea key={index} spaceToTop={sh8} style={fs16BoldBlack1} text={fund} />
              ))}
          </Fragment>
        ) : (
          <Text style={fs16BoldBlack2}>{RISK_ASSESSMENT.EDIT_LABEL}</Text>
        )}
      </ConfirmationModal>
    </Fragment>
  );
};

export const QuestionnaireContent = connect(RiskMapStateToProps, RiskMapDispatchToProps)(QuestionnaireContentComponent);
