import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, LabeledTitleProps, TextCard } from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_RECURRING_CURRENCY } from "../../../../data/dictionary";
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
  sw648,
} from "../../../../styles";
import { formatAmount } from "../../../../utils";

const { ORDER_SUMMARY } = Language.PAGE;

export interface FundDetailsProps {
  fund: IOrderInvestment;
  paymentType?: TypePaymentType;
}

export const FundDetails: FunctionComponent<FundDetailsProps> = ({ fund, paymentType }: FundDetailsProps) => {
  const {
    distributionInstruction,
    fundClass,
    fundCurrency,
    fundingOption,
    fundIssuer,
    fundName,
    fundType,
    investmentAmount,
    // isFea,
    isSyariah,
    salesCharge,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
  } = fund;

  const scheduledAmount = scheduledInvestmentAmount ? formatAmount(scheduledInvestmentAmount) : "";

  const summary: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_SALES_CHARGE,
      // TODO temporary before backend fix
      title: salesCharge.includes("%") ? salesCharge : `${salesCharge}%`,
    },
    {
      label: ORDER_SUMMARY.LABEL_PRODUCT_TYPE,
      title: fundType || "-",
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

  const recurringSummary: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_RECURRING_AMOUNT,
      title: `${DICTIONARY_RECURRING_CURRENCY} ${scheduledAmount}`,
    },
    {
      label: ORDER_SUMMARY.LABEL_RECURRING_SALES_CHARGE,
      title: `${scheduledSalesCharge}%`,
    },
    {
      label: ORDER_SUMMARY.LABEL_PRODUCT_TYPE,
      title: fundType,
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
          <View style={{ width: sw648 }}>
            <Text numberOfLines={1} style={fs24BoldBlack2}>
              {fundName}
            </Text>
            <Text numberOfLines={1} style={fs12BoldBlack2}>
              {fundIssuer}
            </Text>
          </View>
        </View>
        <CustomFlexSpacer />
        <View>
          <CustomSpacer space={sh24} />
          <View style={flexRow}>
            <Text style={{ ...fs16RegBlack2, lineHeight: sh24 }}>{fundCurrency}</Text>
            <CustomSpacer isHorizontal={true} space={sw4} />
            <Text style={fs16BoldBlack2}>{formatAmount(investmentAmount)}</Text>
          </View>
        </View>
      </View>
      <View>
        <CustomSpacer space={sh16} />
        <View style={px(sw24)}>
          {paymentType === "Recurring" ? (
            <TextCard data={recurringSummary} itemsPerGroup={3} spaceBetweenItem={32} titleStyle={fsTransformNone} />
          ) : (
            <TextCard data={summary} itemsPerGroup={3} spaceBetweenItem={32} titleStyle={fsTransformNone} />
          )}
        </View>
        <CustomSpacer space={sh8} />
      </View>
    </Fragment>
  );
};
