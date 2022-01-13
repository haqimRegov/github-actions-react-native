import React, { FunctionComponent, useEffect, useState } from "react";
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
import { PaymentSurplus } from "./Surplus";

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
  setAvailableBalance: (value: IPaymentInfo[]) => void;
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
  const [draftPayment, setDraftPayment] = useState<IPaymentInfo>(payment);
  const [draftAvailableBalance, setDraftAvailableBalance] = useState<IPaymentInfo[]>(availableBalance);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [error, setError] = useState<IPaymentError>({ amount: undefined, checkNumber: undefined });
  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);
  const hasNoChange = isObjectEqual(draftPayment, payment) && draftPayment.saved === false;
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

  const handleRemoveInfo = () => {
    if (hasNoChange === true) {
      return handleContinuePrompt();
    }
    return setPrompt(true);
  };

  const handleCancelPrompt = () => {
    setPrompt(false);
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

    // check if payment info has surplus
    if (updatedPayment.parent !== undefined) {
      const findExistingSurplusParent = newAvailableBalance.findIndex((bal) => bal.parent === updatedPayment.parent);

      // payment is an existing surplus
      if (findExistingSurplusParent !== -1) {
        if (hasExcess === true) {
          // update existing surplus
          newAvailableBalance.splice(findExistingSurplusParent, 1, updatedPayment);
        } else {
          // delete existing surplus
          newAvailableBalance.splice(findExistingSurplusParent, 1);
        }
        // new payment with surplus
      } else if (hasExcess === true) {
        newAvailableBalance.push(updatedPayment);
      }
    }

    const newAvailableBalanceWithId = newAvailableBalance.map((bal) => {
      const updatedUtilised: IUtilisedAmount[] = bal.utilised!.map((util) => ({
        ...util,
        paymentId: util.paymentId !== undefined ? util.paymentId : updatedPayment.paymentId!,
      }));

      return { ...bal, utilised: updatedUtilised };
    });

    // update application balance for new or updated surplus, and for use of surplus
    setAvailableBalance(newAvailableBalanceWithId);
  };

  const handleSaveInfo = () => {
    const newPayment = paymentToBeSaved(draftPayment);
    updateAvailableBalance(newPayment);
    handleSave(newPayment);
  };

  const handleAddInfo = () => {
    const newPayment = paymentToBeSaved(draftPayment);
    updateAvailableBalance(newPayment);
    handleSave(newPayment, true);
  };

  const handleCloseViewer = () => {
    setViewFile(undefined);
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
  const findSurplusParent = draftAvailableBalance.findIndex((bal) => bal.parent === draftPayment.parent);
  const surplusSharedTo =
    findSurplusParent !== 0 - 1 ? draftAvailableBalance[findSurplusParent].utilised!.map((util) => util.orderNumber) : [];
  const sharedToTitle = surplusSharedTo.join(", ");

  const removePromptTitle =
    draftPayment.parent !== undefined && surplusSharedTo.length > 0
      ? `${PAYMENT.PROMPT_TITLE_REMOVE} ${PAYMENT.PROMPT_TITLE_SURPLUS}\n${sharedToTitle}.\n\n${PAYMENT.PROMPT_TITLE_CONFIRM}`
      : `${PAYMENT.PROMPT_TITLE_REMOVE}\n\n${PAYMENT.PROMPT_TITLE_CONFIRM}`;

  useEffect(() => {
    // if (isObjectEqual(draftPayment, payment) === false && draftPayment.saved === true) {
    if (isObjectEqual(draftPayment, payment) === false) {
      // setDraftPayment({ ...draftPayment, saved: false });
      handleEditSaved();
      if (draftPayment.saved === true) {
        setDraftPayment({ ...draftPayment, saved: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftPayment, payment]);

  const pendingCurrencies = availableBalance.map((eachBalance) => eachBalance.currency);

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
      {draftPayment.paymentType === "Cash" ? (
        <PaymentSurplus
          accountNames={accountNames}
          availableBalance={draftAvailableBalance}
          completedSurplusCurrencies={completedSurplusCurrencies}
          existingPaidAmount={existingPaidAmount}
          payment={draftPayment}
          pendingCurrencies={pendingCurrencies}
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
        visible={prompt}
        handleCancel={handleCancelPrompt}
        handleContinue={handleContinuePrompt}
        label={PAYMENT.PROMPT_TITLE_DELETE}
        labelStyle={{ ...fsAlignLeft, ...fullWidth }}
        labelContinue={PAYMENT.BUTTON_DELETE}
        title={removePromptTitle}
        titleStyle={{ ...fsAlignLeft, ...fullWidth }}
      />
      {viewFile !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={viewFile} visible={viewFile !== undefined} />
      ) : null}
    </View>
  );
};
