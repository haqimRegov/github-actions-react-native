import moment from "moment";
import React, { FunctionComponent, useState } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, StatusBadge } from "../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../constants";
import {
  alignItemsEnd,
  borderBottomGray2,
  centerVertical,
  colorBlue,
  flexRow,
  fs12BoldGray5,
  fs16BoldGray6,
  fs16RegGray6,
  fs24BoldBlack2,
  px,
  py,
  rowCenterVertical,
  sh24,
  sh6,
  sh82,
  sw24,
  sw4,
  sw8,
} from "../../styles";
import { AnimationUtils, formatAmount } from "../../utils";
import { Fund } from "./Fund";

const { PAYMENT } = Language.PAGE;

interface OrderOverviewProps {
  completed?: boolean;
  createdOn: string;
  funds: IOrderInvestment[];
  noBadge?: boolean;
  orderNumber: string;
  paymentType: TypePaymentType;
  totalInvestment: IOrderAmount[];
}
export const OrderOverview: FunctionComponent<OrderOverviewProps> = ({
  completed,
  createdOn,
  funds,
  noBadge,
  orderNumber,
  paymentType,
  totalInvestment,
}: OrderOverviewProps) => {
  const [viewFund, setViewFund] = useState<string>("");

  const cardHeaderStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...py(sh24),
    backgroundColor: colorBlue._3,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh82,
    zIndex: 1,
  };

  const tagColor = completed === true ? "complete" : "warning";
  const tagLabel = completed === true ? "Completed" : "Pending";

  const totalAmountLabel = paymentType === "Recurring" ? PAYMENT.LABEL_TOTAL_RECURRING_AMOUNT : PAYMENT.LABEL_TOTAL_INVESTMENT_AMOUNT;

  return (
    <View>
      <View style={cardHeaderStyle}>
        <View>
          <Text style={fs24BoldBlack2}>{orderNumber}</Text>
          <Text style={fs12BoldGray5}>{moment(createdOn, "x").format(DEFAULT_DATE_FORMAT)}</Text>
        </View>
        <CustomFlexSpacer />
        <View style={alignItemsEnd}>
          <View style={rowCenterVertical}>
            {noBadge === true ? null : <StatusBadge color={tagColor} text={tagLabel} />}
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={fs12BoldGray5}>{totalAmountLabel}</Text>
          </View>
          <CustomSpacer space={sh6} />
          <View style={rowCenterVertical}>
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
            {fundIndex === 0 ? null : <View style={borderBottomGray2} />}
            <Fund expanded={expanded} fund={fund} handleExpand={handleExpand} style={container} />
          </View>
        );
      })}
    </View>
  );
};
