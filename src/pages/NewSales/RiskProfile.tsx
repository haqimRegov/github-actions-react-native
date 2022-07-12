import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import {
  ColorCard,
  ContentPage,
  ContentPageProps,
  CustomFlexSpacer,
  CustomSpacer,
  IconButton,
  SelectionBanner,
  TextCard,
} from "../../components";
import { Language } from "../../constants";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import {
  border,
  circle,
  colorBlue,
  colorRed,
  colorWhite,
  fs10RegBlue9,
  fs10RegGray6,
  fs12BoldBlack2,
  fs16BoldBlue1,
  fs16RegGray5,
  fs18BoldGray6,
  fs20BoldBlack2,
  fs24BoldGray6,
  fsTransformNone,
  noBorder,
  px,
  py,
  rowCenterVertical,
  sh24,
  sh4,
  sh48,
  sh8,
  sw05,
  sw1,
  sw16,
  sw20,
  sw24,
  sw240,
  sw32,
  sw4,
  sw40,
  sw8,
} from "../../styles";

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
  const { disabledSteps, finishedSteps, riskInfo } = newSales;

  const riskProfile: IRiskProfile =
    isRiskUpdated === true
      ? { expectedRange: riskScore.rangeOfReturn, appetite: riskScore.appetite, profile: riskScore.profile, type: riskScore.type }
      : riskInfo!;

  const accountDetails: LabeledTitleProps[] = [
    {
      label: RISK_ASSESSMENT.NEW_SALES_INVESTOR_NAME,
      title: principalHolder!.name!,
      titleStyle: fsTransformNone,
    },
    {
      label: `${RISK_ASSESSMENT.NEW_SALES_INVESTOR} ${principalHolder!.idType}`,
      title: principalHolder!.id!,
      titleStyle: fsTransformNone,
    },
  ];

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

  const handlePageSkip = () => {
    handleNextStep("ProductsList");
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
    updatedFinishedSteps.push("RiskProfile");
    updatedDisabledSteps.splice(disabledSteps.indexOf("RiskProfile"), 1);
    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleEdit = () => {
    handleNextStep("RiskAssessment");
  };

  const checkContinueLabel = isRiskUpdated === true ? RISK_ASSESSMENT.BUTTON_CONTINUE : RISK_ASSESSMENT.BUTTON_SKIP;
  const name = client.accountType === "Joint" ? `${principalHolder!.name!} and ${jointHolder!.name!}` : principalHolder!.name!;
  const heading = `${RISK_ASSESSMENT.NEW_SALES_HEADING} ${name}`;
  const accountTitle = `${client.accountType} ${RISK_ASSESSMENT.LABEL_ACCOUNT}`;

  const defaultContentProps: Partial<ContentPageProps> = {
    headingStyle: fs24BoldGray6,
    spaceToBottom: sh48,
    spaceToHeading: sh24,
    spaceToTitle: sh4,
    subheadingStyle: fs18BoldGray6,
    subtitleStyle: fs16RegGray5,
  };

  return (
    <View>
      <ContentPage
        heading={heading}
        subheading={RISK_ASSESSMENT.NEW_SALES_HEADING_2}
        subtitle={RISK_ASSESSMENT.NEW_SALES_HEADING_3}
        {...defaultContentProps}>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <ColorCard
            containerStyle={noBorder}
            content={<TextCard data={accountDetails} />}
            contentStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(sw24), paddingBottom: sh8 }}
            customHeader={
              <View style={{ ...rowCenterVertical, ...px(sw24) }}>
                <Text style={fs10RegGray6}>{accountTitle}</Text>
                <CustomSpacer isHorizontal={true} space={sw16} />
                <Text style={fs12BoldBlack2}>-</Text>
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
        submitOnPress={handlePageSkip}
      />
    </View>
  );
};

export const NewSalesRiskProfile = connect(RiskMapStateToProps, RiskMapDispatchToProps)(NewSalesRiskProfileComponent);
