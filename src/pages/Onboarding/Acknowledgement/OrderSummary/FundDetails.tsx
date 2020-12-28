import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CardWrap, CustomFlexSpacer, CustomSpacer, Dash, LabeledTitleProps } from "../../../../components";
import { Language } from "../../../../constants";
import {
  centerHorizontal,
  colorGray,
  flexRow,
  fs12BoldBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  fsCapitalize,
  fsTransformNone,
  px,
  sh16,
  sh24,
  sh8,
  sh80,
  sw24,
  sw4,
} from "../../../../styles";

const { ORDER_SUMMARY } = Language.PAGE;

export interface FundDetailsProps {
  fund: IOrderInvestment;
}

export const FundDetails: FunctionComponent<FundDetailsProps> = ({ fund }: FundDetailsProps) => {
  const {
    distributionInstruction,
    fundClass,
    fundCurrency,
    fundingOption,
    fundIssuer,
    fundName,
    investmentAmount,
    isFea,
    isScheduled,
    isSyariah,
    salesCharge,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
  } = fund;

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
  ];

  const recurringSummary: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_RECURRING_AMOUNT,
      title: `${fundCurrency} ${scheduledInvestmentAmount}`,
    },
    {
      label: ORDER_SUMMARY.LABEL_RECURRING_SALES_CHARGE,
      title: `${scheduledSalesCharge}%`,
    },
  ];

  const fundHeaderStyle: ViewStyle = {
    ...centerHorizontal,
    ...flexRow,
    ...px(sw24),
    backgroundColor: colorGray._5,
    height: sh80,
  };

  return (
    <Fragment>
      <View style={fundHeaderStyle}>
        <View>
          <CustomSpacer space={sh16} />
          <Text style={{ ...fs24BoldBlack2, ...fsCapitalize }}>{fundName}</Text>
          <Text style={{ ...fs12BoldBlack2, ...fsCapitalize }}>{fundIssuer}</Text>
        </View>
        <CustomFlexSpacer />
        <View>
          <CustomSpacer space={sh24} />
          <View style={flexRow}>
            <Text style={{ ...fs16RegBlack2, lineHeight: sh24 }}>{fundCurrency}</Text>
            <CustomSpacer isHorizontal={true} space={sw4} />
            <Text style={fs16BoldBlack2}>{investmentAmount}</Text>
          </View>
        </View>
      </View>
      <View>
        <CustomSpacer space={sh16} />
        <CardWrap data={summary} labelStyle={fs12BoldBlack2} titleStyle={fsTransformNone} />
        <CustomSpacer space={sh8} />
        {isScheduled === true ? (
          <Fragment>
            <Dash />
            <CustomSpacer space={sh16} />
            <CardWrap data={recurringSummary} labelStyle={fs12BoldBlack2} titleStyle={fsTransformNone} />
          </Fragment>
        ) : null}
        <CustomSpacer space={sh8} />
      </View>
    </Fragment>
  );
};
