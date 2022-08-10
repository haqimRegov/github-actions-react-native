import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, LayoutChangeEvent, ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, FileViewer, InfoBanner, Loading, Tab, Toggle } from "../../../../components";
import { DEFAULT_DATE_TIME_FORMAT } from "../../../../constants";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import { getCaseResponse, getClientProfile } from "../../../../network-actions";
import { EDDMapDispatchToProps, EDDMapStateToProps, EDDStoreProps } from "../../../../store/EDD";
import {
  borderBottomBlue4,
  borderBottomGray2,
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
  sw56,
  sw66,
  sw8,
} from "../../../../styles";
import { AccountSummary } from "../../../../templates";
import { QuestionCard } from "../../../../templates/EDD/QuestionCard";
import { AnimationUtils } from "../../../../utils/Animation";
import { DashboardLayout } from "../../DashboardLayout";

const { DASHBOARD_EDD, DASHBOARD_EDD_CASE, DASHBOARD_ORDER_SUMMARY } = Language.PAGE;

declare interface ViewCaseProps extends EDDStoreProps {
  setScreen: (route: EDDPageType) => void;
  navigation: IStackNavigationProp;
}

export const ViewCaseComponent: FunctionComponent<ViewCaseProps> = ({
  currentCase,
  setScreen,
  updateCurrentCase,
  ...props
}: ViewCaseProps) => {
  const toggleArray: TCasePage[] = [];
  if (currentCase?.status === "Cancelled") {
    toggleArray.push("Profile");
  } else {
    toggleArray.push("EDD Case", "Profile");
  }
  const [expand, setExpand] = useState<boolean[]>([]);
  const [toggle, setToggle] = useState<TCasePage>(toggleArray[0]);
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const [viewCase, setViewCase] = useState<IEDDViewCase>({});
  const [scrollRef, setScrollRef] = useState<ScrollView | undefined>(undefined);
  const [positionArray, setPositionArray] = useState<IAxisY[]>([]);
  const fetching = useRef(true);
  const { profile, responses } = viewCase;

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const handleViewId = () => {
    if (viewCase !== undefined && viewCase.profile !== undefined) {
      setFile(viewCase.profile.uploadedDocument[0]);
    }
  };

  const handleBack = () => {
    setScreen("Cases");
  };

  const handleToggle = (text: string) => {
    setToggle(text as TCasePage);
  };

  const handleFetching = (loading: boolean) => {
    fetching.current = loading;
  };

  const handleFetchCase = async () => {
    if (fetching.current === true) {
      const request = { caseId: currentCase!.caseId, isReroute: false };
      const caseResponse: ICaseResponse = await getCaseResponse(request, props.navigation);
      if (caseResponse !== undefined) {
        const { data: upperData, error } = caseResponse;
        if (error === null && upperData !== null) {
          const { response, client } = upperData.result;
          fetching.current = false;
          const formattedData: IEDDViewResponse[] = [];
          response.forEach((currentResponse: ICaseResponseStructure) => {
            const { amla, agent, data } = currentResponse;
            const questionsData: IEDDViewQuestion[] = [];
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
                  id: questionId !== null ? questionId.toString() : questionId,
                  description: description,
                  previousData: parsedAnswers,
                });
              });
            }
            formattedData.push({
              amlaTitle: amla,
              userTitle: agent,
              questions: questionsData,
            });
          });
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
          setViewCase({ ...viewCase, responses: formattedData });
          const expandArray = Array(formattedData.length).fill(false);
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
        setViewCase({
          ...viewCase,
          profile: {
            ...clientProfile.client,
            registrationDate: clientProfile.createdAt,
            accountType: clientProfile.accountType,
            accountOperationMode: clientProfile.signatory,
          },
        });
        fetching.current = false;
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
        if (findIndex !== -1 && positionArray[findIndex] !== undefined && findIndex !== 0) {
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

  const checkSideElement = (
    <Fragment>
      {currentCase!.status !== "Cancelled" ? (
        <View style={justifyContentStart}>
          <Toggle labels={[DASHBOARD_EDD.LABEL_EDD_CASE, DASHBOARD_EDD.LABEL_PROFILE]} selected={toggle} setSelected={handleToggle} />
        </View>
      ) : null}
    </Fragment>
  );

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
        sideElement={checkSideElement}
        status={currentCase?.status}
        title={currentCase!.clientName}
        titleIcon="arrow-left"
        titleIconOnPress={handleBack}>
        <View style={{ ...flexChild, ...px(sw24), ...fullHeight }}>
          <CustomSpacer space={sh24} />
          {currentCase?.remark && currentCase.status === "Cancelled" ? (
            <View>
              <InfoBanner
                icon={{ color: colorRed._2, name: "reject", size: sw16 }}
                status={currentCase.status.toLowerCase()}
                reason={DASHBOARD_EDD_CASE.LABEL_CASE_CANCELLED_BY_AMLA}
                remark={currentCase.remark[0].label}
              />
              <CustomSpacer space={sh24} />
            </View>
          ) : null}
          {toggle === "EDD Case" ? (
            <Fragment>
              {responses !== undefined ? (
                <Fragment>
                  {responses.map((response: IEDDViewResponse, index: number) => {
                    const { amlaTitle, questions, userTitle } = response;

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

                    const collapsibleTitle =
                      index !== responses.length - 1 ? DASHBOARD_EDD_CASE.LABEL_FOLLOW_UP_ANSWERS : DASHBOARD_EDD_CASE.LABEL_ANSWER;
                    const border: ViewStyle =
                      expand[index] === false ? { borderRadius: sw8 } : { borderTopRightRadius: sw8, borderTopLeftRadius: sw8 };
                    const defaultIcon = expand[index] ? "caret-up" : "caret-down";
                    const responseNumber = responses.length - index;
                    return (
                      <Fragment key={index}>
                        {index !== 0 ? <CustomSpacer space={sh40} /> : null}
                        <View style={{ ...flexRow, ...centerVertical }}>
                          <Text style={fs16BoldBlack2}>{`${DASHBOARD_EDD.LABEL_RESPONSE} ${responseNumber}`}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={{ ...flexChild, ...borderBottomBlue4 }} />
                        </View>
                        <CustomSpacer space={sh16} />
                        <View style={{ ...px(sw56), ...flexRow, ...centerVertical }}>
                          <View style={{ backgroundColor: colorRed._1, height: sh16, width: sw2 }} />
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs12BoldBlack2}>{userTitle.user}</Text>
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs12RegGray5}>{moment(userTitle.time, "x").format(DEFAULT_DATE_TIME_FORMAT)}</Text>
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <View style={{ backgroundColor: colorGray._5, height: sh16, width: sw1 }} />
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <Text style={fs12RegGray5}>{`${DASHBOARD_EDD.LABEL_STATUS}: ${userTitle.status}`}</Text>
                        </View>
                        <CustomSpacer space={sh8} />
                        <View key={index} onLayout={handleLayout} style={containerStyle}>
                          <TouchableWithoutFeedback onPress={handleExpand}>
                            <View style={{ ...headerStyle, ...border }}>
                              <Text style={{ ...fs16BoldBlue1 }}>{collapsibleTitle}</Text>
                              <CustomFlexSpacer />
                              <IcoMoon name={defaultIcon} size={sw20} />
                            </View>
                          </TouchableWithoutFeedback>
                          {expand.length > 0 && expand[index] === true ? (
                            <View style={{ ...py(sh32), ...px(sw24) }}>
                              {response.questions.map((question: IEDDViewQuestion, questionIndex: number) => {
                                const { title, description, previousData, id } = question;

                                return (
                                  <View key={questionIndex}>
                                    {questionIndex !== 0 ? <CustomSpacer space={sh16} /> : null}
                                    <QuestionCard
                                      question={title}
                                      previousData={previousData}
                                      questionLabel={
                                        questionIndex === questions.length - 1 && id === "9" && index === responses.length - 1
                                          ? DASHBOARD_EDD_CASE.LABEL_CONCLUSION
                                          : `Q${questionIndex + 1}`
                                      }
                                      questionLabelStyle={questionIndex === questions.length - 1 ? { borderRadius: sw16, width: sw66 } : {}}
                                      setFile={setFile}
                                      showPrevious={false}
                                      subQuestion={description !== null ? description : undefined}
                                    />
                                  </View>
                                );
                              })}
                            </View>
                          ) : null}
                        </View>
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
                      data={structureEddProfile("Principal", profile, setFile, false)}
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
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};

export const ViewCase = connect(EDDMapStateToProps, EDDMapDispatchToProps)(ViewCaseComponent);
