import React, { Fragment, FunctionComponent } from "react";
import { Dimensions, Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IconButton, TextCard } from "../../components";
import { Language } from "../../constants";
import {
  borderBottomGray4,
  circle,
  colorBlue,
  colorGray,
  colorWhite,
  fs12RegGray5,
  fs16BoldBlack2,
  fs16BoldGray5,
  fs16RegGray5,
  fsCapitalize,
  fsTransformNone,
  px,
  rowCenterVertical,
  sh16,
  sh4,
  sh64,
  sw24,
  sw32,
} from "../../styles";
import { formatAmount } from "../../utils";

const { ORDER_SUMMARY } = Language.PAGE;

export interface FundProps {
  expanded: boolean;
  fund: IOrderInvestment;
  // orderNumber: string;
  handleExpand: () => void;
  // viewFund: string;
  style?: ViewStyle;
}

export const Fund: FunctionComponent<FundProps> = ({ expanded, fund, handleExpand, style }: FundProps) => {
  const { width } = Dimensions.get("window");
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
    ...rowCenterVertical,
    ...px(sw24),
    height: sh64,
  };

  const labelStyle = expanded === true ? fs16BoldGray5 : fs16RegGray5;

  const scaledSpaceBetweenItem = width < 1080 ? 30 : 32;

  return (
    <View style={{ backgroundColor: colorWhite._1, ...style }}>
      <View style={headerStyle}>
        <Text style={labelStyle}>{fundName}</Text>
        <CustomFlexSpacer />
        <IconButton
          color={colorBlue._1}
          onPress={handleExpand}
          name={icon}
          size={sh16}
          style={circle(sw32)}
          withHover={{ color: colorGray._2 }}
        />
      </View>
      {expanded === false ? null : (
        <Fragment>
          <View style={px(sw24)}>
            <View style={borderBottomGray4} />
            <CustomSpacer space={sh16} />
            <TextCard
              data={summary}
              itemsPerGroup={3}
              labelStyle={fs12RegGray5}
              spaceBetweenItem={scaledSpaceBetweenItem}
              spaceToLabel={sh4}
              titleStyle={{ ...fs16BoldBlack2, ...fsTransformNone }}
            />
          </View>
        </Fragment>
      )}
    </View>
  );
};
