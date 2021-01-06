import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  ActionButtons,
  AdvancedDropdown,
  Badge,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  Dash,
  IconButton,
  OutlineButton,
  Switch,
  TextInputArea,
  TextSpaceArea,
  UploadWithModal,
} from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_DDA_BANK, DICTIONARY_KIB_BANK_ACCOUNTS, DICTIONARY_PAYMENT_METHOD, ERROR } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
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
  sw1,
  sw16,
  sw24,
  sw64,
  sw784,
  sw8,
} from "../../../styles";
import { isAmount } from "../../../utils";
import { CashDepositMachine, Cheque, ClientTrustAccount, EPF, OnlineBanking, Recurring } from "./PaymentMethod";

const { PAYMENT } = Language.PAGE;

export interface PaymentCardProps {
  active: boolean;
  currencies: TypeCurrencyLabelValue[];
  handleAddPayment: () => void;
  handleSave: () => void;
  handleAdditionalPayment: () => void;
  handleCancelPaymentInfo: () => void;
  isScheduled: boolean;
  payments: IPaymentState[];
  setPayments: (value: IPaymentState[]) => void;
}

export const PaymentCard: FunctionComponent<PaymentCardProps> = ({
  active,
  currencies,
  handleAddPayment,
  handleAdditionalPayment,
  handleCancelPaymentInfo,
  handleSave,
  isScheduled,
  payments,
  setPayments,
}: PaymentCardProps) => {
  const [amountError, setAmountError] = useState<string | undefined>(undefined);
  const withPayment = payments.findIndex((payment) => payment.saved === true) !== -1;
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

  const labelStyle = active === true ? fs16BoldBlack2 : fs16RegBlack2;
  const headerTitle = isScheduled ? PAYMENT.TITLE_RECURRING : PAYMENT.TITLE;
  const completedTitle = withPayment === true ? `${PAYMENT.LABEL_PROOF} - ${payments.length}` : headerTitle;

  // TODO actual holder names
  const recurringBankNames = [{ label: "Edgar Constantine", value: "Edgar Constantine" }];

  return (
    <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
      <TouchableWithoutFeedback onPress={handleAddPayment}>
        <View style={headerStyle}>
          {withPayment === true ? (
            <Badge>
              <IcoMoon color={colorBlue._2} name="file" size={sh24} />
            </Badge>
          ) : (
            <IcoMoon color={colorBlue._2} name="file" size={sh24} />
          )}
          <CustomSpacer isHorizontal={true} space={sw16} />
          <Text style={labelStyle}>{completedTitle}</Text>
          <CustomFlexSpacer />
          <IconButton
            color={iconColor}
            onPress={handleAddPayment}
            name={completedIcon}
            size={sh16}
            style={circleBorder(sw24, sw1, iconBorderColor, iconBGColor)}
          />
        </View>
      </TouchableWithoutFeedback>
      {active === true &&
        payments.map((payment: IPayment, index: number) => {
          const validateAmount = (value: string) => {
            if (isAmount(value) === false) {
              return ERROR.INVESTMENT_INVALID_AMOUNT;
            }
            if (parseInt(value, 10) === 0) {
              return ERROR.INVESTMENT_MIN_AMOUNT;
            }
            return undefined;
          };

          const checkAmount = () => {
            setAmountError(validateAmount(payment.amount!));
          };

          const handleSavePayment = () => {
            const updatedPayments = [...payments];
            updatedPayments[index].saved = true;
            setPayments(updatedPayments);
            handleSave();
          };

          const handleAddInfo = () => {
            const updatedPayments = [...payments];
            updatedPayments[index].saved = true;
            setPayments(updatedPayments);
            handleAdditionalPayment();
          };

          const handleExpandInfo = () => {
            const updatedPayments = [...payments];
            updatedPayments[index].expanded = !updatedPayments[index].expanded;
            setPayments(updatedPayments);
          };

          const setCurrency = (value: string) => {
            const updatedPayments = [...payments];
            const filteredKibAccount = DICTIONARY_KIB_BANK_ACCOUNTS.filter((bank) => bank.currency === value);
            updatedPayments[index] = {
              ...updatedPayments[index],
              currency: value as TypeCurrency,
              kibBankName: filteredKibAccount[0].bankName,
              kibBankAccountNumber: filteredKibAccount[0].bankAccountNumber,
            };

            setPayments(updatedPayments);
          };

          const setAmount = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].amount = value;
            setPayments(updatedPayments);
          };

          const setPaymentMethod = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].paymentMethod = value as TypePaymentMethod;
            setPayments(updatedPayments);
          };

          const setProof = (value?: FileBase64) => {
            const updatedPayments = [...payments];
            updatedPayments[index].proof = value;
            setPayments(updatedPayments);
          };

          const setTransactionDate = (value?: Date) => {
            const updatedPayments = [...payments];
            updatedPayments[index].transactionDate = value;
            setPayments(updatedPayments);
          };

          const setTransactionTime = (value?: Date) => {
            const updatedPayments = [...payments];
            updatedPayments[index].transactionTime = value;
            setPayments(updatedPayments);
          };

          const setBankName = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].bankName = value;
            setPayments(updatedPayments);
          };

          const setCheckNumber = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].checkNumber = value;
            setPayments(updatedPayments);
          };

          const setClientName = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].clientName = value;
            setPayments(updatedPayments);
          };

          const setClientTrust = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].clientTrustAccountNumber = value;
            setPayments(updatedPayments);
          };

          const toggleRemark = () => {
            const updatedPayments = [...payments];
            updatedPayments[index].remark = updatedPayments[index].remark === undefined ? "" : undefined;
            setPayments(updatedPayments);
          };

          const setRemark = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].remark = value;
            setPayments(updatedPayments);
          };

          const setBankAccountName = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].bankAccountName = value;
            setPayments(updatedPayments);
          };

          const setBankAccountNumber = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].bankAccountNumber = value;
            setPayments(updatedPayments);
          };

          const setEpfAccountNumber = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].epfAccountNumber = value;
            setPayments(updatedPayments);
          };

          const setReferenceNumber = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].epfReferenceNumber = value;
            setPayments(updatedPayments);
          };

          const setFrequency = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].frequency = value;
            setPayments(updatedPayments);
          };

          const setRecurringBank = (value: string) => {
            const updatedPayments = [...payments];
            updatedPayments[index].recurringBank = value;
            setPayments(updatedPayments);
          };

          const setRecurringType = (value: string) => {
            const updatedPayments = [...payments];
            const bank = value === "FPX" ? "" : DICTIONARY_DDA_BANK[0].value;
            updatedPayments[index] = { ...updatedPayments[index], recurringBank: bank };
            updatedPayments[index].recurringType = value;
            setPayments(updatedPayments);
          };

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
            payment.clientTrustAccountNumber === undefined;
          const onlineBankingDisabled = baseCashDisabled === true || payment.transactionDate === undefined;
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
            payment.proof === undefined;

          let saveDisabled = onlineBankingDisabled;

          const paymentMethodProps = {
            currency: payment.currency!,
            kibBankName: payment.kibBankName!,
            kibBankAccountNumber: payment.kibBankAccountNumber!,
            setTransactionDate: setTransactionDate,
            transactionDate: payment.transactionDate!,
          };
          let paymentMethodInfo = <OnlineBanking {...paymentMethodProps} />;

          switch (payment.paymentMethod!) {
            case "Online Banking":
              saveDisabled = onlineBankingDisabled;
              paymentMethodInfo = <OnlineBanking {...paymentMethodProps} />;
              break;
            case "Cheque":
              saveDisabled = chequeDisabled;
              paymentMethodInfo = (
                <Cheque
                  {...paymentMethodProps}
                  bankName={payment.bankName!}
                  checkNumber={payment.checkNumber!}
                  setBankName={setBankName!}
                  setCheckNumber={setCheckNumber!}
                />
              );
              break;
            case "Client Trust Account (CTA)":
              saveDisabled = ctaDisabled;
              paymentMethodInfo = (
                <ClientTrustAccount
                  clientName={payment.clientName!}
                  clientTrustAccountNumber={payment.clientTrustAccountNumber!}
                  setClientName={setClientName}
                  setClientTrust={setClientTrust}
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
                  bankNames={recurringBankNames}
                  bankAccountName={payment.bankAccountName!}
                  bankAccountNumber={payment.bankAccountNumber!}
                  frequency={payment.frequency!}
                  isFpx={true}
                  recurringBank={payment.recurringBank!}
                  recurringType={payment.recurringType!}
                  setBankAccountName={setBankAccountName}
                  setBankAccountNumber={setBankAccountNumber}
                  setFrequency={setFrequency}
                  setRecurringBank={setRecurringBank}
                  setRecurringType={setRecurringType}
                />
              );
              break;

            default:
              break;
          }

          return (
            <View key={index}>
              {index !== payments.length - 1 || index === 0 ? null : (
                <View style={headerStyle}>
                  <Text style={fs16BoldBlack2}>{PAYMENT.LABEL_ADD_PAYMENT}</Text>
                  <CustomFlexSpacer />
                  <IconButton
                    color={colorBlue._2}
                    onPress={handleExpandInfo}
                    name={infoIcon}
                    size={sh16}
                    style={circleBorder(sw24, sw1, colorGray._7)}
                  />
                </View>
              )}
              {index === 0 ? <View style={borderBottomBlack21} /> : null}
              {payments.length === 1 ? <CustomSpacer space={sh24} /> : null}
              {index === payments.length - 1 ? (
                <Fragment>
                  {payment.paymentMethod! === "Recurring" ? null : (
                    <Fragment>
                      <View style={px(sw24)}>
                        <View style={flexRow}>
                          {currencies.length > 0 ? (
                            <AdvancedDropdown
                              items={currencies}
                              handleChange={setCurrency}
                              label={PAYMENT.LABEL_CURRENCY}
                              value={payment.currency!}
                            />
                          ) : (
                            <CustomTextInput
                              error={amountError}
                              label={PAYMENT.LABEL_AMOUNT}
                              inputPrefix={payment.currency}
                              onBlur={checkAmount}
                              onChangeText={setAmount}
                              prefixStyle={fs16RegBlack2}
                              value={payment.amount}
                            />
                          )}
                          <CustomSpacer isHorizontal={true} space={sw64} />
                          {payment.paymentMethod! === "EPF" ? (
                            <CustomTextInput
                              error={amountError}
                              label={PAYMENT.LABEL_EPF_ACCOUNT}
                              onBlur={checkAmount}
                              onChangeText={setEpfAccountNumber}
                              value={payment.epfAccountNumber}
                            />
                          ) : (
                            <AdvancedDropdown
                              items={DICTIONARY_PAYMENT_METHOD}
                              handleChange={setPaymentMethod}
                              label={PAYMENT.LABEL_PAYMENT_METHOD}
                              value={payment.paymentMethod!}
                            />
                          )}
                        </View>
                      </View>
                      {currencies.length > 0 ? (
                        <View style={px(sw24)}>
                          <CustomSpacer space={sh32} />
                          <View style={flexRow}>
                            <CustomTextInput
                              error={amountError}
                              label={PAYMENT.LABEL_AMOUNT}
                              inputPrefix={payment.currency}
                              onBlur={checkAmount}
                              onChangeText={setAmount}
                              prefixStyle={fs16RegBlack2}
                              value={payment.amount}
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
                    {payment.paymentMethod! === "EPF" ? null : (
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
                    {payment.paymentMethod! === "Recurring" || payment.paymentMethod! === "EPF" ? null : (
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
                  {payment.paymentMethod! === "Recurring" || payment.paymentMethod! === "EPF" ? null : (
                    <View style={px(sw24)}>
                      <CustomSpacer space={sh24} />
                      <OutlineButton
                        buttonType="dashed"
                        disabled={saveDisabled}
                        icon="plus"
                        onPress={handleAddInfo}
                        text={PAYMENT.BUTTON_ADDITIONAL}
                        textStyle={fs12BoldBlack2}
                      />
                    </View>
                  )}
                  <CustomSpacer space={sh32} />
                  <ActionButtons
                    handleCancel={handleCancelPaymentInfo}
                    handleContinue={handleSavePayment}
                    continueDisabled={saveDisabled}
                    labelContinue={PAYMENT.BUTTON_SAVE}
                    buttonContainerStyle={centerHorizontal}
                  />
                  <CustomSpacer space={sh56} />
                </Fragment>
              ) : (
                <Fragment>
                  <View style={headerStyle}>
                    <IcoMoon color={colorBlue._2} name="check" size={sh24} />
                    <CustomSpacer isHorizontal={true} space={sw16} />
                    <Text style={fs16RegBlack2}>{`${PAYMENT.LABEL_ADDED_PAYMENT} - ${payment.paymentMethod!} ${payment.currency} ${
                      payment.amount
                    }`}</Text>
                    {/* <CustomFlexSpacer />
                    <IconButton
                      color={colorBlue._2}
                      onPress={handleExpandInfo}
                      name="caret-down"
                      size={sh16}
                      style={circleBorder(sw24, sw1, colorGray._7)}
                    /> */}
                  </View>
                  <Dash />
                </Fragment>
              )}
            </View>
          );
        })}
    </View>
  );
};
