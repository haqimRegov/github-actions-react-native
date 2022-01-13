import React, { FunctionComponent, useEffect } from "react";
import { View, ViewStyle } from "react-native";

import { CustomSpacer } from "../../components";
import { Language } from "../../constants";
import {
  DICTIONARY_DDA_BANK,
  DICTIONARY_KIB_BANK_ACCOUNTS,
  DICTIONARY_RECURRING_CURRENCY,
  DICTIONARY_RECURRING_FREQUENCY,
} from "../../data/dictionary";
import { centerVertical, colorWhite, flexRow, px, py, sh24, sh8, sh96, shadow16Blue112, sw24, sw8 } from "../../styles";
import { AnimationUtils, formatAmount, parseAmount } from "../../utils";
import { OrderOverview } from "../Onboarding/OrderOverview";
import { PaymentCard } from "./PaymentCard";

const { PAYMENT } = Language.PAGE;

export interface PaymentOrderProps {
  accountNames: TypeLabelValue[];
  activeOrder: string;
  epfAccountNumber?: string;
  orderCreationDate?: Date;
  paymentOrder: IPaymentOrderState;
  setActiveOrder: (value: string) => void;
  setPaymentOrder: (paymentOrder: IPaymentOrderState) => void;
  setViewFund: (value: string) => void;
  viewFund: string;
}

export const PaymentOrder: FunctionComponent<PaymentOrderProps> = ({
  accountNames,
  activeOrder,
  epfAccountNumber,
  orderCreationDate,
  paymentOrder,
  setActiveOrder,
  setPaymentOrder,
  setViewFund,
  viewFund,
}: PaymentOrderProps) => {
  const {
    allowedRecurringType,
    completed,
    floatingAmount,
    investments,
    orderDate,
    orderNumber,
    orderTotalAmount,
    paymentCount,
    payments,
    paymentType,
    totalPaidAmount,
  } = paymentOrder;

  const cardHeaderStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...py(sh24),
    ...shadow16Blue112,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh96,
    zIndex: 1,
    borderRadius: sw8,
  };
  const setPayments = (newPayments: IPaymentState[]) => {
    const updatedPaymentOrder = { ...paymentOrder, payments: newPayments };
    setPaymentOrder(updatedPaymentOrder);
  };

  const generateNewPaymentDraft = () => {
    const initialCurrency = orderTotalAmount.length > 1 ? "" : orderTotalAmount[0].currency;
    const initialAmount = orderTotalAmount.length > 1 ? "" : orderTotalAmount[0].amount;
    let initialState: IPaymentState = {};
    const kibCurrencyIndex = DICTIONARY_KIB_BANK_ACCOUNTS.findIndex((bank) => bank.currency === initialCurrency);
    const kibBank = kibCurrencyIndex !== -1 ? DICTIONARY_KIB_BANK_ACCOUNTS[kibCurrencyIndex] : DICTIONARY_KIB_BANK_ACCOUNTS[0];
    const kibBankName = initialCurrency === "" ? "" : kibBank.bankName;
    const kibBankNumber = initialCurrency === "" ? "" : kibBank.bankAccountNumber;

    switch (paymentType) {
      case "Cash":
        initialState = {
          amount: "",
          currency: initialCurrency,
          paymentMethod: "Online Banking / TT / ATM",
          kibBankName: kibBankName,
          kibBankAccountNumber: kibBankNumber,
          transactionDate: undefined,
          proof: undefined,
          remark: undefined,
          bankName: "",
          saved: false,
        };
        break;
      case "Recurring":
        initialState = {
          currency: DICTIONARY_RECURRING_CURRENCY,
          paymentMethod: "Recurring",
          bankAccountName: "",
          bankAccountNumber: "",
          recurringType: PAYMENT.OPTION_DDA,
          recurringBank: DICTIONARY_DDA_BANK[0].value,
          frequency: DICTIONARY_RECURRING_FREQUENCY[0].value,
          proof: undefined,
          saved: false,
        };
        break;
      case "EPF":
        initialState = {
          amount: formatAmount(initialAmount),
          currency: initialCurrency,
          paymentMethod: "EPF",
          epfAccountNumber: epfAccountNumber,
          epfReferenceNumber: "",
          proof: undefined,
          remark: undefined,
          saved: false,
        };
        break;

      default:
        break;
    }

    return initialState;
  };

  const handleExpandPayment = () => {
    AnimationUtils.layout({ duration: activeOrder === orderNumber ? 200 : 300 });
    setActiveOrder(activeOrder === orderNumber ? "" : orderNumber);
  };

  const handleFloatingAmount = (latestPayments: IPaymentState[]) => {
    const floatingTotalAmount = orderTotalAmount.map((orderAmount) => {
      const filteredPayments = latestPayments
        .filter((value) => value.currency === orderAmount.currency)
        .map((payment: IPaymentState) => parseAmount(payment.amount || ""));
      const total =
        filteredPayments.length === 0
          ? 0
          : filteredPayments.map((amount) => amount).reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount);
      return { currency: orderAmount.currency, amount: total - parseAmount(orderAmount.amount) };
    });
    const checkFloating = floatingTotalAmount.map((floating) => {
      const filteredPaidAmount =
        totalPaidAmount !== undefined
          ? totalPaidAmount
              .filter((value) => value.currency === floating.currency)
              .map((payment: IOrderAmount) => parseAmount(payment.amount || ""))
          : [];
      const paidAmount = filteredPaidAmount.length === 0 ? 0 : filteredPaidAmount[0];
      return floating.amount + paidAmount >= 0;
    });
    const isCompleted = paymentType === "Recurring" ? true : !checkFloating.includes(false);
    const computedFloating = latestPayments.length === 1 && latestPayments[0].amount === "" ? [] : floatingTotalAmount;
    const updatedPaymentOrder = { floatingAmount: computedFloating, completed: isCompleted };
    return updatedPaymentOrder;
  };

  const handleSavePayments = (latestPayments: IPaymentState[]) => {
    const newPaymentOrder = handleFloatingAmount(latestPayments);
    setPaymentOrder({ ...paymentOrder, payments: latestPayments, ...newPaymentOrder });
  };

  useEffect(() => {
    if (payments.length === 0) {
      const newState = generateNewPaymentDraft();
      const updatedPaymentOrder: IPaymentOrderState = { ...paymentOrder };
      updatedPaymentOrder.payments.push(newState);
      setPaymentOrder(updatedPaymentOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tagColor = completed === true ? "complete" : "warning";
  const tagLabel = completed === true ? "Completed" : "Pending";

  const currencies =
    orderTotalAmount.length > 0
      ? orderTotalAmount.map((value) => {
          return { label: value.currency, value: value.currency };
        })
      : [];

  const totalAmountLabel = paymentType === "Recurring" ? PAYMENT.LABEL_TOTAL_RECURRING_AMOUNT : PAYMENT.LABEL_TOTAL_INVESTMENT_AMOUNT;

  return (
    <View>
      <OrderOverview
        completed={completed}
        funds={investments}
        createdOn={orderDate}
        orderNumber={orderNumber}
        totalInvestment={orderTotalAmount}
        paymentType={paymentType}
        // setViewFund={setViewFund}
        // viewFund={viewFund}
      />
      {/* <View style={cardHeaderStyle}>
        <View>
          <Text style={fs24BoldGray6}>{orderNumber}</Text>
          <Text style={fs12BoldGray6}>{orderDate}</Text>
        </View>
        <CustomFlexSpacer />
        <View style={alignItemsEnd}>
          <View style={{ ...centerVertical, ...flexRow }}>
            <StatusBadge color={tagColor} text={tagLabel} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={fs12RegGray6}>{totalAmountLabel}</Text>
          </View>
          <CustomSpacer space={sh8} />
          <View style={{ ...centerVertical, ...flexRow }}>
            {orderTotalAmount.map((totalAmount: IOrderAmount, amountIndex: number) => {
              return (
                <View key={amountIndex} style={{ ...centerVertical, ...flexRow }}>
                  {amountIndex !== 0 ? <Text style={{ ...fs16RegGray6, ...px(sw4) }}>+</Text> : null}
                  <Text style={fs16RegGray6}>{totalAmount.currency}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text style={fs16BoldGray6}>{formatAmount(totalAmount.amount)}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      {investments.map((fund: IOrderInvestment, fundIndex: number) => (
        <View key={fundIndex}>
          <CustomSpacer space={sh8} />
          <FundOverview orderNumber={orderNumber} viewFund={viewFund} setViewFund={setViewFund} fund={fund} />
        </View>
      ))} */}
      <CustomSpacer space={sh8} />
      <PaymentCard
        allowedRecurringType={allowedRecurringType}
        accountNames={accountNames}
        active={activeOrder === orderNumber}
        currencies={currencies}
        floatingAmount={floatingAmount!}
        totalPaidAmount={totalPaidAmount}
        generateNewPayment={generateNewPaymentDraft}
        handleExpandPayment={handleExpandPayment}
        handleSavePayments={handleSavePayments}
        isScheduled={paymentType === "Recurring"}
        orderCreationDate={orderCreationDate}
        orderTotalAmount={orderTotalAmount}
        paymentCount={paymentCount}
        payments={payments}
        setPayments={setPayments}
      />
      <CustomSpacer space={sh24} />
    </View>
  );
};
