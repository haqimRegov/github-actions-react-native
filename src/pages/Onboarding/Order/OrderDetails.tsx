import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer } from "../../../components";
import { Language, PAYMENT_DATE_FORMAT } from "../../../constants";
import {
  alignItemsEnd,
  centerHorizontal,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  px,
  py,
  sh24,
  sh8,
  sh96,
  shadowBlue5,
  sw24,
  sw4,
  sw8,
} from "../../../styles";
import { FundDetails } from "./FundDetails";

const { PAYMENT } = Language.PAGE;

export interface OrderDetailsProps {
  orderSummary: IOrderSummary;
}

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({ orderSummary }: OrderDetailsProps) => {
  const { date, funds, orderNumber, totalAmount } = orderSummary;

  const cardHeaderStyle: ViewStyle = {
    ...centerHorizontal,
    ...flexRow,
    ...px(sw24),
    ...py(sh24),
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh96,
    zIndex: 1,
  };

  const orderDate = moment(date).format(PAYMENT_DATE_FORMAT);

  return (
    <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
      <View style={cardHeaderStyle}>
        <View>
          <Text style={fs24BoldBlack2}>{orderNumber}</Text>
          <Text style={fs12BoldBlack2}>{orderDate}</Text>
        </View>
        <CustomFlexSpacer />
        <View style={alignItemsEnd}>
          <Text style={fs12RegBlack2}>{PAYMENT.LABEL_TOTAL_INVESTMENT_AMOUNT}</Text>
          <CustomSpacer space={sh8} />
          {totalAmount !== undefined && totalAmount.length === 1 ? (
            <View style={flexRow}>
              <Text style={fs16RegBlack2}>{totalAmount[0].currency}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <Text style={fs16BoldBlack2}>{totalAmount[0].amount}</Text>
            </View>
          ) : null}
        </View>
      </View>
      {funds.map((fundOrder: IFundOrderSummary, orderIndex: number) => (
        <FundDetails key={orderIndex} fundSummary={fundOrder} />
      ))}
    </View>
  );
};
