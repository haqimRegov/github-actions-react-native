import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, CustomTooltip } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import {
  border,
  centerVertical,
  colorGray,
  flexRow,
  fs12BoldWhite1,
  fs12RegBlack2,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlack2,
  fs24RegBlack2,
  px,
  sh24,
  sh56,
  sh8,
  sh88,
  shadow5,
  sw1,
  sw12,
  sw24,
  sw376,
  sw4,
  sw8,
} from "../../../../styles";
import { formatAmount } from "../../../../utils";
import { OrderDetails } from "./OrderDetails";

interface OrderSummaryProps extends AcknowledgementStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

const { ORDER_SUMMARY } = Language.PAGE;

const OrderSummaryComponent: FunctionComponent<OrderSummaryProps> = ({
  handleNextStep,
  orders,
  onboarding,
  updateOnboarding,
}: OrderSummaryProps) => {
  const [expandOrder, setExpandOrder] = useState<number | undefined>(0);

  const handleConfirm = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findTermsAndConditions = updatedDisabledSteps.indexOf("TermsAndConditions");
    if (findTermsAndConditions !== -1) {
      updatedDisabledSteps.splice(findTermsAndConditions, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep("TermsAndConditions");
  };

  const popupContent = (
    <View>
      <Text style={{ ...fs12BoldWhite1, lineHeight: sh24 }}>{ORDER_SUMMARY.INFO}</Text>
    </View>
  );
  const orderSummaryHeader: ViewStyle = { ...flexRow, ...px(sw24), zIndex: 2 };

  return (
    <ContentPage handleContinue={handleConfirm} subheading={ORDER_SUMMARY.HEADING}>
      <CustomSpacer space={sh8} />
      <View style={orderSummaryHeader}>
        <Text style={fs16SemiBoldBlack2}>{ORDER_SUMMARY.SUBHEADING}</Text>
        <CustomSpacer isHorizontal={true} space={sw12} />
        <CustomTooltip content={popupContent} contentStyle={{ width: sw376 }} />
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...px(sw24) }}>
        <View style={{ ...centerVertical, ...flexRow, ...border(colorGray._3, sw1, sw8), height: sh88, ...px(sw24) }}>
          <IcoMoon color={colorGray._3} name="order-total" size={sh56} />
          <CustomSpacer isHorizontal={true} space={sw8} />
          <View>
            <View style={{ ...centerVertical, ...flexRow }}>
              {orders !== undefined &&
                orders.grandTotal.map((totalAmount: IOrderAmount, index: number) => {
                  return (
                    <View key={index} style={{ ...centerVertical, ...flexRow }}>
                      {index !== 0 ? <Text style={{ ...fs16RegBlack2, ...px(sw4) }}>+</Text> : null}
                      <Text style={{ ...fs24BoldBlack2 }}>{totalAmount.currency}</Text>
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      <Text style={fs24RegBlack2}>{formatAmount(parseFloat(totalAmount.amount))}</Text>
                    </View>
                  );
                })}
            </View>
            <Text style={fs12RegBlack2}>{ORDER_SUMMARY.LABEL_GRAND_TOTAL}</Text>
          </View>
        </View>
      </View>
      <CustomSpacer space={sh24} />
      {orders !== undefined &&
        orders.orders.map((orderSummary: IOrder, index: number) => {
          return orderSummary.paymentType !== "Recurring" ? (
            <Fragment key={index}>
              {index !== 0 ? <CustomSpacer space={sh24} /> : null}
              <View style={{ ...px(sw24), ...shadow5 }}>
                <OrderDetails expandOrder={expandOrder} index={index} orderSummary={orderSummary} setExpandOrder={setExpandOrder} />
              </View>
            </Fragment>
          ) : null;
        })}
    </ContentPage>
  );
};

export const OrderSummary = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(OrderSummaryComponent);
