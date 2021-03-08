import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, SafeAreaPage, SelectionBanner } from "../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { getPaymentRequired, submitProofOfPayments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  centerHV,
  centerVertical,
  colorGray,
  flexChild,
  flexRow,
  fs12RegBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  px,
  sh112,
  sh24,
  shadow5,
  sw24,
  sw4,
} from "../../../../styles";
import { PaymentOrder, PaymentStatus } from "../../../../templates";
import { AlertDialog, formatAmount, parseAmountToString } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";

const { DASHBOARD_PAYMENT, PAYMENT } = Language.PAGE;

interface DashboardPaymentProps extends TransactionsStoreProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  setScreen: (route: TransactionsPageType) => void;
}

const DashboardPaymentComponent: FunctionComponent<DashboardPaymentProps> = (props: DashboardPaymentProps) => {
  const { setLoading, setScreen, currentOrder, updateCurrentOrder } = props;
  const [paymentOrder, setPaymentOrder] = useState<IPaymentOrderState | undefined>(undefined);
  // const [successMessage, setSuccessMessage] = useState<string>("");

  const [activeOrder, setActiveOrder] = useState<string>("");
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);
  const [viewFund, setViewFund] = useState<string>("");

  const handleBack = () => {
    updateCurrentOrder(undefined);
    setScreen("Transactions");
  };

  const handleFetch = async () => {
    const req: IGetPaymentRequiredRequest = {
      orderNumber: currentOrder!.orderNumber,
    };
    // eslint-disable-next-line no-console
    console.log("getPaymentRequired", req);
    const response: IGetPaymentRequiredResponse = await getPaymentRequired(req);
    if (response !== undefined) {
      // eslint-disable-next-line no-console
      console.log("response", response);
      const { data, error } = response;
      if (error === null && data !== null) {
        const newOrders: IPaymentOrderState = {
          investments: data.result.funds,
          paymentType: data.result.paymentType as TypePaymentType,
          orderDate: moment(data.result.createdOn, "x").format(DEFAULT_DATE_FORMAT),
          orderNumber: data.result.orderNumber,
          orderTotalAmount: data.result.totalInvestment,
          epfAccountNumber: data.result.epfAccountNumber,
          allowedRecurringType: data.result.allowedRecurringType,
          payments: [],

          completed: false,
          floatingAmount: [],
          totalPaidAmount: data.result.totalPaidAmount,
          paymentCount: data.result.paymentCount,
        };
        setPaymentOrder(newOrders);
        setPaymentResult(undefined);
      }
      if (error !== null) {
        setTimeout(() => {
          AlertDialog(error.message, handleBack);
        }, 100);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payment: ISubmitProofOfPayment[] = paymentOrder!.payments
      .map((paymentInfo: IPaymentState) => {
        const updatedPaymentInfo = { ...paymentInfo };
        delete updatedPaymentInfo.combinedBankAccountName;

        return {
          ...updatedPaymentInfo,
          amount: paymentOrder!.paymentType === "Recurring" ? undefined : parseAmountToString(paymentInfo.amount!),
          bankAccountName:
            paymentInfo.combinedBankAccountName !== undefined && paymentInfo.combinedBankAccountName !== ""
              ? paymentInfo.combinedBankAccountName
              : paymentInfo.bankAccountName,
          currency: paymentOrder!.paymentType === "Recurring" ? "MYR" : paymentInfo.currency!,
          transactionDate: paymentOrder!.paymentType === "EPF" ? undefined : moment(paymentInfo.transactionDate).valueOf(),
          transactionTime: paymentInfo.transactionTime !== undefined ? moment(paymentInfo.transactionTime).valueOf() : undefined,
        };
      })
      .filter((value) => value.saved === true);
    const paymentOrders: ISubmitProofOfPaymentOrder[] = [
      { orderNumber: paymentOrder!.orderNumber, paymentType: paymentOrder!.paymentType, payments: payment },
    ];
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
        setTimeout(() => {
          setPaymentResult(data.result);
        }, 150);
        // setErrorMessage(undefined);
        // return data.result.message === "NTB" ? setClientType("NTB") : Alert.alert("Client is ETB");
      }
      if (error !== null) {
        const errorList = error.errorList?.join("\n");
        setTimeout(() => {
          Alert.alert(error.message, errorList);
        }, 100);
      }
    }
    return undefined;
  };

  const orderCompleted: boolean = paymentOrder !== undefined && paymentOrder.completed === true;
  const submitDisabled = paymentOrder !== undefined ? paymentOrder.payments.findIndex((payment) => payment.saved === true) === -1 : false;
  const bannerText = orderCompleted === true ? PAYMENT.LABEL_PAYMENT_COMPLETED : PAYMENT.LABEL_PAYMENT_PENDING;

  const withFloatingAmount =
    paymentOrder !== undefined &&
    paymentOrder.floatingAmount !== undefined &&
    paymentOrder.floatingAmount.length > 0 &&
    paymentOrder.paymentType === "Cash"
      ? [paymentOrder]
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
          .map(({ amount, currency }) => `${currency} ${formatAmount(amount)}`)
          .join(", ")
      : "";

  const accountNames = [{ label: currentOrder!.investorName.principal, value: currentOrder!.investorName.principal }];

  if (currentOrder!.accountType === "Joint") {
    accountNames.push(
      { label: currentOrder!.investorName.joint!, value: currentOrder!.investorName.joint! },
      { label: PAYMENT.OPTION_COMBINED, value: PAYMENT.OPTION_COMBINED },
    );
  }

  const updatePaymentOrder = (payment: IPaymentOrderState) => {
    setPaymentOrder({ ...paymentOrder, ...payment });
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
        title={DASHBOARD_PAYMENT.HEADING}
        titleIcon="arrow-left"
        titleIconOnPress={handleBack}>
        <SafeAreaPage>
          <View style={flexChild}>
            {paymentOrder !== undefined ? (
              <View>
                <CustomSpacer space={sh24} />
                <View style={{ ...px(sw24), ...shadow5 }}>
                  <PaymentOrder
                    accountNames={accountNames}
                    activeOrder={activeOrder}
                    epfAccountNumber={paymentOrder.epfAccountNumber}
                    orderCreationDate={moment(paymentOrder.orderDate, DEFAULT_DATE_FORMAT).toDate()}
                    paymentOrder={paymentOrder}
                    setActiveOrder={setActiveOrder}
                    setPaymentOrder={updatePaymentOrder}
                    setViewFund={setViewFund}
                    viewFund={viewFund}
                  />
                </View>
                <CustomSpacer space={sh24} />
              </View>
            ) : (
              <View style={{ ...centerHV, ...flexChild }}>
                <ActivityIndicator color={colorGray._7} size="small" />
              </View>
            )}
            {activeOrder !== "" ? null : <CustomSpacer space={sh112} />}
          </View>
        </SafeAreaPage>
      </DashboardLayout>
      {activeOrder !== "" || paymentOrder === undefined ? null : (
        <SelectionBanner
          bottomContent={
            <View>
              <View style={{ ...centerVertical, ...flexRow }}>
                {paymentOrder !== undefined &&
                  paymentOrder.orderTotalAmount.map((totalAmount: IOrderAmount, index: number) => {
                    return (
                      <View key={index} style={{ ...centerVertical, ...flexRow }}>
                        {index !== 0 ? (
                          <Text style={{ ...fs16RegBlack2, ...px(sw4) }}>+</Text>
                        ) : (
                          <Text style={fs16RegBlack2}>{`${PAYMENT.LABEL_GRAND_TOTAL} `}</Text>
                        )}
                        <Text style={fs16RegBlack2}>{totalAmount.currency}</Text>
                        <CustomSpacer isHorizontal={true} space={sw4} />
                        <Text style={fs16BoldBlack2}>{formatAmount(totalAmount.amount)}</Text>
                      </View>
                    );
                  })}
              </View>
              {floatingLabel !== "" ? <Text style={fs12RegBlack2}>{`${PAYMENT.LABEL_SURPLUS}: ${floatingLabel}`}</Text> : null}
            </View>
          }
          continueDebounce={true}
          continueDisabled={submitDisabled}
          labelSubmit={PAYMENT.BUTTON_SUBMIT}
          submitOnPress={handleSubmit}
          label={bannerText}
        />
      )}
      <PaymentStatus handleDone={handleBack} result={paymentResult} />
    </Fragment>
  );
};

export const DashboardPayment = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(DashboardPaymentComponent);
