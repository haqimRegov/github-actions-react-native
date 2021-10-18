import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, FileViewer, Reason, Tab } from "../../../../components";
import { QuestionCard } from "../../../../components/Card/QuestionCard";
import { Toggle } from "../../../../components/Toggle";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import { getClientProfile } from "../../../../network-actions/client-profile";
import { getCaseResponse } from "../../../../network-actions/edd/GetCaseResponse";
import { EDDMapDispatchToProps, EDDMapStateToProps, EDDStoreProps } from "../../../../store/EDD";
import {
  borderBottomBlack21,
  borderBottomGray3,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorRed,
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
  sw56,
  sw66,
  sw8,
} from "../../../../styles";
import { AnimationUtils } from "../../../../utils/Animation";
import { structureProfile } from "../../../../utils/ProfileStructuring";
import { DashboardLayout } from "../../DashboardLayout";
import { AccountDetailsContent } from "../../Transactions/OrderSummary/Account/Details";

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
          // eslint-disable-next-line array-callback-return
          response.map((currentResponse: ICaseResponseStructure) => {
            const { amla, agent, data } = currentResponse;
            const questionsData: IEDDViewQuestion[] = [];
            if (data !== null && data.length > 0) {
              // eslint-disable-next-line array-callback-return
              data.map((question: ICaseResponseData) => {
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
    const newCaseResponse: IClientProfileResponse = await getClientProfile(request, props.navigation);
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
        sideElement={checkSideElement}
        status={currentCase?.status}
        title={currentCase!.clientName}
        titleIcon="arrow-left"
        titleIconOnPress={handleBack}>
        <View style={{ ...flexChild, ...px(sw24), ...fullHeight }}>
          <CustomSpacer space={sh24} />
          {currentCase?.remark && currentCase.status === "Cancelled" ? (
            <View>
              <Reason
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
                          <Text style={{ ...fs16BoldBlack3, lineHeight: sh22 }}>{`${DASHBOARD_EDD.LABEL_RESPONSE} ${responseNumber}`}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={{ ...flexChild, ...borderBottomGray3 }} />
                        </View>
                        <CustomSpacer space={sh16} />
                        <View style={{ ...px(sw56), ...flexRow, ...centerVertical }}>
                          <View style={{ backgroundColor: colorRed._4, height: sh16, width: sw2 }} />
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs16BoldBlack3}>{userTitle.user}</Text>
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs12RegGray8}>{moment(userTitle.time, "x").format("DD/MM/YYYY, h:mma")}</Text>
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <View style={{ backgroundColor: colorGray._8, height: sh16, width: sw1 }} />
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <Text style={fs12RegGray8}>{`${DASHBOARD_EDD.LABEL_STATUS}: ${userTitle.status}`}</Text>
                        </View>
                        <CustomSpacer space={sh8} />
                        <View key={index} style={containerStyle}>
                          <TouchableWithoutFeedback onPress={handleExpand}>
                            <View style={{ ...headerStyle, ...border }}>
                              <Text style={{ ...fs16BoldBlue2 }}>{collapsibleTitle}</Text>
                              <CustomFlexSpacer />
                              <IcoMoon name={defaultIcon} size={sw20} />
                            </View>
                          </TouchableWithoutFeedback>
                          {expand[index] === true ? (
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
                          <Text style={fs16BoldBlack3}>{amlaTitle.user}</Text>
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Text style={fs12RegGray8}>{moment(amlaTitle.time, "x").format("DD/MM/YYYY,h:mm:ss a")}</Text>
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <View style={{ backgroundColor: colorGray._8, height: sh16, width: sw1 }} />
                          <CustomSpacer isHorizontal={true} space={sw4} />
                          <Text style={fs12RegGray8}>{`${DASHBOARD_EDD.LABEL_STATUS}: ${amlaTitle.status}`}</Text>
                        </View>
                      </Fragment>
                    );
                  })}
                </Fragment>
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
