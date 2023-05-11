import cloneDeep from "lodash.clonedeep";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, CustomToast, Loading, SafeAreaPage, SelectionBanner } from "../../../../components";
import { Language } from "../../../../constants";
import { IData, useUndoDelete } from "../../../../hooks";
import { getPaymentRequired, submitProofOfPayments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import { flexChild, px, py, sh152, sh24, sw24 } from "../../../../styles";
import { OrderPayment } from "../../../../templates";
import {
  calculateExcess,
  checkCurrencyCompleted,
  generatePaymentWithKeys,
  handleEPFStructuring,
} from "../../../../templates/Payment/helpers";
import { NewPaymentPrompt } from "../../../../templates/Payment/NewPaymentPrompt";
import { PaymentBannerContent } from "../../../../templates/Payment/PaymentBanner";
import { AlertDialog, formatAmount, isArrayNotEmpty, isNotEmpty, parseAmount } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";

const { DASHBOARD_PAYMENT, PAYMENT, TOAST } = Language.PAGE;

interface DashPaymentProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const DashboardPaymentComponent: FunctionComponent<DashPaymentProps> = (props: DashPaymentProps) => {
  const { currentOrder, navigation, setScreen, updateCurrentOrder, updatePill } = props;
  const [proofOfPayment, setProofOfPayment] = useState<IPaymentRequired | undefined>(undefined);
  // const [tempDeletedPayment, setTempDeletedPayment] = useState<IPaymentInfo[]>([]);
  const [grandTotal, setGrandTotal] = useState<IOrderAmount[]>([]);
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [savedChangesToast, setSavedChangesToast] = useState<boolean>(false);
  const [localCtaDetails, setLocalCtaDetails] = useState<TypeCTADetails[]>([]);

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [promptType, setPromptType] = useState<"summary" | "success">("summary");

  const [activeOrder, setActiveOrder] = useState<{ order: string; fund: string }>({ order: "", fund: "" });
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);
  const [applicationBalance, setApplicationBalance] = useState<IPaymentInfo[]>([]);
  const [tempApplicationBalance, setTempApplicationBalance] = useState<IPaymentInfo[]>(applicationBalance);

  const handleUpdateProofOfPayment = (value: IData<IPaymentInfo>[] | undefined) => {
    if (value !== undefined) {
      const updatedPayments = isNotEmpty(proofOfPayment) && isArrayNotEmpty(proofOfPayment?.payments) ? proofOfPayment?.payments : [];

      // todo  can i return null or undefined here ?? or do i need to return updatedPayments ??
      value.reverse().map((item) => {
        return updatedPayments !== undefined && isNotEmpty(updatedPayments)
          ? updatedPayments.splice(item.index, 0, item.deletedData)
          : null;
      });

      const updatedProofOfPayments: IPaymentRequired = {
        ...proofOfPayment,
        payments: updatedPayments!,
      };

      setProofOfPayment(updatedProofOfPayments);
    }
  };

  const [deleteCount, setDeleteCount, tempData, setTempData, handleUndoDeleteHook] =
    useUndoDelete<IPaymentInfo>(handleUpdateProofOfPayment);

  const handleBack = () => {
    updateCurrentOrder(undefined);
    setScreen("Transactions");
  };

  const handleFetch = async () => {
    const request: IGetPaymentRequiredRequest = { orderNumber: currentOrder!.orderNumber };
    const response: IGetPaymentRequiredResponse = await getPaymentRequired(request, navigation);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        const savedPayments = data.result.payment.map((pay) => ({
          ...pay,
          amount: formatAmount(pay.amount),
          epfAccountNumber: pay.epfAccountNumber,
          new: undefined,
          orderNumber: data.result.orderNumber,
          paymentType: data.result.paymentType,
          proof: pay.proof,
          remark: pay.remark || undefined,
          saved: true,
          tag: pay.tag || undefined,
          ctaTag: pay.ctaTag || undefined,
          transactionDate: pay.transactionDate !== null ? moment(pay.transactionDate, "x").toDate() : moment().toDate(),
        }));
        const state: IPaymentRequired = {
          ...data.result,
          payments: savedPayments,
        };
        setProofOfPayment(state);
        setGrandTotal(data.result.totalInvestment);
        if (data.result.surplusBalance) {
          setTempApplicationBalance(data.result.surplusBalance);
          setApplicationBalance(data.result.surplusBalance);
        }
        if (data.result.ctaDetails) {
          const updatedCtaDetails = data.result.ctaDetails.map((cta) => ({ ...cta, ctaUsedBy: [] }));
          setLocalCtaDetails(updatedCtaDetails);
        }
      }
      if (error !== null) {
        setTimeout(() => {
          AlertDialog(error.message, () => handleBack());
        }, 100);
      }
    }
  };

  const handleSubmit = async (confirmed?: boolean) => {
    try {
      if (confirmed === undefined) {
        setShowPopup(true);
      } else {
        setButtonLoading(true);
      }
      // const paymentWithDeleted: IPaymentInfo[] = [];
      // if (tempDeletedPayment.length > 0) {
      //   paymentWithDeleted.push(...tempDeletedPayment);
      // }
      // paymentWithDeleted.push(...proofOfPayment!.payments);

      const updatedPayments: IPaymentInfo[] = handleEPFStructuring([...proofOfPayment!.payments]);
      const payment = await generatePaymentWithKeys(
        updatedPayments,
        proofOfPayment!.paymentType,
        currentOrder!.orderNumber,
        currentOrder!.clientId,
        "Dashboard",
      );
      const paymentOrders: ISubmitProofOfPaymentOrder[] = [
        { orderNumber: proofOfPayment!.orderNumber, paymentType: proofOfPayment!.paymentType, payments: payment },
      ];

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
          }
          setPaymentResult(data.result);
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
      handleBack();
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

  const handleUndoDelete = () => {
    if (proofOfPayment !== undefined) {
      handleUndoDeleteHook();
      setTempApplicationBalance(applicationBalance);
    }
  };

  const handleSetPayment = (
    value: IPaymentRequired,
    action?: ISetProofOfPaymentAction,
    // deleted?: boolean,
    setActiveInfo?: (index: number) => void,
  ) => {
    const updatedProofOfPayments: IPaymentRequired = { ...proofOfPayment, ...value };
    if (action !== undefined && action.paymentId !== undefined && action.mode !== undefined && action.mode === "cta") {
      const filteredPayments = updatedProofOfPayments.payments.filter((eachPOP) => {
        const deleteCondition =
          (eachPOP.ctaTag === undefined && eachPOP.ctaParent !== action.paymentId) ||
          (eachPOP.ctaTag !== undefined && eachPOP.ctaTag.uuid !== action.paymentId);
        const updateCondition =
          (eachPOP.ctaTag === undefined && eachPOP.ctaParent === action.paymentId) ||
          (eachPOP.ctaTag === undefined && eachPOP.paymentId !== action.paymentId) ||
          (eachPOP.ctaTag !== undefined && eachPOP.ctaTag.uuid !== action.paymentId) ||
          (action.mode === "cta" &&
            eachPOP.ctaTag === undefined &&
            eachPOP.ctaParent === undefined &&
            eachPOP.paymentId === action.paymentId);

        const filterCondition = action.option === "delete" ? deleteCondition : updateCondition;

        return filterCondition;
      });
      updatedProofOfPayments.payments = cloneDeep(filteredPayments);
      updatedProofOfPayments.status = filteredPayments.length === 0 ? "Pending Payment" : updatedProofOfPayments.status;
    }
    if (
      updatedProofOfPayments.payments.length !== 0 &&
      "saved" in updatedProofOfPayments.payments[updatedProofOfPayments.payments.length - 1] &&
      updatedProofOfPayments.payments[updatedProofOfPayments.payments.length - 1].saved === false &&
      setActiveInfo !== undefined
    ) {
      setActiveInfo(updatedProofOfPayments.payments.length - 1);
    }
    // will always update proof of payment
    setProofOfPayment(updatedProofOfPayments);
  };

  const handleApplicationBalance = (currentData: IPaymentInfo[], deleted?: boolean) => {
    if (deleted !== true) {
      setApplicationBalance(currentData);
    }
    setTempApplicationBalance(currentData);
  };

  const accountNames = [{ label: currentOrder!.investorName.principal, value: currentOrder!.investorName.principal }];

  if (currentOrder!.accountType === "Joint") {
    accountNames.push(
      { label: currentOrder!.investorName.joint!, value: currentOrder!.investorName.joint! },
      { label: PAYMENT.OPTION_COMBINED, value: PAYMENT.OPTION_COMBINED },
    );
  }

  const continueDisabled =
    proofOfPayment !== undefined
      ? proofOfPayment.payments.some((findPayment) => findPayment.saved === true) === false &&
        tempData !== undefined &&
        tempData.length === 0
      : false;

  const checkRerouted = proofOfPayment !== undefined && proofOfPayment.status.toLowerCase().includes("rerouted");

  const bannerText =
    proofOfPayment !== undefined
      ? `${PAYMENT.BANNER_LABEL}: 1 ${checkRerouted === true ? "pending" : proofOfPayment?.status.toLowerCase()}`
      : `${PAYMENT.LABEL_PENDING_SUMMARY}: `;
  // To show the available balance and also the excess
  const balancePayments: IOrderAmount[] = proofOfPayment !== undefined ? calculateExcess(tempApplicationBalance) : [];
  const updatedBalancePayments =
    proofOfPayment !== undefined
      ? balancePayments.filter(
          (eachBalance: IOrderAmount) =>
            eachBalance.currency === "MYR" &&
            parseAmount(eachBalance.amount) !== 0 &&
            ((proofOfPayment?.status !== "Completed" && checkCurrencyCompleted(proofOfPayment, eachBalance.currency) === false) ||
              proofOfPayment?.isLastOrder !== true ||
              (proofOfPayment.isLastOrder === true && checkCurrencyCompleted(proofOfPayment, eachBalance.currency) === false)),
        )
      : [];
  const completedCurrencies =
    proofOfPayment !== undefined
      ? balancePayments.filter(
          (eachSurplus: IOrderAmount) =>
            (proofOfPayment.isLastOrder === true || eachSurplus.currency !== "MYR") &&
            parseAmount(eachSurplus.amount) !== 0 &&
            (eachSurplus.currency !== "MYR" || checkCurrencyCompleted(proofOfPayment, eachSurplus.currency)),
        )
      : [];
  const checkGrandTotal = proofOfPayment !== undefined && proofOfPayment.paymentType !== "Recurring" ? grandTotal : [];
  const checkGrandTotalRecurring = proofOfPayment !== undefined && proofOfPayment.paymentType === "Recurring" ? grandTotal[0] : undefined;

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
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
        title={DASHBOARD_PAYMENT.HEADING}
        titleIcon="arrow-left"
        titleIconOnPress={handleBack}>
        <SafeAreaPage>
          <View style={flexChild}>
            {proofOfPayment !== undefined ? (
              <View>
                <View style={px(sw24)}>
                  <OrderPayment
                    accountNames={accountNames}
                    activeOrder={activeOrder}
                    applicationBalance={tempApplicationBalance}
                    deleteCount={deleteCount}
                    // deletedPayment={tempDeletedPayment}
                    localCtaDetails={localCtaDetails}
                    proofOfPayment={proofOfPayment}
                    setActiveOrder={setActiveOrder}
                    setApplicationBalance={handleApplicationBalance}
                    setDeleteCount={setDeleteCount}
                    // setDeletedPayment={setTempDeletedPayment}
                    setLocalCtaDetails={setLocalCtaDetails}
                    setProofOfPayment={handleSetPayment}
                    setSavedChangesToast={setSavedChangesToast}
                    setTempData={setTempData}
                    tempData={tempData}
                    transactionType={currentOrder!.transactionType}
                  />
                </View>
              </View>
            ) : (
              <Loading />
            )}
            {activeOrder.order !== "" ? <CustomSpacer space={sh24} /> : <CustomSpacer space={sh152} />}
          </View>
        </SafeAreaPage>
      </DashboardLayout>
      {activeOrder.order !== "" || proofOfPayment === undefined ? null : (
        <Fragment>
          {updatedBalancePayments.length > 0 ? <CustomSpacer space={sh24} /> : null}
          {completedCurrencies.length > 0 ? <CustomSpacer space={sh24} /> : null}
          <SelectionBanner
            bottomContent={
              proofOfPayment !== undefined ? (
                <PaymentBannerContent
                  balancePayments={updatedBalancePayments}
                  excessPayments={completedCurrencies}
                  grandTotal={checkGrandTotal}
                  grandTotalRecurring={checkGrandTotalRecurring}
                  paymentType={proofOfPayment.paymentType}
                />
              ) : null
            }
            containerStyle={py(sh24)}
            continueDebounce={false}
            continueDisabled={continueDisabled}
            labelSubmit={PAYMENT.BUTTON_SUBMIT}
            submitOnPress={handleSubmit}
            label={bannerText}
          />
        </Fragment>
      )}
      <CustomToast
        count={deleteCount}
        deleteText={TOAST.LABEL_PAYMENT_INFO_DELETED}
        duration={5}
        isDeleteToast={true}
        onPress={handleUndoDelete}
        setCount={setDeleteCount}
      />
      <CustomToast parentVisible={savedChangesToast} setParentVisible={setSavedChangesToast} />
      <NewPaymentPrompt
        buttonLoading={buttonLoading}
        handleCancel={handleCancelPopup}
        handleConfirm={handleConfirmPopup}
        promptType={promptType}
        result={paymentResult}
        visible={showPopup}
      />
    </Fragment>
  );
};

export const DashboardPayment = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(DashboardPaymentComponent);
