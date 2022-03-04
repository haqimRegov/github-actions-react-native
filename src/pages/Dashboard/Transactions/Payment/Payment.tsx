import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, CustomToast, Loading, SafeAreaPage, SelectionBanner } from "../../../../components";
import { Language } from "../../../../constants";
import { useDelete } from "../../../../hooks";
import { getPaymentRequired, submitProofOfPayments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import { flexChild, px, py, sh112, sh24, sw24 } from "../../../../styles";
import { OrderPayment, PaymentPopup } from "../../../../templates";
import { calculateExcess, checkCurrencyCompleted, generatePaymentWithKeys } from "../../../../templates/Payment/helpers";
import { PaymentBannerContent } from "../../../../templates/Payment/PaymentBanner";
import { AlertDialog, formatAmount, parseAmount } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";

const { DASHBOARD_PAYMENT, PAYMENT, TOAST } = Language.PAGE;

interface DashPaymentProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const DashboardPaymentComponent: FunctionComponent<DashPaymentProps> = (props: DashPaymentProps) => {
  const { currentOrder, navigation, setScreen, updateCurrentOrder } = props;
  const [proofOfPayment, setProofOfPayment] = useState<IPaymentRequired | undefined>(undefined);
  const [tempDeletedPayment, setTempDeletedPayment] = useState<IPaymentInfo[]>([]);
  const [grandTotal, setGrandTotal] = useState<IOrderAmount[]>([]);
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [savedChangesToast, setSavedChangesToast] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [activeOrder, setActiveOrder] = useState<{ order: string; fund: string }>({ order: "", fund: "" });
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);
  const [applicationBalance, setApplicationBalance] = useState<IPaymentInfo[]>([]);
  const [tempApplicationBalance, setTempApplicationBalance] = useState<IPaymentInfo[]>(applicationBalance);
  const [deleteCount, setDeleteCount, tempData, setTempData] = useDelete<IPaymentRequired | undefined>(proofOfPayment, setProofOfPayment);

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
          transactionDate: pay.transactionDate !== null ? moment(pay.transactionDate, "x").toDate() : moment().toDate(),
        }));
        const state: IPaymentRequired = {
          ...data.result,
          payments: savedPayments,
        };
        setTempData(state);
        setGrandTotal(data.result.totalInvestment);
        if (data.result.surplusBalance) {
          setTempApplicationBalance(data.result.surplusBalance);
          setApplicationBalance(data.result.surplusBalance);
        }
      }
      if (error !== null) {
        setTimeout(() => {
          AlertDialog(error.message, handleBack);
        }, 100);
      }
    }
  };

  const handleSubmit = async (confirmed?: boolean) => {
    try {
      setLoading(true);
      const paymentWithDeleted: IPaymentInfo[] = [];
      // TODO for deleted saved info
      if (tempDeletedPayment.length > 0) {
        paymentWithDeleted.push(...tempDeletedPayment);
      }
      paymentWithDeleted.push(...tempData!.payments);

      const payment = await generatePaymentWithKeys(
        paymentWithDeleted,
        tempData!.paymentType,
        currentOrder!.orderNumber,
        currentOrder!.clientId,
        "Dashboard",
      );

      const paymentOrders: ISubmitProofOfPaymentOrder[] = [
        { orderNumber: tempData!.orderNumber, paymentType: tempData!.paymentType, payments: payment },
      ];

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log("Error in handleSubmit", error);
      setLoading(false);
      if ("errorCode" in error) {
        Alert.alert(error.message);
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
      return handleBack();
    }

    const response = await handleSubmit(true);
    if (response === undefined) {
      setConfirmPayment(true);
      return true;
    }

    return undefined;
  };

  const handleUndoDelete = () => {
    if (tempData !== undefined) {
      setTempData(proofOfPayment);
      setTempApplicationBalance(applicationBalance);
    }
  };

  const handleSetPayment = (value: IPaymentRequired, action?: ISetProofOfPaymentAction, deleted?: boolean) => {
    setTempData(value);
    if (deleted === false) {
      setProofOfPayment(value);
    }
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
    tempData !== undefined
      ? tempData.payments.some((findPayment) => findPayment.saved === true) === false && tempDeletedPayment.length === 0
      : false;

  const bannerText =
    tempData !== undefined ? `${PAYMENT.LABEL_PENDING_SUMMARY}: 1 ${tempData?.status.toLowerCase()}` : `${PAYMENT.LABEL_PENDING_SUMMARY}: `;
  // To show the available balance and also the excess
  const balancePayments: IOrderAmount[] = tempData !== undefined ? calculateExcess(tempApplicationBalance) : [];
  const updatedBalancePayments =
    tempData !== undefined
      ? balancePayments.filter(
          (eachBalance: IOrderAmount) =>
            eachBalance.currency === "MYR" &&
            parseAmount(eachBalance.amount) !== 0 &&
            ((tempData?.status !== "Completed" && checkCurrencyCompleted(tempData, eachBalance.currency) === false) ||
              tempData?.isLastOrder !== true ||
              (tempData.isLastOrder === true && checkCurrencyCompleted(tempData, eachBalance.currency) === false)),
        )
      : [];
  const completedCurrencies =
    tempData !== undefined
      ? balancePayments.filter(
          (eachSurplus: IOrderAmount) =>
            (tempData.isLastOrder === true || eachSurplus.currency !== "MYR") &&
            parseAmount(eachSurplus.amount) !== 0 &&
            checkCurrencyCompleted(tempData, eachSurplus.currency),
        )
      : [];
  const checkGrandTotal = tempData !== undefined && tempData.paymentType !== "Recurring" ? grandTotal : [];
  const checkGrandTotalRecurring = tempData !== undefined && tempData.paymentType === "Recurring" ? grandTotal[0] : undefined;

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
            {tempData !== undefined ? (
              <View>
                <CustomSpacer space={sh24} />
                <View style={px(sw24)}>
                  <OrderPayment
                    accountNames={accountNames}
                    activeOrder={activeOrder}
                    applicationBalance={tempApplicationBalance}
                    deleteCount={deleteCount}
                    deletedPayment={tempDeletedPayment}
                    proofOfPayment={tempData}
                    setActiveOrder={setActiveOrder}
                    setApplicationBalance={handleApplicationBalance}
                    setDeleteCount={setDeleteCount}
                    setDeletedPayment={setTempDeletedPayment}
                    setProofOfPayment={handleSetPayment}
                    setSavedChangesToast={setSavedChangesToast}
                  />
                </View>
                <CustomSpacer space={sh24} />
              </View>
            ) : (
              <Loading />
            )}
            {activeOrder.order !== "" ? null : <CustomSpacer space={sh112} />}
          </View>
        </SafeAreaPage>
      </DashboardLayout>
      {activeOrder.order !== "" || tempData === undefined ? null : (
        <SelectionBanner
          bottomContent={
            tempData !== undefined ? (
              <PaymentBannerContent
                balancePayments={updatedBalancePayments}
                excessPayments={completedCurrencies}
                grandTotal={checkGrandTotal}
                grandTotalRecurring={checkGrandTotalRecurring}
                paymentType={tempData.paymentType}
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
      <PaymentPopup
        handleCancel={handleCancelPopup}
        handleConfirm={handleConfirmPopup}
        loading={loading}
        result={paymentResult}
        withExcess={tempData !== undefined && tempData.isLastOrder === true && completedCurrencies.length > 0}
      />
    </Fragment>
  );
};

export const DashboardPayment = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(DashboardPaymentComponent);
