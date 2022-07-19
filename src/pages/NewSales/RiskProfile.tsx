import React, { Fragment, FunctionComponent } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ColorCard, ContentPage, CustomFlexSpacer, CustomSpacer, IconButton, SelectionBanner, TextCard } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_LINK_AIMS } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import { RNInAppBrowser } from "../../integrations";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  border,
  centerHorizontal,
  circle,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  flexRow,
  fs10RegBlue9,
  fs10RegGray5,
  fs10RegGray6,
  fs12BoldBlack2,
  fs12BoldBlue1,
  fs16BoldBlue1,
  fs16RegBlack2,
  fs20BoldBlack2,
  fsTransformNone,
  noBorder,
  px,
  py,
  rowCenterVertical,
  sh16,
  sh2,
  sh24,
  sh32,
  sh8,
  sw05,
  sw1,
  sw120,
  sw16,
  sw20,
  sw24,
  sw240,
  sw32,
  sw4,
  sw40,
  sw8,
} from "../../styles";
import { defaultContentProps } from "./Content";

const { RISK_ASSESSMENT } = Language.PAGE;

declare interface IRiskSummaryProps extends RiskStoreProps, NewSalesContentProps {}

const NewSalesRiskProfileComponent: FunctionComponent<IRiskSummaryProps> = ({
  client,
  details,
  handleNextStep,
  handleCancelNewSales,
  isRiskUpdated,
  newSales,
  riskScore,
  updateNewSales,
}: IRiskSummaryProps) => {
  const { jointHolder, principalHolder } = details!;
  const { accountType } = client;
  const { accountDetails, disabledSteps, finishedSteps } = newSales;
  const { accountNo, fundType, isEpf } = accountDetails;

  const riskProfile: IRiskProfile = {
    appetite: riskScore.appetite,
    expectedRange: riskScore.rangeOfReturn,
    hnwStatus: riskScore.netWorth,
    profile: riskScore.profile,
    type: riskScore.type,
  };

  const checkIdType = (data: IClientBasicInfo) => {
    return data.idType === "Other" ? `${data.otherIdType} ${RISK_ASSESSMENT.LABEL_ID}` : data.idType;
  };
  const accountDetailsArray: LabeledTitleProps[] = [
    {
      label: accountType === "Joint" ? RISK_ASSESSMENT.NEW_SALES_PRINCIPAL_NAME : RISK_ASSESSMENT.NEW_SALES_INVESTOR_NAME,
      title: principalHolder!.name,
      titleStyle: fsTransformNone,
    },
    {
      label:
        accountType === "Joint"
          ? `${RISK_ASSESSMENT.LABEL_PRINCIPAL} ${checkIdType(principalHolder!)}`
          : `${RISK_ASSESSMENT.LABEL_INVESTOR} ${checkIdType(principalHolder!)}`,
      title: principalHolder!.id,
      titleStyle: fsTransformNone,
    },
  ];
  if (riskScore.appetite !== "") {
    accountDetailsArray.push({
      label: RISK_ASSESSMENT.NEW_SALES_RISK_CATEGORY,
      title: riskScore.appetite,
      titleStyle: fsTransformNone,
    });
  }
  if (client.accountType === "Joint") {
    accountDetailsArray.push(
      {
        label: RISK_ASSESSMENT.LABEL_JOINT_NAME,
        title: jointHolder!.name,
        titleStyle: fsTransformNone,
      },
      {
        label: `${RISK_ASSESSMENT.LABEL_JOINT} ${checkIdType(jointHolder!)}`,
        title: jointHolder!.id,
        titleStyle: fsTransformNone,
      },
    );
  }

  const riskProfileData: LabeledTitleProps[] = [
    {
      label: RISK_ASSESSMENT.PROFILE_APPETITE,
      title: riskProfile.appetite,
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_RETURN,
      title: riskProfile.expectedRange,
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_TYPE,
      title: riskProfile.type,
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_PROFILE,
      title: riskProfile.profile,
      titleStyle: fsTransformNone,
    },
  ];

  const handlePageContinue = () => {
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
    updatedFinishedSteps.push("RiskProfile");
    const findRiskProfile = disabledSteps.indexOf("RiskProfile");
    if (findRiskProfile !== -1) {
      updatedDisabledSteps.splice(findRiskProfile, 1);
    }
    const findProducts = disabledSteps.indexOf("Products");
    if (findProducts !== -1) {
      updatedDisabledSteps.splice(findProducts, 1);
    }
    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
    handleNextStep("ProductsList");
  };

  const handleEdit = () => {
    handleNextStep("RiskAssessment");
  };

  const handleAims = () => {
    RNInAppBrowser.openLink(DICTIONARY_LINK_AIMS);
  };
  const checkContinueLabel = isRiskUpdated === true ? RISK_ASSESSMENT.BUTTON_CONTINUE : RISK_ASSESSMENT.BUTTON_SKIP;
  const name = client.accountType === "Joint" ? `${principalHolder!.name!} and ${jointHolder!.name!}` : principalHolder!.name!;
  const heading = `${RISK_ASSESSMENT.NEW_SALES_HEADING} ${name}`;
  const accountTitle = `${client.accountType} ${RISK_ASSESSMENT.LABEL_ACCOUNT}`;

  const buttonStyle: ViewStyle = {
    ...centerHorizontal,
    ...flexRow,
    width: sw120,
    ...px(sw16),
    ...py(sh8),
    ...border(colorBlue._1, sw1, sw24),
    backgroundColor: colorWhite._1,
    height: sh32,
  };

  const checkEpf = isEpf === true ? "EPF" : "Cash";
  const tags = accountNo !== "" ? [fundType.toUpperCase(), checkEpf] : [];
  const checkJointHeader = accountType === "Joint" ? RISK_ASSESSMENT.NEW_SALES_HEADING_2_JOINT : RISK_ASSESSMENT.NEW_SALES_HEADING_2;
  const header = accountNo !== "" ? RISK_ASSESSMENT.NEW_SALES_HEADING_2_NEW_FUND : checkJointHeader;
  const checkJointSubtitle = accountType === "Joint" ? RISK_ASSESSMENT.NEW_SALES_HEADING_3_JOINT : RISK_ASSESSMENT.NEW_SALES_HEADING_3;
  const subtitle = accountNo !== "" ? RISK_ASSESSMENT.NEW_SALES_HEADING_3_NEW_FUND : checkJointSubtitle;
  const checkAccountNo = accountNo !== "" ? accountNo : "-";

  return (
    <View>
      <ContentPage {...defaultContentProps} heading={heading} spaceToHeading={sh24} subheading={header} subtitle={subtitle}>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <ColorCard
            containerStyle={noBorder}
            content={<TextCard data={accountDetailsArray} itemsPerGroup={3} spaceBetweenItem={sw32} itemStyle={{ width: sw240 }} />}
            contentStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(sw24), paddingBottom: sh8 }}
            customHeader={
              <View style={{ ...rowCenterVertical, ...px(sw24) }}>
                <Text style={fs10RegGray6}>{accountTitle}</Text>
                <CustomSpacer isHorizontal={true} space={sw16} />
                <Text style={fs12BoldBlack2}>{checkAccountNo}</Text>
                <CustomFlexSpacer />
                {tags.length > 0
                  ? tags.map((eachTag: string, tagIndex: number) => {
                      const tagStyle: ViewStyle = {
                        ...px(sw4),
                        ...py(sh2),
                        backgroundColor: colorGray._1,
                        borderColor: colorGray._5,
                        borderWidth: sw05,
                        borderRadius: sw4,
                      };
                      return (
                        <Fragment key={tagIndex}>
                          {tagIndex !== 0 ? <CustomSpacer isHorizontal={true} space={sw8} /> : null}
                          <View key={tagIndex} style={tagStyle}>
                            <Text style={fs10RegGray5}>{eachTag}</Text>
                          </View>
                        </Fragment>
                      );
                    })
                  : null}
              </View>
            }
            header="custom"
            headerStyle={{
              ...border(colorBlue._3, sw1),
              ...px(0),
              ...py(sh8),
              backgroundColor: colorBlue._3,
              borderBottomColor: colorRed._1,
            }}
          />
          {newSales.accountDetails.accountNo !== "" ? (
            <Fragment>
              <CustomSpacer space={sh24} />
              <ColorCard
                containerStyle={noBorder}
                content={
                  <View>
                    <CustomSpacer space={sh8} />
                    <Text style={fs16RegBlack2}>{RISK_ASSESSMENT.NEW_SALES_PRODUCT_AND_SERVICE_HINT}</Text>
                    <CustomSpacer space={sh8} />
                    <Pressable onPress={handleAims} style={buttonStyle}>
                      <Text style={fs12BoldBlue1}>{RISK_ASSESSMENT.NEW_SALES_PRODUCT_AND_SERVICE_CHECK_AIMS}</Text>
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <IcoMoon color={colorBlue._1} name="external" size={sw16} />
                    </Pressable>
                    <CustomSpacer space={sh8} />
                  </View>
                }
                contentStyle={{ ...border(colorBlue._3, sw1), ...px(sw24), paddingBottom: sh8 }}
                header={{ label: RISK_ASSESSMENT.NEW_SALES_PRODUCT_AND_SERVICE, labelStyle: fs16BoldBlue1 }}
                headerStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorWhite._1, ...px(sw24), ...py(sh16) }}
              />
            </Fragment>
          ) : null}
          <CustomSpacer space={sh24} />
          <ColorCard
            containerStyle={noBorder}
            content={<TextCard data={riskProfileData} itemsPerGroup={3} spaceBetweenItem={sw32} itemStyle={{ width: sw240 }} />}
            contentStyle={{ ...border(colorBlue._3, sw1), ...px(sw24), paddingBottom: sh8 }}
            customHeader={
              <View style={{ ...rowCenterVertical, ...px(sw24) }}>
                <Text style={fs16BoldBlue1}>{RISK_ASSESSMENT.PROFILE_LABEL_PROFILE}</Text>
                {isRiskUpdated === true ? (
                  <Fragment>
                    <CustomSpacer isHorizontal={true} space={sw8} />
                    <View style={{ ...border(colorBlue._9, sw05, sw4), ...px(sw4) }}>
                      <Text style={fs10RegBlue9}>{RISK_ASSESSMENT.LABEL_UPDATED}</Text>
                    </View>
                  </Fragment>
                ) : null}
                <CustomFlexSpacer />
                <IconButton
                  color={colorBlue._1}
                  name="pencil"
                  onPress={handleEdit}
                  size={sw20}
                  style={{ ...circle(sw40, colorWhite._1) }}
                  withHover={{ color: colorBlue._2 }}
                />
              </View>
            }
            headerStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorWhite._1, ...px(0) }}
            header="custom"
          />
        </View>
      </ContentPage>
      <SelectionBanner
        cancelOnPress={handleCancelNewSales}
        label={RISK_ASSESSMENT.NEW_SALES_RISK_PROFILE_SUMMARY}
        labelStyle={fs20BoldBlack2}
        labelCancel={RISK_ASSESSMENT.BUTTON_CANCEL}
        labelSubmit={checkContinueLabel}
        submitOnPress={handlePageContinue}
      />
    </View>
  );
};

export const NewSalesRiskProfile = connect(RiskMapStateToProps, RiskMapDispatchToProps)(NewSalesRiskProfileComponent);
