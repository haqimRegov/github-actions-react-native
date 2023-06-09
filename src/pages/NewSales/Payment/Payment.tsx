import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { BlurView, CustomSpacer, CustomToast, defaultContentProps, LabeledTitle, SafeAreaPage, SelectionBanner } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { IData, useUndoDelete } from "../../../hooks";
import { submitProofOfPayments } from "../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import { flexChild, flexGrow, px, py, sh152, sh24, shadow50Black115, sw24 } from "../../../styles";
import { OrderPayment } from "../../../templates";
import { calculateExcess, checkCurrencyCompleted, generatePaymentWithKeys, handleEPFStructuring } from "../../../templates/Payment/helpers";
import { NewPaymentPrompt } from "../../../templates/Payment/NewPaymentPrompt";
import { PaymentBannerContent } from "../../../templates/Payment/PaymentBanner";
import { isArrayNotEmpty, isNotEmpty, parseAmount } from "../../../utils";

const { PAYMENT, TOAST } = Language.PAGE;
interface PaymentProps extends AcknowledgementStoreProps, NewSalesContentProps {
  navigation: IStackNavigationProp;
}

const NewSalesPaymentComponent: FunctionComponent<PaymentProps> = ({
  accountType,
  details,
  handleResetNewSales,
  navigation,
  newSales,
  orders,
  personalInfo,
  updatePill,
}: PaymentProps) => {
  const [proofOfPayments, setProofOfPayments] = useState<IPaymentRequired[] | undefined>(undefined);
  const [applicationBalance, setApplicationBalance] = useState<IPaymentInfo[]>([]);
  // const [tempDeletedPayment, setTempDeletedPayment] = useState<IPaymentInfo[]>([]);
  const [tempApplicationBalance, setTempApplicationBalance] = useState<IPaymentInfo[]>(applicationBalance);
  const [grandTotal, setGrandTotal] = useState<IGrandTotal | undefined>(undefined);
  const [localRecurringDetails, setLocalRecurringDetails] = useState<IRecurringDetails | undefined>(undefined);
  const [localCtaDetails, setLocalCtaDetails] = useState<TypeCTADetails[]>([]);

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [savedChangesToast, setSavedChangesToast] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<{ order: string; fund: string }>({ order: "", fund: "" });
  const checkProofOfPayments = proofOfPayments !== undefined ? [...proofOfPayments] : [];

  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [promptType, setPromptType] = useState<"summary" | "success">("summary");

  const handleUpdatePayment = (value: IData<IPaymentInfo>[] | undefined) => {
    const updatedProofOfPayments = isArrayNotEmpty(checkProofOfPayments) ? checkProofOfPayments : [];

    if (value !== undefined) {
      // value is tempData
      value.reverse().forEach((item) => {
        const { index, parentIndex, deletedData } = item;
        const arrayIndex = parentIndex !== undefined ? parentIndex : 0;

        // initialize the IPaymentRequired object
        const localPaymentRequired = updatedProofOfPayments[arrayIndex];
        // initialize the payments array from IPaymentRequired object
        const updatedPayments =
          isNotEmpty(localPaymentRequired) && isArrayNotEmpty(localPaymentRequired?.payments) ? localPaymentRequired?.payments : [];

        // update payments array
        updatedPayments.splice(index, 0, deletedData);
        // update IPaymentRequired object with updated payment array
        const updatedPaymentRequired = { ...localPaymentRequired, payments: updatedPayments };

        // replaced updated IPaymentRequired object in the parent array
        updatedProofOfPayments.splice(arrayIndex, 1, updatedPaymentRequired);
      });

      setProofOfPayments(updatedProofOfPayments);
    }
  };

  const [deleteCount, setDeleteCount, tempData, setTempData, handleUndoDeleteHook] = useUndoDelete<IPaymentInfo>(handleUpdatePayment);

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
      if (checkProofOfPayments !== undefined) {
        checkProofOfPayments.forEach((eachOrder) => {
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
      handleResetNewSales();
      if (
        paymentResult !== undefined &&
        paymentResult.orders.filter((eachOrder: ISubmitProofOfPaymentResultOrder) => eachOrder.status === "Submitted").length ===
          paymentResult.orders.length
      ) {
        updatePill("submitted");
        return true;
      }
      return undefined;
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
      handleUndoDeleteHook();
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
    checkProofOfPayments !== undefined && checkProofOfPayments.length > 0
      ? [...checkProofOfPayments].filter((eachPayment: IPaymentRequired) => eachPayment.status !== "Completed").length
      : 0;
  const completedLength =
    checkProofOfPayments !== undefined && checkProofOfPayments.length > 0
      ? checkProofOfPayments.filter((eachPayment: IPaymentRequired) => eachPayment.status === "Completed").length
      : 0;
  const pendingText =
    checkProofOfPayments !== undefined && pendingLength === checkProofOfPayments.length
      ? `All (${checkProofOfPayments.length}) pending`
      : `${pendingLength} pending, `;
  const completedText =
    checkProofOfPayments !== undefined && completedLength === checkProofOfPayments.length
      ? `All (${checkProofOfPayments.length}) completed`
      : `${completedLength} completed`;
  const bannerText = `${PAYMENT.BANNER_LABEL}: ${pendingLength > 0 ? pendingText : ""}${completedLength > 0 ? completedText : ""}`;
  // To show the available balance and also the excess
  const balancePayments: IOrderAmount[] = checkProofOfPayments !== undefined ? calculateExcess(tempApplicationBalance) : [];
  const checkAllCompleted =
    checkProofOfPayments !== undefined
      ? checkProofOfPayments.filter(
          (eachPOPCheck: IPaymentRequired) =>
            eachPOPCheck.status === "Completed" || eachPOPCheck.paymentType !== "Cash" || checkCurrencyCompleted(eachPOPCheck, "MYR"),
        )
      : [];
  const updatedBalancePayments =
    checkProofOfPayments !== undefined
      ? balancePayments.filter(
          (eachBalance: IOrderAmount) =>
            eachBalance.currency === "MYR" &&
            checkAllCompleted.length !== checkProofOfPayments?.length &&
            parseAmount(eachBalance.amount) !== 0,
        )
      : [];
  const completedCurrencies =
    checkProofOfPayments !== undefined
      ? balancePayments.filter(
          (eachSurplus: IOrderAmount) =>
            (eachSurplus.currency !== "MYR" || checkAllCompleted.length === checkProofOfPayments.length) &&
            parseAmount(eachSurplus.amount) !== 0,
        )
      : [];

  const continueDisabled =
    checkProofOfPayments !== undefined &&
    checkProofOfPayments.map((pop) => pop.payments.some((findPayment) => findPayment.saved === true)).includes(true) === false;

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
            <CustomSpacer space={defaultContentProps.spaceToTop!} />
            <View style={px(sw24)}>
              <LabeledTitle
                label={PAYMENT.HEADING}
                labelStyle={defaultContentProps.subheadingStyle}
                spaceToLabel={defaultContentProps.spaceToTitle}
                title={PAYMENT.SUBHEADING}
                titleStyle={defaultContentProps.subtitleStyle}
              />
            </View>
            {checkProofOfPayments !== undefined &&
              checkProofOfPayments.map((proofOfPayment: IPaymentRequired, index: number) => {
                const setProofOfPayment = (
                  value: IPaymentRequired,
                  action?: ISetProofOfPaymentAction,
                  // deleted?: boolean,
                  setActiveInfo?: (activeIndex: number) => void,
                ) => {
                  let updatedProofOfPayments: IPaymentRequired[] = [...checkProofOfPayments];
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
                  // will always update proofOfPayment
                  setProofOfPayments(updatedProofOfPayments);
                };

                return (
                  <Fragment key={index}>
                    <BlurView visible={activeOrder.order === "" || activeOrder.order === proofOfPayment.orderNumber}>
                      <View style={{ ...px(sw24), ...shadow50Black115 }}>
                        <OrderPayment
                          accountNames={accountNames}
                          activeOrder={activeOrder}
                          applicationBalance={tempApplicationBalance}
                          deleteCount={deleteCount}
                          // deletedPayment={tempDeletedPayment}
                          localCtaDetails={localCtaDetails}
                          localRecurringDetails={localRecurringDetails}
                          parentIndex={index}
                          proofOfPayment={proofOfPayment}
                          setActiveOrder={setActiveOrder}
                          setApplicationBalance={handleApplicationBalance}
                          setDeleteCount={setDeleteCount}
                          // setDeletedPayment={setTempDeletedPayment}
                          setLocalCtaDetails={setLocalCtaDetails}
                          setLocalRecurringDetails={setLocalRecurringDetails}
                          setProofOfPayment={setProofOfPayment}
                          setSavedChangesToast={setSavedChangesToast}
                          setTempData={setTempData}
                          tempData={tempData}
                          transactionType={newSales.transactionType}
                        />
                      </View>
                    </BlurView>
                  </Fragment>
                );
              })}
            {activeOrder.order !== "" ? <CustomSpacer space={sh24} /> : <CustomSpacer space={sh152} />}
          </View>
        </ScrollView>
        {activeOrder.order !== "" ? null : (
          <Fragment>
            {updatedBalancePayments.length > 0 ? <CustomSpacer space={sh24} /> : null}
            {completedCurrencies.length > 0 ? <CustomSpacer space={sh24} /> : null}
            <SelectionBanner
              bottomContent={
                checkProofOfPayments !== undefined && grandTotal !== undefined ? (
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
          </Fragment>
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
export const NewSalesPayment = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(NewSalesPaymentComponent);
