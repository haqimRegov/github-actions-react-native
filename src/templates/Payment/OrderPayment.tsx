import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IconButton, PromptModal, TableBadge } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_PAYMENT_METHOD } from "../../data/dictionary/payment-method";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlue5,
  borderLeftGray3,
  circle,
  circleBorder,
  colorBlue,
  colorGreen,
  colorWhite,
  colorYellow,
  fs12BoldBlue1,
  fs12BoldYellow2,
  fs12RegGray4,
  fs16BoldBlue1,
  fs16RegBlue1,
  fs20BoldBlue1,
  fsAlignLeft,
  fullWidth,
  px,
  rowCenterVertical,
  sh24,
  sh6,
  sh8,
  sh80,
  shadow16Blue112,
  sw1,
  sw16,
  sw24,
  sw4,
  sw40,
  sw8,
} from "../../styles";
import { AnimationUtils, formatAmount } from "../../utils";
import { OrderOverview } from "../Onboarding/OrderOverview";
import { AddedInfo } from "./AddedInfo";
import { generateNewInfo, handleAvailableBalance, handleReduceAmount } from "./helpers";
import { PaymentInfo } from "./PaymentInfo";

const { PAYMENT } = Language.PAGE;

export interface OrderPaymentProps {
  accountNames: TypeLabelValue[];
  applicationBalance: IPaymentInfo[];
  activeOrder: { order: string; fund: string };
  deleteCount: number;
  deletedPayment: IPaymentInfo[];
  proofOfPayment: IPaymentRequired;
  setActiveOrder: (value: { order: string; fund: string }) => void;
  setProofOfPayment: (value: IPaymentRequired, action?: ISetProofOfPaymentAction, deleted?: boolean) => void;
  setDeleteCount: (count: number) => void;
  setDeletedPayment: (value: IPaymentInfo[]) => void;
  setApplicationBalance: (value: IPaymentInfo[], deleted?: boolean) => void;
}

export interface ISetPaymentOptions {
  additional?: boolean;
  delete?: boolean;
  new?: boolean;
  save?: boolean;
}

export const OrderPayment: FunctionComponent<OrderPaymentProps> = ({
  accountNames,
  applicationBalance,
  activeOrder,
  deleteCount,
  deletedPayment,
  proofOfPayment,
  setActiveOrder,
  setApplicationBalance,
  setDeleteCount,
  setDeletedPayment,
  setProofOfPayment,
}: OrderPaymentProps) => {
  const {
    allowedRecurringType,
    completedSurplusCurrencies,
    // completed,
    // floatingAmount,
    epfAccountNumber,
    createdOn,
    funds,
    orderNumber,
    paymentCount,
    payments,
    paymentType,
    totalInvestment,
    totalPaidAmount,
    recurringDetails,
    // surplusBalance,
    // balance,
  } = proofOfPayment;

  const [unsavedPrompt, setUnsavedPrompt] = useState<boolean>(false);
  const [balance, setBalance] = useState<IOrderAmount[]>([]);
  const [pendingBalance, setPendingBalance] = useState<IOrderAmount[]>([]);
  const [activeInfo, setActiveInfo] = useState<number>(payments.length);
  const [editPrompt, setEditPrompt] = useState<number>(-1);
  const [unsavedChanges, setUnsavedChanges] = useState<number>(-1);

  const completed = balance.some((findPending) => findPending.amount.startsWith("-")) === false;

  const balanceCurrencies = pendingBalance.length > 0 ? [...pendingBalance] : [...totalInvestment];
  const currencies = balanceCurrencies.map((value) => ({ label: value.currency, value: value.currency }));

  const setPayments = (value: IPaymentInfo[], action?: ISetProofOfPaymentAction, deleted?: boolean) => {
    // check if there is unsaved changes but overrode the prompt with noPrompt (this is possible if the user edits a saved info but decided to remove it)
    if (unsavedChanges !== -1) {
      setUnsavedChanges(-1);
    }
    setProofOfPayment({ ...proofOfPayment, payments: value }, action, deleted);
  };

  const handleExpandPayment = (latestPayment: IPaymentInfo[], noPrompt?: boolean) => {
    AnimationUtils.layout({ duration: activeOrder.order === orderNumber ? 200 : 300 });
    const updatedInfo = [...latestPayment];
    // collapse
    if (unsavedChanges !== -1 && noPrompt === undefined) {
      return setUnsavedPrompt(true);
    }

    // add new payment info
    if (
      completed === false &&
      activeOrder.order === "" &&
      (payments.length === 0 || (paymentCount > 0 && payments[payments.length - 1].saved === true))
    ) {
      const recurringAmount = paymentType === "Recurring" ? totalInvestment[0].amount : "";
      const newInfo = generateNewInfo(
        paymentType,
        allowedRecurringType,
        currencies[0],
        orderNumber,
        epfAccountNumber,
        accountNames,
        recurringAmount,
      );
      updatedInfo.push(newInfo);
      setPayments(updatedInfo, undefined, false);
    }

    // show last payment info
    setActiveInfo(updatedInfo.length - 1);

    return setActiveOrder({ ...activeOrder, order: activeOrder.order === orderNumber ? "" : orderNumber });
  };

  const handleCollapse = () => {
    handleExpandPayment(payments, true);
    setActiveInfo(-1);
    setUnsavedChanges(-1);
  };

  const container: ViewStyle = {
    ...shadow16Blue112,
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
  };

  const headerStyle: ViewStyle = {
    ...rowCenterVertical,
    ...px(sw24),
    height: sh80,
  };

  const withPayment = payments.some((payment) => payment.saved || payment.paymentId) || (totalPaidAmount && totalPaidAmount.length < 0);
  const withSurplus = payments.some((payment) => payment.tag !== undefined);
  const collapsedHeaderIcon = payments.some((findSaved) => findSaved.saved) || withPayment === true ? "caret-down" : "plus";
  const headerIcon = activeOrder.order === orderNumber ? "minus" : collapsedHeaderIcon;

  const handleCancelPrompt = () => {
    setUnsavedChanges(-1);
    setActiveInfo(payments.length);
    const updatedPayments = [...payments];
    const findUnsaved = updatedPayments.findIndex((findPayment) => findPayment.saved === false);

    if (findUnsaved !== -1) {
      updatedPayments.splice(findUnsaved, 1);
      setPayments(updatedPayments, undefined, false);
    }

    setUnsavedPrompt(false);
    handleExpandPayment(updatedPayments, true);
  };

  const handlePressIcon = () => {
    handleExpandPayment(payments);
  };

  const handleContinuePrompt = () => {
    setUnsavedPrompt(false);
  };

  const handleCancelEdit = () => {
    setEditPrompt(-1);
  };

  useEffect(() => {
    const savedPayments = payments.length > 0 ? payments.filter((pay) => pay.saved || pay.isEditable !== undefined) : [];
    const checkBalance = handleAvailableBalance(savedPayments, totalInvestment);
    const checkPendingBalance = checkBalance.filter((bal) => parseInt(bal.amount, 10) < 0);
    setBalance(checkBalance);
    setPendingBalance(checkPendingBalance);
    setProofOfPayment({
      ...proofOfPayment,
      payments: payments,
      status: checkPendingBalance.length === 0 ? "Completed" : "Pending Payment",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments]);

  const completePaymentCount = DICTIONARY_PAYMENT_METHOD.map((method) => {
    const count = payments.reduce(
      // eslint-disable-next-line no-param-reassign
      (acc, cur) => ((cur.saved === true || cur.paymentId) && cur.paymentMethod === method.value ? ++acc : acc),
      0,
    );
    return { method: method.value, count: count };
  });

  const filterRecurringAndEpf = proofOfPayment.payments.filter(
    (eachPOP: IPaymentInfo) => (eachPOP.paymentMethod === "EPF" || eachPOP.paymentMethod === "Recurring") && eachPOP.saved === true,
  );
  let displayText = "";
  if (filterRecurringAndEpf.length > 0) {
    displayText =
      filterRecurringAndEpf[0].paymentMethod === "Recurring"
        ? `1 ${filterRecurringAndEpf[0].recurringType}`
        : `1 ${filterRecurringAndEpf[0].paymentMethod}`;
  }
  const checkDisplayText = displayText !== "" ? <Text style={fs16BoldBlue1}>{displayText}</Text> : null;

  const promptStyle = { ...fsAlignLeft, ...fullWidth };

  return (
    <View>
      <OrderOverview
        completed={completed}
        createdOn={createdOn}
        funds={funds}
        orderNumber={orderNumber}
        totalInvestment={totalInvestment}
        paymentType={paymentType}
      />
      <CustomSpacer space={sh8} />
      <View style={container}>
        <View style={headerStyle}>
          {withPayment ? (
            <Fragment>
              <IconButton
                color={colorWhite._1}
                name={completed ? "success" : "info-bare"}
                size={sw16}
                style={circle(sw24, completed ? colorGreen._1 : colorYellow._2)}
              />
              <CustomSpacer isHorizontal={true} space={sw24} />
              <View>
                <View style={rowCenterVertical}>
                  <Text style={fs12RegGray4}>{PAYMENT.LABEL_PROOF}</Text>
                  {withSurplus ? (
                    <Fragment>
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <TableBadge text="Use of Surplus" />
                    </Fragment>
                  ) : null}
                </View>
                <CustomSpacer space={sh6} />
                <View style={rowCenterVertical}>
                  {completePaymentCount.filter((pay) => pay.count > 0).length > 0
                    ? completePaymentCount
                        .filter((pay) => pay.count > 0)
                        .map(({ count, method }, index) => {
                          return (
                            <View key={index} style={rowCenterVertical}>
                              {index === 0 ? null : <View style={{ ...borderLeftGray3, height: sh24, marginHorizontal: sw16 }} />}
                              <Text style={fs16BoldBlue1}>{count}</Text>
                              <CustomSpacer isHorizontal={true} space={sw4} />
                              <Text style={fs16RegBlue1}>{method}</Text>
                            </View>
                          );
                        })
                    : checkDisplayText}
                </View>
              </View>
              <CustomFlexSpacer />
              <View>
                {balance
                  .filter((bal) => bal.amount.startsWith("-") === false && bal.amount !== "0")
                  .map(({ amount, currency }, index) => {
                    return <Text key={index} style={fs12BoldBlue1}>{`+ ${currency} ${formatAmount(amount)}`}</Text>;
                  })}
              </View>
              <CustomSpacer isHorizontal={true} space={sw24} />
              <View>
                {balance
                  .filter((bal) => bal.amount.startsWith("-") && bal.amount !== "0")
                  .map(({ amount, currency }, index) => {
                    return (
                      <Text key={index} style={fs12BoldYellow2}>{`- ${currency} ${
                        formatAmount(amount) ? formatAmount(amount.substring(1)) : "-"
                      }`}</Text>
                    );
                  })}
              </View>
              <CustomSpacer isHorizontal={true} space={sw24} />
            </Fragment>
          ) : (
            <Fragment>
              <IcoMoon color={colorBlue._1} name="payment" size={sw24} />
              <CustomSpacer isHorizontal={true} space={sw16} />
              <Text style={fs20BoldBlue1}>{PAYMENT.LABEL_PROOF_ADD}</Text>
              <CustomFlexSpacer />
            </Fragment>
          )}
          <IconButton
            color={colorBlue._1}
            name={headerIcon}
            onPress={handlePressIcon}
            size={sw24}
            style={circleBorder(sw40, sw1, colorBlue._4)}
          />
        </View>
        {activeOrder.order === orderNumber ? (
          <Fragment>
            <View style={borderBottomBlue5} />
            {payments.map((payment: IPaymentInfo, index: number) => {
              // sum of paid amount without current payment info to disable add info when the total has reached the investment amount
              const existingPaidAmount = handleReduceAmount(
                payments
                  .filter((_, filterIndex) => filterIndex !== index)
                  .map((pay) => ({ currency: pay.currency as TypeCurrency, amount: pay.amount })),
              );

              const handleRemove = () => {
                const updatedPayments = [...payments];
                // delete in surplus balance
                const newAvailableBalance = [...applicationBalance];
                if (updatedPayments[index].parent !== undefined) {
                  const findExistingSurplusParent = newAvailableBalance.findIndex((bal) => bal.parent === updatedPayments[index].parent);
                  if (findExistingSurplusParent !== -1) {
                    newAvailableBalance.splice(findExistingSurplusParent, 1);
                  }
                }
                // update utilised surplus balance when removing a child
                if (updatedPayments[index].tag !== undefined) {
                  const findSurplusIndex = newAvailableBalance.findIndex(
                    (eachAvailableSurplus: IPaymentInfo) => eachAvailableSurplus.parent === updatedPayments[index].tag?.uuid,
                  );
                  if (findSurplusIndex !== -1) {
                    newAvailableBalance[findSurplusIndex] = {
                      ...newAvailableBalance[findSurplusIndex],
                      utilised: newAvailableBalance[findSurplusIndex].utilised?.filter(
                        (eachUtilisedSurplus: IUtilisedAmount) => eachUtilisedSurplus.paymentId !== updatedPayments[index].paymentId,
                      ),
                    };
                  }
                }
                setApplicationBalance(newAvailableBalance, true);

                // delete saved payment
                if (updatedPayments[index].isEditable === true) {
                  const updateDeleted = [...deletedPayment];
                  updateDeleted.push({
                    ...updatedPayments[index],
                    action: { id: updatedPayments[index].paymentId!, option: "delete" },
                  });
                  setDeletedPayment(updateDeleted);
                }
                const getPaymentId = updatedPayments[index].excess !== undefined ? updatedPayments[index].paymentId : undefined;
                updatedPayments.splice(index, 1);
                const action: ISetProofOfPaymentAction | undefined =
                  getPaymentId !== undefined ? { paymentId: getPaymentId, option: "delete" } : undefined;
                setPayments(updatedPayments, action, true);
                setDeleteCount(deleteCount + 1);
                setActiveInfo(updatedPayments.length - 1);
                handleExpandPayment(updatedPayments, true);
              };

              const handleSave = (value: IPaymentInfo, additional?: boolean) => {
                const updatedPayments = [...payments];

                updatedPayments[index] = { ...updatedPayments[index], ...value };

                if (additional === true) {
                  // update currency list when adding additional info for multi currency
                  const updatedBalance = handleAvailableBalance(updatedPayments, totalInvestment);
                  const updatedCurrencies =
                    updatedBalance.length > 0
                      ? updatedBalance
                          .filter((bal) => parseInt(bal.amount, 10) < 0)
                          .map((filtered) => ({ label: filtered.currency, value: filtered.currency }))
                      : currencies;
                  const recurringAmount = paymentType === "Recurring" ? totalInvestment[0].amount : "";
                  const additionalInfo = generateNewInfo(
                    paymentType,
                    allowedRecurringType,
                    updatedCurrencies[0],
                    orderNumber,
                    undefined,
                    accountNames,
                    recurringAmount,
                  );
                  updatedPayments.push(additionalInfo);
                  setActiveInfo(updatedPayments.length - 1);
                }
                // check if existing surplus parent and delete all child if parent got updated
                const findExistingSurplusParent =
                  value.excess !== undefined && value.parent !== undefined
                    ? applicationBalance.findIndex((bal) => bal.parent === value.parent)
                    : -1;
                const checkIfUtilised =
                  findExistingSurplusParent !== -1 ? applicationBalance[findExistingSurplusParent].utilised!.length > 0 : false;
                const getPaymentId = checkIfUtilised === true ? payments[index].paymentId : undefined;
                const action: ISetProofOfPaymentAction | undefined =
                  getPaymentId !== undefined ? { paymentId: getPaymentId, option: "update" } : undefined;

                setPayments(updatedPayments, action, false);

                if (additional !== true) {
                  handleCollapse();
                }
              };

              const handleEdit = () => {
                if (unsavedChanges !== -1) {
                  return setEditPrompt(index);
                }
                if (payment.saved === false) {
                  return setEditPrompt(index);
                }

                if (payments.some((pay) => pay.new === true)) {
                  const updatedPayments = payments.filter((pay) => pay.new === undefined);
                  setPayments(updatedPayments, undefined, false);
                }

                return setActiveInfo(index);
              };

              const handleContinueEdit = () => {
                const updatedPayments = payments.map((info) => info).filter((unsavedInfo) => unsavedInfo.saved === true);
                setPayments(updatedPayments, undefined, false);
                setActiveInfo(editPrompt);
                setEditPrompt(-1);
                setUnsavedChanges(-1);
              };

              const handleEditSaved = () => {
                setUnsavedChanges(index);
              };

              return (
                <Fragment key={index}>
                  {index === 0 ? null : <View style={borderBottomBlue5} />}
                  {activeInfo === index ? (
                    <PaymentInfo
                      accountNames={accountNames}
                      allowedRecurringType={allowedRecurringType}
                      availableBalance={applicationBalance}
                      completedSurplusCurrencies={completedSurplusCurrencies}
                      createdOn={moment(createdOn, "x").toDate()}
                      currencies={currencies}
                      existingPaidAmount={existingPaidAmount}
                      epfAccountNumber={epfAccountNumber || "-"}
                      funds={funds}
                      handleEditSaved={handleEditSaved}
                      handleRemove={handleRemove}
                      handleSave={handleSave}
                      payment={payment}
                      pendingBalance={pendingBalance}
                      totalInvestment={totalInvestment}
                      recurringDetails={recurringDetails}
                      setAvailableBalance={setApplicationBalance}
                    />
                  ) : (
                    <AddedInfo payment={payment} handleEdit={handleEdit} />
                  )}
                  <PromptModal
                    visible={editPrompt !== -1}
                    handleCancel={handleCancelEdit}
                    handleContinue={handleContinueEdit}
                    label={PAYMENT.PROMPT_TITLE_EDIT}
                    labelContinue={PAYMENT.BUTTON_EDIT}
                    title={PAYMENT.PROMPT_SUBTITLE_UNSAVED}
                    labelStyle={promptStyle}
                    titleStyle={promptStyle}
                  />
                </Fragment>
              );
            })}
          </Fragment>
        ) : null}
      </View>
      <CustomSpacer space={sh24} />
      <PromptModal
        handleCancel={handleCancelPrompt}
        handleContinue={handleContinuePrompt}
        label={PAYMENT.PROMPT_TITLE_UNSAVED}
        labelCancel={PAYMENT.BUTTON_CLOSE}
        labelContinue={PAYMENT.BUTTON_CONTINUE}
        labelStyle={promptStyle}
        title={PAYMENT.PROMPT_SUBTITLE_CONTINUE}
        titleStyle={promptStyle}
        visible={unsavedPrompt}
      />
    </View>
  );
};
