import React, { Fragment, FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IconButton, LabeledTitleProps, TextCard } from "../../components";
import { Language } from "../../constants";
import {
  borderBottomBlack21,
  centerVertical,
  circleBorder,
  colorBlack,
  colorGray,
  colorWhite,
  flexRow,
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
import { AnimationUtils, formatAmount } from "../../utils";

const { ORDER_SUMMARY } = Language.PAGE;

export interface FundOverviewProps {
  fund: IOrderInvestment;
  orderNumber: string;
  setViewFund: (value: string) => void;
  viewFund: string;
}

export const FundOverview: FunctionComponent<FundOverviewProps> = ({ fund, orderNumber, setViewFund, viewFund }: FundOverviewProps) => {
  const {
    distributionInstruction,
    fundClass,
    fundCurrency,
    fundingOption,
    fundName,
    fundType,
    investmentAmount,
    // isFea,
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

  const expanded = viewFund === `${orderNumber}${fundName}`;
  const icon = expanded ? "caret-up" : "caret-down";

  const summary: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_INVESTMENT_AMOUNT,
      title: `${fundCurrency} ${formatAmount(investmentAmount || "")}`,
    },
    {
      label: ORDER_SUMMARY.LABEL_SALES_CHARGE,
      title: isScheduled === true ? `${scheduledSalesCharge}%` : `${salesCharge}%`,
    },
    {
      label: ORDER_SUMMARY.LABEL_PRODUCT_TYPE,
      title: fundType || "-",
    },
    {
      label: ORDER_SUMMARY.LABEL_FUNDING_OPTION,
      // TODO temporary fix until backend fix it
      // eslint-disable-next-line dot-notation
      title: fundingOption || fund["accountFund"],
      titleStyle: fundingOption === "EPF" ? undefined : fsCapitalize,
    },
    {
      label: ORDER_SUMMARY.LABEL_TYPE,
      title: isSyariah ? ORDER_SUMMARY.LABEL_SHARIAH : ORDER_SUMMARY.LABEL_CONVENTIONAL,
    },
    // {
    //   label: ORDER_SUMMARY.LABEL_FEA,
    //   title: isFea ? "Yes" : "No",
    // },
    {
      label: ORDER_SUMMARY.LABEL_DISTRIBUTION,
      title: distributionInstruction,
      titleStyle: fsTransformNone,
    },
  ];

  if (fundClass) {
    summary.splice(0, 0, {
      label: ORDER_SUMMARY.LABEL_FUND_CLASS,
      title: "fundClass" in fund && fundClass !== null && fundClass !== "" ? `${fundClass}` : "-",
      titleStyle: fsTransformNone,
    });
  }

  if (isScheduled === true) {
    summary.splice(
      0,
      2,
      {
        label: ORDER_SUMMARY.LABEL_RECURRING_AMOUNT,
        title: `${fundCurrency} ${formatAmount(scheduledInvestmentAmount || "")}`,
      },
      {
        label: ORDER_SUMMARY.LABEL_RECURRING_SALES_CHARGE,
        title: `${scheduledSalesCharge}%`,
      },
    );
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
    setViewFund(expanded === true ? "" : `${orderNumber}${fundName}`);
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
          <View style={px(sw24)}>
            <CustomSpacer space={sh16} />
            <TextCard data={summary} itemsPerGroup={3} spaceBetweenItem={32} titleStyle={fsTransformNone} />
            <CustomSpacer space={sh8} />
          </View>
        </Fragment>
      )}
    </View>
  );
};
