import React, { Fragment, FunctionComponent } from "react";
import { Dimensions, Pressable, Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, TextCard } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  border,
  centerHV,
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
  sh32,
  sh4,
  sh64,
  sw16,
  sw24,
  sw8,
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
    // isFea,
    isSyariah,
    salesCharge,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
    fundCode,
    paymentTerm,
  } = fund;

  const isScheduled =
    scheduledInvestmentAmount !== undefined &&
    scheduledSalesCharge !== undefined &&
    scheduledInvestmentAmount !== null &&
    scheduledSalesCharge !== null;

  const icon = expanded ? "caret-up" : "caret-down";

  const fundInfo: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_FUND_CODE,
      title: fundCode,
      titleStyle: fsTransformNone,
    },
    {
      label: ORDER_SUMMARY.LABEL_PRODUCT_TYPE,
      title: fundType || "-",
    },

    {
      label: ORDER_SUMMARY.LABEL_TYPE,
      title: isSyariah ? ORDER_SUMMARY.LABEL_SHARIAH : ORDER_SUMMARY.LABEL_CONVENTIONAL,
    },
    {
      label: ORDER_SUMMARY.LABEL_FUND_CURRENCY,
      title: fundCurrency,
      titleStyle: fsTransformNone,
    },
    // {
    //   label: ORDER_SUMMARY.LABEL_FEA,
    //   title: isFea ? "Yes" : "No",
    // },
  ];

  if (fundClass) {
    fundInfo.splice(3, 0, {
      label: ORDER_SUMMARY.LABEL_FUND_CLASS,
      title: "fundClass" in fund && fundClass !== null && fundClass !== "" ? `${fundClass}` : "-",
      titleStyle: fsTransformNone,
    });
  }

  // investment section
  const investment: LabeledTitleProps[] = [
    {
      label: ORDER_SUMMARY.LABEL_PAYMENT_TERM,
      title: `${paymentTerm}`,
      titleStyle: fsTransformNone,
    },
  ];
  if (isScheduled === false) {
    investment.splice(0, 0, {
      label: ORDER_SUMMARY.LABEL_INVESTMENT_AMOUNT,
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

  // const labelStyle = expanded === true ? fs16BoldGray5 : fs18BoldBlue1;

  const scaledSpaceBetweenItem = width < 1080 ? 30 : 32;

  return (
    <View style={{ backgroundColor: colorWhite._1, ...style }}>
      <Pressable style={headerStyle} onPress={handleExpand}>
        <Text style={fs18BoldBlue1}>{fundName}</Text>
        <CustomFlexSpacer />
        <IcoMoon color={colorBlue._1} name="facts" size={sh32} />
      </Pressable>
      {expanded === false ? null : (
        <Fragment>
          <View />
          <View style={px(sw24)}>
            <View style={flexRow}>
              <IcoMoon color={colorBlue._1} name="order" size={sh24} />
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
            <TextCard
              data={fundInfo}
              itemsPerGroup={3}
              labelStyle={fs12BoldGray5}
              spaceBetweenItem={scaledSpaceBetweenItem}
              spaceToLabel={sh4}
              titleStyle={{ ...fs16BoldBlack2, ...fsTransformNone }}
            />
            <CustomSpacer space={sh24} isHorizontal />
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
            <TextCard
              data={investment}
              itemsPerGroup={3}
              labelStyle={fs12BoldGray5}
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
