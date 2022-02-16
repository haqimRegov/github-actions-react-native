import moment from "moment";
import React, { forwardRef, Fragment, MutableRefObject, useImperativeHandle, useRef } from "react";
import { View } from "react-native";
import { v1 as uuidv1 } from "uuid";

import { CustomSpacer } from "../../components";
import { flexRow, px, sh24, sw16, sw24 } from "../../styles";
import { deleteKey, formatAmount, isObjectEqual, parseAmount } from "../../utils";
import { calculateAvailableBalance, generateNewInfo, getAmount } from "./helpers";
import { ToggleCard } from "./ToggleCard";

export interface IPaymentSurplusRef {
  handleUseSurplus: (value: IPaymentInfo) => void;
}

interface PaymentSurplusProps {
  accountNames: TypeLabelValue[];
  availableBalance: IPaymentInfo[];
  completedSurplusCurrencies?: string[];
  existingPaidAmount: IOrderAmount[];
  handleUnsaved: (state: number) => void;
  oldPayment: IPaymentInfo;
  payment: IPaymentInfo;
  pendingCurrencies: string[];
  ref?: MutableRefObject<IPaymentSurplusRef | undefined>;
  setAvailableBalance: (value: IPaymentInfo[]) => void;
  setPayment: (value: IPaymentInfo) => void;
  totalInvestment: IOrderAmount[];
}

export const PaymentSurplus = forwardRef<IPaymentSurplusRef | undefined, PaymentSurplusProps>((props, ref) => {
  const {
    accountNames,
    availableBalance,
    completedSurplusCurrencies,
    existingPaidAmount,
    payment,
    pendingCurrencies,
    setAvailableBalance,
    setPayment,
    totalInvestment,
  } = props;

  const updatedCompletedSurplusCurrencies = completedSurplusCurrencies !== undefined ? completedSurplusCurrencies : [];
  const filteredAvailableBalance = availableBalance.filter(
    (eachAvailableBalance: IPaymentInfo) =>
      !updatedCompletedSurplusCurrencies.includes(eachAvailableBalance.currency) &&
      eachAvailableBalance.currency === "MYR" &&
      (pendingCurrencies.includes(eachAvailableBalance.currency as TypeCurrency) || eachAvailableBalance.parent === payment.tag?.uuid) &&
      eachAvailableBalance.orderNumber !== payment.orderNumber &&
      eachAvailableBalance.currency === payment.currency,
  );
  const getAvailableExcessAmount = (surplus: IPaymentInfo) => {
    const utilisedAmount = [...surplus.utilised!];
    const filterUtilisedAmount = utilisedAmount.length > 0 ? utilisedAmount.filter((bal) => bal.paymentId !== payment.paymentId) : [];
    const totalUtilisedAmount =
      filterUtilisedAmount.length > 0
        ? filterUtilisedAmount
            .map((util) => parseInt(util.amount, 10))
            .reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount)
        : 0;

    return parseInt(surplus.initialExcess!.amount, 10) - totalUtilisedAmount;
  };

  const filteredSurplus = filteredAvailableBalance.filter((bal) => {
    const isCurrentSurplus = payment.tag !== undefined && payment.tag.uuid === bal.parent;

    const availableExcessAmount = getAvailableExcessAmount(bal);

    return bal.parent !== payment.paymentId && bal.excess !== undefined && (availableExcessAmount > 0 || isCurrentSurplus === true);
  });

  const uniqueId = useRef(payment.paymentId || uuidv1());

  const handleUseSurplus = (surplus: IPaymentInfo) => {
    let newPaymentInfo: IPaymentInfo;
    let newAvailableBalance: IPaymentInfo[];
    const currencyInvestedAmount = getAmount(totalInvestment, surplus.excess!.currency as TypeCurrency);
    const currencyPaidAmount = getAmount(existingPaidAmount, surplus.excess!.currency as TypeCurrency);
    const pendingCurrencyAmount = currencyInvestedAmount - parseAmount(currencyPaidAmount.toString());
    // toggle use of surplus
    if (payment.tag === undefined || (payment.tag !== undefined && payment.tag.uuid !== surplus.parent)) {
      const paymentInfo = deleteKey(surplus, ["orderNumber", "excess", "paymentId"]);
      const cleanPaymentInfo = Object.fromEntries(Object.entries(paymentInfo).filter(([_, field]) => field != null));
      const currentPaymentAmount = parseInt(payment.amount, 10);

      const surplusSelected = payment.tag !== undefined && payment.tag.uuid === surplus.parent;
      const availableExcessAmount = getAvailableExcessAmount(surplus);

      const availableAmount = surplusSelected ? availableExcessAmount + currentPaymentAmount : availableExcessAmount;

      const utilisedAmount = availableAmount <= pendingCurrencyAmount ? availableAmount : pendingCurrencyAmount;

      newPaymentInfo = {
        ...payment,
        ...cleanPaymentInfo,
        amount: formatAmount(utilisedAmount.toString()),
        belongsTo: surplus.orderNumber,
        new: undefined,
        parent: undefined,
        paymentId: uniqueId.current,
        remark: undefined,
        saved: false,
        tag: { orderNumber: surplus.orderNumber, uuid: surplus.parent as string },
        transactionDate:
          typeof surplus.transactionDate === "string" ? moment(surplus.transactionDate, "x").toDate() : surplus.transactionDate,
      };

      // filter previously utilised surplus within same payment info session
      const cleanAvailableBalance = availableBalance.map((bal) => {
        const updatedUtilised: IUtilisedAmount[] = bal.utilised!.filter((util) => util.paymentId !== uniqueId.current);
        return { ...bal, utilised: updatedUtilised };
      });

      newAvailableBalance = calculateAvailableBalance(cleanAvailableBalance, newPaymentInfo, false);
    } else {
      newAvailableBalance = calculateAvailableBalance(availableBalance, payment, true);
      // cancel use of surplus
      newPaymentInfo = generateNewInfo(
        "Cash",
        [],
        { label: payment.currency, value: payment.currency as TypeCurrency },
        payment.orderNumber,
        undefined,
        accountNames,
      );
    }
    const checkSurplusSame =
      props.oldPayment.tag !== undefined && newPaymentInfo.tag !== undefined && isObjectEqual(props.oldPayment.tag!, newPaymentInfo.tag!);
    if (checkSurplusSame === true) {
      props.handleUnsaved(-1);
    }
    setAvailableBalance(newAvailableBalance);
    const checkIsEditable = payment.isEditable !== undefined ? { isEditable: payment.isEditable } : {};
    setPayment({ ...newPaymentInfo, ...checkIsEditable });
  };

  useImperativeHandle(ref, () => ({ handleUseSurplus }));

  return (
    <View>
      {filteredSurplus.length > 0 ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <View style={px(sw24)}>
            <View style={flexRow}>
              {filteredSurplus.map((currentSurplus: IPaymentInfo, index: number) => {
                const surplusSelected = payment.tag !== undefined && payment.tag.uuid === currentSurplus.parent;

                const availableExcessAmount = getAvailableExcessAmount(currentSurplus);
                const currentAmountLabel = availableExcessAmount > parseInt(payment.amount, 10) ? availableExcessAmount : payment.amount;
                const amountLabel = surplusSelected === true ? currentAmountLabel : availableExcessAmount;

                const title = `${currentSurplus.excess!.currency} ${formatAmount(amountLabel)}`;

                const handlePress = () => {
                  handleUseSurplus(currentSurplus);
                };

                return (
                  <Fragment key={index}>
                    <ToggleCard
                      type="Use of Surplus"
                      title={title}
                      description1={currentSurplus.orderNumber}
                      description2={currentSurplus.paymentMethod}
                      onPress={handlePress}
                      selected={surplusSelected}
                    />
                    {index === filteredSurplus.length - 1 ? null : <CustomSpacer isHorizontal={true} space={sw16} />}
                  </Fragment>
                );
              })}
            </View>
          </View>
        </Fragment>
      ) : null}
    </View>
  );
});
