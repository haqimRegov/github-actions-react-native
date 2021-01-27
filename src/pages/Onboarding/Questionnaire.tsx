import React, { Fragment, FunctionComponent, ReactElement, useEffect, useState } from "react";
import { Image, Text, TextStyle, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import {
  ConfirmationModal,
  ContentPage,
  CustomSlider,
  CustomSpacer,
  CustomTextInput,
  CustomTooltip,
  LabeledTitle,
  Question,
  RadioButton,
} from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { Q2_OPTIONS, Q3_OPTIONS, Q4_OPTIONS, Q5_OPTIONS, Q6_OPTIONS, Q7_OPTIONS, Q8_OPTIONS } from "../../data/dictionary";
import { getRiskProfile } from "../../network-actions";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  colorBlue,
  disabledOpacity,
  flexRow,
  fs10BoldBlack2,
  fs12BoldBlack2,
  fs12BoldWhite1,
  fs12SemiBoldBlack2,
  fs16BoldBlack1,
  fs16BoldBlack2,
  sh143,
  sh155,
  sh16,
  sh24,
  sh32,
  sh40,
  sh56,
  sh8,
  sw140,
  sw20,
  sw221,
  sw24,
  sw256,
  sw432,
} from "../../styles";
import { isObjectEqual } from "../../utils";

const { RISK_ASSESSMENT } = Language.PAGE;

interface QuestionnaireContentProps extends OnboardingContentProps, RiskStoreProps {
  navigation: IStackNavigationProp;
}

const QuestionnaireContentComponent: FunctionComponent<QuestionnaireContentProps> = ({
  addAssessmentQuestions,
  addRiskScore,
  agent,
  handleCancelOnboarding,
  handleNextStep,
  onboarding,
  principalHolder,
  questionnaire,
  resetRiskAssessment,
  resetProducts,
  riskScore,
  setLoading,
  updateOnboarding,
  updateProductType,
}: QuestionnaireContentProps) => {
  const { clientId, dateOfBirth, name } = principalHolder!;
  const { disabledSteps, finishedSteps } = onboarding;

  const [confirmModal, setConfirmModal] = useState<TypeRiskAssessmentModal>(undefined);
  const [prevQuestionnaire, setPrevQuestionnaire] = useState<IRiskAssessmentQuestions | undefined>(undefined);
  const { questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight } = questionnaire;

  const setQ2 = (index: number) => addAssessmentQuestions({ questionTwo: index });
  const setQ3 = (index: number) => addAssessmentQuestions({ questionThree: index });
  const setQ4 = (index: number) => addAssessmentQuestions({ questionFour: index });
  const setQ5 = (index: number) => addAssessmentQuestions({ questionFive: index });
  const setQ6 = (index: number) => addAssessmentQuestions({ questionSix: index });
  const setQ7 = (index: number) => addAssessmentQuestions({ questionSeven: index, questionEight: index > 0 ? 0 : -1 });
  const setQ8 = (index: number) => addAssessmentQuestions({ questionEight: index });

  const handleConfirmAssessment = () => {
    resetProducts();
    handleNextStep(ONBOARDING_ROUTES.ProductRecommendation);
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    updatedFinishedSteps.push("RiskAssessment");
    const findProducts = updatedDisabledSteps.indexOf("Products");
    if (findProducts !== -1) {
      updatedDisabledSteps.splice(findProducts, 1);
    }
    setConfirmModal(undefined);
    if (agent!.licenseType.includes("UT") === false) {
      updateProductType("prs");
    }
    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleRetakeAssessment = () => {
    setConfirmModal(undefined);
    resetRiskAssessment();
  };

  const handlePageContinue = async () => {
    setLoading(true);
    const response: IGetRiskProfileResponse = await getRiskProfile({
      clientId: clientId!,
      riskAssessment: {
        questionTwo: questionTwo!,
        questionThree: questionThree!,
        questionFour: questionFour!,
        questionFive: questionFive!,
        questionSix: questionSix!,
        questionSeven: questionSeven!,
        questionEight: questionEight!,
      },
    });
    setLoading(false);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        setLoading(false);
        const riskAssessment = { ...data.result };
        addRiskScore(riskAssessment);
        setTimeout(() => {
          setConfirmModal("assessment");
        }, 300);
      }
    }
  };

  const handleConfirmEdit = () => {
    setConfirmModal(undefined);
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const findProducts = updatedDisabledSteps.indexOf("Products");
    if (findProducts === -1) {
      updatedDisabledSteps.push("Products");
    }
    return updateOnboarding({ ...onboarding, finishedSteps: [], disabledSteps: updatedDisabledSteps });
  };

  const handleCancelEdit = () => {
    if (prevQuestionnaire !== undefined) {
      setConfirmModal(undefined);
      addAssessmentQuestions(prevQuestionnaire);
    }
  };

  const isAssessment = confirmModal === "assessment";

  const labelCancel = isAssessment ? RISK_ASSESSMENT.BUTTON_RETAKE : RISK_ASSESSMENT.BUTTON_NO;
  const labelContinue = isAssessment ? RISK_ASSESSMENT.BUTTON_CONFIRM : RISK_ASSESSMENT.BUTTON_YES;
  const modalTitle = isAssessment ? RISK_ASSESSMENT.PROFILE_TITLE : RISK_ASSESSMENT.EDIT_TITLE_ASSESSMENT;
  const handleCancel = isAssessment ? handleRetakeAssessment : handleCancelEdit;
  const handleContinue = isAssessment ? handleConfirmAssessment : handleConfirmEdit;
  const modalTitleStyle: TextStyle = isAssessment ? {} : { width: sw432 };

  const riskProfile = [
    { label: RISK_ASSESSMENT.PROFILE_APPETITE, title: riskScore.appetite },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_RETURN, title: riskScore.rangeOfReturn },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_TYPE, title: riskScore.type },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_SUGGESTION, title: riskScore.fundSuggestion },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_PROFILE, title: riskScore.profile },
  ];

  useEffect(() => {
    if (prevQuestionnaire === undefined && finishedSteps.includes("RiskAssessment")) {
      setPrevQuestionnaire(questionnaire);
    }
    if (prevQuestionnaire !== undefined && !isObjectEqual(questionnaire, prevQuestionnaire)) {
      setConfirmModal("promptAssessment");
    }
  }, [finishedSteps, prevQuestionnaire, questionnaire]);

  return (
    <Fragment>
      <ContentPage
        handleCancel={handleCancelOnboarding!}
        handleContinue={handlePageContinue}
        heading={`${RISK_ASSESSMENT.HEADING} ${name}.`}
        subheading={RISK_ASSESSMENT.SUBHEADING}>
        <View style={flexRow}>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <View>
            <CustomSpacer space={sh40} />
            <View onStartShouldSetResponderCapture={() => true}>
              <LabeledTitle
                label={RISK_ASSESSMENT.LABEL_QUESTION_1}
                labelStyle={{ ...fs10BoldBlack2, ...disabledOpacity }}
                spaceToLabel={sh8}
                title={RISK_ASSESSMENT.QUESTION_1}
                titleStyle={{ ...fs16BoldBlack2, ...disabledOpacity }}
              />
              <CustomSpacer space={sh16} />
              <CustomTextInput
                disabled={true}
                label={RISK_ASSESSMENT.LABEL_DATE_OF_BIRTH}
                rightIcon="calendar"
                rightIconColor={colorBlue._2}
                value={dateOfBirth}
              />
            </View>
            <CustomSpacer space={sh32} />
            <LabeledTitle
              label={RISK_ASSESSMENT.LABEL_QUESTION_2}
              labelStyle={fs10BoldBlack2}
              spaceToLabel={sh8}
              title={RISK_ASSESSMENT.QUESTION_2}
              titleStyle={fs16BoldBlack2}
            />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q2_OPTIONS} selected={questionTwo!} setSelected={setQ2} />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_3}
              options={Q3_OPTIONS}
              selected={questionThree!}
              setSelected={setQ3}
              title={RISK_ASSESSMENT.QUESTION_3}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_4}
              options={Q4_OPTIONS}
              right={<Image style={{ height: sh143, width: sw140 }} source={LocalAssets.graph.risk_assessment_graph_1} />}
              selected={questionFour!}
              setSelected={setQ4}
              title={RISK_ASSESSMENT.QUESTION_4}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_5}
              options={Q5_OPTIONS}
              right={<Image style={{ height: sh155, width: sw221 }} source={LocalAssets.graph.risk_assessment_graph_2} />}
              selected={questionFive!}
              setSelected={setQ5}
              title={RISK_ASSESSMENT.QUESTION_5}
            />
            <CustomSpacer space={sh32} />
            <LabeledTitle
              label={RISK_ASSESSMENT.LABEL_QUESTION_6}
              labelStyle={fs10BoldBlack2}
              spaceToLabel={sh8}
              title={RISK_ASSESSMENT.QUESTION_6}
              titleStyle={fs16BoldBlack2}
            />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q6_OPTIONS} selected={questionSix!} setSelected={setQ6} />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_7}
              options={Q7_OPTIONS}
              selected={questionSeven!}
              setSelected={setQ7}
              title={RISK_ASSESSMENT.QUESTION_7}
            />
            {questionSeven !== undefined && questionSeven !== 0 ? (
              <Fragment>
                <CustomSpacer space={sh32} />
                <Question
                  label={RISK_ASSESSMENT.LABEL_QUESTION_8}
                  options={Q8_OPTIONS}
                  RenderContent={(renderContentProps) => {
                    const { options, selected, setSelected } = renderContentProps;
                    return (
                      <Fragment>
                        {options!.map((option: string, index: number) => {
                          const infoContent =
                            index === 1 ? (
                              <View>
                                <Text style={fs12BoldWhite1}>{RISK_ASSESSMENT.POPUP_ASSET_1}</Text>
                                <Text style={fs12BoldWhite1}>{RISK_ASSESSMENT.POPUP_ASSET_2}</Text>
                              </View>
                            ) : (
                              <View>
                                <Text style={{ ...fs12BoldWhite1, lineHeight: sh24 }}>{RISK_ASSESSMENT.POPUP_INCOME}</Text>
                              </View>
                            );
                          const defaultCondition: ReactElement | null = index <= 1 ? infoContent : <View />;

                          const handleSelect = () => {
                            setSelected(options!.indexOf(option));
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
                                    <CustomTooltip content={defaultCondition} />
                                  </Fragment>
                                ) : null}
                              </View>
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    );
                  }}
                  selected={questionEight!}
                  setSelected={setQ8}
                  title={RISK_ASSESSMENT.QUESTION_8}
                />
              </Fragment>
            ) : null}
          </View>
          <CustomSpacer isHorizontal={true} space={sw256} />
        </View>
      </ContentPage>
      {confirmModal !== undefined ? (
        <ConfirmationModal
          handleCancel={handleCancel}
          handleContinue={handleContinue}
          labelCancel={labelCancel}
          labelContinue={labelContinue}
          spaceToButton={sh32}
          spaceToContent={sh24}
          spaceToTitle={sh56}
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
            </Fragment>
          ) : (
            <Text style={fs16BoldBlack2}>{RISK_ASSESSMENT.EDIT_LABEL}</Text>
          )}
        </ConfirmationModal>
      ) : null}
    </Fragment>
  );
};

export const QuestionnaireContent = connect(RiskMapStateToProps, RiskMapDispatchToProps)(QuestionnaireContentComponent);
