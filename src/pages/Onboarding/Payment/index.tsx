import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";

import { BlurView, CustomFlexSpacer, CustomSpacer, LabeledTitle, SafeAreaPage, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { SAMPLE_PAYMENT } from "../../../mocks/payment-summary";
import { OnboardingPaymentMapDispatchToProps, OnboardingPaymentMapStateToProps, OnboardingPaymentStoreProps } from "../../../store";
import {
  borderBottomBlack21,
  centerVertical,
  flexChild,
  flexGrow,
  flexRow,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlack2,
  px,
  sh112,
  sh24,
  sh32,
  sh8,
  shadow5,
  sw24,
  sw256,
  sw4,
} from "../../../styles";
import { PaymentOrder } from "./PaymentOrder";

const { PAYMENT } = Language.PAGE;
interface PaymentProps extends OnboardingPaymentStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

const PaymentComponent: FunctionComponent<PaymentProps> = ({ paymentSummary, updatePaymentSummary }: PaymentProps) => {
  const [activeOrder, setActiveOrder] = useState<string>("");

  const [viewFund, setViewFund] = useState<string>("");
  const handleSubmit = () => {
    const request = paymentSummary!.orders.map(({ orderNumber, paymentType, payments }: IPaymentOrderState) => {
      return {
        orderNumber: orderNumber,
        paymentType: paymentType,
        payments: payments
          .map((paymentInfo: IPaymentState) => {
            return {
              ...paymentInfo,
              transactionDate: moment(paymentInfo.transactionDate).unix(),
              transactionTime: paymentInfo.transactionTime !== undefined ? moment(paymentInfo.transactionTime).unix() : undefined,
            };
          })
          .filter((value) => value.saved === true),
      };
    });
    // eslint-disable-next-line no-console
    console.log("request", { orders: request });
  };

  const email = "alan@kib.com.my";

  let completedOrders: IPaymentOrderState[] = [];
  // TODO floatingAmount
  // let floatingAmount: IOrderAmount[] = [];
  if (paymentSummary !== undefined) {
    // const filtered = paymentSummary!.orders.filter((order) => order.floatingAmount !== undefined);
    // const test = filtered.map((order) => order.floatingAmount!).flat().map((order) => ).reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount);
    // console.log("test", test);
    // floatingAmount = filtered !== undefined ? filtered.map((order) => order.floatingAmount!) : [];
    completedOrders = paymentSummary!.orders.filter((order) => order.completed === true);
  }

  const completedText = `${completedOrders.length} ${PAYMENT.LABEL_COMPLETED}`;
  const pendingCount = paymentSummary !== undefined ? paymentSummary.orders.length - completedOrders.length : 0;
  const pendingText = `${pendingCount} ${PAYMENT.LABEL_PENDING_PAYMENT}`;
  const completedBannerText = pendingCount === 0 ? `${completedText}` : `${pendingText}, ${completedText}`;
  const bannerText = completedOrders.length === 0 ? `${pendingText}` : completedBannerText;

  useEffect(() => {
    if (paymentSummary === undefined) {
      updatePaymentSummary(SAMPLE_PAYMENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={flexChild}>
          <CustomSpacer space={sh32} />
          <View style={{ ...flexRow, ...px(sw24) }}>
            <LabeledTitle
              label={PAYMENT.HEADING}
              labelStyle={fs24BoldBlack2}
              spaceToLabel={sh8}
              title={PAYMENT.SUBHEADING}
              titleStyle={fs16SemiBoldBlack2}
            />
            <CustomFlexSpacer />
            <Text style={{ ...fs16RegBlack2, width: sw256 }}>{`${PAYMENT.LABEL_EMAIL} ${email}`}</Text>
          </View>
          {paymentSummary !== undefined &&
            paymentSummary.orders.map((order: IPaymentOrderState, index: number) => {
              const setPaymentOrder = (paymentOrder: IPaymentOrderState) => {
                const updatedPaymentOrders = [...paymentSummary.orders];
                updatedPaymentOrders[index] = paymentOrder;
                updatePaymentSummary({ ...paymentSummary, orders: updatedPaymentOrders });
              };
              return (
                <Fragment key={index}>
                  <BlurView visible={activeOrder === "" || activeOrder === order.orderNumber}>
                    <CustomSpacer space={sh24} />
                    <View style={{ ...px(sw24), ...shadow5 }}>
                      <PaymentOrder
                        setActiveOrder={setActiveOrder}
                        activeOrder={activeOrder}
                        setViewFund={setViewFund}
                        setPaymentOrder={setPaymentOrder}
                        paymentOrder={order}
                        viewFund={viewFund}
                      />
                    </View>
                    <CustomSpacer space={sh24} />
                  </BlurView>
                  {index !== 0 ? null : (
                    <Fragment>
                      <View style={borderBottomBlack21} />
                    </Fragment>
                  )}
                </Fragment>
              );
            })}
          {activeOrder !== "" ? null : <CustomSpacer space={sh112} />}
        </View>
      </ScrollView>
      {activeOrder !== "" ? null : (
        <SelectionBanner
          bottomContent={
            <View style={{ ...centerVertical, ...flexRow }}>
              {paymentSummary !== undefined &&
                paymentSummary.grandTotal.map((totalAmount: IOrderAmount, index: number) => {
                  return (
                    <View key={index} style={{ ...centerVertical, ...flexRow }}>
                      {index !== 0 ? (
                        <Text style={{ ...fs16RegBlack2, ...px(sw4) }}>+</Text>
                      ) : (
                        <Text style={fs16RegBlack2}>{`${PAYMENT.LABEL_GRAND_TOTAL} `}</Text>
                      )}
                      <Text style={fs16RegBlack2}>{totalAmount.currency}</Text>
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      <Text style={fs16BoldBlack2}>{`${totalAmount.amount}`}</Text>
                    </View>
                  );
                })}
            </View>
          }
          labelSubmit={PAYMENT.BUTTON_DONE}
          submitOnPress={handleSubmit}
          label={bannerText}
        />
      )}
    </SafeAreaPage>
  );
};
export const Payment = connect(OnboardingPaymentMapStateToProps, OnboardingPaymentMapDispatchToProps)(PaymentComponent);
