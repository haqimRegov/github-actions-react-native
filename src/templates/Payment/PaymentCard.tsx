import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  ActionButtons,
  AdvancedDropdown,
  Badge,
  ConfirmationModal,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  Dash,
  IconButton,
  LabeledTitle,
  OutlineButton,
  Switch,
  TextInputArea,
  TextSpaceArea,
  UploadWithModal,
} from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_DDA_BANK, DICTIONARY_KIB_BANK_ACCOUNTS, ERROR } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlack21,
  centerHorizontal,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorGreen,
  colorWhite,
  flexRow,
  fs12BoldBlack2,
  fs14BoldBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  px,
  sh16,
  sh24,
  sh32,
  sh56,
  sh64,
  sh8,
  sw1,
  sw16,
  sw24,
  sw360,
  sw432,
  sw64,
  sw784,
  sw8,
} from "../../styles";
import { formatAmount, isAmount, parseAmount } from "../../utils";
import { CashDepositMachine, Cheque, ClientTrustAccount, EPF, OnlineBanking, Recurring } from "./PaymentMethod";

const { PAYMENT } = Language.PAGE;

export interface PaymentCardProps {
  accountNames: TypeLabelValue[];
  active: boolean;
  allowedRecurringType?: string[];
  currencies: TypeCurrencyLabelValue[];
  floatingAmount: IFloatingAmount[];
  generateNewPayment: () => IPaymentState;
  handleExpandPayment: () => void;
  handleSavePayments: (value: IPaymentState[]) => void;
  isScheduled: boolean;
  orderCreationDate?: Date;
  orderTotalAmount: IOrderAmount[];
  paymentCount?: number;
  payments: IPaymentState[];
  setPayments: (value: IPaymentState[]) => void;
  totalPaidAmount?: IOrderAmount[];
}

export const PaymentCard: FunctionComponent<PaymentCardProps> = ({
  accountNames,
  active,
  allowedRecurringType,
  currencies,
  floatingAmount,
  generateNewPayment,
  handleExpandPayment,
  handleSavePayments,
  isScheduled,
  orderCreationDate,
  orderTotalAmount,
  paymentCount,
  payments,
  totalPaidAmount,
}: PaymentCardProps) => {
  const [prompt, setPrompt] = useState<number | undefined>(undefined);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [amountError, setAmountError] = useState<string | undefined>(undefined);
  const [draftPayments, setDraftPayments] = useState<IPaymentState[]>(payments);

  const withPreviousPayment = totalPaidAmount !== undefined && totalPaidAmount.length > 0;
  const withPaymentAdded = draftPayments.findIndex((payment) => payment.saved === true) !== -1;
  const withPayment = withPaymentAdded || withPreviousPayment;

  const infoIcon = active ? "close" : "caret-down";
  const icon = active ? "minus" : "caret-down";
  const completedIcon = withPayment === true && active === false ? "check" : icon;
  const iconColor = withPayment === true && active === false ? colorWhite._1 : colorBlue._2;
  const iconBGColor = withPayment === true && active === false ? colorGreen._1 : colorWhite._1;
  const iconBorderColor = withPayment === true && active === false ? colorGreen._1 : colorGray._7;

  const headerStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    borderRadius: sw24,
    height: sh64,
  };

  const formatTotalPaidAmount: IFloatingAmount[] =
    totalPaidAmount !== undefined && totalPaidAmount.length > 0
      ? totalPaidAmount.map((paidAmount) => ({ currency: paidAmount.currency, amount: parseAmount(paidAmount.amount) }))
      : [];
  const computed = formatTotalPaidAmount.concat(floatingAmount);
  const floatingTotalAmount = orderTotalAmount.map((orderAmount) => {
    const filteredPayments = computed
      .filter((value) => value.currency === orderAmount.currency)
      .map((filteredFloating: IFloatingAmount) => filteredFloating.amount);
    const total =
      filteredPayments.length === 0
        ? 0
        : filteredPayments.map((amount) => amount).reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount);
    return { currency: orderAmount.currency, amount: withPaymentAdded === true ? total : total - parseAmount(orderAmount.amount) };
  });

  const floating = floatingTotalAmount
    .map(({ amount, currency }) => {
      const symbol = amount > 0 ? "+" : "-";
      const trimAmount = amount > 0 ? amount : parseAmount(`${amount || 0}`.substring(1));
      return amount === 0 ? "" : `${symbol} ${currency} ${formatAmount(trimAmount)}`;
    })
    .filter((data) => data !== "")
    .join(", ");
  const newPaymentTitle = draftPayments.length === 1 ? `${draftPayments[0].paymentMethod}` : `${draftPayments.length}`;
  const previousPaymentCount = paymentCount !== undefined ? paymentCount : 1;

  const previousPaymentTitle =
    withPreviousPayment === true && withPaymentAdded === false
      ? `${previousPaymentCount}`
      : `${previousPaymentCount + draftPayments.length}`;
  const floatingLabel = floating !== "" ? `(${floating})` : "";
  const headerTitle = isScheduled ? PAYMENT.TITLE_RECURRING : PAYMENT.TITLE;
  const paymentTitle = withPreviousPayment === false ? newPaymentTitle : previousPaymentTitle;
  const completedTitle =
    isScheduled && draftPayments.length > 0
      ? `${PAYMENT.LABEL_RECURRING} - ${draftPayments[0].recurringType}`
      : `${PAYMENT.LABEL_PROOF} - ${paymentTitle} ${floatingLabel}`;
  const defaultTitle = withPayment === true ? completedTitle : headerTitle;
  const labelStyle = active === true ? fs16BoldBlack2 : fs16RegBlack2;
  // TODO no prompt if all are saved
  // TODO don't reflect current change if viewing other info
  const modalTitle = prompt === -1 || prompt === expandedIndex ? PAYMENT.PROMPT_TITLE_CANCEL : PAYMENT.PROMPT_TITLE_VIEW;

  const handlePromptContinue = () => {
    if (expandedIndex !== prompt) {
      setExpandedIndex(prompt!);
      const updatedPayments = [...payments].filter((draft) => draft.saved === true);
      const newPayment = generateNewPayment();
      if (updatedPayments.length === 0) {
        updatedPayments.push(newPayment);
      }
      setDraftPayments(updatedPayments);
      handleSavePayments(updatedPayments);
      if (prompt === -1) {
        handleExpandPayment();
      }
    } else {
      const updatedPayments = [...draftPayments];
      updatedPayments.splice(prompt, 1);
      setDraftPayments(updatedPayments);
      handleSavePayments(updatedPayments);
      setExpandedIndex(updatedPayments.length - 1);
    }
    setPrompt(undefined);
  };

  const handleHeaderPress = () => {
    if (active === true) {
      return null;
    }
    setExpandedIndex(draftPayments.length - 1);
    return handleExpandPayment();
  };

  const handleHeaderIconPress = () => {
    if (active === true) {
      return setPrompt(-1);
    }
    setExpandedIndex(draftPayments.length - 1);
    return handleExpandPayment();
  };

  return (
    <Fragment>
      <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
        <TouchableWithoutFeedback onPress={handleHeaderPress}>
          <View style={headerStyle}>
            {withPayment === true ? (
              <Badge>
                <IcoMoon color={colorBlue._2} name="file" size={sh24} />
              </Badge>
            ) : (
              <IcoMoon color={colorBlue._2} name="file" size={sh24} />
            )}
            <CustomSpacer isHorizontal={true} space={sw16} />
            <Text style={labelStyle}>{defaultTitle}</Text>
            <CustomFlexSpacer />
            <IconButton
              color={iconColor}
              onPress={handleHeaderIconPress}
              name={completedIcon}
              size={sh16}
              style={circleBorder(sw24, sw1, iconBorderColor, iconBGColor)}
            />
          </View>
        </TouchableWithoutFeedback>
        {active === true &&
          draftPayments.map((payment: IPaymentState, index: number) => {
            const viewPayment = () => {
              setPrompt(index);
            };

            const handleSave = () => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].saved = true;
              setDraftPayments(updatedPayments);
              handleSavePayments(updatedPayments);
              handleExpandPayment();
            };

            const handleAddInfo = () => {
              // actual add info
              const updatedPayments = [...draftPayments];
              updatedPayments[index].saved = true;
              handleSavePayments(updatedPayments);
              const newPayment = generateNewPayment();
              updatedPayments.push(newPayment);
              setDraftPayments(updatedPayments);
              setExpandedIndex(updatedPayments.length - 1);
            };

            const setCurrency = (value: string) => {
              const updatedPayments = [...draftPayments];
              const filteredKibAccount = DICTIONARY_KIB_BANK_ACCOUNTS.filter((bank) => bank.currency === value);
              const blankCheque =
                value !== "MYR" && payment.paymentMethod === "Cheque"
                  ? {
                      bankName: "",
                      checkNumber: "",
                      transactionDate: undefined,
                    }
                  : {};

              updatedPayments[index] = {
                ...updatedPayments[index],
                currency: value as TypeCurrency,
                kibBankName: filteredKibAccount[0].bankName,
                kibBankAccountNumber: filteredKibAccount[0].bankAccountNumber,
                ...blankCheque,
                paymentMethod:
                  value !== "MYR" && updatedPayments[index].paymentMethod! === "Cheque"
                    ? "Online Banking"
                    : updatedPayments[index].paymentMethod!,
              };

              setDraftPayments(updatedPayments);
            };

            const setAmount = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].amount = value;
              setDraftPayments(updatedPayments);
            };

            const setPaymentMethod = (value: string) => {
              const cleanInfo =
                value === payment.paymentMethod
                  ? {}
                  : {
                      clientName: "",
                      clientTrustAccountNumber: "",
                      bankName: "",
                      transactionDate: undefined,
                      checkNumber: "",
                    };
              const updatedPayments = [...draftPayments];
              updatedPayments[index] = { ...updatedPayments[index], paymentMethod: value as TypePaymentMethod, ...cleanInfo };

              setDraftPayments(updatedPayments);
            };

            const setProof = (value?: FileBase64) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].proof = value;
              updatedPayments[index].saved = value !== undefined ? updatedPayments[index].saved : false;
              setDraftPayments(updatedPayments);
            };

            const setTransactionDate = (value?: Date) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].transactionDate = value;
              setDraftPayments(updatedPayments);
            };

            const setTransactionTime = (value?: Date) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].transactionTime = value;
              setDraftPayments(updatedPayments);
            };

            const setBankName = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].bankName = value;
              setDraftPayments(updatedPayments);
            };

            const setCheckNumber = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].checkNumber = value;
              setDraftPayments(updatedPayments);
            };

            const setClientName = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].clientName = value;
              setDraftPayments(updatedPayments);
            };

            const setClientTrust = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].clientTrustAccountNumber = value;
              setDraftPayments(updatedPayments);
            };

            const toggleRemark = () => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].remark = updatedPayments[index].remark === undefined ? "" : undefined;
              setDraftPayments(updatedPayments);
            };

            const setRemark = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].remark = value;
              setDraftPayments(updatedPayments);
            };

            const setBankAccountName = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].bankAccountName = value;
              setDraftPayments(updatedPayments);
            };

            const setCombinedName = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].combinedBankAccountName = value;
              setDraftPayments(updatedPayments);
            };

            const setBankAccountNumber = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].bankAccountNumber = value;
              setDraftPayments(updatedPayments);
            };

            const setReferenceNumber = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].epfReferenceNumber = value;
              setDraftPayments(updatedPayments);
            };

            const setFrequency = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].frequency = value;
              setDraftPayments(updatedPayments);
            };

            const setRecurringBank = (value: string) => {
              const updatedPayments = [...draftPayments];
              updatedPayments[index].recurringBank = value;
              setDraftPayments(updatedPayments);
            };

            const setRecurringType = (value: string) => {
              const updatedPayments = [...draftPayments];
              const bank = value === "FPX" ? "" : DICTIONARY_DDA_BANK[0].value;
              updatedPayments[index] = { ...updatedPayments[index], recurringBank: bank };
              updatedPayments[index].recurringType = value;
              setDraftPayments(updatedPayments);
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
              const amount = validateAmount(payment.amount!);
              setAmountError(amount.error);
              setAmount(amount.value);
            };

            const checkCombinedBankName =
              payment.bankAccountName === "Combined"
                ? payment.combinedBankAccountName === "" || payment.combinedBankAccountName === undefined
                : false;

            const checkCombinedClientName =
              payment.clientName === "Combined"
                ? payment.combinedBankAccountName === "" || payment.combinedBankAccountName === undefined
                : false;

            const baseCashDisabled =
              payment.currency === "" ||
              payment.currency === undefined ||
              payment.amount === "" ||
              payment.amount === undefined ||
              amountError !== undefined ||
              payment.paymentMethod === undefined ||
              payment.proof === undefined ||
              (payment.remark !== undefined && payment.remark === "");

            const ctaDisabled =
              baseCashDisabled === true ||
              payment.clientName === "" ||
              payment.clientName === undefined ||
              payment.clientTrustAccountNumber === "" ||
              payment.clientTrustAccountNumber === undefined ||
              checkCombinedClientName === true;

            const onlineBankingDisabled =
              baseCashDisabled === true ||
              payment.transactionDate === undefined ||
              payment.bankName === "" ||
              payment.bankName === undefined;

            const chequeDisabled =
              baseCashDisabled === true ||
              payment.bankName === "" ||
              payment.bankName === undefined ||
              payment.checkNumber === "" ||
              payment.checkNumber === undefined ||
              payment.transactionDate === undefined;

            const cdmDisabled = baseCashDisabled === true || payment.transactionDate === undefined || payment.transactionTime === undefined;

            const epfSaveDisabled =
              payment.amount === "" ||
              payment.amount === undefined ||
              payment.currency === undefined ||
              payment.currency === "" ||
              payment.epfAccountNumber === "" ||
              payment.epfAccountNumber === undefined ||
              payment.epfReferenceNumber === "" ||
              payment.epfReferenceNumber === undefined;

            const recurringSaveDisabled =
              payment.recurringType === "" ||
              payment.recurringType === undefined ||
              payment.bankAccountName === undefined ||
              payment.bankAccountName === "" ||
              payment.bankAccountNumber === "" ||
              payment.bankAccountNumber === undefined ||
              payment.frequency === "" ||
              payment.frequency === undefined ||
              payment.recurringBank === "" ||
              payment.recurringType === undefined ||
              checkCombinedBankName === true;

            let saveDisabled = onlineBankingDisabled;
            // const findFloatingIndex = floatingAmount.findIndex(({ currency }) => currency === payment.currency);
            // const findTotalIndex = orderTotalAmount.findIndex(({ currency }) => currency === payment.currency);
            // const paymentAmount = payment.amount !== undefined ? parseAmount(payment.amount) : 0;
            // const currencyTotalAmount = findTotalIndex !== -1 ? parseAmount(orderTotalAmount[findTotalIndex].amount) : 0;
            // const cleanAmount = Number.isNaN(paymentAmount) ? 0 : paymentAmount;
            // let calculateDifference = -1;
            // if (floatingAmount.length !== 0) {
            //   calculateDifference = floatingAmount[findFloatingIndex].amount + cleanAmount;
            // } else {
            //   calculateDifference = cleanAmount - currencyTotalAmount;
            // }

            const paymentMethodProps = {
              currency: payment.currency!,
              kibBankName: payment.kibBankName!,
              kibBankAccountNumber: payment.kibBankAccountNumber!,
              orderCreationDate: orderCreationDate,
              setTransactionDate: setTransactionDate,
              transactionDate: payment.transactionDate!,
            };
            let paymentMethodInfo = <OnlineBanking {...paymentMethodProps} bankName={payment.bankName!} setBankName={setBankName} />;

            switch (payment.paymentMethod!) {
              case "Online Banking":
                saveDisabled = onlineBankingDisabled;
                paymentMethodInfo = <OnlineBanking {...paymentMethodProps} bankName={payment.bankName!} setBankName={setBankName} />;
                break;
              case "Cheque":
                saveDisabled = chequeDisabled;
                paymentMethodInfo = (
                  <Cheque
                    {...paymentMethodProps}
                    bankName={payment.bankName!}
                    checkNumber={payment.checkNumber!}
                    setBankName={setBankName}
                    setCheckNumber={setCheckNumber}
                  />
                );
                break;
              case "Client Trust Account (CTA)":
                saveDisabled = ctaDisabled;
                paymentMethodInfo = (
                  <ClientTrustAccount
                    bankNames={accountNames}
                    clientName={payment.clientName!}
                    combinedName={payment.combinedBankAccountName!}
                    clientTrustAccountNumber={payment.clientTrustAccountNumber!}
                    setClientName={setClientName}
                    setClientTrust={setClientTrust}
                    setCombinedName={setCombinedName}
                  />
                );
                break;
              case "Cash Deposit Machine":
                saveDisabled = cdmDisabled;
                paymentMethodInfo = (
                  <CashDepositMachine
                    {...paymentMethodProps}
                    setTransactionTime={setTransactionTime}
                    transactionTime={payment.transactionTime}
                  />
                );
                break;
              case "EPF":
                saveDisabled = epfSaveDisabled;
                paymentMethodInfo = <EPF setReferenceNumber={setReferenceNumber} referenceNumber={payment.epfReferenceNumber!} />;
                break;
              case "Recurring":
                saveDisabled = recurringSaveDisabled;
                paymentMethodInfo = (
                  <Recurring
                    allowedRecurringType={allowedRecurringType}
                    bankNames={accountNames}
                    bankAccountName={payment.bankAccountName!}
                    bankAccountNumber={payment.bankAccountNumber!}
                    combinedName={payment.combinedBankAccountName!}
                    frequency={payment.frequency!}
                    recurringBank={payment.recurringBank!}
                    recurringType={payment.recurringType!}
                    setBankAccountName={setBankAccountName}
                    setBankAccountNumber={setBankAccountNumber}
                    setCombinedName={setCombinedName}
                    setFrequency={setFrequency}
                    setRecurringBank={setRecurringBank}
                    setRecurringType={setRecurringType}
                  />
                );
                break;

              default:
                break;
            }

            const paymentMethods = [
              { label: "Online Banking", value: "Online Banking" },
              { label: "Client Trust Account (CTA)", value: "Client Trust Account (CTA)" },
            ];

            if (currencies.some((currency) => currency.value === "MYR" && payment.currency === "MYR")) {
              paymentMethods.splice(1, 0, { label: "Cheque", value: "Cheque" });
            }

            // add additional payment is disabled if floating label is empty
            const additionalPaymentDisabled = floating === "" || saveDisabled;

            return (
              <View key={index}>
                {index === 0 ? <View style={borderBottomBlack21} /> : null}
                {index === 0 && expandedIndex === 0 ? <CustomSpacer space={sh24} /> : null}
                {index === expandedIndex && index !== 0 ? (
                  <View style={headerStyle}>
                    <Text style={fs16BoldBlack2}>{PAYMENT.LABEL_ADD_PAYMENT}</Text>
                    <CustomFlexSpacer />
                    <IconButton
                      color={colorBlue._2}
                      onPress={viewPayment}
                      name={infoIcon}
                      size={sh16}
                      style={circleBorder(sw24, sw1, colorGray._7)}
                    />
                  </View>
                ) : null}
                {index === expandedIndex ? (
                  <Fragment>
                    {payment.paymentMethod! === "Recurring" ? null : (
                      <Fragment>
                        <View style={px(sw24)}>
                          <View style={flexRow}>
                            {currencies.length > 1 ? (
                              <AdvancedDropdown
                                items={currencies}
                                handleChange={setCurrency}
                                label={PAYMENT.LABEL_CURRENCY}
                                value={payment.currency!}
                              />
                            ) : (
                              <View>
                                <CustomTextInput
                                  disabled={payment.paymentMethod! === "EPF"}
                                  error={amountError}
                                  keyboardType="numeric"
                                  label={PAYMENT.LABEL_AMOUNT}
                                  inputPrefix={payment.currency}
                                  onBlur={checkAmount}
                                  onChangeText={setAmount}
                                  value={payment.amount}
                                />
                              </View>
                            )}
                            <CustomSpacer isHorizontal={true} space={sw64} />
                            {payment.paymentMethod! === "EPF" ? (
                              <LabeledTitle
                                label={PAYMENT.LABEL_EPF_ACCOUNT}
                                spaceToLabel={sh8}
                                title={payment.epfAccountNumber!}
                                titleStyle={{ ...fs16BoldBlack2, ...px(sw16) }}
                                style={{ width: sw360 }}
                              />
                            ) : null}
                            {payment.paymentMethod! !== "EPF" && currencies.length < 2 ? (
                              <AdvancedDropdown
                                items={paymentMethods}
                                handleChange={setPaymentMethod}
                                label={PAYMENT.LABEL_PAYMENT_METHOD}
                                value={payment.paymentMethod!}
                              />
                            ) : null}
                            {payment.paymentMethod! !== "EPF" && currencies.length > 1 ? (
                              <View>
                                <CustomTextInput
                                  error={amountError}
                                  keyboardType="numeric"
                                  label={PAYMENT.LABEL_AMOUNT}
                                  inputPrefix={payment.currency}
                                  onBlur={checkAmount}
                                  onChangeText={setAmount}
                                  value={payment.amount}
                                />
                              </View>
                            ) : null}
                          </View>
                        </View>
                        {payment.paymentMethod! !== "EPF" && currencies.length > 1 ? (
                          <View style={px(sw24)}>
                            <CustomSpacer space={sh32} />
                            <View style={flexRow}>
                              <AdvancedDropdown
                                items={paymentMethods}
                                handleChange={setPaymentMethod}
                                label={PAYMENT.LABEL_PAYMENT_METHOD}
                                value={payment.paymentMethod!}
                              />
                            </View>
                          </View>
                        ) : null}
                        <CustomSpacer space={sh24} />
                        <Dash />
                        <CustomSpacer space={sh16} />
                      </Fragment>
                    )}

                    {paymentMethodInfo}
                    {payment.paymentMethod! === "Recurring" || payment.paymentMethod! === "EPF" ? null : (
                      <Fragment>
                        <CustomSpacer space={sh24} />
                        <Dash />
                      </Fragment>
                    )}
                    <View style={px(sw24)}>
                      {payment.paymentMethod! === "EPF" || payment.paymentMethod! === "Recurring" ? null : (
                        <Fragment>
                          <CustomSpacer space={sh24} />
                          <TextSpaceArea spaceToBottom={sh16} text={PAYMENT.LABEL_PROOF} style={fs14BoldBlack2} />
                          <UploadWithModal
                            features={["camera", "file", "gallery"]}
                            label={payment.proof !== undefined ? PAYMENT.LABEL_PROOF_ADDED : PAYMENT.LABEL_PROOF_ADD}
                            value={payment.proof}
                            setValue={setProof}
                            onSuccess={setProof}
                          />
                        </Fragment>
                      )}
                      {payment.paymentMethod! === "EPF" || payment.paymentMethod! === "Recurring" ? null : (
                        <Fragment>
                          <CustomSpacer space={sh24} />
                          <Switch label={PAYMENT.LABEL_REMARK} onPress={toggleRemark} toggle={payment.remark !== undefined} />
                          {payment.remark === undefined ? null : (
                            <TextInputArea
                              width={sw784}
                              maxLength={255}
                              showLength={true}
                              spaceToTop={sh24}
                              onChangeText={setRemark}
                              value={payment.remark}
                            />
                          )}
                        </Fragment>
                      )}
                    </View>
                    {payment.paymentMethod! === "EPF" || payment.paymentMethod! === "Recurring" ? null : (
                      <View style={px(sw24)}>
                        <CustomSpacer space={sh24} />
                        <OutlineButton
                          buttonType="dashed"
                          disabled={additionalPaymentDisabled}
                          icon="plus"
                          onPress={handleAddInfo}
                          text={PAYMENT.BUTTON_ADDITIONAL}
                          textStyle={fs12BoldBlack2}
                        />
                      </View>
                    )}
                    <CustomSpacer space={sh32} />
                    <ActionButtons
                      handleContinue={handleSave}
                      continueDisabled={saveDisabled}
                      labelContinue={PAYMENT.BUTTON_SAVE}
                      buttonContainerStyle={centerHorizontal}
                    />
                    <CustomSpacer space={sh56} />
                  </Fragment>
                ) : (
                  <Fragment>
                    {index === 0 ? null : <Dash />}
                    <View style={headerStyle}>
                      <IcoMoon color={colorBlue._2} name="check" size={sh24} />
                      <CustomSpacer isHorizontal={true} space={sw16} />
                      <Text style={fs16RegBlack2}>{`${PAYMENT.LABEL_ADDED_PAYMENT} - ${payment.paymentMethod!} ${payment.currency} ${
                        payment.amount
                      }`}</Text>
                      <CustomFlexSpacer />
                      <IconButton
                        color={colorBlue._2}
                        onPress={viewPayment}
                        name="caret-down"
                        size={sh16}
                        style={circleBorder(sw24, sw1, colorGray._7)}
                      />
                    </View>
                    {index === draftPayments.length - 1 && index !== expandedIndex ? null : <Dash />}
                  </Fragment>
                )}
              </View>
            );
          })}
      </View>
      <ConfirmationModal
        handleCancel={() => setPrompt(undefined)}
        handleContinue={handlePromptContinue}
        labelCancel={PAYMENT.BUTTON_NO}
        labelContinue={PAYMENT.BUTTON_YES}
        spaceToButton={sh32}
        spaceToContent={sh24}
        spaceToTitle={sh56}
        title={modalTitle}
        titleStyle={{ width: sw432 }}
        visible={prompt !== undefined}>
        <Text style={fs16BoldBlack2}>{PAYMENT.PROMPT_SUBTITLE}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};
