import React, { FunctionComponent, useEffect } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, Tag } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_DDA_BANK, DICTIONARY_KIB_BANK_ACCOUNTS, DICTIONARY_RECURRING_FREQUENCY } from "../../../data/dictionary";
import {
  alignItemsEnd,
  centerVertical,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  px,
  py,
  sh24,
  sh8,
  sh96,
  shadowBlue5,
  sw24,
  sw4,
  sw8,
} from "../../../styles";
import { AnimationUtils } from "../../../utils";
import { FundOverview } from "./FundOverview";
import { PaymentCard } from "./PaymentCard";

const { PAYMENT } = Language.PAGE;

export interface PaymentOrderProps {
  activeOrder: string;
  paymentOrder: IPaymentOrderState;
  setActiveOrder: (value: string) => void;
  setPaymentOrder: (paymentOrder: IPaymentOrderState) => void;
  setViewFund: (value: string) => void;
  viewFund: string;
}

export const PaymentOrder: FunctionComponent<PaymentOrderProps> = ({
  activeOrder,
  paymentOrder,
  setActiveOrder,
  setPaymentOrder,
  setViewFund,
  viewFund,
}: PaymentOrderProps) => {
  const { orderDate, orderTotalAmount, orderNumber, investments, payments, paymentType, completed } = paymentOrder;

  const cardHeaderStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...py(sh24),
    ...shadowBlue5,
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
    let initialState: IPaymentState = {};
    const kibBankName = initialCurrency === "" ? "" : DICTIONARY_KIB_BANK_ACCOUNTS[0].bankName;
    const kibBankNumber = initialCurrency === "" ? "" : DICTIONARY_KIB_BANK_ACCOUNTS[0].bankAccountNumber;
    switch (paymentType) {
      case "Cash":
        initialState = {
          amount: "",
          currency: initialCurrency,
          paymentMethod: "Online Banking",
          kibBankName: kibBankName,
          kibBankAccountNumber: kibBankNumber,
          transactionDate: undefined,
          proof: undefined,
          remark: undefined,
          bankName: "",
          checkNumber: "",
          expanded: true,
        };
        break;
      case "Recurring":
        initialState = {
          paymentMethod: "Recurring",
          bankAccountName: "",
          bankAccountNumber: "",
          recurringType: PAYMENT.OPTION_DDA,
          recurringBank: DICTIONARY_DDA_BANK[0].value,
          frequency: DICTIONARY_RECURRING_FREQUENCY[0].value,
          proof: undefined,
          expanded: true,
        };
        break;
      case "EPF":
        initialState = {
          currency: initialCurrency,
          paymentMethod: "EPF",
          epfAccountNumber: "",
          epfReferenceNumber: "",
          proof: undefined,
          remark: undefined,
          expanded: true,
        };
        break;

      default:
        break;
    }

    return initialState;
  };

  const payOrder = () => {
    AnimationUtils.layout({ duration: activeOrder === orderNumber ? 200 : 300 });
    setActiveOrder(activeOrder === orderNumber ? "" : orderNumber);
  };

  const handleSavePayment = () => {
    const floatingTotalAmount = orderTotalAmount.map((orderAmount) => {
      const filtered = payments.filter((value) => value.currency === orderAmount.currency);
      const mapp = filtered.map((payment: IPaymentState) => parseFloat(payment.amount!));
      const total = mapp.length === 0 ? 0 : mapp.reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount);
      return { currency: orderAmount.currency, amount: `${total - parseFloat(orderAmount.amount)}` };
    });
    const checkFloating = floatingTotalAmount.map((floating) => parseFloat(floating.amount) >= 0);
    const isCompleted = paymentType === "Recurring" ? true : !checkFloating.includes(false);
    const updatedPaymentOrder = { ...paymentOrder, floatingAmount: floatingTotalAmount, completed: isCompleted };
    return updatedPaymentOrder;
  };

  const handleSave = () => {
    const newPaymentOrder = handleSavePayment();
    setPaymentOrder(newPaymentOrder);
    payOrder();
  };

  const handleAdditionalPayment = () => {
    const newState = generateNewPaymentDraft();
    const newPaymentOrder = handleSavePayment();
    const updatedPaymentOrder = { ...newPaymentOrder };
    updatedPaymentOrder.payments.push(newState);
    setPaymentOrder(updatedPaymentOrder);
  };

  const handleCancelPaymentInfo = () => {
    if (payments.length > 1) {
      const updatedPaymentOrder = { ...paymentOrder };
      updatedPaymentOrder.payments.splice(-1, 1);
      setPaymentOrder(updatedPaymentOrder);
    } else {
      const newState = generateNewPaymentDraft();
      const updatedPaymentOrder = { ...paymentOrder };
      updatedPaymentOrder.payments = [newState];
      setPaymentOrder(updatedPaymentOrder);
      handleSave();
    }
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

  const tagColor = completed === true ? "secondary" : "warning";
  const tagLabel = completed === true ? "Completed" : "Pending";

  const currencies =
    orderTotalAmount.length > 1
      ? orderTotalAmount.map((value) => {
          return { label: value.currency, value: value.currency };
        })
      : [];

  return (
    <View>
      <View style={cardHeaderStyle}>
        <View>
          <Text style={fs24BoldBlack2}>{orderNumber}</Text>
          <Text style={fs12BoldBlack2}>{orderDate}</Text>
        </View>
        <CustomFlexSpacer />
        <View style={alignItemsEnd}>
          <View style={{ ...centerVertical, ...flexRow }}>
            <Tag color={tagColor} text={tagLabel} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={fs12RegBlack2}>{PAYMENT.LABEL_TOTAL_INVESTMENT_AMOUNT}</Text>
          </View>
          <CustomSpacer space={sh8} />
          <View style={{ ...centerVertical, ...flexRow }}>
            {orderTotalAmount.map((totalAmount: IOrderAmount, amountIndex: number) => {
              return (
                <View key={amountIndex} style={{ ...centerVertical, ...flexRow }}>
                  {amountIndex !== 0 ? <Text style={{ ...fs16RegBlack2, ...px(sw4) }}>+</Text> : null}
                  <Text style={fs16RegBlack2}>{totalAmount.currency}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text style={{ ...fs16BoldBlack2, lineHeight: sh24 }}>{totalAmount.amount}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      {investments.map((fund: IOrderInvestment, fundIndex: number) => (
        <View key={fundIndex}>
          <CustomSpacer space={sh8} />
          <FundOverview viewFund={viewFund} setViewFund={setViewFund} fund={fund} />
        </View>
      ))}
      <CustomSpacer space={sh8} />
      <PaymentCard
        active={activeOrder === orderNumber}
        currencies={currencies}
        handleAddPayment={payOrder}
        handleSave={handleSave}
        handleAdditionalPayment={handleAdditionalPayment}
        handleCancelPaymentInfo={handleCancelPaymentInfo}
        isScheduled={paymentType === "Recurring"}
        payments={payments}
        setPayments={setPayments}
      />
      <CustomSpacer space={sh24} />
    </View>
  );
};
