import React, { FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  alignItemsEnd,
  centerVertical,
  colorBlack,
  colorWhite,
  flexRow,
  fs12RegBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  px,
  py,
  sh24,
  sh32,
  sh8,
  sh96,
  shadowBlue5,
  sw24,
  sw4,
  sw8,
} from "../../../../styles";
import { AnimationUtils, formatAmount } from "../../../../utils";
import { FundDetails } from "./FundDetails";

const { PAYMENT } = Language.PAGE;

export interface OrderDetailsProps {
  expandOrder: number | undefined;
  orderSummary: IOrder;
  index: number;
  setExpandOrder: (value: number | undefined) => void;
}

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({
  expandOrder,
  index,
  orderSummary,
  setExpandOrder,
}: OrderDetailsProps) => {
  const { orderDate, orderTotalAmount, orderNumber, investments } = orderSummary;
  const expanded = expandOrder === index;
  const icon = expanded ? "caret-up" : "caret-down";

  const cardHeaderStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...py(sh24),
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh96,
    zIndex: 1,
    borderRadius: expanded ? undefined : sw8,
  };

  const handleExpand = () => {
    AnimationUtils.layout({ duration: 200 });
    const order = expanded ? undefined : index;
    setExpandOrder(order);
  };
  // const orderDate = moment(date).format(PAYMENT_DATE_FORMAT);

  return (
    <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
      <TouchableWithoutFeedback onPress={handleExpand}>
        <View style={cardHeaderStyle}>
          <View>
            <Text style={fs24BoldBlack2}>{orderNumber}</Text>
            <Text style={fs12RegBlack2}>{orderDate}</Text>
          </View>
          <CustomFlexSpacer />
          <View style={alignItemsEnd}>
            <Text style={fs12RegBlack2}>{PAYMENT.LABEL_TOTAL_INVESTMENT_AMOUNT}</Text>
            <CustomSpacer space={sh8} />
            <View style={{ ...centerVertical, ...flexRow }}>
              {orderTotalAmount.map((totalAmount: IOrderAmount, amountIndex: number) => {
                return (
                  <View key={amountIndex} style={{ ...centerVertical, ...flexRow }}>
                    {amountIndex !== 0 ? <Text style={{ ...fs16RegBlack2, ...px(sw4) }}>+</Text> : null}
                    <Text style={{ ...fs16BoldBlack2, lineHeight: sh24 }}>{totalAmount.currency}</Text>
                    <CustomSpacer isHorizontal={true} space={sw4} />
                    <Text style={fs16RegBlack2}>{formatAmount(parseFloat(totalAmount.amount))}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <CustomSpacer isHorizontal={true} space={sw8} />
          <IcoMoon color={colorBlack._1} name={icon} size={sh32} />
        </View>
      </TouchableWithoutFeedback>
      {expanded ? investments.map((fund: IOrderInvestment, fundIndex: number) => <FundDetails key={fundIndex} fund={fund} />) : null}
    </View>
  );
};
