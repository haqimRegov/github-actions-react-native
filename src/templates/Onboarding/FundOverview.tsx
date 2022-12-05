import React, { FunctionComponent, useState } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, StatusBadge } from "../../components";
import { Language } from "../../constants";
import {
  alignItemsEnd,
  border,
  borderBottomBlue4,
  colorBlue,
  colorGray,
  flexWrap,
  fs10RegGray6,
  fs16BoldGray6,
  fs16RegGray6,
  fs24BoldBlack2,
  justifyContentEnd,
  px,
  py,
  rowCenterVertical,
  sh12,
  sw1,
  sw24,
  sw4,
  sw600,
  sw8,
} from "../../styles";
import { AnimationUtils, formatAmount } from "../../utils";
import { FundNew } from "./FundNew";

const { PAYMENT } = Language.PAGE;

interface FundOverviewProps {
  completed?: boolean;
  createdOn: string;
  funds: IOrderInvestment[];
  noBadge?: boolean;
  orderNumber: string;
  paymentType: TypePaymentType;
  totalInvestment: IOrderAmount[];
  transactionType?: TTransactionType;
}
export const FundOverview: FunctionComponent<FundOverviewProps> = ({
  completed,
  createdOn,
  funds,
  noBadge,
  orderNumber,
  paymentType,
  totalInvestment,
  transactionType,
}: FundOverviewProps) => {
  const [viewFund, setViewFund] = useState<string>("");

  const cardHeaderStyle: ViewStyle = {
    ...rowCenterVertical,
    ...px(sw24),
    ...py(sh12),
    backgroundColor: colorBlue._3,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    zIndex: 1,
  };

  const tagColor = completed === true ? "complete" : "warning";
  const tagLabel = completed === true ? "Completed" : "Pending";

  const investmentAmountLabel = transactionType === "Sales" ? PAYMENT.LABEL_TOTAL_SALES_AMOUNT : PAYMENT.LABEL_TOTAL_INVESTMENT_AMOUNT;
  const totalAmountLabel = paymentType === "Recurring" ? PAYMENT.LABEL_TOTAL_RECURRING_AMOUNT : investmentAmountLabel;

  return (
    <View style={border(colorGray._2, sw1, sw8)}>
      <View style={cardHeaderStyle}>
        <View>
          <Text style={fs24BoldBlack2}>{orderNumber}</Text>
          <Text style={fs10RegGray6}>{createdOn}</Text>
        </View>
        <CustomFlexSpacer />
        {noBadge === true ? null : <StatusBadge color={tagColor} text={tagLabel} />}
        <CustomSpacer isHorizontal space={sw24} />
        <View style={alignItemsEnd}>
          <View style={rowCenterVertical}>
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={fs10RegGray6}>{totalAmountLabel}</Text>
          </View>
          <View style={{ ...rowCenterVertical, ...justifyContentEnd, ...flexWrap, maxWidth: sw600 }}>
            {totalInvestment.map((totalAmount: IOrderAmount, amountIndex: number) => {
              return (
                <View key={amountIndex} style={rowCenterVertical}>
                  {amountIndex !== 0 ? <Text style={{ ...fs16RegGray6, ...px(sw4) }}>+</Text> : null}
                  <Text style={fs16BoldGray6}>{`${totalAmount.currency} ${formatAmount(totalAmount.amount)}`}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      {funds.map((fund: IOrderInvestment, fundIndex: number) => {
        const expanded = viewFund === `${orderNumber}${fund.fundName}`;

        const handleExpand = () => {
          AnimationUtils.layout({ duration: 120 });
          setViewFund(expanded === true ? "" : `${orderNumber}${fund.fundName}`);
        };

        const container: ViewStyle = fundIndex === funds.length - 1 ? { borderBottomLeftRadius: sw8, borderBottomRightRadius: sw8 } : {};

        return (
          <View key={fundIndex}>
            {fundIndex === 0 ? null : <View style={borderBottomBlue4} />}
            <FundNew expanded={expanded} fund={fund} handleExpand={handleExpand} style={container} />
          </View>
        );
      })}
    </View>
  );
};
