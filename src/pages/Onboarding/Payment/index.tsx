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
import { OrderPayment } from "../../../templates";
import { calculateExcess, checkCurrencyCompleted, generatePaymentWithKeys, handleEPFStructuring } from "../../../templates/Payment/helpers";
import { NewPaymentPrompt } from "../../../templates/Payment/NewPaymentPrompt";
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
  const [applicationBalance, setApplicationBalance] = useState<IPaymentInfo[]>([]);
  const [tempDeletedPayment, setTempDeletedPayment] = useState<IPaymentInfo[]>([]);
  const [tempApplicationBalance, setTempApplicationBalance] = useState<IPaymentInfo[]>(applicationBalance);
  const [grandTotal, setGrandTotal] = useState<IGrandTotal | undefined>(undefined);
  const [localRecurringDetails, setLocalRecurringDetails] = useState<IRecurringDetails | undefined>(undefined);
  const [localCtaDetails, setLocalCtaDetails] = useState<TypeCTADetails[]>([]);

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [promptType, setPromptType] = useState<"summary" | "success">("summary");

  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [savedChangesToast, setSavedChangesToast] = useState<boolean>(false);

  const [activeOrder, setActiveOrder] = useState<{ order: string; fund: string }>({ order: "", fund: "" });
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);
  const checkProofOfPayments = proofOfPayments !== undefined ? [...proofOfPayments] : [];
  const [deleteCount, setDeleteCount, tempData, setTempData] = useDelete<IPaymentRequired[]>(checkProofOfPayments, setProofOfPayments);

  const handleFetch = async () => {
    if (orders !== undefined) {
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
      if (confirmed === undefined) {
        setShowPopup(true);
      } else {
        setButtonLoading(true);
      }
      const updatedPayments: IPaymentRequired[] = [];
      if (tempData !== undefined) {
        tempData.forEach((eachOrder) => {
          const structuredPayments: IPaymentInfo[] = handleEPFStructuring(eachOrder.payments);
          updatedPayments.push({ ...eachOrder, payments: structuredPayments });
        });
      }
      const paymentOrders = await Promise.all(
        updatedPayments.map(async ({ orderNumber, paymentType, payments }: IPaymentRequired) => {
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
      const paymentResponse: ISubmitProofOfPaymentsResponse = await submitProofOfPayments(
        request,
        navigation,
        confirmed === true ? setButtonLoading : setShowPopup,
      );
      if (confirmed === true) {
        setButtonLoading(false);
      }
      if (paymentResponse !== undefined) {
        const { data, error } = paymentResponse;
        if (error === null && data !== null) {
          if (confirmed === true) {
            setPromptType("success");
          } else {
            setPaymentResult(data.result);
          }
        }
        if (error !== null) {
          throw error;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (confirmed === undefined) {
        setShowPopup(false);
      } else {
        setButtonLoading(false);
      }
      if ("errorCode" in error) {
        Alert.alert(error.message);
      }
    }
    return undefined;
  };

  const handleCancelPopup = () => {
    setPaymentResult(undefined);
    setShowPopup(false);
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

  const handleApplicationBalance = (currentData: IPaymentInfo[], deleted?: boolean) => {
    if (deleted !== true) {
      setApplicationBalance(currentData);
    }
    setTempApplicationBalance(currentData);
  };

  const handleUndoDelete = () => {
    if (proofOfPayments !== undefined) {
      setTempData(proofOfPayments);
      setApplicationBalance(applicationBalance);
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
      ? [...tempData].filter((eachPayment: IPaymentRequired) => eachPayment.status !== "Completed").length
      : 0;
  const completedLength =
    tempData !== undefined && tempData.length > 0
      ? tempData.filter((eachPayment: IPaymentRequired) => eachPayment.status === "Completed").length
      : 0;
  const pendingText =
    tempData !== undefined && pendingLength === tempData.length ? `All (${tempData.length}) pending` : `${pendingLength} pending, `;
  const completedText =
    tempData !== undefined && completedLength === tempData.length ? `All (${tempData.length}) completed` : `${completedLength} completed`;
  const bannerText = `${PAYMENT.BANNER_LABEL}: ${pendingLength > 0 ? pendingText : ""}${completedLength > 0 ? completedText : ""}`;
  // To show the available balance and also the excess
  const balancePayments: IOrderAmount[] = tempData !== undefined ? calculateExcess(tempApplicationBalance) : [];
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
    tempData.map((pop) => pop.payments.some((findPayment) => findPayment.saved === true)).includes(true) === false;

  useEffect(() => {
    if (deleteCount === 0) {
      setApplicationBalance(tempApplicationBalance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCount]);

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
                const setProofOfPayment = (
                  value: IPaymentRequired,
                  action?: ISetProofOfPaymentAction,
                  deleted?: boolean,
                  setActiveInfo?: (activeIndex: number) => void,
                ) => {
                  let updatedProofOfPayments: IPaymentRequired[] = [...tempData];
                  updatedProofOfPayments[index] = { ...updatedProofOfPayments[index], ...value };
                  if (action !== undefined && action.paymentId !== undefined && action.mode !== undefined) {
                    const tagKey = action.mode === "surplus" ? "tag" : "ctaTag";
                    const parentKey = action.mode === "surplus" ? "parent" : "ctaParent";
                    const updatedPOP = updatedProofOfPayments.map((eachOrder) => {
                      const filteredPayments = eachOrder.payments.filter((eachPOP) => {
                        const deleteCondition =
                          (eachPOP[tagKey] === undefined && eachPOP[parentKey] !== action.paymentId) ||
                          (eachPOP[tagKey] !== undefined && eachPOP[tagKey]!.uuid !== action.paymentId);
                        const updateCondition =
                          eachPOP[tagKey] === undefined || (eachPOP[tagKey] !== undefined && eachPOP[tagKey]!.uuid !== action.paymentId);

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
                  if (
                    updatedProofOfPayments[index].payments.length !== 0 &&
                    "saved" in updatedProofOfPayments[index].payments[updatedProofOfPayments[index].payments.length - 1] &&
                    updatedProofOfPayments[index].payments[updatedProofOfPayments[index].payments.length - 1].saved === false &&
                    setActiveInfo !== undefined
                  ) {
                    setActiveInfo(updatedProofOfPayments[index].payments.length - 1);
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
                          applicationBalance={tempApplicationBalance}
                          deleteCount={deleteCount}
                          deletedPayment={tempDeletedPayment}
                          localCtaDetails={localCtaDetails}
                          localRecurringDetails={localRecurringDetails}
                          proofOfPayment={proofOfPayment}
                          setActiveOrder={setActiveOrder}
                          setApplicationBalance={handleApplicationBalance}
                          setDeleteCount={setDeleteCount}
                          setDeletedPayment={setTempDeletedPayment}
                          setLocalCtaDetails={setLocalCtaDetails}
                          setLocalRecurringDetails={setLocalRecurringDetails}
                          setProofOfPayment={setProofOfPayment}
                          setSavedChangesToast={setSavedChangesToast}
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
                  grandTotal={grandTotal.grandTotal}
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
      <NewPaymentPrompt
        buttonLoading={buttonLoading}
        handleCancel={handleCancelPopup}
        handleConfirm={handleConfirmPopup}
        promptType={promptType}
        result={paymentResult}
        visible={showPopup}
      />
      <CustomToast
        count={deleteCount}
        deleteText={TOAST.LABEL_PAYMENT_INFO_DELETED}
        duration={5}
        isDeleteToast={true}
        onPress={handleUndoDelete}
        setCount={setDeleteCount}
      />
      <CustomToast parentVisible={savedChangesToast} setParentVisible={setSavedChangesToast} />
    </SafeAreaPage>
  );
};
export const Payment = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PaymentComponent);
