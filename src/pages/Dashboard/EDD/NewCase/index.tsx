import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { ActionButtons, CustomFlexSpacer, CustomSpacer, FileViewer, PromptModal, Tab, Toggle } from "../../../../components";
import { DEFAULT_DATE_TIME_FORMAT } from "../../../../constants";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import { getClientProfile, getEDDNewCase, submitCase } from "../../../../network-actions";
import { EDDMapDispatchToProps, EDDMapStateToProps, EDDStoreProps } from "../../../../store/EDD";
import {
  borderBottomBlack21,
  borderBottomGray3,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs12RegGray8,
  fs16BoldBlack3,
  fs16BoldBlue2,
  fullHeight,
  justifyContentStart,
  px,
  py,
  sh16,
  sh22,
  sh24,
  sh32,
  sh40,
  sh56,
  sh8,
  shadowBlue5,
  sw1,
  sw16,
  sw2,
  sw20,
  sw24,
  sw4,
  sw48,
  sw66,
  sw8,
} from "../../../../styles";
import { QuestionCard } from "../../../../templates/EDD/QuestionCard";
import { AnimationUtils } from "../../../../utils";
import { structureProfile } from "../../../../utils/ProfileStructuring";
import { DashboardLayout } from "../../DashboardLayout";
import { AccountDetailsContent } from "../../Transactions/OrderSummary/Account/Details";
import { handleDataToSubmit } from "../functions";
import { validateSubmitCase } from "../validation";

export interface IKey extends Object {
  key: string;
}

const { DASHBOARD_EDD, DASHBOARD_EDD_CASE, ACTION_BUTTONS, DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

declare interface NewCaseProps extends EDDStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: EDDPageType) => void;
}

export const NewCaseComponent: FunctionComponent<NewCaseProps> = ({
  currentCase,
  setLoading,
  setScreen,
  updateCurrentCase,
  ...props
}: NewCaseProps) => {
  const [expand, setExpand] = useState<boolean>(true);
  const [toggle, setToggle] = useState<TCasePage>("EDD Case");
  const [modal, setModal] = useState<boolean>(false);
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const [newCase, setNewCase] = useState<IEDDCase>({});
  const fetching = useRef(true);
  const defaultIcon = expand ? "caret-up" : "caret-down";
  const { profile, responses } = newCase;

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const handleViewId = () => {
    if (newCase !== undefined && newCase.profile !== undefined) {
      setFile(newCase.profile.uploadedDocument[0]);
    }
  };

  const handleBack = () => {
    setScreen("Cases");
  };

  const handleSubmit = async () => {
    setLoading(true);
    const responseToSubmit = { ...responses![0] };
    const answers = await handleDataToSubmit(responseToSubmit, currentCase!.caseId.toString(), responses!.length - 1);
    const requestData = {
      caseId: currentCase!.caseId,
      allAnswers: answers.formattedAnswers,
      additionalAnswers: answers.formattedAdditionalData,
    };
    const newCaseResponse: ISubmitCaseResponse = await submitCase(requestData, props.navigation);
    setLoading(false);
    if (newCaseResponse !== undefined) {
      const { data: upperData, error } = newCaseResponse;
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

  const handleToggle = (text: string) => {
    setToggle(text as TCasePage);
  };

  const handleDone = () => {
    setScreen("Cases");
  };

  const handleExpand = () => {
    setExpand(!expand);
    AnimationUtils.layout({ duration: 150 });
  };

  const handleDataFormatting = (data: IEDDResponse) => {
    const initialResponse: IEDDResponse[] = [];
    const { questions, additionalQuestions } = data;
    const initialQuestions: IEDDQuestion[] = [];
    const initialAdditionalQuestions: IEDDQuestion[] = [];
    questions.forEach((question: IEDDQuestion) => {
      const { options } = question;
      const answerArray: IQuestionData[] = [];
      const optionsArray: IOptionField[] = [];
      if (options !== undefined && options.length > 0) {
        let count: number = 0;
        options.forEach((option: IOptionField) => {
          const { type } = option;
          // To identify the initial number of answers depending on the options type. If it's a radiobutton, we consider that group of radiobuttons as 1 answer.
          if (type === "radiobutton") {
            count += 1;
          } else {
            count = 0;
          }
          if (type !== "checkbox") {
            if (count <= 1) {
              answerArray.push({ answer: "", hasRemark: false, hasDoc: false });
            }
            // Option index is used to index the answer while handling data
            optionsArray.push({ ...option, optionIndex: answerArray.length - 1 });
          } else {
            optionsArray.push(option);
          }
        });
      } else {
        answerArray.push({ answer: "", hasRemark: false, hasDoc: false });
      }
      const checkOptionsArray = optionsArray.length > 0 ? { options: optionsArray } : {};
      initialQuestions.push({ ...question, data: { autoHide: true, answers: answerArray }, ...checkOptionsArray });
    });
    if (additionalQuestions !== undefined) {
      additionalQuestions.forEach((additionalQuestion: IEDDQuestion) => {
        const optionsArray: IOptionField[] = [];
        const { options: additionalOptions } = additionalQuestion;
        if (additionalOptions !== undefined) {
          additionalOptions.forEach((additionalOption: IOptionField) => {
            optionsArray.push({ ...additionalOption, optionIndex: 0 });
          });
        }
        // There is no answer for additional questions.
        initialAdditionalQuestions.push({
          ...additionalQuestion,
          data: { autoHide: true, answers: [{ hasRemark: false, hasDoc: false }] },
          options: optionsArray,
        });
      });
    }
    // Make all the questions in a single array.Put the additional questions before the last element of the question array.
    const lastElement = initialQuestions.pop();
    if (additionalQuestions !== undefined && additionalQuestions.length !== 0) {
      initialQuestions.push(...initialAdditionalQuestions);
    }
    initialQuestions.push(lastElement!);
    initialResponse.push({ ...data, questions: initialQuestions });
    setNewCase({ ...newCase, responses: initialResponse });
  };

  const handleFetchCase = async () => {
    if (fetching.current === true) {
      const request = { caseId: currentCase!.caseId };
      const newCaseResponse: INewCaseResponse = await getEDDNewCase(request, props.navigation);
      if (newCaseResponse !== undefined) {
        const { data: upperData, error } = newCaseResponse;
        if (error === null && upperData !== null) {
          const { data, client } = upperData.result;
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
          handleDataFormatting(data);
          fetching.current = false;
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
    const request = { caseId: currentCase!.caseId };
    const newCaseResponse: IClientProfileResponse = await getClientProfile(request, props.navigation);
    if (newCaseResponse !== undefined) {
      const { data: upperData, error } = newCaseResponse;
      if (error === null && upperData !== null) {
        const { profile: clientProfile } = upperData.result;
        setNewCase({
          ...newCase,
          profile: {
            ...clientProfile.client,
            registrationDate: clientProfile.createdAt,
            accountType: clientProfile.accountType,
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
    if (toggle === "EDD Case") {
      handleFetchCase();
    } else {
      handleFetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  const checkSubmit = responses !== undefined ? validateSubmitCase(responses[0], true) : true;

  const containerStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
    minHeight: sh56,
  };

  const headerStyle: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    ...px(sw24),
    ...shadowBlue5,
    height: sh56,
    backgroundColor: colorWhite._1,
  };
  const cardStyle: ViewStyle = {
    ...flexChild,
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
  };

  return (
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
        sideElement={
          <View style={justifyContentStart}>
            <Toggle labels={[DASHBOARD_EDD.LABEL_EDD_CASE, DASHBOARD_EDD.LABEL_PROFILE]} selected={toggle} setSelected={handleToggle} />
          </View>
        }
        status={currentCase?.status}
        title={currentCase?.clientName}
        titleIcon="arrow-left"
        titleIconOnPress={handleBack}>
        <View style={{ ...flexChild, ...px(sw24), ...fullHeight }}>
          <CustomSpacer space={sh24} />
          <View style={flexChild}>
            {toggle === "EDD Case" ? (
              <Fragment>
                {responses !== undefined ? (
                  responses.map((response: IEDDResponse, index: number) => {
                    const { questions, amlaTitle } = response;

                    const handleReset = () => {
                      const initialQuestions: IEDDQuestion[] = [];
                      response.questions.forEach((question: IEDDQuestion) => {
                        const { options } = question;
                        const answerArray: IQuestionData[] = [];
                        if (options !== undefined) {
                          let count: number = 0;
                          options.forEach((option: IOptionField) => {
                            const { type } = option;
                            if (type === "radiobutton") {
                              count += 1;
                            } else {
                              count = 0;
                            }
                            if (count <= 1 && type !== "checkbox") {
                              answerArray.push({ answer: "", hasRemark: false, hasDoc: false });
                            }
                          });
                        } else {
                          answerArray.push({ answer: "", hasRemark: false, hasDoc: false });
                        }
                        initialQuestions.push({ ...question, data: { autoHide: true, answers: answerArray } });
                      });
                      const tempResponse = [...newCase.responses!];
                      tempResponse[0] = { ...response, questions: initialQuestions };
                      setNewCase({ ...newCase, responses: tempResponse });
                    };
                    const border: ViewStyle =
                      expand === false ? { borderRadius: sw8 } : { borderTopRightRadius: sw8, borderTopLeftRadius: sw8 };

                    return (
                      <Fragment key={index}>
                        <View style={{ ...flexRow, ...centerVertical }}>
                          <Text style={{ ...fs16BoldBlack3, lineHeight: sh22 }}>{`${DASHBOARD_EDD.LABEL_RESPONSE} ${index + 1}`}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={{ ...flexChild, ...borderBottomGray3 }} />
                        </View>
                        <CustomSpacer space={sh16} />
                        <View style={{ ...px(sw24), ...flexRow, ...centerVertical }}>
                          <View style={{ backgroundColor: colorBlue._7, height: sh16, width: sw2 }} />
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs16BoldBlack3}>{amlaTitle.user}</Text>
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs12RegGray8}>{moment(amlaTitle.time, "x").format(DEFAULT_DATE_TIME_FORMAT)}</Text>
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <View style={{ backgroundColor: colorGray._8, height: sh16, width: sw1 }} />
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <Text style={fs12RegGray8}>{`${DASHBOARD_EDD.LABEL_STATUS}: ${amlaTitle.status}`}</Text>
                        </View>
                        <CustomSpacer space={sh8} />
                        <View key={index} style={containerStyle}>
                          <TouchableWithoutFeedback onPress={handleExpand}>
                            <View style={{ ...headerStyle, ...border }}>
                              <Text style={{ ...fs16BoldBlue2 }}>{DASHBOARD_EDD.LABEL_QUESTIONS}</Text>
                              <CustomFlexSpacer />
                              <IcoMoon name={defaultIcon} size={sw20} />
                            </View>
                          </TouchableWithoutFeedback>
                          {expand === true ? (
                            <View style={{ ...py(sh32), ...px(sw24) }}>
                              {response.questions.map((question: IEDDQuestion, questionIndex: number) => {
                                const { title, description, options, data } = question;

                                const handleQuestion = (currentData: IQuestionDataWithHide) => {
                                  const newData: IEDDResponse[] = [...newCase.responses!];
                                  const tempData: IEDDQuestion[] = [...questions];
                                  tempData[questionIndex] = { ...tempData[questionIndex], data: currentData };
                                  newData[index].questions = tempData;
                                  setNewCase({ ...newCase, responses: newData });
                                };
                                return (
                                  <View key={questionIndex}>
                                    {questionIndex !== 0 ? <CustomSpacer space={sh16} /> : null}
                                    <QuestionCard
                                      options={options}
                                      data={data!}
                                      question={title}
                                      subQuestion={description}
                                      questionLabel={
                                        questionIndex === questions.length - 1
                                          ? DASHBOARD_EDD_CASE.LABEL_CONCLUSION
                                          : `Q${questionIndex + 1}`
                                      }
                                      questionLabelStyle={questionIndex === questions.length - 1 ? { borderRadius: sw16, width: sw66 } : {}}
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
                                      continueDisabled={checkSubmit}
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
                      </Fragment>
                    );
                  })
                ) : (
                  <View style={flexChild}>
                    <View style={{ ...centerHV, ...flexChild }}>
                      <ActivityIndicator color={colorGray._7} size="small" />
                    </View>
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
                  <View style={borderBottomBlack21} />
                  <View style={{ ...flexChild }}>
                    {profile !== undefined ? (
                      <AccountDetailsContent
                        accountHolder={"Principal"}
                        accountType={profile.accountType!}
                        data={structureProfile("Principal", profile, setFile)}
                        handleViewId={handleViewId}
                        idNumber={profile.idNumber}
                        idType={profile.idType}
                        name={profile.name}
                      />
                    ) : (
                      <View style={flexChild}>
                        <View style={{ ...centerHV, ...flexChild }}>
                          <ActivityIndicator color={colorGray._7} size="small" />
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
          <CustomSpacer space={sh56} />
        </View>
      </DashboardLayout>
      <PromptModal
        backdropOpacity={0.7}
        labelContinue={ACTION_BUTTONS.BUTTON_DONE}
        handleContinue={handleDone}
        illustration={LocalAssets.illustration.eddSubmitted}
        label={DASHBOARD_EDD_CASE.LABEL_EDD_CASE_SUBMITTED}
        contentStyle={{ ...px(sw48) }}
        spaceToTop={sh40}
        spaceToButton={sh40}
        visible={modal}
      />
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};

export const NewCase = connect(EDDMapStateToProps, EDDMapDispatchToProps)(NewCaseComponent);
