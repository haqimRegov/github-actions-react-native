import React, { Fragment, useEffect, useState } from "react";
import { Image, Text, TextStyle, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import {
  ConfirmationModal,
  ContentPage,
  CustomPopup,
  CustomSlider,
  CustomSpacer,
  LabeledTitle,
  Question,
  RadioButton,
  TextSpaceArea,
} from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import {
  Q1_OPTIONS,
  Q2_OPTIONS,
  Q3_OPTIONS,
  Q4_OPTIONS,
  Q5_OPTIONS,
  Q6_OPTIONS,
  Q7_OPTIONS,
} from "../../data/dictionary/risk-assessment-questions";
import { IcoMoon } from "../../icons";
import { getRiskScore } from "../../network-actions";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  flexRow,
  fs12BoldBlack2,
  fs12BoldWhite1,
  fs12SemiBoldBlack2,
  fs16BoldBlack1,
  fs16BoldBlack2,
  fs16SemiBoldBlack2,
  px,
  py,
  sh104,
  sh143,
  sh155,
  sh16,
  sh24,
  sh32,
  sh40,
  sh8,
  sh80,
  sw140,
  sw16,
  sw20,
  sw204,
  sw208,
  sw221,
  sw24,
  sw256,
  sw30,
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
  const [popupIncome, setPopupIncome] = useState<boolean>(false);
  const [popupAsset, setPopupAsset] = useState<boolean>(false);

  const q1 = questionnaire.questionOne;
  const q2 = questionnaire.questionTwo;
  const q3 = questionnaire.questionThree;
  const q4 = questionnaire.questionFour;
  const q5 = questionnaire.questionFive;
  const q6 = questionnaire.questionSix;
  const q7 = questionnaire.questionSeven;

  const setQ1 = (index: number) => props.addAssessmentQuestions({ questionOne: index });
  const setQ2 = (index: number) => props.addAssessmentQuestions({ questionTwo: index });
  const setQ3 = (index: number) => props.addAssessmentQuestions({ questionThree: index });
  const setQ4 = (index: number) => props.addAssessmentQuestions({ questionFour: index });
  const setQ5 = (index: number) => props.addAssessmentQuestions({ questionFive: index });
  const setQ6 = (index: number) => props.addAssessmentQuestions({ questionSix: index });
  const setQ7 = (index: number) => props.addAssessmentQuestions({ questionSeven: index });

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
      <ContentPage
        handleCancel={handlePageCancel}
        handleContinue={handlePageContinue}
        heading={RISK_ASSESSMENT.HEADING}
        subheading={RISK_ASSESSMENT.SUBHEADING}>
        <View style={flexRow}>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <View>
            <CustomSpacer space={sh40} />
            <LabeledTitle
              label={RISK_ASSESSMENT.LABEL_QUESTION_1}
              spaceToLabel={sh8}
              title={RISK_ASSESSMENT.QUESTION_1}
              titleStyle={fs16BoldBlack2}
            />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q1_OPTIONS} selected={q1} setSelected={setQ1} />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_2}
              options={Q2_OPTIONS}
              selected={q2}
              setSelected={setQ2}
              title={RISK_ASSESSMENT.QUESTION_2}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_3}
              options={Q3_OPTIONS}
              right={<Image style={{ height: sh143, width: sw140 }} source={LocalAssets.graph.risk_assessment_graph_1} />}
              selected={q3}
              setSelected={setQ3}
              title={RISK_ASSESSMENT.QUESTION_3}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_4}
              options={Q4_OPTIONS}
              right={<Image style={{ height: sh155, width: sw221 }} source={LocalAssets.graph.risk_assessment_graph_2} />}
              selected={q4}
              setSelected={setQ4}
              title={RISK_ASSESSMENT.QUESTION_4}
            />
            <CustomSpacer space={sh32} />
            <LabeledTitle
              label={RISK_ASSESSMENT.LABEL_QUESTION_5}
              spaceToLabel={sh8}
              title={RISK_ASSESSMENT.QUESTION_5}
              titleStyle={fs16SemiBoldBlack2}
            />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q5_OPTIONS} selected={q5} setSelected={setQ5} />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_6}
              options={Q6_OPTIONS}
              selected={q6}
              setSelected={setQ6}
              title={RISK_ASSESSMENT.QUESTION_6}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_7}
              options={Q7_OPTIONS}
              RenderContent={(renderContentProps) => {
                const { options, selected, setSelected } = renderContentProps;
                return (
                  <Fragment>
                    {options!.map((option: string, index: number) => {
                      const popupStyle: ViewStyle = {
                        ...px(sw16),
                        ...py(sh16),
                        height: index === 0 ? sh104 : sh80,
                        width: sw204,
                      };
                      const infoContent =
                        index === 1 ? (
                          <View style={popupStyle}>
                            <Text style={fs12BoldWhite1}>{RISK_ASSESSMENT.POPUP_ASSET_1}</Text>
                            <CustomSpacer space={sh8} />
                            <Text style={fs12BoldWhite1}>{RISK_ASSESSMENT.POPUP_ASSET_2}</Text>
                          </View>
                        ) : (
                          <View style={popupStyle}>
                            <Text style={{ ...fs12BoldWhite1, lineHeight: sh24 }}>{RISK_ASSESSMENT.POPUP_INCOME}</Text>
                          </View>
                        );
                      const defaultCondition = index <= 1 ? infoContent : null;
                      const showPopup = index === 0 ? popupIncome : popupAsset;
                      const handleSelect = () => {
                        setSelected(options!.indexOf(option));
                      };

                      const handleToggle = (toggle: boolean) => {
                        if (index === 0) {
                          if (toggle === true) {
                            setPopupAsset(false);
                          }
                          setPopupIncome(toggle);
                        } else {
                          if (toggle === true) {
                            setPopupIncome(false);
                          }
                          setPopupAsset(toggle);
                        }
                      };

                      return (
                        <Fragment key={index}>
                          {index !== 0 ? <CustomSpacer isHorizontal={false} space={sh16} /> : null}
                          <View style={flexRow}>
                            <RadioButton
                              label={option}
                              labelStyle={fs12BoldBlack2}
                              selected={index === selected}
                              setSelected={handleSelect}
                            />
                            {index < 2 ? (
                              <Fragment>
                                <CustomSpacer isHorizontal={true} space={sw20} />
                                <CustomPopup
                                  direction="right"
                                  popupContent={defaultCondition}
                                  popupOnPress={handleToggle}
                                  popupStyle={{ width: sw208 }}
                                  show={showPopup}>
                                  <View style={{ height: sh24, width: sw30 }}>
                                    <IcoMoon name="info" size={sh24} />
                                  </View>
                                </CustomPopup>
                              </Fragment>
                            ) : null}
                          </View>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                );
              }}
              selected={q7}
              setSelected={setQ7}
              title={RISK_ASSESSMENT.QUESTION_7}
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
