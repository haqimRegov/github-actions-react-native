import React, { Component, Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import {
  ColorCard,
  ContentPage,
  CustomFlexSpacer,
  CustomSpacer,
  IconButton,
  LabeledTitle,
  SelectionBanner,
  TextCard,
} from "../../../components";
import { Language } from "../../../constants";
import { RiskStoreProps } from "../../../store";
import {
  border,
  circle,
  colorBlue,
  colorRed,
  colorWhite,
  flexRow,
  fs10RegBlue9,
  fs10RegGray6,
  fs12BoldBlack2,
  fs14RegGray5,
  fs16BoldBlue1,
  fs18BoldGray6,
  fs20BoldBlack2,
  fsTransformNone,
  noBorder,
  px,
  rowCenterVertical,
  sh100,
  sh24,
  sh4,
  sh40,
  sh8,
  sw05,
  sw1,
  sw16,
  sw20,
  sw24,
  sw32,
  sw4,
  sw40,
  sw8,
} from "../../../styles";

const { RISK_ASSESSMENT } = Language.PAGE;

const principalName = "Edgar";
const jointName = "Dave";
const accountType = "Individual Account";
const accountNumber = "HI0000034";

declare interface IRiskSummaryProps extends RiskStoreProps, NewSalesContentProps {
  handleNextStep: (step: TypeNewSalesRoute) => void;
  setPage: (page: TRiskPage) => void;
}

export const RiskSummary: FunctionComponent<IRiskSummaryProps> = ({
  isRiskUpdated,
  handleNextStep,
  handleCancelNewSales,
  newSales,
  setPage,
  updateNewSales,
}: IRiskSummaryProps) => {
  const { disabledSteps, finishedSteps } = newSales;
  const accountDetails: LabeledTitleProps[] = [
    {
      label: RISK_ASSESSMENT.NEW_SALES_INVESTOR_NAME,
      title: "Edgar",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.NEW_SALES_INVESTOR_NRIC,
      title: "876543",
      titleStyle: fsTransformNone,
    },
  ];
  const riskProfile: LabeledTitleProps[] = [
    {
      label: RISK_ASSESSMENT.PROFILE_APPETITE,
      title: "High",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_RETURN,
      title: "per annum",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_TYPE,
      title: "Income",
      titleStyle: fsTransformNone,
    },
    {
      label: RISK_ASSESSMENT.PROFILE_LABEL_PROFILE,
      title: "Your risk profile indicates that you can only tolerate downside risks and potential capital loss.",
      titleStyle: fsTransformNone,
    },
  ];
  const handlePageSkip = () => {
    handleNextStep("ProductsList");
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
    updatedFinishedSteps.push("RiskAssessment");
    updatedDisabledSteps.splice(disabledSteps.indexOf("RiskAssessment"), 1);
    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleEdit = () => {
    setPage("assessment");
  };

  const checkContinueLabel = isRiskUpdated === true ? RISK_ASSESSMENT.BUTTON_CONTINUE : RISK_ASSESSMENT.BUTTON_SKIP;
  const name = jointName !== undefined ? `${principalName} and ${jointName}` : principalName;
  const heading = `${RISK_ASSESSMENT.HEADING} ${name}`;
  return (
    <Fragment>
      <ContentPage heading={heading}>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <LabeledTitle
            label={RISK_ASSESSMENT.NEW_SALES_HEADING_2}
            labelStyle={fs18BoldGray6}
            spaceToBottom={sh4}
            title={RISK_ASSESSMENT.NEW_SALES_HEADING_3}
            titleStyle={fs14RegGray5}
          />
          <CustomSpacer space={sh24} />
          <ColorCard
            containerStyle={noBorder}
            content={<TextCard data={accountDetails} />}
            contentStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(sw24), paddingBottom: sh8 }}
            customHeader={
              <View style={rowCenterVertical}>
                <CustomSpacer isHorizontal={true} space={sw24} />
                <View style={flexRow}>
                  <Text style={fs10RegGray6}>{accountType}</Text>
                  <CustomSpacer isHorizontal={true} space={sw16} />
                  <Text style={fs12BoldBlack2}>{accountNumber}</Text>
                </View>
              </View>
            }
            header="custom"
            headerStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(0), borderBottomColor: colorRed._1 }}
          />
          <CustomSpacer space={sh24} />
          <ColorCard
            containerStyle={noBorder}
            content={<TextCard data={riskProfile} itemsPerGroup={3} spaceBetweenItem={sw32} itemStyle={{ width: 239 }} />}
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
        buttonStyle={{ height: sh40 }}
        cancelOnPress={handleCancelNewSales}
        containerStyle={{ minHeight: sh100 }}
        label={RISK_ASSESSMENT.NEW_SALES_RISK_PROFILE_SUMMARY}
        labelStyle={fs20BoldBlack2}
        labelCancel={RISK_ASSESSMENT.BUTTON_CANCEL}
        labelSubmit={checkContinueLabel}
        submitOnPress={handlePageSkip}
      />
    </Fragment>
  );
};
