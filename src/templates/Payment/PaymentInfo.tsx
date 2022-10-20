import cloneDeep from "lodash.clonedeep";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { v1 as uuidv1 } from "uuid";

import { PaymentProof, PaymentRemark } from ".";
import {
  CustomCard,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  CustomTooltip,
  FileViewer,
  IconButton,
  LabeledTitle,
  NewActionButtonProps,
  NewActionButtons,
  NewDropdown,
  PromptModal,
  TextSpaceArea,
} from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_KIB_BANK_ACCOUNTS, ERROR } from "../../data/dictionary";
import {
  border,
  centerHorizontal,
  circle,
  colorBlue,
  colorGray,
  DEVICE,
  disabledOpacity6,
  fs10RegBlue9,
  fs12RegGray5,
  fs12RegWhite1,
  fs16BoldBlue1,
  fs16BoldGray6,
  fs16RegGray6,
  fsAlignLeft,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh2,
  sh24,
  sh4,
  sh40,
  sh56,
  sh80,
  sw05,
  sw12,
  sw16,
  sw24,
  sw240,
  sw360,
  sw4,
  sw40,
  sw64,
  sw7,
  sw8,
} from "../../styles";
import {
  deleteKey,
  formatAmount,
  isAmount,
  isNotEmpty,
  isObjectEqual,
  parseAmount,
  parseAmountToString,
  validateObject,
} from "../../utils";
import { generateNewInfo, getAmount, scaledSpaceBetween, validateCtaNumber } from "./helpers";
import { NewCheque, NewCTA, NewEPF, NewOnlineBanking, NewRecurring } from "./Method";
import { IPaymentCardStackRef, PaymentCardStack } from "./Surplus";

const { PAYMENT } = Language.PAGE;

interface PaymentInfoProps {
  accountNames: TypeLabelValue[];
  allowedRecurringType?: string[];
  availableBalance: IPaymentInfo[];
  completedSurplusCurrencies?: string[];
  createdOn: Date;
  ctaDetails?: TypeCTADetails[];
  currencies: TypeCurrencyLabelValue[];
  currentPayments: IPaymentInfo[];
  deletedPayment: IPaymentInfo[];
  epfAccountNumber?: string;
  existingPaidAmount: IOrderAmount[];
  funds: IOrderInvestment[];
  handleEditSaved: () => void;
  handleRemove: () => void;
  handleSave: (value: IPaymentInfo, additional?: boolean, isPaymentEqual?: boolean) => void;
  handleUnsaved: (state: number) => void;
  localCtaDetails: TypeCTADetails[] | undefined;
  payment: IPaymentInfo;
  pendingBalance: IOrderAmount[];
  recurringDetails?: IRecurringDetails;
  setAvailableBalance: (value: IPaymentInfo[], deleted?: boolean) => void;
  totalInvestment: IOrderAmount[];
}

export interface IPaymentError {
  amount: string | undefined;
  checkNumber: string | undefined;
  ctaNumber: string | undefined;
}

export const PaymentInfo: FunctionComponent<PaymentInfoProps> = ({
  accountNames,
  allowedRecurringType,
  availableBalance,
  completedSurplusCurrencies,
  createdOn,
  ctaDetails,
  currencies,
  currentPayments,
  epfAccountNumber,
  existingPaidAmount,
  funds,
  handleEditSaved,
  handleRemove,
  handleSave,
  handleUnsaved,
  localCtaDetails,
  payment,
  pendingBalance,
  recurringDetails,
  setAvailableBalance,
  totalInvestment,
}: PaymentInfoProps) => {
  const surplusRef = useRef<IPaymentCardStackRef>();
  const [draftPayment, setDraftPayment] = useState<IPaymentInfo>(payment);
  const [draftAvailableBalance, setDraftAvailableBalance] = useState<IPaymentInfo[]>(cloneDeep(availableBalance));
  const [duplicatePrompt, setDuplicatePrompt] = useState<"with-excess" | "no-excess" | "same-cta" | undefined>(undefined);
  const [deletePrompt, setDeletePrompt] = useState<boolean>(false);
  const [updatePrompt, setUpdatePrompt] = useState<"add" | "save" | undefined>(undefined);
  const [error, setError] = useState<IPaymentError>({ amount: undefined, checkNumber: undefined, ctaNumber: undefined });
  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);
  const draftPaymentWithoutRemark = deleteKey(draftPayment, ["remark", "saved"]);
  const paymentWithoutRemark = deleteKey(payment, ["remark", "saved"]);
  const isPaymentEqual = isObjectEqual(draftPaymentWithoutRemark, paymentWithoutRemark);
  const useOfSurplus = draftPayment.tag !== undefined;
  const useOfCta = draftPayment.ctaTag !== undefined;

  let paymentField: JSX.Element;
  let saveDisabled = true;
  let noMorePending = false;

  const paymentMethods = [
    { label: "Online Banking / TT / ATM", value: "Online Banking / TT / ATM" },
    { label: "Client Trust Account (CTA)", value: "Client Trust Account (CTA)" },
  ];

  if (currencies.some((currency) => currency.value === "MYR" && draftPayment.currency === "MYR")) {
    paymentMethods.splice(1, 0, { label: "Cheque", value: "Cheque" });
  }
  const updatedCurrencies = currencies.filter((eachCurrency: TypeCurrencyLabelValue) => {
    const filteredPOPs = currentPayments.filter((eachPayments: IPaymentInfo) => eachPayments.currency === eachCurrency.value);
    const totalCurrencyPaid =
      filteredPOPs.length > 0
        ? filteredPOPs.map((eachMapped: IPaymentInfo) => parseAmount(eachMapped.amount)).reduce((current, total) => current + total)
        : 0;
    const totalInvestmentIndex = totalInvestment.findIndex((eachTotal: IOrderAmount) => eachTotal.currency === eachCurrency.value);
    return totalCurrencyPaid - parseAmount(totalInvestment[totalInvestmentIndex].amount) < 0 || eachCurrency.value === payment.currency;
  });

  const fundsPerUtmc = [...new Set(funds.map((eachFund: IOrderInvestment) => eachFund.fundIssuer))];
  const paymentFieldProps = { payment: draftPayment, setPayment: setDraftPayment, setViewFile: setViewFile, useOfSurplus: useOfSurplus };
  switch (draftPayment.paymentMethod) {
    case "Cheque":
      paymentField = (
        <NewCheque {...paymentFieldProps} createdOn={createdOn} error={error} setError={setError} useOfSurplus={useOfSurplus} />
      );
      saveDisabled =
        (validateObject(draftPayment, [
          // "paymentMethod",
          "amount",
          // "currency",
          // "kibBankAccountNumber",
          // "kibBankName",
          "bankName",
          "checkNumber",
          "transactionDate",
          "proof",
        ]) && draftPayment.remark !== "") === false;
      break;

    case "EPF":
      paymentField = <NewEPF funds={funds} payment={draftPayment} setPayment={setDraftPayment} totalAmount={totalInvestment[0]} />;
      saveDisabled =
        (draftPayment.remark !== undefined && draftPayment.remark === "") ||
        (Array.isArray(draftPayment.epfReferenceNo) &&
          (draftPayment.epfReferenceNo.filter((eachReferenceNo: IEpfReferenceNo) => eachReferenceNo.error !== undefined).length > 0 ||
            draftPayment.epfReferenceNo.filter((eachRefNo: IEpfReferenceNo) => eachRefNo.referenceNo !== "").length !==
              fundsPerUtmc.length));
      break;

    case "Recurring":
      paymentField = (
        <NewRecurring
          accountNames={accountNames}
          allowedRecurringType={allowedRecurringType}
          payment={draftPayment}
          recurringDetails={recurringDetails}
          setPayment={setDraftPayment}
        />
      );
      saveDisabled =
        (validateObject(draftPayment, [
          // "paymentMethod",
          // "amount",
          // "currency",
          // "kibBankAccountNumber",
          // "kibBankName",
          "recurringBank",
          "bankAccountNumber",
          "bankAccountName",
          "recurringType",
          // "checkNumber",
          // "referenceNumber",
          // "epfReferenceNo",
          // "transactionDate",
          // "proof",
        ]) && draftPayment.remark !== "") === false;
      break;

    case "Client Trust Account (CTA)":
      paymentField = <NewCTA {...paymentFieldProps} accountNames={accountNames} error={error} setError={setError} />;
      saveDisabled =
        (validateObject(draftPayment, [
          // "paymentMethod",
          "amount",
          // "currency",
          // "kibBankAccountNumber",
          // "kibBankName",
          "clientName",
          "clientTrustAccountNumber",
          // "checkNumber",
          // "referenceNumber",
          // "epfReferenceNo",
          // "transactionDate",
          "proof",
        ]) && draftPayment.remark !== "") === false;
      break;

    default:
      paymentField = <NewOnlineBanking {...paymentFieldProps} createdOn={createdOn} useOfSurplus={useOfSurplus} />;
      saveDisabled =
        (validateObject(draftPayment, [
          // "paymentMethod",
          "amount",
          // "currency",
          // "kibBankAccountNumber",
          // "kibBankName",
          "bankName",
          "referenceNumber",
          "transactionDate",
          "proof",
        ]) && draftPayment.remark !== "") === false;
      break;
  }

  const withInputError = error.amount !== undefined || error.checkNumber !== undefined || error.ctaNumber !== undefined;

  // input error on blur
  if (withInputError === true) {
    saveDisabled = true;
  }

  const currencyTotalPaid = getAmount(existingPaidAmount, draftPayment.currency as TypeCurrency);
  const currentAmount =
    draftPayment.amount !== "" && error.amount === undefined ? parseInt(parseAmountToString(draftPayment.amount), 10) : 0;
  const currencyInvestedAmount = getAmount(totalInvestment, draftPayment.currency as TypeCurrency);
  const totalAmount = currencyTotalPaid + currentAmount;

  // for CTA payment
  const pendingAmount = currencyInvestedAmount - currencyTotalPaid;

  const otherCurrencyPendingBalance = pendingBalance.filter((amount) => amount.currency !== draftPayment.currency);

  if (totalAmount >= currencyInvestedAmount && otherCurrencyPendingBalance.length === 0) {
    noMorePending = true;
  }

  const findSurplusParent = draftAvailableBalance.findIndex((bal) => bal.parent === draftPayment.parent);
  const balanceSharedTo =
    findSurplusParent !== -1 ? draftAvailableBalance[findSurplusParent].utilised!.map((util) => util.orderNumber) : [];
  const savedSharedTo = isNotEmpty(draftPayment.parent) && isNotEmpty(draftPayment.sharedTo) ? draftPayment.sharedTo! : [];
  const surplusSharedTo = savedSharedTo.length > 0 ? savedSharedTo : balanceSharedTo;
  const sharedToTitle = surplusSharedTo.join(", ");

  const findCtaParent = localCtaDetails !== undefined ? localCtaDetails.findIndex((cta) => cta.ctaParent === draftPayment.ctaParent) : -1;
  const findOldCtaParent =
    findCtaParent === -1 && payment.ctaParent !== undefined && localCtaDetails !== undefined
      ? localCtaDetails.findIndex((cta) => cta.ctaParent === payment.ctaParent)
      : -1;

  const ctaParentIndex = findCtaParent !== -1 ? findCtaParent : findOldCtaParent;
  const ctaBalanceSharedTo = ctaParentIndex !== -1 ? localCtaDetails![ctaParentIndex].ctaUsedBy!.map((usedBy) => usedBy.orderNumber!) : [];
  const ctaSavedSharedTo = isNotEmpty(payment.sharedTo) && payment.paymentMethod === "Client Trust Account (CTA)" ? payment.sharedTo! : [];
  const combineCtaSharedTo = ctaSavedSharedTo.concat(ctaBalanceSharedTo);
  const uniqueCtaSharedTo = combineCtaSharedTo.filter((orderNum, index) => combineCtaSharedTo.indexOf(orderNum) === index);

  const ctaSharedToTitle = uniqueCtaSharedTo.join(", ");

  let removePromptTitle = `${PAYMENT.PROMPT_SUBTITLE_REMOVE}\n\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM}`;
  let updatePromptTitle = `${PAYMENT.PROMPT_SUBTITLE_UPDATE}\n\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM}`;

  if (surplusSharedTo.length > 0) {
    removePromptTitle = `${PAYMENT.PROMPT_SUBTITLE_REMOVE}\n${PAYMENT.PROMPT_SUBTITLE_SURPLUS}`;
    updatePromptTitle = `${PAYMENT.PROMPT_SUBTITLE_UPDATE}\n${PAYMENT.PROMPT_SUBTITLE_SURPLUS}`;
  }

  if (uniqueCtaSharedTo.length > 0) {
    removePromptTitle = `${PAYMENT.PROMPT_SUBTITLE_REMOVE}\n${PAYMENT.PROMPT_SUBTITLE_DELETE_CTA}`;
    updatePromptTitle = `${PAYMENT.PROMPT_SUBTITLE_UPDATE}\n${PAYMENT.PROMPT_SUBTITLE_DELETE_CTA}`;
  }

  const ctaUseSubtitle = `\n\n${PAYMENT.PROMPT_SUBTITLE_USE_CTA}`;

  // check for existing surplus from reference or cheque number
  const findSameSurplus = draftAvailableBalance.findIndex((bal) => {
    return (
      ((draftPayment.paymentMethod === "Cheque" &&
        draftPayment.checkNumber === bal.checkNumber &&
        draftPayment.parent !== bal.parent &&
        bal.checkNumber !== "") ||
        (draftPayment.paymentMethod === "Online Banking / TT / ATM" &&
          draftPayment.referenceNumber === bal.referenceNumber &&
          draftPayment.parent !== bal.parent &&
          bal.referenceNumber !== "")) &&
      draftPayment.currency === bal.currency
    );
  });

  // check for existing cta from cta number and client name
  const findSameCta =
    ctaDetails !== undefined
      ? ctaDetails.findIndex((cta) => {
          const sameCtaNumber =
            draftPayment.clientTrustAccountNumber !== "" && draftPayment.clientTrustAccountNumber === cta.clientTrustAccountNumber;
          const sameClientName = draftPayment.clientName !== "" && draftPayment.clientName === cta.clientName;
          const checkClientName = accountNames.length > 1 ? sameClientName : true;

          return draftPayment.paymentMethod === "Client Trust Account (CTA)" && sameCtaNumber === true && checkClientName === true;
        })
      : -1;

  const matchedSurplus: IPaymentInfo | undefined = findSameSurplus !== -1 ? draftAvailableBalance[findSameSurplus] : undefined;
  const matchedCta: TypeCTADetails | undefined = findSameCta !== -1 ? ctaDetails![findSameCta] : undefined;

  let availableExcess = 0;

  if (matchedSurplus !== undefined) {
    const totalUtilisedAmount =
      matchedSurplus.utilised !== undefined && matchedSurplus.utilised.length > 0
        ? matchedSurplus.utilised.map((util) => parseInt(util.amount, 10)).reduce((total: number, current: number) => total + current)
        : 0;

    availableExcess = parseAmount(matchedSurplus.initialExcess!.amount) - totalUtilisedAmount;
  }

  const labelAmount =
    availableExcess > 0 && matchedSurplus !== undefined ? `${matchedSurplus.excess!.currency} ${formatAmount(availableExcess)}.` : "";

  const noExcessPromptTitle = `${PAYMENT.PROMPT_SUBTITLE_ORDER} ${matchedSurplus !== undefined ? matchedSurplus.orderNumber : ""} ${
    PAYMENT.PROMPT_SUBTITLE_NO_SURPLUS
  }`;

  const withExcessPromptTitle = `${PAYMENT.PROMPT_SUBTITLE_ORDER} ${matchedSurplus !== undefined ? matchedSurplus.orderNumber : ""} ${
    PAYMENT.PROMPT_SUBTITLE_WITH_SURPLUS
  } ${labelAmount}`;

  const setAmount = (value: string) => {
    setDraftPayment({ ...draftPayment, amount: value });
  };

  const setCurrency = (value: string) => {
    const filteredKibAccount = DICTIONARY_KIB_BANK_ACCOUNTS.filter((bank) => bank.currency === value);
    const blankCheque =
      value !== "MYR" && draftPayment.paymentMethod === "Cheque"
        ? {
            bankName: "",
            checkNumber: "",
            transactionDate: undefined,
          }
        : {};

    const updatedPayments = {
      ...draftPayment,
      currency: value,
      kibBankName: filteredKibAccount[0].bankName,
      kibBankAccountNumber: filteredKibAccount[0].bankAccountNumber,
      ...blankCheque,
      paymentMethod: value !== "MYR" && draftPayment.paymentMethod === "Cheque" ? "Online Banking / TT / ATM" : draftPayment.paymentMethod,
    };

    setDraftPayment(updatedPayments);
  };

  const validateAmount = (value: string, paymentMethod: TypePaymentMethod) => {
    const cleanValue = value.replace(/[,]/g, "");
    const amount: IAmountValueError = { value: cleanValue, error: undefined };
    if (isAmount(cleanValue) === false) {
      return { ...amount, error: ERROR.INVESTMENT_INVALID_AMOUNT };
    }
    if (parseAmount(cleanValue) === 0) {
      return { ...amount, error: ERROR.INVESTMENT_MIN_AMOUNT, value: formatAmount(cleanValue) };
    }
    if (paymentMethod === "Client Trust Account (CTA)" && parseAmount(cleanValue) > pendingAmount) {
      return { ...amount, error: ERROR.INVESTMENT_MAX_AMOUNT };
    }
    return { ...amount, value: formatAmount(cleanValue) };
  };

  const checkAmount = (latestPayment?: IPaymentInfo) => {
    const paymentToBeUsed = latestPayment !== undefined ? latestPayment : draftPayment;
    const amount = validateAmount(paymentToBeUsed.amount, paymentToBeUsed.paymentMethod);
    setError({ ...error, amount: amount.error });
    // set formatted amount on blur
    // TODO check for unnecessary re-render
    setAmount(amount.value);

    return amount;
  };

  const handleAmountBlur = () => {
    checkAmount();
  };

  const setPaymentMethod = (value: string) => {
    const kibCurrencyIndex = DICTIONARY_KIB_BANK_ACCOUNTS.findIndex((bank) => bank.currency === draftPayment.currency);
    const kibBank = kibCurrencyIndex !== -1 ? DICTIONARY_KIB_BANK_ACCOUNTS[kibCurrencyIndex] : DICTIONARY_KIB_BANK_ACCOUNTS[0];
    const cleanCtaInfo: Partial<IPaymentInfo> =
      draftPayment.paymentMethod === "Client Trust Account (CTA)"
        ? {
            amount: "",
            clientName: "",
            clientTrustAccountNumber: "",
            proof: undefined,
            remark: undefined,
            transactionDate: undefined,
          }
        : {};
    const cleanChequeInfo: Partial<IPaymentInfo> =
      draftPayment.paymentMethod === "Cheque"
        ? {
            amount: "",
            bankName: "",
            checkNumber: "",
            proof: undefined,
            remark: undefined,
            transactionDate: undefined,
          }
        : {};
    const cleanOnlineInfo: Partial<IPaymentInfo> =
      draftPayment.paymentMethod === "Online Banking / TT / ATM"
        ? {
            amount: "",
            bankName: "",
            referenceNumber: "",
            proof: undefined,
            remark: undefined,
            transactionDate: undefined,
          }
        : {};
    // clean payment info when changing payment method of a saved proof of payment
    setDraftPayment({
      ...draftPayment,
      ...cleanCtaInfo,
      ...cleanChequeInfo,
      ...cleanOnlineInfo,
      paymentMethod: value as TypePaymentMethod,
      checkNumber:
        draftPayment.paymentMethod !== value && draftPayment.paymentMethod === "Online Banking / TT / ATM" ? "" : draftPayment.checkNumber,
      referenceNumber:
        draftPayment.paymentMethod !== value &&
        (draftPayment.paymentMethod === "Cheque" || draftPayment.paymentMethod === "Client Trust Account (CTA)")
          ? ""
          : draftPayment.referenceNumber,
      kibBankAccountNumber: kibBank.bankAccountNumber,
      kibBankName: kibBank.bankName,
    });
  };

  const handleContinuePrompt = () => {
    handleRemove();
  };

  const paymentToBeSaved = (latestPayment: IPaymentInfo) => {
    // Total investment - the total amount of POPs for that currency
    const excessAmount = totalAmount > currencyInvestedAmount ? totalAmount - currencyInvestedAmount : 0;
    let id = latestPayment.paymentId;

    if (!id) {
      id = uuidv1();
    }
    const updatedPayment: IPaymentInfo = {
      ...latestPayment,
      // check if saved payment info from backend
      action: latestPayment.isEditable !== undefined ? { id: id, option: "update" } : undefined,
      amount: latestPayment.amount === "" && latestPayment.paymentType === "EPF" ? totalInvestment[0].amount : latestPayment.amount,
      lastAmountUpdate: excessAmount > 0 ? moment().format("x") : undefined,
      excess: excessAmount > 0 ? { currency: latestPayment.currency as TypeCurrency, amount: excessAmount.toString() } : undefined,
      initialExcess: excessAmount > 0 ? { amount: excessAmount.toString(), currency: latestPayment.currency as TypeCurrency } : undefined,
      new: undefined,
      parent: excessAmount > 0 ? id : undefined,
      paymentId: id,
      ctaParent: latestPayment.paymentMethod === "Client Trust Account (CTA)" && latestPayment.ctaTag === undefined ? id : undefined,
      // always setting to empty array if it's a CTA Parent and removing the ctaUsedBy if it's Non-CTA or a CTA Child
      ctaUsedBy: latestPayment.paymentMethod === "Client Trust Account (CTA)" && latestPayment.ctaTag === undefined ? [] : undefined,
      saved: true,
      sharedTo: latestPayment.isEditable !== undefined && isPaymentEqual === false ? [] : latestPayment.sharedTo,
    };
    return updatedPayment;
  };

  const updateAvailableBalance = (latestPayment: IPaymentInfo) => {
    const hasExcess = latestPayment.excess !== undefined;
    const updatedPayment: IPaymentInfo = { ...latestPayment, utilised: hasExcess ? [] : undefined };
    const newAvailableBalance = cloneDeep(draftAvailableBalance);
    // Update available balance only if the any of the content is updated
    if (isPaymentEqual === false) {
      // if (updatedPayment.parent !== undefined) {
      const findExistingSurplusParent = newAvailableBalance.findIndex((bal) => bal.parent === updatedPayment.paymentId);

      // payment is an existing surplus
      if (findExistingSurplusParent !== -1) {
        if (hasExcess === true) {
          // update existing surplus
          // TODO do not update available balance if user didn't update anything
          newAvailableBalance.splice(findExistingSurplusParent, 1, updatedPayment);
        } else {
          // delete existing surplus
          newAvailableBalance.splice(findExistingSurplusParent, 1);
        }
        // new payment with surplus
      } else if (hasExcess === true) {
        newAvailableBalance.push(updatedPayment);
      }
      // }

      const newAvailableBalanceWithId: IPaymentInfo[] = newAvailableBalance.map((bal) => {
        const updatedUtilised: IUtilisedAmount[] = bal.utilised!.map((util) => ({
          ...util,
          paymentId: util.paymentId !== undefined ? util.paymentId : updatedPayment.paymentId!,
        }));

        return { ...bal, utilised: updatedUtilised };
      });
      // update application balance for new or updated surplus, and for use of surplus
      setAvailableBalance(newAvailableBalanceWithId, undefined);
    }

    // // check if payment info has surplus
  };

  const saveUpdatedInfo = (add?: boolean) => {
    const cleanPayment = paymentToBeSaved(draftPayment);
    const amount = checkAmount(cleanPayment);
    const ctaNumberError = cleanPayment.paymentMethod === "Client Trust Account (CTA)" ? validateCtaNumber(cleanPayment) : undefined;
    if (ctaNumberError !== undefined) {
      setError({ ...error, ctaNumber: ctaNumberError });
    }
    if (amount.error === undefined && ctaNumberError === undefined) {
      updateAvailableBalance(cleanPayment);
      handleSave({ ...cleanPayment, amount: amount.value }, add, isPaymentEqual);
    }
  };

  const handleSaveInfo = () => {
    // TODO do not show prompt and do not update available balance if no changes are made
    // if (balanceSharedTo.length > 0 && isPaymentEqual === false) {
    if (balanceSharedTo.length > 0 && draftPayment.isEditable !== false && isPaymentEqual === false) {
      return setUpdatePrompt("save");
    }
    if (uniqueCtaSharedTo.length > 0 && draftPayment.isEditable !== false && isPaymentEqual === false) {
      return setUpdatePrompt("save");
    }
    return saveUpdatedInfo();
  };

  const handleAddInfo = () => {
    // TODO do not show prompt and do not update available balance if no changes are made
    // if (balanceSharedTo.length > 0 && isPaymentEqual === false) {
    if (balanceSharedTo.length > 0 && isPaymentEqual === false) {
      return setUpdatePrompt("add");
    }
    if (uniqueCtaSharedTo.length > 0 && draftPayment.isEditable !== false && isPaymentEqual === false) {
      return setUpdatePrompt("add");
    }
    return saveUpdatedInfo(true);
  };

  const handleContinueRemove = () => {
    handleRemove();
  };

  const handleContinueUpdate = () => {
    saveUpdatedInfo(updatePrompt === "add" ? true : undefined);
  };

  const handleRemoveInfo = () => {
    if (isPaymentEqual === true && draftPayment.saved === false) {
      return handleContinuePrompt();
    }
    return setDeletePrompt(true);
  };

  const handleCancelPrompt = () => {
    if (updatePrompt !== undefined) {
      setUpdatePrompt(undefined);
    }
    if (deletePrompt === true) {
      setDeletePrompt(false);
    }
  };

  const handleCloseViewer = () => {
    setViewFile(undefined);
  };

  const handleCancelDuplicate = async () => {
    setDuplicatePrompt(undefined);
    setDraftPayment({ ...draftPayment, referenceNumber: "", checkNumber: "", clientTrustAccountNumber: "" });
  };

  const handleUseSurplus = () => {
    if (surplusRef.current !== undefined && matchedSurplus !== undefined) {
      surplusRef.current.handleUseSurplus(matchedSurplus);
      setError({ amount: undefined, checkNumber: undefined, ctaNumber: undefined });
    }
    setDuplicatePrompt(undefined);
  };

  const handleUseCta = () => {
    if (surplusRef.current !== undefined && matchedCta !== undefined) {
      surplusRef.current.handleUseCta(matchedCta as IPaymentInfo);
      setError({ amount: undefined, checkNumber: undefined, ctaNumber: undefined });
    }
    setDuplicatePrompt(undefined);
  };

  const secondaryButton: NewActionButtonProps | undefined =
    draftPayment.paymentMethod === "EPF" || draftPayment.paymentMethod === "Recurring"
      ? undefined
      : {
          buttonStyle: { backgroundColor: colorBlue._2, borderStyle: "dashed", borderColor: colorBlue._1_8 },
          disabled: noMorePending === true || saveDisabled === true,
          icon: "plus",
          iconColor: colorBlue._1,
          onPress: handleAddInfo,
          text: PAYMENT.BUTTON_ADDITIONAL,
          textStyle: { ...fs16BoldBlue1, color: colorBlue._1_8 },
        };

  const baseItems = [
    <NewDropdown
      items={paymentMethods}
      handleChange={setPaymentMethod}
      label={PAYMENT.LABEL_PAYMENT_METHOD}
      value={draftPayment.paymentMethod}
    />,
    <View>
      <CustomTextInput
        disabled={draftPayment.paymentMethod === "EPF"}
        error={error.amount}
        inputPrefix={draftPayment.currency}
        keyboardType="numeric"
        label={PAYMENT.LABEL_AMOUNT}
        onBlur={handleAmountBlur}
        onChangeText={setAmount}
        placeholder="0.00"
        value={draftPayment.amount}
      />
      {draftPayment.paymentMethod === "Client Trust Account (CTA)" && error.amount === undefined ? (
        <TextSpaceArea
          spaceToTop={sh4}
          style={{ ...fs12RegGray5, ...px(sw16) }}
          text={`Max amount ${draftPayment.currency} ${formatAmount(pendingAmount.toString())}`}
        />
      ) : null}
    </View>,
  ];

  const epfBaseItems = [
    <LabeledTitle label={PAYMENT.LABEL_EPF_ACCOUNT} spaceToLabel={sh4} title={epfAccountNumber} style={{ width: sw360 }} />,
  ];

  if (updatedCurrencies.length > 1 && draftPayment.paymentMethod !== "Cheque") {
    baseItems.splice(
      1,
      0,
      <View />,
      <NewDropdown items={updatedCurrencies} handleChange={setCurrency} label={PAYMENT.LABEL_CURRENCY} value={draftPayment.currency} />,
    );
  }

  const surplusItems = [
    <LabeledTitle label={PAYMENT.LABEL_PAYMENT_METHOD} spaceToLabel={sh4} title={draftPayment.paymentMethod} style={{ width: sw360 }} />,
    <LabeledTitle
      label={PAYMENT.LABEL_AMOUNT}
      spaceToLabel={sh4}
      title={`${draftPayment.currency} ${formatAmount(draftPayment.amount)}`}
      style={{ width: sw360 }}
    />,
  ];

  if (useOfCta === true) {
    baseItems.splice(
      0,
      1,
      <LabeledTitle label={PAYMENT.LABEL_PAYMENT_METHOD} spaceToLabel={sh4} title={draftPayment.paymentMethod} style={{ width: sw360 }} />,
    );
  }

  const checkRecurringItems = draftPayment.paymentType === "Recurring" ? [] : baseItems;
  const checkBaseItems = draftPayment.paymentType === "EPF" ? epfBaseItems : checkRecurringItems;

  const pendingCurrencies = availableBalance.map((eachBalance) => eachBalance.currency);
  const promptStyle = { ...fsAlignLeft, ...fullWidth };

  // effect to check when a saved info was edited or deleted
  useEffect(() => {
    if (isPaymentEqual === false) {
      if (draftPayment.saved === true) {
        setDraftPayment({ ...draftPayment, saved: false });
        if (deletePrompt === true) {
          setDraftPayment({ ...payment });
          setDeletePrompt(false);
        }
      }
      // To check if we have edited the POP but went back to using the same surplus. No need to show modal.
      const checkSurplusSame = payment.tag !== undefined && draftPayment.tag !== undefined && isObjectEqual(draftPayment.tag, payment.tag);
      const recurringAmount = payment.paymentType === "Recurring" ? totalInvestment[0].amount : "";
      const dummyDefaultInfo = generateNewInfo(
        payment.paymentType,
        allowedRecurringType!,
        updatedCurrencies[0],
        payment.orderNumber,
        epfAccountNumber,
        accountNames,
        recurringAmount,
      );
      if (
        (draftPayment.new !== true && checkSurplusSame === false) ||
        (draftPayment.saved === false && isObjectEqual(draftPayment, dummyDefaultInfo) === false && draftPayment.tag === undefined)
      ) {
        handleEditSaved();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftPayment, payment]);

  useEffect(() => {
    setDraftAvailableBalance(cloneDeep(availableBalance));
    setDraftPayment(payment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBalance]);

  // effect to check for existing surplus using reference or cheque number
  useEffect(() => {
    if (
      matchedSurplus !== undefined &&
      (draftPayment.tag === undefined || (draftPayment.tag !== undefined && draftPayment.tag.uuid !== matchedSurplus.parent)) &&
      (matchedSurplus.paymentId !== draftPayment.paymentId || matchedSurplus.paymentId === undefined)
    ) {
      setDuplicatePrompt(availableExcess > 0 ? "with-excess" : "no-excess");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedSurplus]);

  // effect to check for existing cta using cta number
  useEffect(() => {
    if (
      matchedCta !== undefined &&
      (draftPayment.ctaTag === undefined || (draftPayment.ctaTag !== undefined && draftPayment.ctaTag.uuid !== matchedCta.ctaParent)) &&
      (matchedCta.paymentId !== draftPayment.paymentId || matchedCta.paymentId === undefined)
    ) {
      setDuplicatePrompt("same-cta");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedCta]);

  const checkScaledSpace = DEVICE.SCREEN.WIDTH !== 1080 ? scaledSpaceBetween() : sw64;
  const textContainerStyle: ViewStyle = { ...px(sw4), ...py(sh2), ...border(colorBlue._9, sw05, sw4) };
  const checkPaymentLabel = payment.paymentType === "Recurring" ? PAYMENT.LABEL_ADD_RECURRING_INFO : PAYMENT.LABEL_ADD_PAYMENT;
  const checkPaymentLabelEPF = payment.paymentType === "EPF" ? PAYMENT.LABEL_ADD_EPF_DETAILS : checkPaymentLabel;

  return (
    <View>
      <View style={{ ...rowCenterVertical, ...px(sw24), backgroundColor: colorGray._1, height: sh56 }}>
        <Text style={fs16BoldGray6}>{checkPaymentLabelEPF}</Text>
        {payment.excess !== undefined && payment.excess !== null && payment.excess.currency === "MYR" ? (
          <Fragment>
            <CustomSpacer isHorizontal={true} space={sw8} />
            <View style={textContainerStyle}>
              <Text style={fs10RegBlue9}>{PAYMENT.LABEL_SURPLUS}</Text>
            </View>
          </Fragment>
        ) : null}
        <CustomFlexSpacer />
        {draftPayment.isEditable !== false ? (
          <IconButton color={colorBlue._1} name="trash" onPress={handleRemoveInfo} size={sw24} style={circle(sw40)} />
        ) : (
          <CustomTooltip
            content={<Text style={fs12RegWhite1}>{PAYMENT.TOOLTIP_REMOVE}</Text>}
            contentStyle={{ height: sh80, width: sw240 }}
            arrowSize={{ width: sw12, height: sw7 }}
            placement="left">
            <View onStartShouldSetResponderCapture={() => true}>
              <IconButton color={colorBlue._1} name="trash" size={sw24} style={{ ...circle(sw40), ...disabledOpacity6 }} />
            </View>
          </CustomTooltip>
        )}
      </View>
      {draftPayment.paymentType === "Cash" && payment.isEditable !== false ? (
        <PaymentCardStack
          accountNames={accountNames}
          availableBalance={draftAvailableBalance}
          completedSurplusCurrencies={completedSurplusCurrencies}
          ctaDetails={ctaDetails}
          existingPaidAmount={existingPaidAmount}
          handleEditSaved={handleEditSaved}
          handleUnsaved={handleUnsaved}
          oldPayment={payment}
          payment={draftPayment}
          pendingCurrencies={pendingCurrencies}
          ref={surplusRef}
          setAvailableBalance={setDraftAvailableBalance}
          setPayment={setDraftPayment}
          totalInvestment={totalInvestment}
        />
      ) : null}
      <View>
        {payment.paymentType !== "Cash" ? <CustomSpacer space={sh24} /> : null}
        <View style={px(sw24)}>
          <CustomCard
            spaceBetweenGroup={sh24}
            spaceBetweenItem={checkScaledSpace}
            items={useOfSurplus === true || draftPayment.isEditable === false ? surplusItems : checkBaseItems}
          />
        </View>
      </View>
      {paymentField}
      <View style={px(sw24)}>
        <PaymentProof {...paymentFieldProps} />
        <PaymentRemark {...paymentFieldProps} />
      </View>
      <CustomSpacer space={sh40} />
      <NewActionButtons
        primary={{ onPress: handleSaveInfo, text: PAYMENT.BUTTON_SAVE, disabled: saveDisabled }}
        secondary={secondaryButton}
        buttonContainerStyle={centerHorizontal}
      />
      <CustomSpacer space={sh40} />
      <PromptModal
        handleCancel={handleCancelPrompt}
        handleContinue={handleContinueRemove}
        label={PAYMENT.PROMPT_TITLE_DELETE}
        labelContinue={PAYMENT.BUTTON_DELETE}
        labelStyle={promptStyle}
        title={removePromptTitle}
        titleStyle={promptStyle}
        visible={deletePrompt}>
        <Fragment>
          {surplusSharedTo.length > 0 ? (
            <View style={promptStyle}>
              <Text style={fs16BoldGray6}>{`${sharedToTitle}.`}</Text>
              <Text style={fs16RegGray6}>{`\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM}`}</Text>
            </View>
          ) : null}
          {uniqueCtaSharedTo.length > 0 ? (
            <View style={promptStyle}>
              <Text style={fs16BoldGray6}>{`${ctaSharedToTitle}.`}</Text>
              <Text style={fs16RegGray6}>{`\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM}`}</Text>
            </View>
          ) : null}
        </Fragment>
      </PromptModal>
      <PromptModal
        handleCancel={handleCancelPrompt}
        handleContinue={handleContinueUpdate}
        label={PAYMENT.PROMPT_TITLE_UPDATE}
        labelContinue={PAYMENT.BUTTON_UPDATE}
        labelStyle={promptStyle}
        visible={updatePrompt !== undefined}>
        <Fragment>
          {surplusSharedTo.length > 0 ? (
            <View style={promptStyle}>
              <Text style={fs16RegGray6}>{updatePromptTitle}</Text>
              <Text style={fs16BoldGray6}>{`${sharedToTitle}.`}</Text>
              <Text style={fs16RegGray6}>{`\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM_UPDATE}`}</Text>
            </View>
          ) : null}
          {uniqueCtaSharedTo.length > 0 ? (
            <View style={promptStyle}>
              <Text style={fs16RegGray6}>{updatePromptTitle}</Text>
              <Text style={fs16BoldGray6}>{`${ctaSharedToTitle}.`}</Text>
              <Text style={fs16RegGray6}>{`\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM_UPDATE}`}</Text>
            </View>
          ) : null}
        </Fragment>
      </PromptModal>
      <PromptModal
        handleCancel={handleCancelDuplicate}
        handleContinue={handleUseSurplus}
        label={PAYMENT.PROMPT_TITLE_DUPLICATE}
        labelContinue={PAYMENT.BUTTON_YES}
        labelStyle={promptStyle}
        visible={duplicatePrompt === "with-excess"}>
        <View style={promptStyle}>
          <Text style={fs16RegGray6}>{PAYMENT.PROMPT_SUBTITLE_MATCHES}</Text>
          <Text style={fs16BoldGray6}>{withExcessPromptTitle}</Text>
          <Text style={fs16RegGray6}>{`\n${PAYMENT.PROMPT_SUBTITLE_USE_SURPLUS}`}</Text>
        </View>
      </PromptModal>
      <PromptModal
        handleContinue={handleCancelDuplicate}
        label={PAYMENT.PROMPT_TITLE_DUPLICATE}
        labelContinue={PAYMENT.BUTTON_BACK_TO_PAYMENT}
        labelStyle={promptStyle}
        visible={duplicatePrompt === "no-excess"}>
        <View style={promptStyle}>
          <Text style={fs16RegGray6}>{PAYMENT.PROMPT_SUBTITLE_MATCHES}</Text>
          <Text style={fs16BoldGray6}>{noExcessPromptTitle}</Text>
          <Text style={fs16RegGray6}>{`\n${PAYMENT.PROMPT_SUBTITLE_INSERT}`}</Text>
        </View>
      </PromptModal>
      <PromptModal
        handleCancel={handleCancelDuplicate}
        handleContinue={handleUseCta}
        label={PAYMENT.PROMPT_TITLE_DUPLICATE_CTA}
        labelContinue={PAYMENT.BUTTON_YES}
        labelStyle={promptStyle}
        visible={duplicatePrompt === "same-cta"}>
        <View style={promptStyle}>
          <Text style={fs16RegGray6}>
            {PAYMENT.PROMPT_SUBTITLE_CTA}
            <Text style={fs16BoldGray6}>{` ${matchedCta !== undefined ? matchedCta.clientTrustAccountNumber : ""} `}</Text>
            {PAYMENT.PROMPT_SUBTITLE_MATCHES_CTA}
            <Text style={fs16BoldGray6}>{` ${matchedCta !== undefined ? matchedCta.orderNumber : ""} `}</Text>
            {PAYMENT.PROMPT_SUBTITLE_CLIENT_NAME}
            <Text style={fs16BoldGray6}>{` ${matchedCta !== undefined ? matchedCta.clientName : ""}.`}</Text>
            {ctaUseSubtitle}
          </Text>
        </View>
      </PromptModal>
      {viewFile !== undefined ? (
        <FileViewer
          handleClose={handleCloseViewer}
          resourceType={viewFile.url !== undefined && "url" in viewFile ? "url" : "base64"}
          value={viewFile}
          visible={viewFile !== undefined}
        />
      ) : null}
    </View>
  );
};
