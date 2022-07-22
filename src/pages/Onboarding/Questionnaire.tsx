import React, { Fragment, FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { Alert, Image, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/images/LocalAssets";
import {
  ConfirmationModal,
  ContentPage,
  CustomSlider,
  CustomSpacer,
  CustomTextInput,
  CustomTooltip,
  LabeledTitle,
  Question,
} from "../../components";
import { Language, NunitoBold, NunitoRegular, ONBOARDING_ROUTES } from "../../constants";
import { Q2_OPTIONS, Q3_OPTIONS, Q4_OPTIONS, Q5_OPTIONS, Q6_OPTIONS, Q7_OPTIONS, Q8_OPTIONS, Q9_OPTIONS } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import { getRiskProfile } from "../../network-actions";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  alignSelfStart,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorRed,
  colorWhite,
  disabledOpacity5,
  flexRow,
  fs10BoldGray6,
  fs12BoldGray6,
  fs12BoldWhite1,
  fs12RegGray5,
  fs16BoldBlack2,
  fs16RegGray6,
  imageContain,
  sh143,
  sh155,
  sh16,
  sh24,
  sh32,
  sh40,
  sh56,
  sh8,
  sw1,
  sw12,
  sw140,
  sw16,
  sw20,
  sw221,
  sw24,
  sw256,
  sw326,
  sw328,
  sw432,
  sw7,
  sw8,
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
  details,
  handleCancelOnboarding,
  handleNextStep,
  navigation,
  onboarding,
  principalHolder,
  questionnaire,
  resetRiskAssessment,
  resetSelectedFund,
  resetProducts,
  riskScore,
  setLoading,
  updateOnboarding,
  updateProductType,
}: QuestionnaireContentProps) => {
  const { clientId, dateOfBirth, id, name } = principalHolder!;
  const { disabledSteps, finishedSteps } = onboarding;

  const fetching = useRef<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<TypeRiskAssessmentModal>(undefined);
  const [prevQuestionnaire, setPrevQuestionnaire] = useState<IRiskAssessmentQuestions | undefined>(undefined);
  const { questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine } = questionnaire;

  const setQ2 = (index: number) => addAssessmentQuestions({ questionTwo: index });
  const setQ3 = (index: number) => addAssessmentQuestions({ questionThree: index });
  const setQ4 = (index: number) => addAssessmentQuestions({ questionFour: index });
  const setQ5 = (index: number) => addAssessmentQuestions({ questionFive: index });
  const setQ6 = (index: number) => addAssessmentQuestions({ questionSix: index });
  const setQ7 = (index: number) => addAssessmentQuestions({ questionSeven: index });
  const setQ8 = (index: number) =>
    addAssessmentQuestions({ questionEight: index, questionNine: index === 0 || index === -1 ? -1 : questionNine });
  const setQ9 = (index: number) => addAssessmentQuestions({ questionNine: index });

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
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const request: IGetRiskProfileRequest = {
        clientId: clientId!,
        id: id!,
        initId: details!.initId!,
        isEtb: false,
        isForceUpdate: false,
        riskAssessment: {
          questionTwo: questionTwo,
          questionThree: questionThree,
          questionFour: questionFour,
          questionFive: questionFive,
          questionSix: questionSix,
          questionSeven: questionSeven,
          questionEight: questionEight,
          questionNine: questionNine,
        },
      };
      const response: IGetRiskProfileResponse = await getRiskProfile(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          const riskAssessment = { ...data.result };
          addRiskScore(riskAssessment);
          setTimeout(() => {
            setConfirmModal("assessment");
          }, 300);
        }
        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          setTimeout(() => {
            Alert.alert(error.message, errorList);
          }, 300);
        }
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
    resetSelectedFund();
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

  const disabled =
    questionTwo === -1 ||
    questionFour === -1 ||
    questionFive === -1 ||
    questionSix === -1 ||
    questionEight === -1 ||
    (questionEight !== 0 && questionNine === -1);

  return (
    <Fragment>
      <ContentPage
        continueDisabled={disabled}
        handleCancel={handleCancelOnboarding}
        handleContinue={handlePageContinue}
        heading={`${RISK_ASSESSMENT.HEADING} ${name},`}
        subheading={RISK_ASSESSMENT.SUBHEADING}>
        <View style={flexRow}>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <View>
            <CustomSpacer space={sh40} />
            <View onStartShouldSetResponderCapture={() => true}>
              <LabeledTitle
                label={RISK_ASSESSMENT.LABEL_QUESTION_1}
                labelStyle={{ ...fs10BoldGray6, ...disabledOpacity5 }}
                spaceToLabel={sh8}
                title={RISK_ASSESSMENT.QUESTION_1}
                titleStyle={disabledOpacity5}
              />
              <CustomSpacer space={sh16} />
              <CustomTextInput
                disabled={true}
                label={RISK_ASSESSMENT.LABEL_DATE_OF_BIRTH}
                rightIcon={{ name: "calendar" }}
                value={dateOfBirth}
              />
            </View>
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_2}
              options={Q2_OPTIONS}
              selected={questionTwo}
              setSelected={setQ2}
              title={RISK_ASSESSMENT.QUESTION_2}
            />
            <CustomSpacer space={sh32} />
            <LabeledTitle
              label={RISK_ASSESSMENT.LABEL_QUESTION_3}
              labelStyle={fs10BoldGray6}
              spaceToLabel={sh8}
              title={RISK_ASSESSMENT.QUESTION_3}
            />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q3_OPTIONS} selected={questionThree} setSelected={setQ3} />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_4}
              options={Q4_OPTIONS}
              selected={questionFour}
              setSelected={setQ4}
              title={RISK_ASSESSMENT.QUESTION_4}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_5}
              options={Q5_OPTIONS}
              right={<Image style={{ ...imageContain, height: sh143, width: sw140 }} source={LocalAssets.graph.risk_assessment_graph_1} />}
              selected={questionFive}
              setSelected={setQ5}
              title={RISK_ASSESSMENT.QUESTION_5}
            />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_6}
              options={Q6_OPTIONS}
              right={<Image style={{ ...imageContain, height: sh155, width: sw221 }} source={LocalAssets.graph.risk_assessment_graph_2} />}
              selected={questionSix}
              setSelected={setQ6}
              title={RISK_ASSESSMENT.QUESTION_6}
            />
            <CustomSpacer space={sh32} />
            <LabeledTitle
              label={RISK_ASSESSMENT.LABEL_QUESTION_7}
              labelStyle={fs10BoldGray6}
              spaceToLabel={sh8}
              title={RISK_ASSESSMENT.QUESTION_7}
            />
            <CustomSpacer space={sh16} />
            <CustomSlider disabled={true} options={Q7_OPTIONS} selected={questionSeven} setSelected={setQ7} />
            <CustomSpacer space={sh32} />
            <Question
              label={RISK_ASSESSMENT.LABEL_QUESTION_8}
              options={Q8_OPTIONS}
              selected={questionEight}
              setSelected={setQ8}
              title={RISK_ASSESSMENT.QUESTION_8}
            />
            {questionEight !== -1 && questionEight !== 0 ? (
              <Fragment>
                <CustomSpacer space={sh32} />
                <Question
                  label={RISK_ASSESSMENT.LABEL_QUESTION_9}
                  options={Q9_OPTIONS}
                  RenderContent={(renderContentProps) => {
                    const { options, selected, setSelected } = renderContentProps;
                    return (
                      <Fragment>
                        {options!.map((option: ICheckBoxWithSubLabel, index: number) => {
                          const infoContent =
                            index === 1 ? (
                              <View>
                                <Text style={fs12BoldWhite1}>{RISK_ASSESSMENT.POPUP_ASSET_1}</Text>
                                <Text style={fs12BoldWhite1}>{RISK_ASSESSMENT.POPUP_ASSET_2}</Text>
                              </View>
                            ) : (
                              <View>
                                <Text style={fs12BoldWhite1}>{RISK_ASSESSMENT.POPUP_INCOME}</Text>
                              </View>
                            );
                          const defaultCondition: ReactElement | null = index <= 1 ? infoContent : <View />;

                          const handleSelect = () => {
                            const newIndex = options!.findIndex((search: ICheckBoxWithSubLabel) => search.label === option.label);
                            setSelected(newIndex !== questionNine ? newIndex : -1);
                          };

                          const iconColor = index === selected ? colorWhite._1 : colorBlue._1;
                          const circleStyle: ViewStyle =
                            index === selected ? circleBorder(sw24, sw1, colorRed._1, colorRed._1) : circleBorder(sw24, sw1, colorBlue._1);
                          const fontFamily = index === selected ? NunitoBold : NunitoRegular;

                          return (
                            <Fragment key={index}>
                              {index !== 0 ? <CustomSpacer isHorizontal={false} space={sh16} /> : null}
                              <View style={flexRow}>
                                <TouchableWithoutFeedback onPress={handleSelect}>
                                  <View style={{ ...centerVertical, ...flexRow, width: sw328 }}>
                                    <View style={alignSelfStart}>
                                      <View style={{ ...centerHV, ...circleStyle }}>
                                        <IcoMoon name="success" size={sw16} color={iconColor} />
                                      </View>
                                    </View>
                                    <CustomSpacer space={sw8} isHorizontal />
                                    <Text style={{ ...fs12BoldGray6, fontFamily: fontFamily, maxWidth: sw326 }}>{option.label}</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                                {index < 2 ? (
                                  <Fragment>
                                    <CustomSpacer isHorizontal={true} space={sw20} />
                                    <CustomTooltip content={defaultCondition} arrowSize={{ width: sw12, height: sw7 }} />
                                  </Fragment>
                                ) : null}
                              </View>
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    );
                  }}
                  selected={questionNine}
                  setSelected={setQ9}
                  title={RISK_ASSESSMENT.QUESTION_9}
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
                  labelStyle={fs12RegGray5}
                  spaceToBottom={sh24}
                  spaceToLabel={sh8}
                  title={item.title}
                  titleStyle={fs16BoldBlack2}
                />
              ))}
            </Fragment>
          ) : (
            <Text style={fs16RegGray6}>{RISK_ASSESSMENT.EDIT_LABEL}</Text>
          )}
        </ConfirmationModal>
      ) : null}
    </Fragment>
  );
};

export const QuestionnaireContent = connect(RiskMapStateToProps, RiskMapDispatchToProps)(QuestionnaireContentComponent);
