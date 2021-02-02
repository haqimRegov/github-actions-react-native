import React, { Fragment, FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { CardWrap, CustomFlexSpacer, CustomSpacer, IconButton, LabeledTitleProps } from "../../components";
import { Language } from "../../constants";
import {
  borderBottomBlack21,
  centerVertical,
  circleBorder,
  colorBlack,
  colorGray,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fsCapitalize,
  fsTransformNone,
  px,
  sh16,
  sh64,
  sh8,
  sw1,
  sw24,
  sw8,
} from "../../styles";
import { AnimationUtils } from "../../utils";

const { ORDER_SUMMARY, PAYMENT } = Language.PAGE;

export interface FundOverviewProps {
  fund: IOrderInvestment;
  setViewFund: (value: string) => void;
  viewFund: string;
}

export const FundOverview: FunctionComponent<FundOverviewProps> = ({ fund, setViewFund, viewFund }: FundOverviewProps) => {
  const {
    distributionInstruction,
    fundClass,
    fundCurrency,
    fundingOption,
    fundName,
    investmentAmount,
    isFea,
    isSyariah,
    salesCharge,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
  } = fund;

  const isScheduled =
    scheduledInvestmentAmount !== undefined &&
    scheduledSalesCharge !== undefined &&
    scheduledInvestmentAmount !== null &&
    scheduledSalesCharge !== null;

  const expanded = viewFund === fundName;
  const icon = expanded ? "caret-up" : "caret-down";

  const summary: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_FUND_CLASS,
      title: "fundClass" in fund && fundClass !== null && fundClass !== "" ? `${fundClass}` : "-",
    },
    {
      label: ORDER_SUMMARY.LABEL_SALES_CHARGE,
      title: `${salesCharge}%`,
    },
    {
      label: ORDER_SUMMARY.LABEL_FUNDING_OPTION,
      title: fundingOption,
      titleStyle: fundingOption === "EPF" ? undefined : fsCapitalize,
    },
    {
      label: ORDER_SUMMARY.LABEL_TYPE,
      title: isSyariah ? ORDER_SUMMARY.LABEL_SHARIAH : ORDER_SUMMARY.LABEL_CONVENTIONAL,
    },
    {
      label: ORDER_SUMMARY.LABEL_FEA,
      title: isFea ? "Yes" : "No",
    },
    {
      label: ORDER_SUMMARY.LABEL_DISTRIBUTION,
      title: distributionInstruction,
      titleStyle: fsCapitalize,
    },
    {
      label: ORDER_SUMMARY.LABEL_TOTAL_INVESTMENT_AMOUNT,
      title: `${fundCurrency} ${investmentAmount}`,
    },
  ];
  if (isScheduled === true) {
    summary.push({
      label: PAYMENT.LABEL_PAYMENT_TERM,
      title: PAYMENT.LABEL_RECURRING_TYPE,
    });
  }
  const headerStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    borderRadius: sw24,
    height: sh64,
  };

  const labelStyle = expanded === true ? fs16BoldBlack2 : fs16RegBlack2;

  const handleExpand = () => {
    AnimationUtils.layout({ duration: 120 });
    setViewFund(expanded === true ? "" : fundName);
  };

  return (
    <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
      <TouchableWithoutFeedback onPress={handleExpand}>
        <View style={headerStyle}>
          <Text style={labelStyle}>{fundName}</Text>
          <CustomFlexSpacer />
          <IconButton color={colorBlack._1} onPress={handleExpand} name={icon} size={sh16} style={circleBorder(sw24, sw1, colorGray._7)} />
        </View>
      </TouchableWithoutFeedback>
      {expanded === false ? null : (
        <Fragment>
          <View style={borderBottomBlack21} />
          <View>
            <CustomSpacer space={sh16} />
            <CardWrap data={summary} labelStyle={fs12BoldBlack2} titleStyle={fsTransformNone} />
            <CustomSpacer space={sh8} />
          </View>
        </Fragment>
      )}
    </View>
  );
};
