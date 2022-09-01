import React, { Fragment, FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { Alert, Image, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/images/LocalAssets";
import {
  ColorCard,
  ConfirmationModal,
  ContentPage,
  CustomSlider,
  CustomSpacer,
  CustomTextInput,
  CustomTooltip,
  LabeledTitle,
} from "../../components";
import { Language, NunitoBold, NunitoRegular } from "../../constants";
import { Q2_OPTIONS, Q3_OPTIONS, Q4_OPTIONS_NEW, Q5_OPTIONS, Q6_OPTIONS, Q7_OPTIONS, Q8_OPTIONS, Q9_OPTIONS } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import { getRiskProfile } from "../../network-actions";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  alignSelfStart,
  centerHV,
  circleBorder,
  colorBlue,
  colorRed,
  colorWhite,
  flexRow,
  fs12BoldGray5,
  fs12BoldGray6,
  fs12BoldWhite1,
  fs12RegGray6,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs16RegGray6,
  imageContain,
  rowCenterVertical,
  sh143,
  sh155,
  sh16,
  sh24,
  sh32,
  sh56,
  sw1,
  sw11,
  sw12,
  sw140,
  sw152,
  sw16,
  sw221,
  sw24,
  sw432,
  sw7,
  sw72,
  sw8,
} from "../../styles";
import { QuestionContent, QuestionHeader } from "../../templates";
import { defaultContentProps } from "../ForceUpdate/Content";

const { RISK_ASSESSMENT } = Language.PAGE;

interface RiskAssessmentContentProps extends RiskStoreProps, NewSalesContentProps {
  navigation: IStackNavigationProp;
}

const NewSalesRiskAssessmentComponent: FunctionComponent<RiskAssessmentContentProps> = ({
  addAssessmentQuestions,
  addRiskInfo,
  addRiskScore,
  details,
  handleNextStep,
  navigation,
  newSales,
  principalHolder,
  questionnaire,
  resetQuestionnaire,
  riskScore,
  setLoading,
  updateIsRiskUpdated,
  updateNewSales,
  updateToast,
}: RiskAssessmentContentProps) => {
  const { clientId, dateOfBirth, id } = principalHolder!;
  const { disabledSteps, finishedSteps } = newSales;
  const { questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine } = questionnaire;

  const fetching = useRef<boolean>(false);
  const [updatedFinishedSteps, setUpdatedFinishedSteps] = useState<TypeNewSalesRoute[]>(finishedSteps);
  const [confirmModal, setConfirmModal] = useState<TypeRiskAssessmentModal>(undefined);
  const [prevRiskAssessment, setPrevRiskAssessment] = useState<IRiskAssessmentQuestions | undefined>(undefined);
  const [isEditConfirmed, setIsEditConfirmed] = useState<boolean>(false);
  const [currentRiskScore, setCurrentRiskScore] = useState<IRiskScore>(riskScore);

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
    updateIsRiskUpdated(true);
    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
    const newFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
    const findProducts = updatedDisabledSteps.indexOf("Products");
    if (findProducts === -1) {
      updatedDisabledSteps.push("Products");
    }
    const findRiskAssessment = newFinishedSteps.indexOf("RiskAssessment");
    if (findRiskAssessment === -1) {
      newFinishedSteps.push("RiskAssessment");
    }
    updateNewSales({
      ...newSales,
      finishedSteps: newFinishedSteps,
      disabledSteps: updatedDisabledSteps,
      toast: {
        toastText: RISK_ASSESSMENT.TOAST_CHANGES,
        toastVisible: true,
      },
    });
    addRiskInfo({
      appetite: currentRiskScore!.appetite,
      hnwStatus: currentRiskScore!.netWorth,
      profile: currentRiskScore!.profile,
      expectedRange: currentRiskScore!.rangeOfReturn,
      type: currentRiskScore!.type,
    });
    resetQuestionnaire();
    updateToast({ toastText: RISK_ASSESSMENT.TOAST_CHANGES, toastVisible: true });
    handleNextStep("RiskSummary");
  };

  const handleRetakeAssessment = () => {
    setConfirmModal(undefined);
    resetQuestionnaire();
    // resetRiskAssessment();
  };

  const handlePageContinue = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const request: IGetRiskProfileRequest = {
        clientId: clientId!,
        id: id!,
        initId: details!.initId!,
        isEtb: true,
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
          setCurrentRiskScore(riskAssessment);
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
    setPrevRiskAssessment(undefined);
    setUpdatedFinishedSteps([]);
    setIsEditConfirmed(true);
  };

  const handleCancelEdit = () => {
    if (prevRiskAssessment !== undefined) {
      setConfirmModal(undefined);
      addAssessmentQuestions(prevRiskAssessment);
    }
  };

  const handleCancelAssessment = () => {
    resetQuestionnaire();
    handleNextStep("RiskSummary");
  };

  const isAssessment = confirmModal === "assessment";

  const labelCancel = isAssessment ? RISK_ASSESSMENT.BUTTON_CANCEL : RISK_ASSESSMENT.BUTTON_NO;
  const labelContinue = isAssessment ? RISK_ASSESSMENT.BUTTON_CONFIRM_SAVE : RISK_ASSESSMENT.BUTTON_YES;
  const modalTitle = isAssessment ? RISK_ASSESSMENT.PROFILE_TITLE_NEW : RISK_ASSESSMENT.EDIT_TITLE_ASSESSMENT;
  const handleCancel = isAssessment ? handleRetakeAssessment : handleCancelEdit;
  const handleContinue = isAssessment ? handleConfirmAssessment : handleConfirmEdit;
  const modalTitleStyle: TextStyle = isAssessment ? {} : { width: sw432 };

  const riskProfile = [
    { label: RISK_ASSESSMENT.PROFILE_APPETITE, title: currentRiskScore.appetite },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_RETURN, title: currentRiskScore.rangeOfReturn },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_TYPE, title: currentRiskScore.type },
    { label: RISK_ASSESSMENT.PROFILE_LABEL_PROFILE, title: currentRiskScore.profile },
  ];

  useEffect(() => {
    if (prevRiskAssessment === undefined && updatedFinishedSteps.includes("RiskAssessment")) {
      setPrevRiskAssessment(questionnaire);
    }
    // if (prevRiskAssessment !== undefined && !isObjectEqual(questionnaire, prevRiskAssessment)) {
    //   setConfirmModal("promptAssessment");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedSteps, prevRiskAssessment, questionnaire]);

  const disabled =
    questionTwo === -1 ||
    questionFour === -1 ||
    questionFive === -1 ||
    questionSix === -1 ||
    questionEight === -1 ||
    (questionEight !== 0 && questionNine === -1);

  const questionnaireStyle: ViewStyle = { marginLeft: sw24, marginRight: sw72 };

  return (
    <Fragment>
      <ContentPage
        {...defaultContentProps}
        cancelDisabled={isEditConfirmed}
        continueDisabled={disabled}
        handleCancel={handleCancelAssessment}
        handleContinue={handlePageContinue}
        labelContinue={RISK_ASSESSMENT.BUTTON_APPLY}
        subheading={RISK_ASSESSMENT.HEADING_RISK}
        subtitle={RISK_ASSESSMENT.SUBHEADING}>
        <CustomSpacer space={sh24} />
        <View style={questionnaireStyle}>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <View>
            <View onStartShouldSetResponderCapture={() => true}>
              <ColorCard
                header="custom"
                customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q1} label={RISK_ASSESSMENT.QUESTION_1} />}
                content={
                  <CustomTextInput
                    disabled={true}
                    label={RISK_ASSESSMENT.LABEL_DATE_OF_BIRTH}
                    rightIcon={{ name: "calendar" }}
                    value={dateOfBirth}
                  />
                }
              />
              <CustomSpacer space={sh16} />
            </View>
            <ColorCard
              header="custom"
              customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q2} label={RISK_ASSESSMENT.QUESTION_2} />}
              content={<QuestionContent contentToRadioSpace={sw11} options={Q2_OPTIONS} selected={questionTwo} setSelected={setQ2} />}
            />
            <CustomSpacer space={sh16} />
            <ColorCard
              header="custom"
              customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q3} label={RISK_ASSESSMENT.QUESTION_3} />}
              content={
                <View style={{ paddingRight: sw152 }}>
                  <CustomSlider
                    bottomSpace={sh16}
                    disabled={true}
                    labelStyle={fs12RegGray6}
                    options={Q3_OPTIONS}
                    selected={questionThree}
                    selectedLabelStyle={fs12BoldGray6}
                    setSelected={setQ3}
                  />
                </View>
              }
            />
            <CustomSpacer space={sh16} />
            <ColorCard
              header="custom"
              customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q4} label={RISK_ASSESSMENT.QUESTION_4} />}
              content={<QuestionContent contentToRadioSpace={sw11} options={Q4_OPTIONS_NEW} selected={questionFour} setSelected={setQ4} />}
            />
            <CustomSpacer space={sh16} />
            <ColorCard
              header="custom"
              customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q5} label={RISK_ASSESSMENT.QUESTION_5} />}
              content={
                <QuestionContent
                  contentToRadioSpace={sw11}
                  options={Q5_OPTIONS}
                  right={
                    <Image style={{ ...imageContain, height: sh143, width: sw140 }} source={LocalAssets.graph.risk_assessment_graph_1} />
                  }
                  selected={questionFive}
                  setSelected={setQ5}
                />
              }
            />
            <CustomSpacer space={sh16} />
            <ColorCard
              header="custom"
              customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q6} label={RISK_ASSESSMENT.QUESTION_6} />}
              content={
                <QuestionContent
                  contentToRadioSpace={sw11}
                  options={Q6_OPTIONS}
                  right={
                    <Image style={{ ...imageContain, height: sh155, width: sw221 }} source={LocalAssets.graph.risk_assessment_graph_2} />
                  }
                  selected={questionSix}
                  setSelected={setQ6}
                />
              }
            />
            <CustomSpacer space={sh16} />
            <ColorCard
              header="custom"
              customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q7} label={RISK_ASSESSMENT.QUESTION_7} />}
              content={
                <View style={{ paddingRight: sw152 }}>
                  <CustomSlider
                    bottomSpace={sh16}
                    disabled={true}
                    labelStyle={fs12RegGray6}
                    options={Q7_OPTIONS}
                    selected={questionSeven}
                    selectedLabelStyle={fs12BoldGray6}
                    setSelected={setQ7}
                  />
                </View>
              }
            />
            <CustomSpacer space={sh16} />
            <ColorCard
              header="custom"
              customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q8} label={RISK_ASSESSMENT.QUESTION_8} />}
              content={<QuestionContent contentToRadioSpace={sw11} options={Q8_OPTIONS} selected={questionEight} setSelected={setQ8} />}
            />
            {questionEight !== -1 && questionEight !== 0 ? (
              <Fragment>
                <CustomSpacer space={sh16} />
                <ColorCard
                  header="custom"
                  customHeader={<QuestionHeader avatarText={RISK_ASSESSMENT.LABEL_Q9} label={RISK_ASSESSMENT.QUESTION_9} />}
                  content={
                    <QuestionContent
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
                                index === selected
                                  ? circleBorder(sw24, sw1, colorRed._1, colorRed._1)
                                  : circleBorder(sw24, sw1, colorBlue._1);
                              const fontFamily = index === selected ? NunitoBold : NunitoRegular;

                              return (
                                <Fragment key={index}>
                                  {index !== 0 ? <CustomSpacer isHorizontal={false} space={sh16} /> : null}
                                  <View style={flexRow}>
                                    <TouchableWithoutFeedback onPress={handleSelect}>
                                      <View style={rowCenterVertical}>
                                        <View style={alignSelfStart}>
                                          <View style={{ ...centerHV, ...circleStyle }}>
                                            <IcoMoon name="success" size={sw16} color={iconColor} />
                                          </View>
                                        </View>
                                        <CustomSpacer isHorizontal={true} space={sw11} />
                                        <Text style={{ ...fs16RegBlack2, fontFamily: fontFamily }}>{option.label}</Text>
                                      </View>
                                    </TouchableWithoutFeedback>
                                    <CustomSpacer isHorizontal={true} space={sw8} />
                                    {index < 2 ? (
                                      <Fragment>
                                        <CustomTooltip content={defaultCondition} arrowSize={{ width: sw12, height: sw7 }} theme="dark" />
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
                    />
                  }
                />
              </Fragment>
            ) : null}
          </View>
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
                  labelStyle={fs12BoldGray5}
                  spaceToBottom={sh16}
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

export const NewSalesRiskAssessment = connect(RiskMapStateToProps, RiskMapDispatchToProps)(NewSalesRiskAssessmentComponent);
