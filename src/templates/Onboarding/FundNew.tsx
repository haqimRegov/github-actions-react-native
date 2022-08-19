import React, { Fragment, FunctionComponent } from "react";
import { Dimensions, Pressable, Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IconButton, TextCard } from "../../components";
import { Language } from "../../constants";
import { getProductType } from "../../helpers";
import { IcoMoon } from "../../icons";
import {
  border,
  centerHV,
  circle,
  colorBlue,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldGray5,
  fs16BoldBlack2,
  fs18BoldBlue1,
  fsCapitalize,
  fsTransformNone,
  px,
  rowCenterVertical,
  sh1,
  sh10,
  sh12,
  sh24,
  sh64,
  sh8,
  sw16,
  sw239,
  sw24,
  sw40,
  sw8,
} from "../../styles";
import { formatAmount } from "../../utils";

const { FUND_OVERVIEW, ORDER_SUMMARY } = Language.PAGE;

export interface FundProps {
  expanded: boolean;
  fund: IOrderInvestment;
  // orderNumber: string;
  handleExpand: () => void;
  // viewFund: string;
  style?: ViewStyle;
}

export const FundNew: FunctionComponent<FundProps> = ({ expanded, fund, handleExpand, style }: FundProps) => {
  const { width } = Dimensions.get("window");
  const {
    distributionInstruction,
    fundClass,
    fundCurrency,
    fundingOption,
    fundName,
    fundType,
    investmentAmount,
    isTopup,
    isSyariah,
    salesCharge,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
    landingFund,
    fundCode,
  } = fund;

  const isScheduled =
    scheduledInvestmentAmount !== undefined &&
    scheduledSalesCharge !== undefined &&
    scheduledInvestmentAmount !== null &&
    scheduledSalesCharge !== null;

  const icon = expanded ? "caret-up" : "caret-down";
  const investmentAmountLabel = isTopup === true ? ORDER_SUMMARY.LABEL_TOP_UP_AMOUNT : ORDER_SUMMARY.LABEL_INVESTMENT_AMOUNT;

  const fundInfo: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_FUND_CODE,
      title: fundCode || "-",
      titleStyle: fsTransformNone,
    },
    {
      label: ORDER_SUMMARY.LABEL_PRODUCT_TYPE,
      title: getProductType(fundType) || "-",
    },

    {
      label: ORDER_SUMMARY.LABEL_TYPE,
      title: isSyariah ? ORDER_SUMMARY.LABEL_SHARIAH : ORDER_SUMMARY.LABEL_CONVENTIONAL,
    },
    {
      label: ORDER_SUMMARY.LABEL_FUND_CLASS,
      title: fundClass || "-",
      titleStyle: fsTransformNone,
    },
    {
      label: ORDER_SUMMARY.LABEL_FUND_CURRENCY,
      title: fundCurrency,
      titleStyle: fsTransformNone,
    },
  ];

  if (fundType === "AMP") {
    fundInfo.push({
      label: ORDER_SUMMARY.LABEL_LANDING_FUND,
      title: landingFund || "-",
      titleStyle: fsTransformNone,
    });
  }

  // investment section
  const investment: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_PAYMENT_TERM,
      title: isScheduled === true ? FUND_OVERVIEW.LABEL_TERM_RECURRING : FUND_OVERVIEW.LABEL_TERM_ONE_TIME,
      titleStyle: fsTransformNone,
    },
  ];
  if (isScheduled === false) {
    investment.splice(0, 0, {
      label: investmentAmountLabel,
      title: `${fundCurrency} ${formatAmount(investmentAmount || "")}`,
    });

    investment.splice(0, 0, {
      label: ORDER_SUMMARY.LABEL_SALES_CHARGE,
      title: `${salesCharge}%`,
    });

    investment.splice(0, 0, {
      label: ORDER_SUMMARY.LABEL_FUNDING_OPTION,
      // TODO temporary fix until backend fix it
      // eslint-disable-next-line dot-notation
      title: fundingOption || fund["accountFund"],
      titleStyle: fundingOption === "EPF" ? undefined : fsCapitalize,
    });

    investment.splice(4, 0, {
      label: ORDER_SUMMARY.LABEL_DISTRIBUTION,
      title: distributionInstruction,
      titleStyle: fsTransformNone,
    });
  }

  if (isScheduled === true) {
    investment.splice(
      1,
      0,
      {
        label: ORDER_SUMMARY.LABEL_RECURRING_SALES_CHARGE,
        title: `${scheduledSalesCharge}%`,
      },
      {
        label: ORDER_SUMMARY.LABEL_RECURRING_AMOUNT,
        title: `${fundCurrency} ${formatAmount(scheduledInvestmentAmount || "")}`,
      },
    );
  }

  const headerStyle: ViewStyle = {
    ...rowCenterVertical,
    ...px(sw24),
    height: sh64,
  };

  const textCardProps = {
    itemsPerGroup: 3,
    itemStyle: { width: sw239 },
    labelStyle: fs12BoldGray5,
    spaceBetweenItem: width < 1080 ? 30 : 32,
    titleStyle: { ...fs16BoldBlack2, ...fsTransformNone },
  };

  // const tagStyle: ViewStyle = {
  //   ...px(sw4),
  //   ...py(sh2),
  //   ...border(colorBlue._9, sw05, sw4),
  //   ...centerHV,
  // };

  return (
    <View style={{ backgroundColor: colorWhite._1, ...style }}>
      <Pressable style={headerStyle} onPress={handleExpand}>
        <View style={flexRow}>
          <Text style={fs18BoldBlue1}>{fundName}</Text>
          {/* {isTopup === true ? (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={sw8} />
              <View style={tagStyle}>
                <Text style={fs10RegBlue9}>{ORDER_SUMMARY.LABEL_NEW_FUND}</Text>
              </View>
            </Fragment>
          ) : null} */}
        </View>
        <CustomFlexSpacer />
        <IconButton
          color={colorBlue._1}
          name={icon}
          onPress={handleExpand}
          size={sw24}
          style={circle(sw40, undefined)}
          withHover={{ color: colorBlue._2 }}
        />
      </Pressable>
      {expanded === false ? null : (
        <Fragment>
          <View />
          <View style={px(sw24)}>
            <View style={flexRow}>
              <IcoMoon color={colorBlue._1} name="fund-facts" size={sh24} />
              <CustomSpacer isHorizontal={true} space={sw8} />
              <View style={centerHV}>
                <Text style={fs16BoldBlack2}>{ORDER_SUMMARY.LABEL_FUND_INFORMATION}</Text>
              </View>
              <CustomSpacer isHorizontal={true} space={sw16} />
              <View style={{ ...flexChild, marginTop: sh10 }}>
                <View style={border(colorBlue._2, sh1)} />
              </View>
            </View>
            <CustomSpacer space={sh12} />
            <TextCard {...textCardProps} data={fundInfo} />
            <CustomSpacer space={sh8} />
            <View style={flexRow}>
              <IcoMoon color={colorBlue._1} name="transaction-info" size={sh24} />
              <CustomSpacer isHorizontal={true} space={sw8} />
              <View style={centerHV}>
                <Text style={fs16BoldBlack2}>{ORDER_SUMMARY.LABEL_INVESTMENT}</Text>
              </View>
              <CustomSpacer isHorizontal={true} space={sw16} />
              <View style={{ ...flexChild, marginTop: sh10 }}>
                <View style={border(colorBlue._2, sh1)} />
              </View>
            </View>
            <CustomSpacer space={sh12} />
            <TextCard {...textCardProps} data={investment} />
            <CustomSpacer space={sh8} />
          </View>
        </Fragment>
      )}
    </View>
  );
};
