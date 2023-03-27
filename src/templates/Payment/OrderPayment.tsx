import cloneDeep from "lodash.clonedeep";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { v1 as uuidv1 } from "uuid";

import { CustomFlexSpacer, CustomSpacer, IconButton, PromptModal, TableBadge } from "../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../constants";
import { DICTIONARY_PAYMENT_METHOD } from "../../data/dictionary/payment-method";
import { IData } from "../../hooks";
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
  shadow4Blue008,
  sw1,
  sw16,
  sw18,
  sw24,
  sw4,
  sw40,
  sw8,
} from "../../styles";
import { AnimationUtils, formatAmount, isEmpty, isNotEmpty, isObjectEqual, parseAmount } from "../../utils";
import { FundOverview } from "../Onboarding";
import { AddedInfo } from "./AddedInfo";
import { filterDeletedSavedChild, generateNewInfo, handleAvailableBalance, handleReduceAmount, updateCtaUsedBy } from "./helpers";
import { PaymentInfo } from "./PaymentInfo";

const { PAYMENT } = Language.PAGE;

export interface OrderPaymentProps {
  accountNames: TypeLabelValue[];
  activeOrder: { order: string; fund: string };
  applicationBalance: IPaymentInfo[];
  deleteCount: number;
  deletedPayment: IPaymentInfo[];
  localCtaDetails: TypeCTADetails[];
  localRecurringDetails?: IRecurringDetails;
  parentIndex?: number;
  proofOfPayment: IPaymentRequired;
  setActiveOrder: (value: { order: string; fund: string }) => void;
  setApplicationBalance: (value: IPaymentInfo[], deleted?: boolean) => void;
  setDeleteCount: (count: number) => void;
  setDeletedPayment: (value: IPaymentInfo[]) => void;
  setLocalCtaDetails: (value: TypeCTADetails[]) => void;
  setLocalRecurringDetails?: (value: IRecurringDetails | undefined) => void;
  setProofOfPayment: (
    value: IPaymentRequired,
    action?: ISetProofOfPaymentAction,
    deleted?: boolean,
    setActiveInfo?: (index: number) => void,
  ) => void;
  setSavedChangesToast: (toggle: boolean) => void;
  setTempData: (newData: IData<IPaymentInfo>[] | undefined) => void;
  tempData: IData<IPaymentInfo>[] | undefined;
  transactionType?: TTransactionType;
}

export interface ISetPaymentOptions {
  additional?: boolean;
  delete?: boolean;
  new?: boolean;
  save?: boolean;
}

export const OrderPayment: FunctionComponent<OrderPaymentProps> = ({
  accountNames,
  activeOrder,
  applicationBalance,
  deleteCount,
  deletedPayment,
  localCtaDetails,
  localRecurringDetails,
  parentIndex,
  proofOfPayment,
  setActiveOrder,
  setApplicationBalance,
  setDeleteCount,
  setDeletedPayment,
  setLocalCtaDetails,
  setLocalRecurringDetails,
  setProofOfPayment,
  setSavedChangesToast,
  setTempData,
  tempData,
  transactionType,
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
    payments,
    paymentType,
    totalInvestment,
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
  const [mergeSurplusPrompt, setMergeSurplusPrompt] = useState<boolean>(false);

  const completed = balance.some((findPending) => findPending.amount.startsWith("-")) === false;

  const balanceCurrencies = pendingBalance.length > 0 ? [...pendingBalance] : [...totalInvestment];
  const currencies = balanceCurrencies.map((value) => ({ label: value.currency, value: value.currency }));

  const setPayments = (value: IPaymentInfo[], action?: ISetProofOfPaymentAction, deleted?: boolean) => {
    // check if there is unsaved changes but overrode the prompt with noPrompt (this is possible if the user edits a saved info but decided to remove it)
    if (unsavedChanges !== -1) {
      setUnsavedChanges(-1);
    }
    const savedPayments = payments.length > 0 ? value.filter((pay) => pay.saved || pay.isEditable !== undefined) : [];
    const checkBalance = handleAvailableBalance(savedPayments, totalInvestment);
    const checkPendingBalance = checkBalance.filter((bal) => parseInt(bal.amount, 10) < 0);

    // transferred the status check and update here from the useEffect since there is an issue with CTA payment in Onboarding,
    // the status of the current order is updated correctly. however, the useEffect of the other (and collapsed) order is being triggered so the status is changing back to Pending Payment
    // the saving of balance and pendingBalance are kept in the useEffect

    setProofOfPayment(
      { ...proofOfPayment, payments: value, status: checkPendingBalance.length === 0 ? "Completed" : "Pending Payment" },
      action,
      deleted,
      setActiveInfo,
    );
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
      (payments.length === 0 || (payments.length > 0 && payments[payments.length - 1].saved === true))
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
    ...shadow4Blue008,
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
  };

  const headerStyle: ViewStyle = {
    ...rowCenterVertical,
    ...px(sw24),
    height: sh80,
  };

  const withPayment = payments.some((payment) => payment.saved || payment.paymentId);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, deleteCount]);

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
      <CustomSpacer space={sh24} />
      <FundOverview
        completed={completed}
        createdOn={moment(createdOn, "x").format(DEFAULT_DATE_FORMAT)}
        funds={funds}
        orderNumber={orderNumber}
        totalInvestment={totalInvestment}
        transactionType={transactionType}
        paymentType={paymentType}
      />
      <CustomSpacer space={sh8} />
      <View style={container}>
        <View style={headerStyle}>
          {withPayment ? (
            <Fragment>
              {activeOrder.order === "" ? (
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
                                  <Text style={fs16RegBlue1}>{method === "Client Trust Account (CTA)" ? "CTA" : method}</Text>
                                </View>
                              );
                            })
                        : checkDisplayText}
                    </View>
                  </View>
                </Fragment>
              ) : (
                <Fragment>
                  <IcoMoon color={colorBlue._1} name="payment" size={sw24} />
                  <CustomSpacer isHorizontal={true} space={sw18} />
                  <View>
                    <View style={rowCenterVertical}>
                      <Text style={fs16RegBlue1}>{`${PAYMENT.LABEL_PROOF}:`}</Text>
                      <CustomSpacer isHorizontal={true} space={sw4} />
                      {completePaymentCount.filter((pay) => pay.count > 0).length > 0 ? (
                        <Text style={fs16RegBlue1}>{completePaymentCount.filter((pay) => pay.count > 0).length}</Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={rowCenterVertical}>
                    {balance.filter((eachBalance: IOrderAmount) => eachBalance.amount !== "0").length > 0 ? (
                      <Fragment>
                        <Text style={fs16BoldBlue1}>(</Text>
                        {balance
                          .filter((bal) => bal.amount.startsWith("-") && bal.amount !== "0")
                          .map(({ amount, currency }, index) => {
                            const balanceCurrencyText =
                              index === balance.filter((bal) => bal.amount.startsWith("-") && bal.amount !== "0").length - 1
                                ? `- ${currency} ${formatAmount(amount) ? formatAmount(amount.substring(1)) : "-"} `
                                : `- ${currency} ${formatAmount(amount) ? formatAmount(amount.substring(1)) : "-"}, `;
                            return (
                              <Text key={index} style={fs16BoldBlue1}>
                                {balanceCurrencyText}
                              </Text>
                            );
                          })}
                        {balance
                          .filter((bal) => bal.amount.startsWith("-") === false && bal.amount !== "0")
                          .map(({ amount, currency }, index) => {
                            const currencyText =
                              index === balance.filter((bal) => bal.amount.startsWith("-") === false && bal.amount !== "0").length - 1
                                ? `+ ${currency} ${formatAmount(amount)}`
                                : `+ ${currency} ${formatAmount(amount)},`;
                            return (
                              <Text key={index} style={fs16BoldBlue1}>
                                {currencyText}
                              </Text>
                            );
                          })}
                        <Text style={fs16BoldBlue1}>)</Text>
                      </Fragment>
                    ) : null}
                  </View>
                  <CustomSpacer isHorizontal={true} space={sw24} />
                </Fragment>
              )}
              <CustomFlexSpacer />
              {activeOrder.order === "" ? (
                <Fragment>
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
              ) : null}
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
                const newAvailableBalance = [...applicationBalance];

                // save in tempData
                const updatedTempData = tempData !== undefined ? tempData : [];
                setTempData([
                  ...updatedTempData,
                  {
                    index: index,
                    deletedData: [...payments][index],
                    parentIndex: parentIndex !== undefined ? parentIndex : undefined,
                  },
                ]);

                // delete in surplus balance
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
                const cloneLocalCtaDetails = cloneDeep(localCtaDetails);

                // delete CTA Parent in localCtaDetails
                if (updatedPayments[index].ctaParent !== undefined) {
                  const findExistingCtaParent = cloneLocalCtaDetails.findIndex(
                    (findCta: TypeCTADetails) => findCta.ctaParent === updatedPayments[index].paymentId,
                  );
                  if (findExistingCtaParent !== -1) {
                    // TODO Scenario: Remove CTA Parent
                    cloneLocalCtaDetails.splice(findExistingCtaParent, 1);
                  }

                  // update CTA Parent ctaUsedBy when removing a CTA Child
                  // TODO Scenario: Remove CTA Child
                  if ("ctaTag" in updatedPayments[index] && updatedPayments[index].ctaTag !== undefined) {
                    const latestCtaUsedBy = updateCtaUsedBy(cloneLocalCtaDetails, updatedPayments[index]);

                    if (latestCtaUsedBy !== undefined) {
                      cloneLocalCtaDetails[latestCtaUsedBy.index].ctaUsedBy = latestCtaUsedBy.ctaUsedBy;
                    }
                  }

                  setLocalCtaDetails(cloneLocalCtaDetails);
                }

                setApplicationBalance(newAvailableBalance, true);

                // TODO check if current POP is being used as a parent by another CTA Child POP in the same order
                // delete saved payment
                if (updatedPayments[index].isEditable === true) {
                  const updateDeleted = [...deletedPayment];
                  updateDeleted.push({
                    ...updatedPayments[index],
                    action: { id: updatedPayments[index].paymentId!, option: "delete" },
                  });

                  const savedChildToBeDeleted = filterDeletedSavedChild(updatedPayments, index);
                  if (savedChildToBeDeleted.length > 0) {
                    updateDeleted.push(...savedChildToBeDeleted);
                  }

                  setDeletedPayment(updateDeleted);
                }
                // let getPaymentId;
                let getPaymentId =
                  updatedPayments[index].excess !== undefined && updatedPayments[index].excess !== null
                    ? updatedPayments[index].paymentId
                    : undefined;
                let mode: TypeSetProofOfPaymentMode = getPaymentId !== undefined ? "surplus" : undefined;
                const checkIfCtaParent = updatedPayments[index].ctaParent !== undefined ? updatedPayments[index].paymentId : undefined;
                if (checkIfCtaParent !== undefined) {
                  getPaymentId = checkIfCtaParent;
                  mode = "cta";
                }
                updatedPayments.splice(index, 1);
                const action: ISetProofOfPaymentAction | undefined =
                  getPaymentId !== undefined ? { paymentId: getPaymentId, option: "delete", mode: mode } : undefined;
                setPayments(updatedPayments, action, true);
                setDeleteCount(deleteCount + 1);
                setActiveInfo(updatedPayments.length - 1);
                handleExpandPayment(updatedPayments, true);
              };

              const handleSave = (value: IPaymentInfo, additional?: boolean, isPaymentEqual?: boolean) => {
                let checkEditNewPayment = {};
                let checkIsEditable = {};
                const updatedPayments = cloneDeep(payments);
                const duplicatePayments = cloneDeep(payments);
                const currentAvailableBalance = cloneDeep(applicationBalance);
                const oldCtaParent =
                  updatedPayments[index].ctaParent !== undefined && updatedPayments[index].ctaParent === updatedPayments[index].paymentId
                    ? updatedPayments[index].paymentId
                    : undefined;
                // current payment before updating to draftPayment
                const oldSavedPayment = cloneDeep(updatedPayments[index]);
                const updatedDeletedPayments = [...deletedPayment];

                if (
                  (isPaymentEqual === false &&
                    updatedPayments[index].amount !== "" &&
                    updatedPayments[index].paymentType !== "Recurring") ||
                  (updatedPayments[index].paymentType === "Recurring" &&
                    updatedPayments[index].paymentId !== undefined &&
                    isPaymentEqual === false)
                ) {
                  setSavedChangesToast(true);
                }

                // overwrite old payment
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

                // use last recurring info
                if (setLocalRecurringDetails !== undefined && value.paymentMethod === "Recurring" && value.recurringType !== undefined) {
                  const newRecurringInfo: IRecurringInfo = {
                    bankAccountName: value.bankAccountName,
                    bankAccountNumber: value.bankAccountNumber,
                    frequency: value.frequency,
                    orderNumber: orderNumber,
                    recurringBank: value.recurringBank,
                  };

                  // only update saved recurring info if it's not using last info
                  if (value.usePreviousRecurring !== true) {
                    const updatedRecurringDetails: IRecurringDetails =
                      localRecurringDetails !== undefined ? localRecurringDetails : { dda: [], fpx: [] };

                    updatedRecurringDetails[value.recurringType.toLowerCase()] = [newRecurringInfo];
                    setLocalRecurringDetails(updatedRecurringDetails);
                  }
                }

                const cloneLocalCtaDetails = cloneDeep(localCtaDetails);
                let removeAllChildren = false;

                // find existing cta info using paymentId since ctaParent might already be undefined
                const findExistingCtaParent = cloneLocalCtaDetails.findIndex(
                  (findCta: TypeCTADetails) => findCta.ctaParent === updatedPayments[index].paymentId,
                );
                if (isPaymentEqual === false) {
                  // current POP is an existing CTA
                  if (findExistingCtaParent !== -1 && isPaymentEqual === false) {
                    // current POP is an existing CTA and it is an updated CTA Parent
                    if (updatedPayments[index].ctaParent !== undefined) {
                      // TODO Scenario: Edit CTA Parent
                      // TODO update CTA parent prompt
                      cloneLocalCtaDetails[findExistingCtaParent] = {
                        ...cloneLocalCtaDetails[findExistingCtaParent],
                        ...updatedPayments[index],
                      };
                    } else {
                      // current POP is an existing CTA but is not a CTA Parent anymore
                      // current POP may be a CTA Child but it will be handled separately
                      // TODO Scenario: Edit CTA Parent to Non-CTA (delete old CTA Parent)
                      // TODO Scenario: Edit CTA Parent to CTA Child (delete old CTA Parent)
                      cloneLocalCtaDetails.splice(findExistingCtaParent, 1);
                      // TODO Scenario: Edit CTA Parent to Non-CTA (delete children of old CTA Parent)
                      // TODO this will be triggered by Saved POP because the paymentId is already new
                      removeAllChildren = true;
                    }
                  } else if (updatedPayments[index].ctaParent !== undefined && updatedPayments[index].ctaTag === undefined) {
                    // current POP is not an existing CTA and it is a new CTA Parent
                    const latestCtaUsedBy = updateCtaUsedBy(cloneLocalCtaDetails, updatedPayments[index]);

                    if (latestCtaUsedBy !== undefined) {
                      cloneLocalCtaDetails[latestCtaUsedBy.index].ctaUsedBy = latestCtaUsedBy.ctaUsedBy;
                    }
                    // current POP may be a CTA Child but it will be handled separately
                    // TODO Scenario: New POP CTA Parent
                    // TODO Scenario: Edit Non-CTA to CTA Parent
                    // TODO Scenario: Edit CTA Child to CTA Parent (add new parent)
                    cloneLocalCtaDetails.push(updatedPayments[index]);
                  }

                  // current POP is a CTA Child (Use of CTA)
                  if ("ctaTag" in updatedPayments[index] && updatedPayments[index].ctaTag !== undefined) {
                    // check if current CTA Child POP is an existing CTA Child
                    const latestCtaUsedBy = updateCtaUsedBy(cloneLocalCtaDetails, updatedPayments[index]);
                    // update ctaUsedBy of the old parent of the CTA Child
                    if (latestCtaUsedBy !== undefined) {
                      // TODO Scenario: Edit CTA Child to another CTA Child
                      cloneLocalCtaDetails[latestCtaUsedBy.index].ctaUsedBy = latestCtaUsedBy.ctaUsedBy;
                    }

                    // look for the CTA Parent of the current CTA Child
                    // TODO Scenario: Edit CTA Child (nothing will change, just save normally)
                    const findParentCta = cloneLocalCtaDetails.findIndex(
                      (findCta: TypeCTADetails) => findCta.ctaParent === updatedPayments[index].ctaTag!.uuid,
                    );

                    if (findParentCta !== -1) {
                      // current CTA Child has a valid CTA Parent
                      const updatedCtaUsedBy =
                        "ctaUsedBy" in cloneLocalCtaDetails[findParentCta] && cloneLocalCtaDetails[findParentCta].ctaUsedBy !== undefined
                          ? [...cloneLocalCtaDetails[findParentCta].ctaUsedBy!]
                          : [];

                      // check if current POP is already in ctaUsedBy of the CTA Parent
                      const findInUsedBy = updatedCtaUsedBy.findIndex((findCtaTag) => findCtaTag.uuid === updatedPayments[index].paymentId);

                      // current POP is not yet in ctaUsedBy of CTA Parent (new Use of CTA)
                      if (findInUsedBy === -1) {
                        // TODO Scenario: New POP CTA Child
                        // TODO Scenario: Edit Non-CTA to CTA Child
                        updatedCtaUsedBy.push({ orderNumber: orderNumber, uuid: updatedPayments[index].paymentId! });
                        // TODO Scenario: Edit CTA Parent to CTA Child (update the ctaUsedBy of the parent)
                        cloneLocalCtaDetails[findParentCta].ctaUsedBy = updatedCtaUsedBy;
                      }
                    }
                  }

                  // TODO Scenario: Edit CTA Child to Non-CTA
                  if (updatedPayments[index].ctaParent === undefined && updatedPayments[index].ctaTag === undefined) {
                    const latestCtaUsedBy = updateCtaUsedBy(cloneLocalCtaDetails, updatedPayments[index]);
                    if (latestCtaUsedBy !== undefined) {
                      cloneLocalCtaDetails[latestCtaUsedBy.index].ctaUsedBy = latestCtaUsedBy.ctaUsedBy;
                    }
                  }
                }

                setLocalCtaDetails(cloneLocalCtaDetails);

                // Check if the edit has caused an update in the use of surplus in both scenarios where it turns from surplus to normal payment and surplus to another surplus
                // Check the tag equal to check if the surplus has changed
                // Check both tags to confirm that there is no update from or to surplus
                const checkTagEqual =
                  updatedPayments[index].tag !== undefined &&
                  value.tag !== undefined &&
                  isObjectEqual(updatedPayments[index].tag!, value.tag);

                const checkTagCondition = checkTagEqual === false && (value.tag !== undefined || updatedPayments[index].tag !== undefined);

                let checkCondition;

                if (updatedPayments[index].tag !== undefined) {
                  checkCondition = checkTagCondition;
                }

                const ctaParentToCtaChild =
                  isNotEmpty(oldSavedPayment) &&
                  isNotEmpty(oldSavedPayment.ctaParent) &&
                  isEmpty(updatedPayments[index].ctaParent) &&
                  isNotEmpty(updatedPayments[index].ctaTag);

                const ctaChildToCtaParent =
                  isNotEmpty(oldSavedPayment) &&
                  isNotEmpty(oldSavedPayment.ctaTag) &&
                  isEmpty(updatedPayments[index].ctaTag) &&
                  isNotEmpty(updatedPayments[index].ctaParent);

                const ctaChildToCtaChild =
                  isNotEmpty(oldSavedPayment) &&
                  isNotEmpty(oldSavedPayment.ctaTag) &&
                  isNotEmpty(updatedPayments[index].ctaTag) &&
                  updatedPayments[index].ctaTag!.uuid !== oldSavedPayment.ctaTag!.uuid;

                const ctaAndNonCta =
                  oldSavedPayment.isEditable !== undefined && oldSavedPayment.paymentMethod !== updatedPayments[index].paymentMethod;

                if (ctaAndNonCta || ctaParentToCtaChild || ctaChildToCtaParent || ctaChildToCtaChild) {
                  checkCondition = true;
                }

                if (value.action !== undefined && value.action.option === "update" && checkCondition) {
                  updatedDeletedPayments.push({
                    ...updatedPayments[index],
                    action: { id: updatedPayments[index].paymentId!, option: "delete" },
                  });
                  const newPaymentId = uuidv1();
                  checkEditNewPayment = {
                    action: undefined,
                    paymentId: newPaymentId,
                    parent: value.parent !== undefined ? newPaymentId : undefined,
                    ctaParent: value.ctaParent !== undefined ? newPaymentId : undefined,
                  };
                  // Update the isEditable back to undefined if the update caused a new payment
                  checkIsEditable = { isEditable: undefined };
                }

                updatedPayments[index] = {
                  ...updatedPayments[index], // value is already added here above
                  // ...value,
                  ...checkEditNewPayment,
                  ...checkIsEditable,
                };

                // check if existing surplus parent and delete all child if parent got updated
                const findExistingSurplusParent =
                  (value.excess !== undefined && value.excess !== null && value.parent !== undefined) ||
                  (duplicatePayments[index].parent !== undefined &&
                    duplicatePayments[index].excess !== undefined &&
                    duplicatePayments[index].excess !== null)
                    ? currentAvailableBalance.findIndex(
                        (bal) => bal.parent === value.parent || bal.parent === duplicatePayments[index].parent,
                      )
                    : -1;
                const checkIfUtilised =
                  findExistingSurplusParent !== -1 ? applicationBalance[findExistingSurplusParent].utilised!.length > 0 : false;

                let getPaymentId = checkIfUtilised === true ? payments[index].paymentId : undefined;
                let mode: TypeSetProofOfPaymentMode = getPaymentId !== undefined ? "surplus" : undefined;
                const ctaPaymentIdToUse =
                  oldCtaParent !== undefined && oldCtaParent !== getPaymentId ? oldCtaParent : updatedPayments[index].paymentId;
                const checkIfCtaParent =
                  updatedPayments[index].ctaParent !== undefined || removeAllChildren === true ? ctaPaymentIdToUse : undefined;

                if (checkIfCtaParent !== undefined) {
                  getPaymentId = checkIfCtaParent;
                  mode = "cta";
                  const savedChildToBeDeleted = filterDeletedSavedChild(updatedPayments, index);
                  if (savedChildToBeDeleted.length > 0) {
                    updatedDeletedPayments.push(...savedChildToBeDeleted);
                  }
                }
                const action: ISetProofOfPaymentAction | undefined =
                  getPaymentId !== undefined && isPaymentEqual === false
                    ? { paymentId: getPaymentId, option: "update", mode: mode }
                    : undefined;
                const surplusUuid =
                  updatedPayments !== undefined && updatedPayments[index].tag !== undefined ? updatedPayments[index].tag!.uuid : undefined;
                const checkDuplicateSurplus = updatedPayments.filter(
                  (eachPayment: IPaymentInfo) => eachPayment.tag !== undefined && eachPayment.tag.uuid === surplusUuid,
                );
                const checkSurplusAmountChanged =
                  duplicatePayments[index].amount !== updatedPayments[index].amount &&
                  updatedPayments[index].excess !== undefined &&
                  updatedPayments[index].excess !== null &&
                  updatedPayments[index].excess?.amount !== "";
                const newPayment = updatedPayments[index];

                if (checkSurplusAmountChanged === true && checkDuplicateSurplus.length <= 1) {
                  updatedPayments.splice(index, 1);
                  if (additional !== true) {
                    updatedPayments.push(newPayment);
                  } else {
                    updatedPayments.splice(updatedPayments.length - 1, 0, newPayment);
                  }
                }
                setPayments(updatedPayments, action, false);
                setDeletedPayment(updatedDeletedPayments);
                if (checkDuplicateSurplus.length > 1) {
                  setMergeSurplusPrompt(true);
                } else if (additional !== true) {
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

              const handleMergeSurplus = () => {
                const updatedPayments = [...payments];
                const checkDuplicateSurplus = updatedPayments.filter(
                  (eachPayment: IPaymentInfo) => eachPayment.tag !== undefined && eachPayment.tag.uuid === payment.tag?.uuid,
                );
                const sumOfDuplicateSurplus =
                  checkDuplicateSurplus.length > 0
                    ? checkDuplicateSurplus
                        .map((eachFiltered: IPaymentInfo) => parseAmount(eachFiltered.amount))
                        .reduce((acc, current) => acc + current)
                    : 0;
                const updatedApplicationBalance: IPaymentInfo[] = [...applicationBalance].map((eachBalance: IPaymentInfo) => {
                  if (eachBalance.parent === payment.tag?.uuid) {
                    const filteredUtilised =
                      eachBalance.utilised !== undefined
                        ? eachBalance.utilised.filter((eachUtilised: IUtilisedAmount) => eachUtilised.orderNumber !== payment.orderNumber)
                        : undefined;
                    if (filteredUtilised !== undefined) {
                      filteredUtilised.push({
                        amount: sumOfDuplicateSurplus.toString(),
                        orderNumber: payment.orderNumber,
                        paymentId: payment.paymentId!,
                      });
                    }
                    return {
                      ...eachBalance,
                      utilised: filteredUtilised,
                      amount: sumOfDuplicateSurplus.toString(),
                      paymentId: uuidv1(),
                    };
                  }
                  return eachBalance;
                });
                const filteredPayments = updatedPayments.filter(
                  (eachPayment: IPaymentInfo) =>
                    eachPayment.tag === undefined || (eachPayment.tag !== undefined && eachPayment.tag.orderNumber === payment.orderNumber),
                );
                const updatedPayment: IPaymentInfo = {
                  ...payment,
                  amount: sumOfDuplicateSurplus.toString(),
                  isEditable: undefined,
                };
                filteredPayments.push(updatedPayment);
                setPayments(filteredPayments);
                setApplicationBalance(updatedApplicationBalance);
                setMergeSurplusPrompt(false);
                handleCollapse();
                setSavedChangesToast(true);
              };

              const handleCancelMergeSurplus = () => {
                const updatedPayments = [...payments];
                const updatedApplicationBalance: IPaymentInfo[] = [...applicationBalance].map((eachBalance: IPaymentInfo) => {
                  if (eachBalance.parent === payment.tag?.uuid) {
                    const filteredUtilised =
                      eachBalance.utilised !== undefined
                        ? eachBalance.utilised.filter((eachUtilised: IUtilisedAmount) => eachUtilised.paymentId !== payment.paymentId)
                        : undefined;
                    return { ...eachBalance, utilised: filteredUtilised };
                  }
                  return eachBalance;
                });
                const newInfo = generateNewInfo(
                  paymentType,
                  allowedRecurringType,
                  { label: payment.currency, value: payment.currency as TypeCurrency },
                  orderNumber,
                  undefined,
                  accountNames,
                  "",
                );
                updatedPayments[index] = newInfo;
                setPayments(updatedPayments);
                setApplicationBalance(updatedApplicationBalance);
                setMergeSurplusPrompt(false);
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
                      ctaDetails={localCtaDetails}
                      currencies={currencies}
                      currentPayments={payments}
                      // deletedPayment={deletedPayment}
                      epfAccountNumber={epfAccountNumber || "-"}
                      existingPaidAmount={existingPaidAmount}
                      funds={funds}
                      handleEditSaved={handleEditSaved}
                      handleRemove={handleRemove}
                      handleSave={handleSave}
                      handleUnsaved={setUnsavedChanges}
                      localCtaDetails={localCtaDetails}
                      payment={payment}
                      pendingBalance={pendingBalance}
                      recurringDetails={localRecurringDetails !== undefined ? localRecurringDetails : recurringDetails}
                      setAvailableBalance={setApplicationBalance}
                      totalInvestment={totalInvestment}
                    />
                  ) : (
                    <AddedInfo availableBalance={applicationBalance} handleEdit={handleEdit} payment={payment} tempPayments={payments} />
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
                  <PromptModal
                    handleCancel={handleCancelMergeSurplus}
                    handleContinue={handleMergeSurplus}
                    label={PAYMENT.PROMPT_TITLE_DUPLICATE}
                    labelContinue={PAYMENT.BUTTON_YES}
                    labelStyle={promptStyle}
                    title={PAYMENT.PROMPT_SUBTITLE_DUPLICATE_SURPLUS}
                    titleStyle={promptStyle}
                    visible={mergeSurplusPrompt}
                  />
                </Fragment>
              );
            })}
          </Fragment>
        ) : null}
      </View>
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
