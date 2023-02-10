import React, { Fragment, FunctionComponent } from "react";
import { Image, Text, TextStyle, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/images/LocalAssets";
import {
  ColorCard,
  ContentPage,
  CustomFlexSpacer,
  CustomSpacer,
  defaultContentProps,
  IconButton,
  SelectionBanner,
  TextCard,
  TextSpaceArea,
} from "../../components";
import { Language } from "../../constants";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  border,
  circle,
  colorBlue,
  colorRed,
  colorWhite,
  colorYellow,
  DEVICE,
  flexChild,
  flexRow,
  fs10RegBlue9,
  fs10RegGray6,
  fs12RegBlack2,
  fs16BoldBlue1,
  fs16BoldGray6,
  fs16RegGray6,
  fs20BoldBlack2,
  fs24BoldGray6,
  fsTransformNone,
  noBorder,
  px,
  py,
  rowCenterVertical,
  sh16,
  sh24,
  sh8,
  sw05,
  sw1,
  sw16,
  sw20,
  sw239,
  sw24,
  sw32,
  sw4,
  sw40,
  sw638,
  sw8,
} from "../../styles";
import { scaledSpaceBetween } from "../../templates";
import { isEmpty, isNotEmpty, titleCaseString } from "../../utils";

const { RISK_ASSESSMENT } = Language.PAGE;

declare interface IOnboardingRiskSummaryProps extends RiskStoreProps, OnboardingContentProps {
  navigation?: IStackNavigationProp;
}

const OnboardingRiskSummaryComponent: FunctionComponent<IOnboardingRiskSummaryProps> = ({
  client,
  details,
  handleNextStep,
  handleCancelOnboarding,
  resetRiskAssessment,
  isRiskUpdated,
  riskScore,
  onboarding,
  updateOnboarding,
}: IOnboardingRiskSummaryProps) => {
  const { jointHolder, principalHolder } = details!;
  const { accountType } = client;
  const { disabledSteps, finishedSteps, riskInfo } = onboarding;
  const isAssessmentCompleted = isNotEmpty(riskInfo) && riskInfo.appetite === "";

  const checkIdType = (data: IClientBasicInfo) => {
    const otherIdType = isNotEmpty(data.otherIdType) ? titleCaseString(data.otherIdType!) : data.otherIdType;
    const idType = isNotEmpty(data.idType) && data.idType !== "NRIC" ? titleCaseString(data.idType!) : data.idType;

    return data.idType === "Other" ? `${otherIdType} ${RISK_ASSESSMENT.LABEL_ID}` : idType;
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
    {
      label: RISK_ASSESSMENT.NEW_SALES_RISK_CATEGORY,
      title: isNotEmpty(riskScore) && riskScore.appetite !== "" ? riskScore.appetite : "-",
      titleStyle: fsTransformNone,
    },
  ];
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
      title: isNotEmpty(riskInfo) && riskInfo.appetite !== "" ? riskInfo.appetite : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_RETURN,
      title: isNotEmpty(riskInfo) && riskInfo.expectedRange !== "" ? riskInfo.expectedRange : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_TYPE,
      title: isNotEmpty(riskInfo) && riskInfo.type !== "" ? riskInfo.type : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_PROFILE,
      title: isNotEmpty(riskInfo) && riskInfo.profile !== "" ? riskInfo.profile : "-",
      titleStyle: fsTransformNone,
    },
  ];

  const handlePageContinue = () => {
    const updatedFinishedSteps: TypeOnboardingKey[] = [...new Set(finishedSteps)];
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    updatedFinishedSteps.push("RiskSummary");
    const findRiskProfile = disabledSteps.indexOf("RiskSummary");
    if (findRiskProfile !== -1) {
      updatedDisabledSteps.splice(findRiskProfile, 1);
    }
    const findProducts = disabledSteps.indexOf("Products");
    if (findProducts !== -1) {
      updatedDisabledSteps.splice(findProducts, 1);
    }

    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
    handleNextStep("Products");
  };

  const handleEdit = () => {
    resetRiskAssessment();
    handleNextStep("RiskAssessment");
  };

  const checkCancelLabel = isAssessmentCompleted ? RISK_ASSESSMENT.BUTTON_CANCEL : RISK_ASSESSMENT.BUTTON_BACK;
  const headerStyle: TextStyle = {
    ...fs24BoldGray6,
    maxWidth: sw638,
  };
  const scaledSpace = DEVICE.SCREEN.WIDTH > 1080 ? scaledSpaceBetween() : sw32;
  const accountTitle = `${client.accountType} ${RISK_ASSESSMENT.LABEL_ACCOUNT}`;

  const profileContent = (
    <ContentPage headingStyle={headerStyle}>
      <View style={px(sw24)}>
        <View style={flexRow}>
          <TextSpaceArea style={defaultContentProps.subheadingStyle} text={RISK_ASSESSMENT.HEADING} />
          <CustomFlexSpacer />
        </View>
        <TextSpaceArea
          spaceToTop={defaultContentProps.spaceToTitle}
          style={defaultContentProps.subtitleStyle}
          text={RISK_ASSESSMENT.NEW_SALES_HEADING_3}
        />
      </View>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <ColorCard
          containerStyle={noBorder}
          content={<TextCard data={accountDetailsArray} itemsPerGroup={3} spaceBetweenItem={scaledSpace} itemStyle={{ width: sw239 }} />}
          contentStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(sw24), paddingBottom: sh8 }}
          customHeader={
            <View style={{ ...rowCenterVertical, ...px(sw24) }}>
              <Text style={fs10RegGray6}>{accountTitle}</Text>
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
        <CustomSpacer space={sh24} />
        <ColorCard
          containerStyle={noBorder}
          content={<TextCard data={riskProfileData} itemsPerGroup={3} spaceBetweenItem={scaledSpace} itemStyle={{ width: sw239 }} />}
          contentStyle={{ ...border(colorBlue._3, sw1), ...px(sw24), paddingBottom: sh8 }}
          customHeader={
            <View style={{ ...rowCenterVertical, ...px(sw24) }}>
              <View>
                <Text style={fs16BoldBlue1}>{RISK_ASSESSMENT.HEADING_RISK}</Text>
                {isEmpty(riskInfo) || isAssessmentCompleted ? (
                  <Fragment>
                    <View style={rowCenterVertical}>
                      <Image source={LocalAssets.icon.iconWarning} style={{ width: sw16, height: sh16 }} />
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <Text style={{ ...fs12RegBlack2, color: colorYellow._2 }}>{RISK_ASSESSMENT.SUBHEADING_RISK_TO_PROCEED}</Text>
                    </View>
                  </Fragment>
                ) : null}
              </View>
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
  );

  return (
    <View style={flexChild}>
      {profileContent}
      <Fragment>
        <CustomSpacer space={sh24} />
        <SelectionBanner
          cancelOnPress={handleCancelOnboarding}
          continueDisabled={isAssessmentCompleted}
          label={RISK_ASSESSMENT.NEW_SALES_ACCOUNT_SUMMARY}
          labelStyle={fs20BoldBlack2}
          labelCancel={checkCancelLabel}
          labelSubmit={RISK_ASSESSMENT.BUTTON_NEXT}
          submitOnPress={handlePageContinue}
          bottomContent={
            isRiskUpdated === true ? (
              <Fragment>
                <View style={flexRow}>
                  <Text style={fs16BoldGray6}>{RISK_ASSESSMENT.BANNER_RISK_ASSESSMENT}</Text>
                  <CustomSpacer isHorizontal space={sw4} />
                  <Text style={fs16RegGray6}>{RISK_ASSESSMENT.BANNER_UPDATED}</Text>
                </View>
              </Fragment>
            ) : null
          }
        />
      </Fragment>
    </View>
  );
};

export const OnboardingRiskSummary = connect(RiskMapStateToProps, RiskMapDispatchToProps)(OnboardingRiskSummaryComponent);
