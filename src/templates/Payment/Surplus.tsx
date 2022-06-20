import moment from "moment";
import React, { forwardRef, Fragment, MutableRefObject, useImperativeHandle, useRef } from "react";
import { View } from "react-native";
import { v1 as uuidv1 } from "uuid";

import { CustomSpacer } from "../../components";
import { flexRow, flexWrap, px, sh24, sw16, sw24 } from "../../styles";
import { deleteKey, formatAmount, isObjectEqual, parseAmount } from "../../utils";
import { calculateAvailableBalance, generateNewInfo, getAmount } from "./helpers";
import { ToggleCard } from "./ToggleCard";

export interface IPaymentCardStackRef {
  handleUseSurplus: (value: IPaymentInfo) => void;
  handleUseCta: (value: IPaymentInfo) => void;
}

interface PaymentCardStackProps {
  accountNames: TypeLabelValue[];
  availableBalance: IPaymentInfo[];
  completedSurplusCurrencies?: string[];
  ctaDetails?: TypeCTADetails[];
  existingPaidAmount: IOrderAmount[];
  handleEditSaved: () => void;
  handleUnsaved: (state: number) => void;
  oldPayment: IPaymentInfo;
  payment: IPaymentInfo;
  pendingCurrencies: string[];
  ref?: MutableRefObject<IPaymentCardStackRef | undefined>;
  setAvailableBalance: (value: IPaymentInfo[]) => void;
  setPayment: (value: IPaymentInfo) => void;
  totalInvestment: IOrderAmount[];
}

export const PaymentCardStack = forwardRef<IPaymentCardStackRef | undefined, PaymentCardStackProps>((props, ref) => {
  const {
    accountNames,
    availableBalance,
    completedSurplusCurrencies,
    ctaDetails,
    existingPaidAmount,
    handleEditSaved,
    handleUnsaved,
    oldPayment,
    payment,
    pendingCurrencies,
    setAvailableBalance,
    setPayment,
    totalInvestment,
  } = props;

  const uniqueId = useRef(payment.paymentId || uuidv1());

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

  const filteredCta =
    ctaDetails !== undefined
      ? ctaDetails.filter((cta) => {
          const isCurrentCta = payment.ctaParent === undefined && payment.ctaTag !== undefined && payment.ctaTag.uuid === cta.ctaParent;

          return cta.ctaParent !== payment.paymentId || isCurrentCta;
        })
      : [];

  const handleUseSurplus = async (surplus: IPaymentInfo) => {
    let newPaymentInfo: IPaymentInfo;
    let newAvailableBalance: IPaymentInfo[];
    // toggle use of surplus
    if (payment.tag === undefined || (payment.tag !== undefined && payment.tag.uuid !== surplus.parent)) {
      const currencyInvestedAmount = getAmount(totalInvestment, surplus.excess!.currency);
      const currencyPaidAmount = getAmount(existingPaidAmount, surplus.excess!.currency);
      const pendingCurrencyAmount = currencyInvestedAmount - parseAmount(currencyPaidAmount.toString());
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
        clientName: "",
        clientTrustAccountNumber: "",
        ctaParent: undefined,
        ctaTag: undefined,
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
      oldPayment.tag !== undefined && newPaymentInfo.tag !== undefined && isObjectEqual(oldPayment.tag, newPaymentInfo.tag);
    if (checkSurplusSame === true) {
      handleUnsaved(-1);
    } else {
      handleEditSaved();
    }
    setAvailableBalance(newAvailableBalance);
    const finalPaymentInfo = { ...newPaymentInfo };
    setPayment(finalPaymentInfo);
    return finalPaymentInfo;
  };

  const handleUseCta = async (cta: TypeCTADetails) => {
    const ctaSelected = payment.ctaTag !== undefined && payment.ctaTag.uuid === cta.ctaParent;
    const cleanInfo = generateNewInfo(
      "Cash",
      [],
      { label: payment.currency, value: payment.currency as TypeCurrency },
      payment.orderNumber,
      undefined,
      accountNames,
    );
    const ctaInfo = ctaSelected
      ? {
          paymentId: uniqueId.current,
          // TODO check if this is still needed
          isEditable: oldPayment.isEditable !== undefined ? oldPayment.isEditable : undefined,
        }
      : {
          ...cta,
          action: undefined,
          amount: "",
          ctaParent: undefined,
          ctaTag: { orderNumber: cta.orderNumber, uuid: cta.ctaParent as string },
          ctaUsedBy: undefined,
          currency: payment.currency,
          isEditable: oldPayment.isEditable !== undefined ? oldPayment.isEditable : undefined,
          new: undefined,
          orderNumber: payment.orderNumber,
          paymentId: uniqueId.current,
          remark: undefined,
          saved: false,
        };
    // surplus was selected before using CTA, oldPayment is when it was previously saved as a use of surplus
    if (oldPayment.tag !== undefined || payment.tag !== undefined) {
      // recalculate balance after removing use of surplus
      const newAvailableBalance = calculateAvailableBalance(availableBalance, payment, true);
      setAvailableBalance(newAvailableBalance);
    }

    const newPaymentInfo = { ...cleanInfo, ...ctaInfo };
    const checkCtaSame =
      oldPayment.ctaTag !== undefined && newPaymentInfo.ctaTag !== undefined && isObjectEqual(oldPayment.ctaTag, newPaymentInfo.ctaTag);
    if (checkCtaSame === true) {
      handleUnsaved(-1);
    } else {
      handleEditSaved();
    }

    setPayment(newPaymentInfo);
  };

  useImperativeHandle(ref, () => ({ handleUseCta, handleUseSurplus }));

  return (
    <View>
      {filteredSurplus.length > 0 || (ctaDetails !== undefined && ctaDetails.length > 0) ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <View style={px(sw24)}>
            <View style={{ ...flexRow, ...flexWrap }}>
              {filteredSurplus.length > 0 &&
                filteredSurplus.map((currentSurplus: IPaymentInfo, index: number) => {
                  const currentSurplusSelected = payment.tag !== undefined && payment.tag.uuid === currentSurplus.parent;

                  const availableExcessAmount = getAvailableExcessAmount(currentSurplus);
                  const currentAmountLabel = availableExcessAmount > parseInt(payment.amount, 10) ? availableExcessAmount : payment.amount;
                  const amountLabel = currentSurplusSelected === true ? currentAmountLabel : availableExcessAmount;

                  const title = `${currentSurplus.excess!.currency} ${formatAmount(amountLabel)}`;

                  const handlePress = () => {
                    handleUseSurplus(currentSurplus);
                  };

                  return (
                    <Fragment key={index}>
                      <View style={{ marginBottom: sh24 }}>
                        <ToggleCard
                          type="Use of Surplus"
                          title={title}
                          description1={currentSurplus.orderNumber}
                          description2={currentSurplus.paymentMethod}
                          onPress={handlePress}
                          selected={currentSurplusSelected}
                        />
                      </View>
                      {index === filteredSurplus.length - 1 ? null : <CustomSpacer isHorizontal={true} space={sw16} />}
                    </Fragment>
                  );
                })}
              {filteredCta &&
                filteredCta.length > 0 &&
                filteredCta.map((cta: TypeCTADetails, ctaIndex: number) => {
                  const currentCtaSelected = payment.ctaTag !== undefined && payment.ctaTag.uuid === cta.ctaParent;

                  const handlePress = () => {
                    handleUseCta(cta);
                  };

                  return (
                    <Fragment key={ctaIndex}>
                      {filteredSurplus.length > 0 && ctaIndex === 0 ? <CustomSpacer isHorizontal={true} space={sw16} /> : null}
                      <View style={{ marginBottom: sh24 }}>
                        <ToggleCard
                          type="CTA"
                          title={cta.clientTrustAccountNumber || "-"}
                          description1={cta.clientName}
                          onPress={handlePress}
                          selected={currentCtaSelected}
                        />
                      </View>
                      {ctaIndex === filteredCta.length - 1 ? null : <CustomSpacer isHorizontal={true} space={sw16} />}
                    </Fragment>
                  );
                })}
            </View>
          </View>
        </Fragment>
      ) : (
        <CustomSpacer space={sh24} />
      )}
    </View>
  );
});
