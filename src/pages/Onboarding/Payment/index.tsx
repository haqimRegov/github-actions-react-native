import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { BlurView, CustomSpacer, LabeledTitle, SafeAreaPage, SelectionBanner } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { submitProofOfPayments } from "../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import {
  borderBottomGray2,
  flexChild,
  flexGrow,
  fs16SemiBoldGray6,
  fs24BoldGray6,
  px,
  py,
  sh112,
  sh24,
  sh32,
  sh8,
  shadow50Black115,
  sw24,
} from "../../../styles";
import { OrderPayment, PaymentPopup } from "../../../templates";
import { calculateBalances, checkCurrencyCompleted, generatePaymentWithKeys } from "../../../templates/Payment/helpers";
import { PaymentBannerContent } from "../../../templates/Payment/PaymentBanner";
import { parseAmount } from "../../../utils";

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
  personalInfo,
}: PaymentProps) => {
  const [proofOfPayments, setProofOfPayments] = useState<IPaymentRequired[] | undefined>(undefined);
  const [tempDeletedPayment, setTempDeletedPayment] = useState<IPaymentInfo[]>([]);
  const [applicationBalance, setApplicationBalance] = useState<IPaymentInfo[]>([]);
  const [grandTotal, setGrandTotal] = useState<IGrandTotal | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);

  const [activeOrder, setActiveOrder] = useState<{ order: string; fund: string }>({ order: "", fund: "" });
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);

  const handleFetch = async () => {
    if (orders !== undefined) {
      // console.log("orders", JSON.stringify(orders));
      const result: IPaymentRequired[] = orders.orders.map((order: IOrder) => {
        const state: IPaymentRequired = {
          allowedRecurringType: order.allowedRecurringType || [],
          createdOn: moment(order.orderDate, DEFAULT_DATE_FORMAT).format("x"),
          ctaDetails: [],
          epfAccountNumber: order.paymentType === "EPF" ? personalInfo.principal!.epfDetails!.epfMemberNumber! : null,
          funds: order.investments,
          orderNumber: order.orderNumber,
          paymentCount: 0,
          payments: [],
          paymentType: order.paymentType,
          recurringDetails: undefined,
          status: "Pending Payment",
          surplusBalance: [],
          totalInvestment: order.orderTotalAmount,
          totalPaidAmount: [],
        };

        return state;
      });
      setProofOfPayments(result);
      setGrandTotal({ grandTotal: orders.grandTotal, grandTotalRecurring: orders.grandTotalRecurring! });
    }
  };

  // console.log("proof", proofOfPayments);
  const handleSubmit = async (confirmed?: boolean) => {
    try {
      setLoading(true);
      const paymentOrders = await Promise.all(
        proofOfPayments!.map(async ({ orderNumber, paymentType, payments }: IPaymentRequired) => {
          const payment = await generatePaymentWithKeys(
            payments,
            paymentType,
            orderNumber,
            details!.principalHolder!.clientId!,
            "Onboarding",
          );

          return { orderNumber: orderNumber, paymentType: paymentType, payments: payment };
        }),
      );

      const request = { orders: paymentOrders, isConfirmed: confirmed === true };
      const paymentResponse: ISubmitProofOfPaymentsResponse = await submitProofOfPayments(request, navigation, setLoading);
      if (paymentResponse !== undefined) {
        const { data, error } = paymentResponse;
        if (error === null && data !== null) {
          setPaymentResult(data.result);
        }
        if (error !== null) {
          throw error;
        }
      }
    } catch (error: any) {
      // console.log("Error in handleSubmit", error);
      setLoading(false);
      if ("errorCode" in error) {
        Alert.alert(error.message);
      }
    } finally {
      // console.log("finally");
      if (paymentResult === undefined) {
        // console.log("paymentResult undefined", paymentResult);
      }
    }
    return undefined;
  };

  const handleCancelPopup = () => {
    setPaymentResult(undefined);
    setLoading(false);
  };

  const handleConfirmPopup = async () => {
    if (confirmPayment === true) {
      return handleResetOnboarding();
    }

    const response = await handleSubmit(true);
    if (response === undefined) {
      setConfirmPayment(true);
      return true;
    }

    return undefined;
  };

  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];

  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: PAYMENT.OPTION_COMBINED, value: PAYMENT.OPTION_COMBINED },
    );
  }

  const pendingLength =
    proofOfPayments !== undefined && proofOfPayments.length > 0
      ? [...proofOfPayments!].filter((eachPayment: IPaymentRequired) => eachPayment.status !== "Completed").length
      : 0;
  const completedLength =
    proofOfPayments !== undefined && proofOfPayments.length > 0
      ? proofOfPayments.filter((eachPayment: IPaymentRequired) => eachPayment.status === "Completed").length
      : 0;
  const pendingText =
    proofOfPayments !== undefined && pendingLength === proofOfPayments.length
      ? `All (${proofOfPayments.length}) pending`
      : `${pendingLength} pending, `;
  const completedText =
    proofOfPayments !== undefined && completedLength === proofOfPayments.length
      ? `All (${proofOfPayments.length}) completed`
      : `${completedLength} completed`;
  const bannerText = `${PAYMENT.LABEL_PENDING_SUMMARY}: ${pendingLength > 0 ? pendingText : ""}${completedLength > 0 ? completedText : ""}`;
  // To show the available balance and also the excess
  const balancePayments: IOrderAmount[] = proofOfPayments !== undefined ? calculateBalances(proofOfPayments) : [];
  const checkAllCompleted =
    proofOfPayments !== undefined
      ? proofOfPayments.filter(
          (eachPOPCheck: IPaymentRequired) =>
            eachPOPCheck.status === "Completed" || eachPOPCheck.paymentType !== "Cash" || checkCurrencyCompleted(eachPOPCheck, "MYR"),
        )
      : [];
  const updatedBalancePayments =
    proofOfPayments !== undefined
      ? balancePayments.filter(
          (eachBalance: IOrderAmount) =>
            eachBalance.currency === "MYR" && checkAllCompleted.length !== proofOfPayments?.length && parseAmount(eachBalance.amount) !== 0,
        )
      : [];
  const completedCurrencies =
    proofOfPayments !== undefined
      ? balancePayments.filter(
          (eachSurplus: IOrderAmount) =>
            (eachSurplus.currency !== "MYR" || checkAllCompleted.length === proofOfPayments.length) &&
            parseAmount(eachSurplus.amount) !== 0,
        )
      : [];

  const continueDisabled =
    proofOfPayments !== undefined &&
    proofOfPayments!.map((pop) => pop.payments.some((findPayment) => findPayment.saved === true)).includes(true) === false;

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {proofOfPayments !== undefined &&
              proofOfPayments.map((proofOfPayment: IPaymentRequired, index: number) => {
                const setProofOfPayment = (value: IPaymentRequired, action?: ISetProofOfPaymentAction) => {
                  let updatedProofOfPayments: IPaymentRequired[] = [...proofOfPayments];
                  updatedProofOfPayments[index] = { ...updatedProofOfPayments[index], ...value };
                  if (action !== undefined && action.paymentId !== undefined) {
                    const updatedPOP = updatedProofOfPayments.map((eachOrder) => {
                      const filteredPayments = eachOrder.payments.filter((eachPOP) => {
                        const deleteCondition =
                          (eachPOP.tag === undefined && eachPOP.parent !== action.paymentId) ||
                          (eachPOP.tag !== undefined && eachPOP.tag.uuid !== action.paymentId);
                        const updateCondition =
                          (eachPOP.tag === undefined && eachPOP.parent === action.paymentId) ||
                          (eachPOP.tag === undefined && eachPOP.paymentId !== action.paymentId) ||
                          (eachPOP.tag !== undefined && eachPOP.tag.uuid !== action.paymentId);

                        return action.option === "delete" ? deleteCondition : updateCondition;
                      });

                      return {
                        ...eachOrder,
                        status: filteredPayments.length === 0 ? "Pending Payment" : eachOrder.status,
                        payments: filteredPayments,
                      };
                    });
                    updatedProofOfPayments = [...updatedPOP];
                  }
                  setProofOfPayments(updatedProofOfPayments);
                };

                return (
                  <Fragment key={index}>
                    {index === 0 ? null : (
                      <Fragment>
                        <View style={borderBottomGray2} />
                      </Fragment>
                    )}
                    <BlurView visible={activeOrder.order === "" || activeOrder.order === proofOfPayment.orderNumber}>
                      <CustomSpacer space={sh24} />
                      <View style={{ ...px(sw24), ...shadow50Black115 }}>
                        <OrderPayment
                          accountNames={accountNames}
                          activeOrder={activeOrder}
                          deletedPayment={tempDeletedPayment}
                          proofOfPayment={proofOfPayment}
                          setActiveOrder={setActiveOrder}
                          setDeletedPayment={setTempDeletedPayment}
                          setProofOfPayment={setProofOfPayment}
                          applicationBalance={applicationBalance}
                          setApplicationBalance={setApplicationBalance}
                        />
                      </View>
                      <CustomSpacer space={sh24} />
                    </BlurView>
                  </Fragment>
                );
              })}
            {activeOrder.order !== "" ? null : <CustomSpacer space={sh112} />}
          </View>
        </ScrollView>
        {activeOrder.order !== "" ? null : (
          <SelectionBanner
            bottomContent={
              proofOfPayments !== undefined ? (
                <PaymentBannerContent
                  balancePayments={updatedBalancePayments}
                  excessPayments={completedCurrencies}
                  grandTotal={grandTotal!.grandTotal}
                  grandTotalRecurring={grandTotal?.grandTotalRecurring}
                  paymentType={"Cash"}
                />
              ) : null
            }
            containerStyle={py(sh24)}
            continueDisabled={continueDisabled}
            labelSubmit={PAYMENT.BUTTON_SUBMIT}
            submitOnPress={handleSubmit}
            label={bannerText}
          />
        )}
      </View>
      <PaymentPopup
        handleCancel={handleCancelPopup}
        handleConfirm={handleConfirmPopup}
        loading={loading}
        result={paymentResult}
        withExcess={completedCurrencies.length > 0}
      />
    </SafeAreaPage>
  );
};
export const Payment = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PaymentComponent);
