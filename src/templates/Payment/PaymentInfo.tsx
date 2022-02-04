import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
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
  NewDropdown,
  PromptModal,
} from "../../components";
import { ActionButtonProps, NewActionButtons } from "../../components/Views/NewActionButtons";
import { Language } from "../../constants";
import { DICTIONARY_KIB_BANK_ACCOUNTS, ERROR } from "../../data/dictionary";
import {
  centerHorizontal,
  circle,
  colorBlue,
  colorGray,
  disabledOpacity6,
  fs12RegWhite1,
  fs16BoldBlue1,
  fs16BoldGray6,
  fsAlignLeft,
  fullWidth,
  px,
  rowCenterVertical,
  sh24,
  sh4,
  sh40,
  sh56,
  sh80,
  sw12,
  sw24,
  sw240,
  sw360,
  sw40,
  sw64,
  sw7,
} from "../../styles";
import { formatAmount, isAmount, isObjectEqual, parseAmount, parseAmountToString, validateObject } from "../../utils";
import { getAmount } from "./helpers";
import { NewCheque, NewCTA, NewEPF, NewOnlineBanking, NewRecurring } from "./Method";
import { IPaymentSurplusRef, PaymentSurplus } from "./Surplus";

const { PAYMENT } = Language.PAGE;

interface PaymentInfoProps {
  accountNames: TypeLabelValue[];
  allowedRecurringType?: string[];
  availableBalance: IPaymentInfo[];
  completedSurplusCurrencies?: string[];
  createdOn: Date;
  currencies: TypeCurrencyLabelValue[];
  epfAccountNumber?: string;
  existingPaidAmount: IOrderAmount[];
  funds: IOrderInvestment[];
  handleEditSaved: () => void;
  handleRemove: () => void;
  handleSave: (value: IPaymentInfo, additional?: boolean) => void;
  payment: IPaymentInfo;
  pendingBalance: IOrderAmount[];
  recurringDetails?: IRecurringDetails;
  setAvailableBalance: (value: IPaymentInfo[], deleted?: boolean) => void;
  totalInvestment: IOrderAmount[];
}

export interface IPaymentError {
  amount?: string;
  checkNumber?: string;
}

export const PaymentInfo: FunctionComponent<PaymentInfoProps> = ({
  accountNames,
  allowedRecurringType,
  availableBalance,
  completedSurplusCurrencies,
  createdOn,
  currencies,
  epfAccountNumber,
  existingPaidAmount,
  funds,
  handleEditSaved,
  handleRemove,
  handleSave,
  payment,
  pendingBalance,
  recurringDetails,
  setAvailableBalance,
  totalInvestment,
}: PaymentInfoProps) => {
  const surplusRef = useRef<IPaymentSurplusRef>();
  const [draftPayment, setDraftPayment] = useState<IPaymentInfo>(payment);
  const [draftAvailableBalance, setDraftAvailableBalance] = useState<IPaymentInfo[]>(availableBalance);
  const [duplicatePrompt, setDuplicatePrompt] = useState<"with-excess" | "no-excess" | undefined>(undefined);
  const [deletePrompt, setDeletePrompt] = useState<boolean>(false);
  const [updatePrompt, setUpdatePrompt] = useState<"add" | "save" | undefined>(undefined);
  const [error, setError] = useState<IPaymentError>({ amount: undefined, checkNumber: undefined });
  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);
  const isPaymentEqual = isObjectEqual(draftPayment, payment);
  const useOfSurplus = draftPayment.tag !== undefined;

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

  const paymentFieldProps = { payment: draftPayment, setPayment: setDraftPayment, setViewFile: setViewFile, useOfSurplus: useOfSurplus };
  switch (draftPayment.paymentMethod) {
    case "Cheque":
      paymentField = <NewCheque {...paymentFieldProps} createdOn={createdOn} error={error} setError={setError} />;
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
        (validateObject(draftPayment, [
          // "paymentMethod",
          // "amount",
          // "currency",
          // "kibBankAccountNumber",
          // "kibBankName",
          // "bankName",
          // "checkNumber",
          // "referenceNumber",
          "epfReferenceNumber",
          // "epfAccountNumber",
          // "transactionDate",
          // "proof",
        ]) && draftPayment.remark !== "") ===
        // Array.isArray(draftPayment.epfReferenceNumber) &&
        // draftPayment.epfReferenceNumber.filter((eachRefNo: IEpfReferenceNo) => eachRefNo.referenceNo === "").length === 0
        false;
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
      paymentField = <NewCTA accountNames={accountNames} payment={draftPayment} setPayment={setDraftPayment} />;
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
      paymentField = <NewOnlineBanking {...paymentFieldProps} createdOn={createdOn} />;
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

  const withInputError = error.amount !== undefined || error.checkNumber !== undefined;

  // input error on blur
  if (withInputError === true) {
    saveDisabled = true;
  }

  const currencyTotalPaid = getAmount(existingPaidAmount, draftPayment.currency as TypeCurrency);
  const currentAmount =
    draftPayment.amount !== "" && error.amount === undefined ? parseInt(parseAmountToString(draftPayment.amount), 10) : 0;
  const currencyInvestedAmount = getAmount(totalInvestment, draftPayment.currency as TypeCurrency);
  const totalAmount = currencyTotalPaid + currentAmount;

  const otherCurrencyPendingBalance = pendingBalance.filter((amount) => amount.currency !== draftPayment.currency);

  if (totalAmount >= currencyInvestedAmount && otherCurrencyPendingBalance.length === 0) {
    noMorePending = true;
  }

  const findSurplusParent = draftAvailableBalance.findIndex((bal) => bal.parent === draftPayment.parent);
  const balanceSharedTo =
    findSurplusParent !== -1 ? draftAvailableBalance[findSurplusParent].utilised!.map((util) => util.orderNumber) : [];
  const savedSharedTo = draftPayment.sharedTo !== undefined ? draftPayment.sharedTo : [];
  const surplusSharedTo = savedSharedTo.length > 0 ? savedSharedTo : balanceSharedTo;
  const sharedToTitle = surplusSharedTo.join(", ");

  const removePromptTitle =
    draftPayment.parent !== undefined && surplusSharedTo.length > 0
      ? `${PAYMENT.PROMPT_SUBTITLE_REMOVE} ${PAYMENT.PROMPT_SUBTITLE_SURPLUS}\n${sharedToTitle}.\n\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM}`
      : `${PAYMENT.PROMPT_SUBTITLE_REMOVE}\n\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM}`;

  const updatePromptTitle =
    draftPayment.parent !== undefined && surplusSharedTo.length > 0
      ? `${PAYMENT.PROMPT_SUBTITLE_UPDATE} ${PAYMENT.PROMPT_SUBTITLE_SURPLUS}\n${sharedToTitle}.\n\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM}`
      : `${PAYMENT.PROMPT_SUBTITLE_UPDATE}\n\n${PAYMENT.PROMPT_SUBTITLE_CONFIRM}`;

  // check for existing surplus from reference or cheque number
  const findSameSurplus = draftAvailableBalance.findIndex((bal) => {
    return (
      ((draftPayment.paymentMethod === "Cheque" && draftPayment.checkNumber === bal.checkNumber && bal.checkNumber !== "") ||
        (draftPayment.paymentMethod === "Online Banking / TT / ATM" &&
          draftPayment.referenceNumber === bal.referenceNumber &&
          bal.referenceNumber !== "")) &&
      draftPayment.currency === bal.currency
    );
  });

  const matchedSurplus: IPaymentInfo | undefined = findSameSurplus !== -1 ? draftAvailableBalance[findSameSurplus] : undefined;

  let availableExcess = 0;

  if (matchedSurplus !== undefined) {
    const totalUtilisedAmount =
      matchedSurplus.utilised !== undefined && matchedSurplus.utilised.length > 0
        ? matchedSurplus.utilised.map((util) => parseInt(util.amount, 10)).reduce((total: number, current: number) => total + current)
        : 0;

    availableExcess = parseAmount(matchedSurplus.excess!.amount) - totalUtilisedAmount;
  }

  const labelAmount =
    availableExcess > 0 && matchedSurplus !== undefined ? `${matchedSurplus.excess!.currency} ${formatAmount(availableExcess)}.` : "";

  const noExcessPromptSubtitle = `${PAYMENT.PROMPT_SUBTITLE_MATCHES} ${matchedSurplus !== undefined ? matchedSurplus!.orderNumber : ""} ${
    PAYMENT.PROMPT_SUBTITLE_NO_SURPLUS
  }\n\n${PAYMENT.PROMPT_SUBTITLE_INSERT}`;

  const withExcessPromptSubtitle = `${PAYMENT.PROMPT_SUBTITLE_MATCHES} ${matchedSurplus !== undefined ? matchedSurplus!.orderNumber : ""} ${
    PAYMENT.PROMPT_SUBTITLE_WITH_SURPLUS
  } ${labelAmount}\n\n${PAYMENT.PROMPT_SUBTITLE_USE_SURPLUS}`;

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
      paymentMethod:
        value !== "MYR" && draftPayment.paymentMethod! === "Cheque" ? "Online Banking / TT / ATM" : draftPayment.paymentMethod!,
    };

    setDraftPayment(updatedPayments);
  };

  const validateAmount = (value: string) => {
    const cleanValue = value.replace(/[,]/g, "");
    const amount: IAmountValueError = { value: cleanValue, error: undefined };
    if (isAmount(cleanValue) === false) {
      return { ...amount, error: ERROR.INVESTMENT_INVALID_AMOUNT };
    }
    if (parseAmount(cleanValue) === 0) {
      return { ...amount, error: ERROR.INVESTMENT_MIN_AMOUNT };
    }
    return { ...amount, value: formatAmount(cleanValue) };
  };

  const checkAmount = () => {
    const amount = validateAmount(draftPayment.amount);
    setError({ ...error, amount: amount.error });
    setAmount(amount.value);
  };

  const setPaymentMethod = (value: string) => {
    setDraftPayment({
      ...draftPayment,
      paymentMethod: value as TypePaymentMethod,
      checkNumber:
        draftPayment.paymentMethod !== value && draftPayment.paymentMethod === "Online Banking / TT / ATM" ? "" : draftPayment.checkNumber,
      referenceNumber: draftPayment.paymentMethod !== value && draftPayment.paymentMethod === "Cheque" ? "" : draftPayment.referenceNumber,
    });
  };

  const handleContinuePrompt = () => {
    handleRemove();
  };

  const paymentToBeSaved = (latestPayment: IPaymentInfo) => {
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
      excess: excessAmount > 0 ? { currency: latestPayment.currency as TypeCurrency, amount: excessAmount.toString() } : undefined,
      new: undefined,
      parent: excessAmount > 0 ? id : undefined,
      paymentId: id,
      saved: true,
    };
    return updatedPayment;
  };

  const updateAvailableBalance = (latestPayment: IPaymentInfo) => {
    const hasExcess = latestPayment.excess !== undefined;
    const updatedPayment: IPaymentInfo = { ...latestPayment, utilised: hasExcess ? [] : undefined };
    const newAvailableBalance = [...draftAvailableBalance];

    // // check if payment info has surplus
    // if (updatedPayment.parent !== undefined) {
    const findExistingSurplusParent = newAvailableBalance.findIndex((bal) => bal.paymentId === updatedPayment.paymentId);

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

    const newAvailableBalanceWithId = newAvailableBalance.map((bal) => {
      const updatedUtilised: IUtilisedAmount[] = bal.utilised!.map((util) => ({
        ...util,
        paymentId: util.paymentId !== undefined ? util.paymentId : updatedPayment.paymentId!,
      }));

      return { ...bal, utilised: updatedUtilised };
    });

    // update application balance for new or updated surplus, and for use of surplus
    setAvailableBalance(newAvailableBalanceWithId, undefined);
  };

  const saveUpdatedInfo = (add?: boolean) => {
    const cleanPayment = paymentToBeSaved(draftPayment);
    updateAvailableBalance(cleanPayment);
    handleSave(cleanPayment, add);
  };

  const handleSaveInfo = () => {
    // TODO do not show prompt and do not update available balance if no changes are made
    // if (balanceSharedTo.length > 0 && isPaymentEqual === false) {
    if (balanceSharedTo.length > 0) {
      return setUpdatePrompt("save");
    }
    return saveUpdatedInfo();
  };

  const handleAddInfo = () => {
    // TODO do not show prompt and do not update available balance if no changes are made
    // if (balanceSharedTo.length > 0 && isPaymentEqual === false) {
    if (balanceSharedTo.length > 0) {
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
    setDraftPayment({ ...draftPayment, referenceNumber: "", checkNumber: "" });
  };

  const handleUseSurplus = () => {
    if (surplusRef.current !== undefined && matchedSurplus !== undefined) {
      surplusRef.current.handleUseSurplus(matchedSurplus);
      setError({ amount: undefined, checkNumber: undefined });
    }
    setDuplicatePrompt(undefined);
  };

  const secondaryButton: ActionButtonProps | undefined =
    draftPayment.paymentMethod! === "EPF" || draftPayment.paymentMethod! === "Recurring"
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
    <CustomTextInput
      disabled={draftPayment.paymentMethod! === "EPF"}
      error={error.amount}
      inputPrefix={draftPayment.currency}
      keyboardType="numeric"
      label={PAYMENT.LABEL_AMOUNT}
      onBlur={checkAmount}
      onChangeText={setAmount}
      placeholder="0.00"
      value={draftPayment.amount}
    />,
  ];

  const epfBaseItems = [
    <LabeledTitle label={PAYMENT.LABEL_EPF_ACCOUNT} spaceToLabel={sh4} title={epfAccountNumber!} style={{ width: sw360 }} />,
  ];

  if (currencies.length > 1 && draftPayment.paymentMethod !== "Cheque") {
    baseItems.splice(
      1,
      0,
      <View />,
      <NewDropdown items={currencies} handleChange={setCurrency} label={PAYMENT.LABEL_CURRENCY} value={draftPayment.currency} />,
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
      if (draftPayment.new !== true) {
        handleEditSaved();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftPayment, payment]);

  // effect to check for existing surplus using reference or cheque number
  useEffect(() => {
    if (
      matchedSurplus !== undefined &&
      (draftPayment.tag === undefined || (draftPayment.tag !== undefined && draftPayment.tag.uuid !== matchedSurplus.parent)) &&
      matchedSurplus.paymentId !== draftPayment.paymentId
    ) {
      setDuplicatePrompt(availableExcess > 0 ? "with-excess" : "no-excess");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedSurplus]);

  return (
    <View>
      <View style={{ ...rowCenterVertical, ...px(sw24), backgroundColor: colorGray._1, height: sh56 }}>
        <Text style={fs16BoldGray6}>{PAYMENT.LABEL_ADD_PAYMENT}</Text>
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
      {draftPayment.paymentType === "Cash" && draftPayment.paymentMethod !== "Client Trust Account (CTA)" ? (
        <PaymentSurplus
          accountNames={accountNames}
          availableBalance={draftAvailableBalance}
          completedSurplusCurrencies={completedSurplusCurrencies}
          existingPaidAmount={existingPaidAmount}
          payment={draftPayment}
          pendingCurrencies={pendingCurrencies}
          ref={surplusRef}
          setAvailableBalance={setDraftAvailableBalance}
          setPayment={setDraftPayment}
          totalInvestment={totalInvestment}
        />
      ) : null}
      <View>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <CustomCard
            spaceBetweenGroup={sh24}
            spaceBetweenItem={sw64}
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
        visible={deletePrompt}
      />
      <PromptModal
        handleCancel={handleCancelPrompt}
        handleContinue={handleContinueUpdate}
        label={PAYMENT.PROMPT_TITLE_UPDATE}
        labelContinue={PAYMENT.BUTTON_UPDATE}
        labelStyle={promptStyle}
        title={updatePromptTitle}
        titleStyle={promptStyle}
        visible={updatePrompt !== undefined}
      />
      <PromptModal
        handleCancel={handleCancelDuplicate}
        handleContinue={handleUseSurplus}
        label={PAYMENT.PROMPT_TITLE_DUPLICATE}
        labelContinue={PAYMENT.BUTTON_YES}
        labelStyle={promptStyle}
        title={withExcessPromptSubtitle}
        titleStyle={promptStyle}
        visible={duplicatePrompt === "with-excess"}
      />
      <PromptModal
        handleContinue={handleCancelDuplicate}
        label={PAYMENT.PROMPT_TITLE_DUPLICATE}
        labelContinue={PAYMENT.BUTTON_BACK_TO_PAYMENT}
        labelStyle={promptStyle}
        title={noExcessPromptSubtitle}
        titleStyle={promptStyle}
        visible={duplicatePrompt === "no-excess"}
      />
      {viewFile !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={viewFile} visible={viewFile !== undefined} />
      ) : null}
    </View>
  );
};
