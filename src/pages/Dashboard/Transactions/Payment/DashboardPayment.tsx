import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, Loading, SafeAreaPage, SelectionBanner } from "../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { ERRORS } from "../../../../data/dictionary";
import { S3UrlGenerator, StorageUtil } from "../../../../integrations";
import { getPaymentRequired, submitProofOfPayments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  centerVertical,
  flexChild,
  flexRow,
  fs12RegGray6,
  fs16BoldGray6,
  fs16RegGray6,
  px,
  sh112,
  sh24,
  shadow50Black115,
  sw24,
  sw4,
} from "../../../../styles";
import { PaymentOrder, PaymentPopup } from "../../../../templates";
import { AlertDialog, formatAmount, parseAmountToString } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";

const { DASHBOARD_PAYMENT, PAYMENT } = Language.PAGE;

interface DashboardPaymentProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const DashboardPaymentComponent: FunctionComponent<DashboardPaymentProps> = (props: DashboardPaymentProps) => {
  const fetching = useRef<boolean>(false);
  const { currentOrder, navigation, setScreen, updateCurrentOrder } = props;
  const [paymentOrder, setPaymentOrder] = useState<IPaymentOrderState | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeOrder, setActiveOrder] = useState<string>("");
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);
  const [viewFund, setViewFund] = useState<string>("");

  const handleBack = () => {
    updateCurrentOrder(undefined);
    setScreen("Transactions");
  };

  const handleFetch = async () => {
    const request: IGetPaymentRequiredRequest = { orderNumber: currentOrder!.orderNumber };
    const response: IGetPaymentRequiredResponse = await getPaymentRequired(request, navigation, setLoading);
    if (response !== undefined) {
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
          totalPaidAmount:
            currentOrder!.status === "BR - Rerouted" || currentOrder!.status === "HQ - Rerouted" || data.result.totalPaidAmount === null
              ? []
              : data.result.totalPaidAmount,
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
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const paymentWithKeys = await Promise.all(
        paymentOrder!.payments.map(async (paymentInfo: IPaymentState, index: number) => {
          try {
            let proofWithUrl: FileBase64 | undefined;
            if (paymentOrder!.paymentType === "Cash") {
              const url = S3UrlGenerator.payment(
                currentOrder!.clientId,
                currentOrder!.orderNumber,
                paymentOrder!.paymentType,
                paymentInfo.paymentMethod!,
                paymentInfo.proof!.type,
              );
              const uploadedFile = await StorageUtil.put(paymentInfo.proof!.path!, url, paymentInfo.proof!.type);
              if (uploadedFile === undefined) {
                throw new Error();
              }
              proofWithUrl = { ...paymentInfo.proof!, url: uploadedFile.key ? uploadedFile.key : undefined, base64: undefined };
            }

            const updatedPaymentInfo = { ...paymentInfo };
            delete updatedPaymentInfo.combinedBankAccountName;
            const temporaryReference =
              updatedPaymentInfo.paymentMethod === "Online Banking / TT / ATM" ||
              updatedPaymentInfo.paymentMethod === "Client Trust Account (CTA)"
                ? `${paymentOrder!.orderNumber}${index}${moment().format("x")}`
                : undefined;

            return {
              ...updatedPaymentInfo,
              referenceNumber: temporaryReference, // TODO temporary
              amount: paymentOrder!.paymentType === "Recurring" ? undefined : parseAmountToString(paymentInfo.amount!),
              bankAccountName:
                paymentInfo.combinedBankAccountName !== undefined && paymentInfo.combinedBankAccountName !== ""
                  ? paymentInfo.combinedBankAccountName
                  : paymentInfo.bankAccountName,
              currency: paymentOrder!.paymentType === "Recurring" ? "MYR" : paymentInfo.currency!,
              transactionDate: paymentOrder!.paymentType === "EPF" ? undefined : moment(paymentInfo.transactionDate).valueOf(),
              transactionTime: paymentInfo.transactionTime !== undefined ? moment(paymentInfo.transactionTime).valueOf() : undefined,
              proof: proofWithUrl,
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            // eslint-disable-next-line no-console
            console.log("Error in Uploading", error);
            return ERRORS.storage;
          }
        }),
      );

      if (paymentWithKeys === undefined || paymentWithKeys.some((pay) => "errorCode" in pay)) {
        AlertDialog(ERRORS.storage.message, () => setLoading(false));
        fetching.current = false;
        return undefined;
      }
      // this should cause an issue since we are already returning undefined to cancel the function when there is an error in paymentWithKeys
      const payment: ISubmitProofOfPayment[] =
        paymentWithKeys.some((pay) => "errorCode" in pay) === false
          ? (paymentWithKeys.filter((value) => value.saved === true) as ISubmitProofOfPayment[])
          : [];

      const paymentOrders: ISubmitProofOfPaymentOrder[] = [
        { orderNumber: paymentOrder!.orderNumber, paymentType: paymentOrder!.paymentType, payments: payment },
      ];
      const request = { orders: paymentOrders };
      const paymentResponse: ISubmitProofOfPaymentsResponse = await submitProofOfPayments(request, navigation, setLoading);
      fetching.current = false;

      if (paymentResponse !== undefined) {
        const { data, error } = paymentResponse;
        if (error === null && data !== null) {
          setPaymentResult(data.result);
        }
        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          AlertDialog(error.message, () => setLoading(false), errorList);
        }
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
                <View style={{ ...px(sw24), ...shadow50Black115 }}>
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
              <Loading />
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
                          <Text style={{ ...fs16RegGray6, ...px(sw4) }}>+</Text>
                        ) : (
                          <Text style={fs16RegGray6}>{`${PAYMENT.LABEL_GRAND_TOTAL} `}</Text>
                        )}
                        <Text style={fs16RegGray6}>{totalAmount.currency}</Text>
                        <CustomSpacer isHorizontal={true} space={sw4} />
                        <Text style={fs16BoldGray6}>{formatAmount(totalAmount.amount)}</Text>
                      </View>
                    );
                  })}
              </View>
              {floatingLabel !== "" ? <Text style={fs12RegGray6}>{`${PAYMENT.LABEL_SURPLUS}: ${floatingLabel}`}</Text> : null}
            </View>
          }
          continueDebounce={false}
          continueDisabled={submitDisabled}
          labelSubmit={PAYMENT.BUTTON_SUBMIT}
          submitOnPress={handleSubmit}
          label={bannerText}
        />
      )}
      <PaymentPopup handleDone={handleBack} loading={loading} result={paymentResult} />
    </Fragment>
  );
};

export const DashboardPayment = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(DashboardPaymentComponent);
