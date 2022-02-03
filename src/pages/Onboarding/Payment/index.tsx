import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { BlurView, CustomSpacer, CustomToast, LabeledTitle, SafeAreaPage, SelectionBanner } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { useDelete } from "../../../hooks";
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

const { PAYMENT, TOAST } = Language.PAGE;
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
  const checkProofOfPayments = proofOfPayments !== undefined ? [...proofOfPayments] : [];
  const [deleteCount, setDeleteCount, tempData, setTempData] = useDelete<IPaymentRequired[]>(checkProofOfPayments, setProofOfPayments);

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
      setTempData(result);
      setGrandTotal({ grandTotal: orders.grandTotal, grandTotalRecurring: orders.grandTotalRecurring! });
    }
  };

  const handleSubmit = async (confirmed?: boolean) => {
    try {
      setLoading(true);
      const paymentOrders = await Promise.all(
        tempData!.map(async ({ orderNumber, paymentType, payments }: IPaymentRequired) => {
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

  const handleUndoDelete = () => {
    if (proofOfPayments !== undefined) {
      setTempData(proofOfPayments);
      setApplicationBalance(applicationBalance);
      setTempDeletedPayment(tempDeletedPayment);
    }
  };

  const accountNames = [{ label: details!.principalHolder!.name!, value: details!.principalHolder!.name! }];

  if (accountType === "Joint") {
    accountNames.push(
      { label: details!.jointHolder!.name!, value: details!.jointHolder!.name! },
      { label: PAYMENT.OPTION_COMBINED, value: PAYMENT.OPTION_COMBINED },
    );
  }

  const pendingLength =
    tempData !== undefined && tempData.length > 0
      ? [...tempData!].filter((eachPayment: IPaymentRequired) => eachPayment.status !== "Completed").length
      : 0;
  const completedLength =
    tempData !== undefined && tempData.length > 0
      ? tempData.filter((eachPayment: IPaymentRequired) => eachPayment.status === "Completed").length
      : 0;
  const pendingText =
    tempData !== undefined && pendingLength === tempData.length ? `All (${tempData.length}) pending` : `${pendingLength} pending, `;
  const completedText =
    tempData !== undefined && completedLength === tempData.length ? `All (${tempData.length}) completed` : `${completedLength} completed`;
  const bannerText = `${PAYMENT.LABEL_PENDING_SUMMARY}: ${pendingLength > 0 ? pendingText : ""}${completedLength > 0 ? completedText : ""}`;
  // To show the available balance and also the excess
  const balancePayments: IOrderAmount[] = tempData !== undefined ? calculateBalances(tempData) : [];
  const checkAllCompleted =
    tempData !== undefined
      ? tempData.filter(
          (eachPOPCheck: IPaymentRequired) =>
            eachPOPCheck.status === "Completed" || eachPOPCheck.paymentType !== "Cash" || checkCurrencyCompleted(eachPOPCheck, "MYR"),
        )
      : [];
  const updatedBalancePayments =
    tempData !== undefined
      ? balancePayments.filter(
          (eachBalance: IOrderAmount) =>
            eachBalance.currency === "MYR" && checkAllCompleted.length !== tempData?.length && parseAmount(eachBalance.amount) !== 0,
        )
      : [];
  const completedCurrencies =
    tempData !== undefined
      ? balancePayments.filter(
          (eachSurplus: IOrderAmount) =>
            (eachSurplus.currency !== "MYR" || checkAllCompleted.length === tempData.length) && parseAmount(eachSurplus.amount) !== 0,
        )
      : [];

  const continueDisabled =
    tempData !== undefined &&
    tempData!.map((pop) => pop.payments.some((findPayment) => findPayment.saved === true)).includes(true) === false;

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
            {tempData !== undefined &&
              tempData.map((proofOfPayment: IPaymentRequired, index: number) => {
                const setProofOfPayment = (value: IPaymentRequired, action?: ISetProofOfPaymentAction, deleted?: boolean) => {
                  let updatedProofOfPayments: IPaymentRequired[] = [...tempData];
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
                  setTempData(updatedProofOfPayments);
                  if (deleted === false) {
                    setProofOfPayments(updatedProofOfPayments);
                  }
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
                          applicationBalance={applicationBalance}
                          deleteCount={deleteCount}
                          deletedPayment={tempDeletedPayment}
                          proofOfPayment={proofOfPayment}
                          setActiveOrder={setActiveOrder}
                          setApplicationBalance={setApplicationBalance}
                          setDeleteCount={setDeleteCount}
                          setDeletedPayment={setTempDeletedPayment}
                          setProofOfPayment={setProofOfPayment}
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
              tempData !== undefined && grandTotal !== undefined ? (
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
      <CustomToast
        count={deleteCount}
        deleteText={TOAST.LABEL_PAYMENT_INFO_DELETED}
        duration={5}
        isDeleteToast={true}
        onPress={handleUndoDelete}
        setCount={setDeleteCount}
      />
    </SafeAreaPage>
  );
};
export const Payment = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PaymentComponent);
