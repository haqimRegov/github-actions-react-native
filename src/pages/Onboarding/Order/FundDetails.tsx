import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CardWrap, CustomFlexSpacer, CustomSpacer, LabeledTitleProps } from "../../../components";
import { Language } from "../../../constants";
import {
  centerHorizontal,
  colorGray,
  flexRow,
  fs10BoldBlack2,
  fs12BoldBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  fsCapitalize,
  fsTransformNone,
  px,
  sh16,
  sh24,
  sh29,
  sh80,
  sw16,
  sw24,
  sw4,
} from "../../../styles";

const { PAYMENT } = Language.PAGE;

export interface FundDetailsProps {
  fundSummary: IFundOrderSummary;
}

export const FundDetails: FunctionComponent<FundDetailsProps> = ({ fundSummary }: FundDetailsProps) => {
  const {
    fundingOption,
    investmentAmount,
    salesCharge,
    fundCurrency,
    fundType,
    isEpf,
    isShariah,
    fundName,
    fundIssuer,
    accountType,
    distributionChannel,
  } = fundSummary;

  const summary: LabeledTitleProps[] = [
    {
      label: PAYMENT.LABEL_ACCOUNT_FUND,
      title: fundingOption,
    },
    {
      label: PAYMENT.LABEL_FUND_TYPE,
      title: fundType,
    },
    {
      label: PAYMENT.LABEL_SHARIAH,
      title: isShariah ? "Yes" : "No",
    },
    {
      label: PAYMENT.LABEL_EPF,
      title: isEpf ? "Yes" : "No",
    },
    {
      label: PAYMENT.LABEL_ACCOUNT_TYPE,
      title: accountType,
    },
    {
      label: PAYMENT.LABEL_CHANNEL,
      title: distributionChannel,
    },
    {
      label: PAYMENT.LABEL_CURRENCY,
      title: fundCurrency,
    },
    {
      label: PAYMENT.LABEL_SALES_CHARGE,
      title: `${salesCharge}`,
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
        <CustomSpacer isHorizontal={true} space={sw16} />
        <Text style={{ ...fs10BoldBlack2, paddingTop: sh29 }}>{PAYMENT.LABEL_ONE_TIME}</Text>
        <CustomFlexSpacer />
        <View>
          <CustomSpacer space={sh24} />
          <View style={flexRow}>
            <Text style={fs16RegBlack2}>{fundCurrency}</Text>
            <CustomSpacer isHorizontal={true} space={sw4} />
            <Text style={fs16BoldBlack2}>{investmentAmount}</Text>
          </View>
        </View>
      </View>
      <View>
        <CustomSpacer space={sh16} />
        <CardWrap data={summary} labelStyle={fs12BoldBlack2} titleStyle={fsTransformNone} />
      </View>
    </Fragment>
  );
};
