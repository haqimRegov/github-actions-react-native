import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, LayoutChangeEvent, ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { ActionButtons, CustomFlexSpacer, CustomSpacer, FileViewer, Loading, PromptModal, Tab, Toggle } from "../../../../components";
import { DEFAULT_DATE_TIME_FORMAT } from "../../../../constants";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import { getCaseResponse, getClientProfile, getPreviousResponse, submitCase } from "../../../../network-actions";
import { EDDMapDispatchToProps, EDDMapStateToProps, EDDStoreProps } from "../../../../store/EDD";
import {
  borderBottomBlue4,
  borderBottomGray2,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12RegGray5,
  fs16BoldBlack2,
  fs16BoldBlue1,
  fullHeight,
  justifyContentStart,
  px,
  py,
  sh16,
  sh24,
  sh32,
  sh40,
  sh56,
  sh8,
  shadow16Blue112,
  sw1,
  sw16,
  sw2,
  sw20,
  sw24,
  sw4,
  sw48,
  sw56,
  sw66,
  sw8,
} from "../../../../styles";
import { AccountSummary } from "../../../../templates";
import { QuestionCard } from "../../../../templates/EDD/QuestionCard";
import { AnimationUtils } from "../../../../utils/Animation";
import { structureProfile } from "../../../../utils/ProfileStructuring";
import { DashboardLayout } from "../../DashboardLayout";
import { handleDataToSubmit } from "../helpers";
import { validateSubmitCase } from "../validation";

const { DASHBOARD_EDD, DASHBOARD_EDD_CASE, ACTION_BUTTONS, DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

declare interface ReroutedCaseProps extends EDDStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: EDDPageType) => void;
}

export const ReroutedCaseComponent: FunctionComponent<ReroutedCaseProps> = ({
  currentCase,
  loading,
  setLoading,
  setScreen,
  updateEDDPill,
  updateCurrentCase,
  ...props
}: ReroutedCaseProps) => {
  const [expand, setExpand] = useState<boolean[]>([]);
  const [toggle, setToggle] = useState<TCasePage>("EDD Case");
  const [modal, setModal] = useState<boolean>(false);
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const [cases, setCases] = useState<IEDDCase>({});
  const [scrollRef, setScrollRef] = useState<ScrollView | undefined>(undefined);
  const [positionArray, setPositionArray] = useState<IAxisY[]>([]);
  const fetching = useRef(true);
  const { profile, responses } = cases;

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const handleViewId = () => {
    if (cases !== undefined && cases.profile !== undefined) {
      setFile(cases.profile.uploadedDocument[0]);
    }
  };

  const handleBack = () => {
    setScreen("Cases");
  };

  const handleToggle = (text: string) => {
    setToggle(text as TCasePage);
  };

  const handleDone = () => {
    updateEDDPill("submitted");
    setScreen("Cases");
  };

  const handleFetching = (isLoading: boolean) => {
    fetching.current = isLoading;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const responseToSubmit = { ...responses![0] };
    const answers = await handleDataToSubmit(responseToSubmit, currentCase!.caseId.toString(), responses!.length - 1, handleFetching);
    const requestData = {
      caseId: currentCase!.caseId,
      allAnswers: answers.formattedAnswers,
      additionalAnswers: answers.formattedAdditionalData,
    };
    const caseResponse: ISubmitCaseResponse = await submitCase(requestData, props.navigation);
    setLoading(false);
    if (caseResponse !== undefined) {
      const { data: upperData, error } = caseResponse;
      if (error === null && upperData !== null) {
        setModal(true);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleDataFormatting = (result: ICaseResponseStructure[]) => {
    const formattedData: IEDDResponse[] = [];
    result.forEach((response: ICaseResponseStructure) => {
      const { amla, agent, data, questions } = response;
      const questionsData: IEDDQuestion[] = [];
      if (data !== null && data.length > 0) {
        data.forEach((question: ICaseResponseData) => {
          const { questionId, description, answers, amlaRemark } = question;
          const parsedAnswers: IPreviousData[] = JSON.parse(answers);
          // Make the title as amlaRemark to maintain consistency while viewing previous data.
          if (amlaRemark !== null) {
            parsedAnswers[0].title = amlaRemark;
            parsedAnswers[0].label = DASHBOARD_EDD_CASE.LABEL_AMLA_REMARK;
          }
          questionsData.push({
            title: question.question,
            id: questionId,
            description: description !== null ? description : undefined,
            previousData: parsedAnswers,
          });
        });
      } else if (questions !== null) {
        questions.forEach((eachQuestion: ICaseResponseQuestion) => {
          const { question, questionId, amlaRemark } = eachQuestion;
          // For rerouted questions, we use the AMLA remark and create the same format as for the other template questions.
          const checkOptions: IOptionField[] =
            amlaRemark !== null
              ? [
                  {
                    id: "",
                    title: DASHBOARD_EDD_CASE.LABEL_AMLA_REMARK,
                    description: amlaRemark.title,
                    type: amlaRemark.type,
                    hasRemark: amlaRemark.hasDoc,
                    hasDoc: amlaRemark.hasDoc,
                    optionIndex: 0,
                  },
                ]
              : [];
          // Create initial state for answer
          const checkAnswer =
            amlaRemark !== null
              ? {
                  answers: [{ answer: {}, hasRemark: false, hasDoc: false }],
                  autoHide: true,
                }
              : { autoHide: true, answers: [] };
          questionsData.push({
            id: questionId,
            title: question,
            previousData: [],
            data: checkAnswer,
            options: checkOptions,
          });
        });
      }
      formattedData.push({
        amlaTitle: amla,
        userTitle: agent,
        questions: questionsData,
      });
    });
    return formattedData;
  };

  const handleFetchPreviousData = async (request: IPreviousResponseRequest) => {
    const updatedRequest = { ...request, caseId: currentCase!.caseId };
    const previousResponse: IPreviousResponse = await getPreviousResponse(updatedRequest, props.navigation);
    if (previousResponse !== undefined) {
      const { data: upperData, error } = previousResponse;
      if (error === null && upperData !== null) {
        const { result } = upperData;
        return result;
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
        return error;
      }
    }
    return false;
  };

  const handleFetchCase = async () => {
    if (fetching.current === true) {
      const request: ICaseResponseRequest = { caseId: currentCase!.caseId, isReroute: true };
      const caseResponse: ICaseResponse = await getCaseResponse(request, props.navigation);
      if (caseResponse !== undefined) {
        const { data: upperData, error } = caseResponse;
        if (error === null && upperData !== null) {
          const { response, client } = upperData.result;
          fetching.current = false;
          const structuredData: IEDDResponse[] = handleDataFormatting(response);
          if (currentCase === undefined) {
            const tempCurrentCase: IEDDDashboardCase = {
              accountNo: "",
              caseId: "",
              clientName: "",
              createdOn: "",
              isSeen: true,
              status: "Pending",
            };
            updateCurrentCase({ ...tempCurrentCase, clientName: client.name, status: client.status });
          }
          setCases({ ...cases, responses: structuredData });
          const expandArray = Array(structuredData.length).fill(false);
          expandArray[0] = true;
          setExpand(expandArray);
        }
        if (error !== null) {
          setTimeout(() => {
            Alert.alert(error.message);
          }, 100);
        }
      }
    }
  };

  const handleFetchProfile = async () => {
    const request: IClientProfileRequest = { caseId: currentCase!.caseId };
    const newCaseResponse: IClientProfileResponse = await getClientProfile(request, props.navigation, handleFetching);
    if (newCaseResponse !== undefined) {
      const { data: upperData, error } = newCaseResponse;
      if (error === null && upperData !== null) {
        const { profile: clientProfile } = upperData.result;
        setCases({
          ...cases,
          profile: {
            ...clientProfile.client,
            registrationDate: clientProfile.createdAt,
            accountType: clientProfile.accountType,
            accountOperationMode: clientProfile.signatory,
          },
        });
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (scrollRef !== undefined && positionArray.length === responses!.length) {
      const checkPositionArray = positionArray.every(
        (eachPosition) => typeof eachPosition === "object" && typeof eachPosition.y === "number",
      );
      if (checkPositionArray === true) {
        const findIndex = expand.findIndex((expandCheck) => expandCheck === true);
        if (expand.every((eachExpand) => eachExpand === false)) {
          scrollRef.scrollTo({ y: 0 });
        } else if (findIndex !== -1 && positionArray[findIndex] !== undefined && findIndex !== 0) {
          scrollRef.scrollTo({ y: positionArray[findIndex].y, animated: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionArray]);

  useEffect(() => {
    if (toggle === "EDD Case") {
      handleFetchCase();
    } else {
      handleFetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  const checkSubmit = responses !== undefined ? validateSubmitCase(responses[0], false) : true;

  const containerStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
    minHeight: sh56,
  };
  const headerStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    ...px(sw24),
    ...shadow16Blue112,
    height: sh56,
    backgroundColor: colorWhite._1,
  };
  const cardStyle: ViewStyle = {
    ...flexChild,
    ...shadow16Blue112,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
  };

  return (
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
        setScrollRef={setScrollRef}
        sideElement={
          <View style={justifyContentStart}>
            <Toggle labels={[DASHBOARD_EDD.LABEL_EDD_CASE, DASHBOARD_EDD.LABEL_PROFILE]} selected={toggle} setSelected={handleToggle} />
          </View>
        }
        status={currentCase?.status}
        title={currentCase!.clientName}
        titleIcon="arrow-left"
        titleIconOnPress={handleBack}>
        <View style={{ ...flexChild, ...px(sw24), ...fullHeight }}>
          <CustomSpacer space={sh24} />
          {toggle === "EDD Case" ? (
            <Fragment>
              {responses !== undefined ? (
                <Fragment>
                  {responses.map((response: IEDDResponse, index: number) => {
                    const { amlaTitle, questions, userTitle } = response;

                    const handleReset = () => {
                      const initialQuestions: IEDDQuestion[] = [];
                      response.questions.forEach((question: IEDDQuestion) => {
                        const { options } = question;
                        const answerArray: IQuestionData[] = [];
                        if (options !== undefined) {
                          let count = 0;
                          options.forEach((option: IOptionField) => {
                            const { type } = option;
                            if (type === "radiobutton") {
                              count += 1;
                            } else {
                              count = 0;
                            }
                            if (count <= 1 && type !== "checkbox") {
                              answerArray.push({ answer: { answer: "" }, hasRemark: false, hasDoc: false });
                            }
                          });
                        } else {
                          answerArray.push({ answer: { answer: "" }, hasRemark: false, hasDoc: false });
                        }
                        initialQuestions.push({ ...question, data: { autoHide: true, answers: answerArray } });
                      });
                      const tempResponse = [...cases.responses!];
                      tempResponse[index] = { ...response, questions: initialQuestions };
                      setCases({ ...cases, responses: tempResponse });
                    };

                    const handleExpand = () => {
                      const tempExpand = [...expand];
                      if (tempExpand[index] === false) {
                        tempExpand.fill(false);
                        tempExpand[index] = true;
                      } else {
                        tempExpand[index] = !tempExpand[index];
                      }
                      setExpand(tempExpand);
                      AnimationUtils.layout({ duration: 180 });
                    };

                    const handleLayout = (event: LayoutChangeEvent) => {
                      const { y } = event.nativeEvent.layout;
                      const tempPositionArray = [...positionArray];
                      tempPositionArray[index] = { y };
                      setPositionArray(tempPositionArray);
                    };

                    const defaultIcon = expand[index] ? "caret-up" : "caret-down";
                    const border: ViewStyle =
                      expand[index] === false ? { borderRadius: sw8 } : { borderTopRightRadius: sw8, borderTopLeftRadius: sw8 };
                    const topTitle = userTitle !== null && userTitle !== undefined ? userTitle : amlaTitle;
                    const color = userTitle !== null && userTitle !== undefined ? colorRed._1 : colorBlue._7;
                    const topTitleStyle: ViewStyle = userTitle === undefined ? { ...px(24) } : {};
                    const answerTitle =
                      index !== responses.length - 1 ? DASHBOARD_EDD_CASE.LABEL_FOLLOW_UP_ANSWERS : DASHBOARD_EDD_CASE.LABEL_ANSWER;
                    const collapsibleTitle = index === 0 ? DASHBOARD_EDD_CASE.LABEL_FOLLOW_UP_QUESTIONS : answerTitle;
                    const responseNumber = responses.length - index;
                    const topTitlePadding: number = index === 0 ? sw24 : sw56;
                    return (
                      <Fragment key={index}>
                        {index !== 0 ? <CustomSpacer space={sh40} /> : null}
                        <View style={{ ...flexRow, ...centerVertical }}>
                          <Text style={fs16BoldBlack2}>{`${DASHBOARD_EDD.LABEL_RESPONSE} ${responseNumber}`}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={{ ...flexChild, ...borderBottomBlue4 }} />
                        </View>
                        <CustomSpacer space={sh16} />
                        <View style={{ ...px(topTitlePadding), ...flexRow, ...centerVertical, ...topTitleStyle }}>
                          <View style={{ backgroundColor: color, height: sh16, width: sw2 }} />
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs12BoldBlack2}>{topTitle.user}</Text>
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs12RegGray5}>{moment(topTitle.time, "x").format(DEFAULT_DATE_TIME_FORMAT)}</Text>
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <View style={{ backgroundColor: colorGray._5, height: sh16, width: sw1 }} />
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <Text style={fs12RegGray5}>{`${DASHBOARD_EDD.LABEL_STATUS}: ${topTitle.status}`}</Text>
                        </View>
                        <CustomSpacer space={sh8} />
                        <View onLayout={handleLayout} key={index} style={containerStyle}>
                          <TouchableWithoutFeedback onPress={handleExpand}>
                            <View style={{ ...headerStyle, ...border }}>
                              <Text style={{ ...fs16BoldBlue1 }}>{collapsibleTitle}</Text>
                              <CustomFlexSpacer />
                              <IcoMoon name={defaultIcon} size={sw20} />
                            </View>
                          </TouchableWithoutFeedback>
                          {expand.length > 0 && expand[index] === true ? (
                            <View style={{ ...py(sh32), ...px(sw24) }}>
                              {response.questions.map((question: IEDDQuestion, questionIndex: number) => {
                                const { title, description, options, data, previousData, id } = question;

                                const handleQuestion = (currentData: IQuestionDataWithHide, updatedPreviousData?: IPreviousData[]) => {
                                  const newData: IEDDResponse[] = [...cases.responses!];
                                  const tempData: IEDDQuestion[] = [...questions];
                                  const newPreviousData = updatedPreviousData !== undefined ? { previousData: updatedPreviousData } : {};
                                  tempData[questionIndex] = { ...tempData[questionIndex], data: currentData, ...newPreviousData };
                                  newData[index].questions = tempData;
                                  setCases({ ...cases, responses: newData });
                                };

                                return (
                                  <View key={questionIndex}>
                                    {questionIndex !== 0 ? <CustomSpacer space={sh16} /> : null}
                                    <QuestionCard
                                      data={data}
                                      getPreviousData={handleFetchPreviousData}
                                      options={options}
                                      previousData={previousData}
                                      question={title}
                                      questionId={id}
                                      // TODO Backend should sent a data to identify conclusion
                                      questionLabel={
                                        questionIndex === questions.length - 1 && id !== null && id.toString() === "9"
                                          ? DASHBOARD_EDD_CASE.LABEL_CONCLUSION
                                          : `Q${questionIndex + 1}`
                                      }
                                      questionLabelStyle={
                                        questionIndex === questions.length - 1 && id !== null && id.toString() === "9"
                                          ? { borderRadius: sw16, width: sw66 }
                                          : {}
                                      }
                                      showPrevious={index === 0}
                                      subQuestion={description}
                                      setData={handleQuestion}
                                      setFile={setFile}
                                    />
                                  </View>
                                );
                              })}
                              {index === 0 ? (
                                <Fragment>
                                  <CustomSpacer space={sh32} />
                                  <View style={centerHV}>
                                    <ActionButtons
                                      continueDisabled={checkSubmit || loading}
                                      labelCancel={ACTION_BUTTONS.BUTTON_RESET}
                                      labelContinue={ACTION_BUTTONS.BUTTON_SUBMIT}
                                      handleCancel={handleReset}
                                      handleContinue={handleSubmit}
                                    />
                                  </View>
                                </Fragment>
                              ) : null}
                            </View>
                          ) : null}
                        </View>
                        {userTitle !== undefined && userTitle !== null ? (
                          <Fragment>
                            <CustomSpacer space={sh8} />
                            <View style={{ ...px(sw24), ...flexRow, ...centerVertical }}>
                              <View style={{ backgroundColor: colorBlue._7, height: sh16, width: sw2 }} />
                              <CustomSpacer isHorizontal={true} space={sw8} />
                              <Text style={fs12BoldBlack2}>{amlaTitle.user}</Text>
                              <CustomSpacer isHorizontal={true} space={sw8} />
                              <Text style={fs12RegGray5}>{moment(amlaTitle.time, "x").format(DEFAULT_DATE_TIME_FORMAT)}</Text>
                              <CustomSpacer isHorizontal={true} space={sw4} />
                              <View style={{ backgroundColor: colorGray._5, height: sh16, width: sw1 }} />
                              <CustomSpacer isHorizontal={true} space={sw4} />
                              <Text style={fs12RegGray5}>{`${DASHBOARD_EDD.LABEL_STATUS}: ${amlaTitle.status}`}</Text>
                            </View>
                          </Fragment>
                        ) : null}
                      </Fragment>
                    );
                  })}
                </Fragment>
              ) : (
                <View style={flexChild}>
                  <Loading />
                </View>
              )}
            </Fragment>
          ) : (
            <View style={flexChild}>
              <View style={cardStyle}>
                <CustomSpacer space={sh16} />
                <View style={flexRow}>
                  <Tab selected={true} style={{ height: sh56 }} text={DASHBOARD_ORDER_SUMMARY.TAB_PROFILE} />
                  <CustomSpacer isHorizontal={true} space={sw24} />
                </View>
                <View style={borderBottomGray2} />
                <View style={{ ...flexChild }}>
                  {profile !== undefined ? (
                    <AccountSummary
                      accountHolder="Principal"
                      accountType={profile.accountType!}
                      data={structureProfile("Principal", profile, setFile, false)}
                      handleViewId={handleViewId}
                      idNumber={profile.idNumber}
                      idType={profile.idType}
                      name={profile.name}
                    />
                  ) : (
                    <View style={flexChild}>
                      <Loading />
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
          <CustomSpacer space={sh56} />
        </View>
      </DashboardLayout>
      <PromptModal
        backdropOpacity={0.7}
        contentStyle={{ ...px(sw48) }}
        handleContinue={handleDone}
        illustration={LocalAssets.illustration.eddSubmitted}
        label={DASHBOARD_EDD_CASE.LABEL_EDD_CASE_SUBMITTED}
        labelContinue={ACTION_BUTTONS.BUTTON_DONE}
        spaceToButton={sh40}
        spaceToTop={sh40}
        visible={modal}
      />
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};

export const ReroutedCase = connect(EDDMapStateToProps, EDDMapDispatchToProps)(ReroutedCaseComponent);
