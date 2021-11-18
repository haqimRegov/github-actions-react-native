import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";

import { BlurView, CustomSpacer, LabeledTitle, SafeAreaPage, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { ERRORS } from "../../../data/dictionary";
import { S3UrlGenerator, StorageUtil } from "../../../integrations";
import { submitProofOfPayments } from "../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import {
  borderBottomGray2,
  centerVertical,
  flexChild,
  flexGrow,
  flexRow,
  fs12RegGray6,
  fs16BoldGray6,
  fs16RegGray6,
  fs16SemiBoldGray6,
  fs24BoldGray6,
  px,
  sh112,
  sh24,
  sh32,
  sh8,
  shadow50Black115,
  sw24,
  sw4,
} from "../../../styles";
import { PaymentOrder, PaymentPopup } from "../../../templates";
import { AlertDialog, formatAmount, parseAmountToString } from "../../../utils";

const { PAYMENT } = Language.PAGE;
interface PaymentProps extends AcknowledgementStoreProps, OnboardingContentProps {
  navigation: IStackNavigationProp;
}

const PaymentComponent: FunctionComponent<PaymentProps> = ({
  accountType,
  details,
  handleResetOnboarding,
  navigation,
  orders,
  paymentSummary,
  personalInfo,
  updatePaymentSummary,
}: PaymentProps) => {
  const fetching = useRef<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<string>("");
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);
  const [viewFund, setViewFund] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);

      const paymentOrders = await Promise.all(
        paymentSummary!.orders.map(async ({ orderNumber, paymentType, payments }: IPaymentOrderState) => {
          const paymentWithKeys = await Promise.all(
            payments.map(async (paymentInfo: IPaymentState, index: number) => {
              try {
                let proofWithUrl: FileBase64 | undefined;
                if (paymentType === "Cash") {
                  const url = S3UrlGenerator.payment(
                    details!.principalHolder!.clientId!,
                    orderNumber,
                    paymentType,
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
                    ? `${orderNumber}${index}${moment().format("x")}`
                    : undefined;

                return {
                  ...updatedPaymentInfo,
                  referenceNumber: temporaryReference, // TODO temporary
                  amount: paymentType === "Recurring" ? undefined : parseAmountToString(paymentInfo.amount!),
                  bankAccountName:
                    paymentInfo.combinedBankAccountName !== undefined && paymentInfo.combinedBankAccountName !== ""
                      ? paymentInfo.combinedBankAccountName
                      : paymentInfo.bankAccountName,
                  currency: paymentType === "Recurring" ? "MYR" : paymentInfo.currency!,
                  transactionDate: paymentType === "EPF" ? undefined : moment(paymentInfo.transactionDate).valueOf(),
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

          return { orderNumber: orderNumber, paymentType: paymentType, payments: payment };
        }),
      );

      if (paymentOrders.includes(undefined) === false) {
        const request = { orders: paymentOrders } as ISubmitProofOfPaymentsRequest;
        fetching.current = false;

        const paymentResponse: ISubmitProofOfPaymentsResponse = await submitProofOfPayments(request, navigation, undefined, setLoading);
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
    }
    return undefined;
  };

  const completedOrders: IPaymentOrderState[] =
    paymentSummary !== undefined ? paymentSummary.orders.filter((order) => order.completed === true) : [];

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
          .map(({ amount, currency }) => `${currency} ${formatAmount(amount)}`)
          .join(", ")
      : "";

  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];

  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: PAYMENT.OPTION_COMBINED, value: PAYMENT.OPTION_COMBINED },
    );
  }

  useEffect(() => {
    if (paymentSummary === undefined && orders !== undefined) {
      const newOrders: IPaymentOrderState[] = orders.orders.map((order: IOrder) => {
        return {
          ...order,
          payments: [],

          completed: false,
          floatingAmount: [],
        };
      });
      updatePaymentSummary({ grandTotal: orders.grandTotal, orders: newOrders });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findSavedPayment = paymentSummary !== undefined ? paymentSummary.orders.map((order) => order.payments).flat() : [];
  const continueDisabled = findSavedPayment.findIndex((payment) => payment.saved === true) === -1;

  return (
    <SafeAreaPage>
      <View style={flexChild}>
        <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={flexChild}>
            <CustomSpacer space={sh32} />
            <View style={px(sw24)}>
              <LabeledTitle
                label={PAYMENT.HEADING}
                labelStyle={fs24BoldGray6}
                spaceToLabel={sh8}
                title={PAYMENT.SUBHEADING}
                titleStyle={fs16SemiBoldGray6}
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
                    {index === 0 ? null : (
                      <Fragment>
                        <View style={borderBottomGray2} />
                      </Fragment>
                    )}
                    <BlurView visible={activeOrder === "" || activeOrder === order.orderNumber}>
                      <CustomSpacer space={sh24} />
                      <View style={{ ...px(sw24), ...shadow50Black115 }}>
                        <PaymentOrder
                          accountNames={accountNames}
                          activeOrder={activeOrder}
                          epfAccountNumber={personalInfo.principal!.epfDetails!.epfMemberNumber}
                          paymentOrder={order}
                          setActiveOrder={setActiveOrder}
                          setPaymentOrder={setPaymentOrder}
                          setViewFund={setViewFund}
                          viewFund={viewFund}
                        />
                      </View>
                      <CustomSpacer space={sh24} />
                    </BlurView>
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
            continueDisabled={continueDisabled}
            labelSubmit={PAYMENT.BUTTON_SUBMIT}
            submitOnPress={handleSubmit}
            label={bannerText}
          />
        )}
      </View>
      <PaymentPopup handleDone={handleResetOnboarding} loading={loading} result={paymentResult} />
    </SafeAreaPage>
  );
};
export const Payment = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PaymentComponent);
