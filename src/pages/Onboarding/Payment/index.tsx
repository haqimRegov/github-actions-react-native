import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";

import { BlurView, CustomSpacer, LabeledTitle, SafeAreaPage, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { submitProofOfPayments } from "../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import {
  borderBottomBlack21,
  centerVertical,
  flexChild,
  flexGrow,
  flexRow,
  fs12RegBlack2,
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
  sw4,
} from "../../../styles";
import { PaymentOrder } from "./PaymentOrder";
import { PaymentStatus } from "./PaymentStatus";

const { PAYMENT } = Language.PAGE;
interface PaymentProps extends AcknowledgementStoreProps, OnboardingContentProps {}

const PaymentComponent: FunctionComponent<PaymentProps> = ({
  accountType,
  details,
  orders,
  handleResetOnboarding,
  paymentSummary,
  setLoading,
  updatePaymentSummary,
}: PaymentProps) => {
  const [activeOrder, setActiveOrder] = useState<string>("");
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);

  const [viewFund, setViewFund] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    const paymentOrders: ISubmitProofOfPaymentOrder[] = paymentSummary!.orders.map(
      ({ orderNumber, paymentType, payments }: IPaymentOrderState) => {
        const payment: ISubmitProofOfPayment[] = payments
          .map((paymentInfo: IPaymentState) => {
            return {
              ...paymentInfo,
              transactionDate: paymentType === "EPF" ? undefined : moment(paymentInfo.transactionDate).valueOf(),
              transactionTime: paymentInfo.transactionTime !== undefined ? moment(paymentInfo.transactionTime).valueOf() : undefined,
            };
          })
          .filter((value) => value.saved === true);
        return { orderNumber: orderNumber, paymentType: paymentType, payments: payment };
      },
    );
    const request = { orders: paymentOrders };
    // eslint-disable-next-line no-console
    console.log("submitProofOfPayments request", request);
    const paymentResponse: ISubmitProofOfPaymentsResponse = await submitProofOfPayments(request);
    // eslint-disable-next-line no-console
    console.log("submitProofOfPayments", paymentResponse);
    setLoading(false);
    if (paymentResponse !== undefined) {
      const { data, error } = paymentResponse;
      if (error === null && data !== null) {
        setPaymentResult(data.result);
        // setErrorMessage(undefined);
        // return data.result.message === "NTB" ? setClientType("NTB") : Alert.alert("Client is ETB");
      }
      if (error !== null) {
        Alert.alert(error.message);
      }
    }
    return undefined;
  };

  const completedOrders: IPaymentOrderState[] =
    paymentSummary !== undefined ? paymentSummary!.orders.filter((order) => order.completed === true) : [];

  const completedText = `${completedOrders.length} ${PAYMENT.LABEL_COMPLETED}`;
  const pendingCount = paymentSummary !== undefined ? paymentSummary.orders.length - completedOrders.length : 0;
  const pendingText = `${pendingCount} ${PAYMENT.LABEL_PENDING_PAYMENT}`;
  const completedBannerText = pendingCount === 0 ? `${completedText}` : `${pendingText}, ${completedText}`;
  const bannerText = completedOrders.length === 0 ? `${pendingText}` : completedBannerText;

  const withFloatingAmount =
    paymentSummary !== undefined
      ? paymentSummary.orders.filter(
          (order) => order.floatingAmount !== undefined && order.floatingAmount.length > 0 && order.paymentType === "Cash",
        )
      : [];

  const floatingTotalAmount = withFloatingAmount.map(({ floatingAmount }) => floatingAmount!).flat(1);
  const floatingLabel =
    floatingTotalAmount.length > 0
      ? floatingTotalAmount
          .reduce((accumulator: IFloatingAmount[], current: IFloatingAmount) => {
            const currencyIndex = accumulator.findIndex((value: IFloatingAmount) => value.currency === current.currency);
            if (currencyIndex === -1) {
              accumulator.push(current);
            } else {
              accumulator[currencyIndex].amount += current.amount;
            }
            return accumulator;
          }, [])
          .filter(({ amount }) => amount > 0)
          .map(({ amount, currency }) => `${currency} ${amount}`)
          .join(", ")
      : "";

  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];

  if (accountType === "Joint") {
    accountNames.push({ label: details!.jointHolder!.name!, value: details!.jointHolder!.name! });
  }

  useEffect(() => {
    if (paymentSummary === undefined && orders !== undefined) {
      const newOrders: IPaymentOrderState[] = orders!.orders.map((order: IOrder) => {
        return {
          ...order,
          payments: [],

          completed: false,
          floatingAmount: [],
        };
      });
      updatePaymentSummary({ grandTotal: orders!.grandTotal, orders: newOrders });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={flexChild}>
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <LabeledTitle
              label={PAYMENT.HEADING}
              labelStyle={fs24BoldBlack2}
              spaceToLabel={sh8}
              title={PAYMENT.SUBHEADING}
              titleStyle={fs16SemiBoldBlack2}
            />
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
                        accountNames={accountNames}
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
            <View>
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
              {floatingLabel !== "" ? <Text style={fs12RegBlack2}>{`${PAYMENT.LABEL_SURPLUS}: ${floatingLabel}`}</Text> : null}
            </View>
          }
          labelSubmit={PAYMENT.BUTTON_SUBMIT}
          submitOnPress={handleSubmit}
          label={bannerText}
        />
      )}
      <PaymentStatus handleResetOnboarding={handleResetOnboarding} result={paymentResult} setPaymentResult={setPaymentResult} />
    </SafeAreaPage>
  );
};
export const Payment = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PaymentComponent);
