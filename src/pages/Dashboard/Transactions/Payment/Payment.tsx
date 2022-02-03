import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, Loading, SafeAreaPage, SelectionBanner } from "../../../../components";
import { Language } from "../../../../constants";
import { getPaymentRequired, submitProofOfPayments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import { flexChild, px, py, sh112, sh24, sw24 } from "../../../../styles";
import { OrderPayment, PaymentPopup } from "../../../../templates";
import { calculateEachOrderBalance, checkCurrencyCompleted, generatePaymentWithKeys } from "../../../../templates/Payment/helpers";
import { PaymentBannerContent } from "../../../../templates/Payment/PaymentBanner";
import { AlertDialog, formatAmount, parseAmount } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";

const { DASHBOARD_PAYMENT, PAYMENT } = Language.PAGE;

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

  const [loading, setLoading] = useState<boolean>(false);

  const [activeOrder, setActiveOrder] = useState<{ order: string; fund: string }>({ order: "", fund: "" });
  const [paymentResult, setPaymentResult] = useState<ISubmitProofOfPaymentsResult | undefined>(undefined);
  const [applicationBalance, setApplicationBalance] = useState<IPaymentInfo[]>([]);

  const handleBack = () => {
    updateCurrentOrder(undefined);
    setScreen("Transactions");
  };

  const handleFetch = async () => {
    const request: IGetPaymentRequiredRequest = { orderNumber: currentOrder!.orderNumber };
    const response: IGetPaymentRequiredResponse = await getPaymentRequired(request, navigation, setLoading);
    // console.log("resp", response);
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
        setProofOfPayment(state);
        setGrandTotal(data.result.totalInvestment);
        if (data.result.surplusBalance) {
          const newApplicationBalance = data.result.surplusBalance.map((surplus) => ({ ...surplus, utilised: [] }));
          setApplicationBalance(newApplicationBalance);
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
      const paymentWithDeleted = [...proofOfPayment!.payments];
      // console.log("payment with deleted before", paymentWithDeleted);

      // TODO for deleted saved info
      if (tempDeletedPayment.length > 0) {
        paymentWithDeleted.push(...tempDeletedPayment);
      }

      const payment = await generatePaymentWithKeys(
        paymentWithDeleted,
        proofOfPayment!.paymentType,
        currentOrder!.orderNumber,
        currentOrder!.clientId,
        "Dashboard",
      );

      const paymentOrders: ISubmitProofOfPaymentOrder[] = [
        { orderNumber: proofOfPayment!.orderNumber, paymentType: proofOfPayment!.paymentType, payments: payment },
      ];

      const request = { orders: paymentOrders, isConfirmed: confirmed === true };
      // console.log("req", request);
      const paymentResponse: ISubmitProofOfPaymentsResponse = await submitProofOfPayments(request, navigation, setLoading);
      // console.log("res", paymentResponse);

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
      return handleBack();
    }

    const response = await handleSubmit(true);
    if (response === undefined) {
      setConfirmPayment(true);
      return true;
    }

    return undefined;
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
      ? proofOfPayment.payments.some((findPayment) => findPayment.saved === true) === false && tempDeletedPayment.length === 0
      : false;

  const bannerText =
    proofOfPayment !== undefined
      ? `${PAYMENT.LABEL_PENDING_SUMMARY}: 1 ${proofOfPayment?.status.toLowerCase()}`
      : `${PAYMENT.LABEL_PENDING_SUMMARY}: `;
  // To show the available balance and also the excess
  const balancePayments: IOrderAmount[] =
    proofOfPayment !== undefined
      ? calculateEachOrderBalance(
          proofOfPayment,
          [],
          applicationBalance.filter((eachBalance: IPaymentInfo) => parseAmount(eachBalance.excess?.amount!) !== 0),
        )
      : [];
  if (proofOfPayment !== undefined) {
    applicationBalance
      .filter((eachBalance: IPaymentInfo) => parseAmount(eachBalance.excess?.amount!) !== 0)
      .forEach((eachSurplusBalance: IPaymentInfo) => {
        const cleanValue = eachSurplusBalance.excess!.amount.replace(/[,]/g, "");
        const findSurplusIndex = balancePayments.findIndex(
          (eachPaymentDeviation: IOrderAmount) => eachPaymentDeviation.currency === eachSurplusBalance.excess!.currency,
        );
        if (findSurplusIndex !== -1) {
          balancePayments[findSurplusIndex] = {
            ...balancePayments[findSurplusIndex],
            amount: (parseInt(balancePayments[findSurplusIndex].amount, 10) + parseInt(cleanValue, 10)).toString(),
          };
        } else {
          balancePayments.push({ amount: cleanValue, currency: eachSurplusBalance.excess!.currency });
        }
      });
  }
  const updatedBalancePayments = balancePayments.filter(
    (eachBalance: IOrderAmount) =>
      eachBalance.currency === "MYR" && parseAmount(eachBalance.amount) !== 0 && proofOfPayment?.status !== "Completed",
  );

  const completedCurrencies =
    proofOfPayment !== undefined
      ? balancePayments.filter(
          (eachSurplus: IOrderAmount) =>
            proofOfPayment.isLastOrder === true &&
            parseAmount(eachSurplus.amount) !== 0 &&
            checkCurrencyCompleted(proofOfPayment, eachSurplus.currency),
        )
      : [];
  const checkGrandTotal = proofOfPayment !== undefined && proofOfPayment.paymentType !== "Recurring" ? grandTotal : [];
  const checkGrandTotalRecurring = proofOfPayment !== undefined && proofOfPayment.paymentType === "Recurring" ? grandTotal[0] : undefined;

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
                <CustomSpacer space={sh24} />
                <View style={px(sw24)}>
                  <OrderPayment
                    accountNames={accountNames}
                    activeOrder={activeOrder}
                    applicationBalance={applicationBalance}
                    deletedPayment={tempDeletedPayment}
                    proofOfPayment={proofOfPayment}
                    setActiveOrder={setActiveOrder}
                    setApplicationBalance={setApplicationBalance}
                    setDeletedPayment={setTempDeletedPayment}
                    setProofOfPayment={setProofOfPayment}
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
      {activeOrder.order !== "" || proofOfPayment === undefined ? null : (
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
      )}
      <PaymentPopup
        handleCancel={handleCancelPopup}
        handleConfirm={handleConfirmPopup}
        loading={loading}
        result={paymentResult}
        withExcess={proofOfPayment !== undefined && proofOfPayment.isLastOrder === true && completedCurrencies.length > 0}
      />
    </Fragment>
  );
};

export const DashboardPayment = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(DashboardPaymentComponent);
