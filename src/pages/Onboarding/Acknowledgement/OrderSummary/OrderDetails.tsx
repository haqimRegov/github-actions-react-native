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
  fs12RegGray6,
  fs16BoldGray6,
  fs16RegGray6,
  fs24BoldGray6,
  px,
  py,
  sh24,
  sh8,
  sh96,
  shadow12Blue104,
  sw24,
  sw32,
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
  const { orderDate, orderTotalAmount, orderNumber, paymentType, investments } = orderSummary;
  const expanded = expandOrder === index;
  const icon = expanded ? "caret-up" : "caret-down";

  const cardHeaderStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...py(sh24),
    ...shadow12Blue104,
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
  // const orderDate = moment(date).format(DEFAULT_DATE_FORMAT);

  const orderLabel = paymentType === "Recurring" ? PAYMENT.LABEL_TOTAL_RECURRING_AMOUNT : PAYMENT.LABEL_TOTAL_INVESTMENT_AMOUNT;

  return (
    <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
      <TouchableWithoutFeedback onPress={handleExpand}>
        <View style={cardHeaderStyle}>
          <View>
            <Text style={fs24BoldGray6}>{orderNumber}</Text>
            <Text style={fs12RegGray6}>{orderDate}</Text>
          </View>
          <CustomFlexSpacer />
          <View style={alignItemsEnd}>
            <Text style={fs12RegGray6}>{orderLabel}</Text>
            <CustomSpacer space={sh8} />
            <View style={{ ...centerVertical, ...flexRow }}>
              {orderTotalAmount.map((totalAmount: IOrderAmount, amountIndex: number) => {
                return (
                  <View key={amountIndex} style={{ ...centerVertical, ...flexRow }}>
                    {amountIndex !== 0 ? <Text style={{ ...fs16RegGray6, ...px(sw4) }}>+</Text> : null}
                    <Text style={fs16BoldGray6}>{totalAmount.currency}</Text>
                    <CustomSpacer isHorizontal={true} space={sw4} />
                    <Text style={fs16RegGray6}>{formatAmount(totalAmount.amount)}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <CustomSpacer isHorizontal={true} space={sw32} />
          <IcoMoon color={colorBlack._1} name={icon} size={sh24} />
        </View>
      </TouchableWithoutFeedback>
      {expanded
        ? investments.map((fund: IOrderInvestment, fundIndex: number) => (
            <FundDetails key={fundIndex} fund={fund} paymentType={paymentType} />
          ))
        : null}
    </View>
  );
};
