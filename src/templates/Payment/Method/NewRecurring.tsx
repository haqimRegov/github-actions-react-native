import React, { FunctionComponent, useEffect } from "react";
import { View } from "react-native";

import {
  CustomCard,
  CustomSpacer,
  CustomTextInput,
  Dash,
  LabeledTitle,
  NewDropdown,
  RadioButtonGroup,
  Switch,
  TextSpaceArea,
} from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_DDA_BANK, DICTIONARY_FPX_BANK, DICTIONARY_RECURRING_FREQUENCY } from "../../../data/dictionary";
import { fs12BoldGray5, fs16RegBlack2, px, sh16, sh2, sh24, sh4, sh8, sw119, sw24, sw360, sw64 } from "../../../styles";
import { deleteKey, isObjectEqual } from "../../../utils";

const { PAYMENT } = Language.PAGE;

export interface NewRecurringProps {
  accountNames: TypeLabelValue[];
  allowedRecurringType?: string[];
  payment: IPaymentInfo;
  recurringDetails?: IRecurringDetails;
  setPayment: (value: IPaymentInfo) => void;
}

export const NewRecurring: FunctionComponent<NewRecurringProps> = ({
  allowedRecurringType,
  accountNames,
  payment,
  recurringDetails,
  setPayment,
}: NewRecurringProps) => {
  const {
    bankAccountName,
    bankAccountNumber,
    recurringBank,
    frequency,
    orderNumber,
    combinedBankAccountName,
    recurringType,
    usePreviousRecurring,
  } = payment;
  const recurringOptions: string[] = [];
  const ddaBank = recurringType === "FPX" ? DICTIONARY_FPX_BANK : DICTIONARY_DDA_BANK;
  // const sameRecurringInfoLabel = recurringType === "FPX" ? PAYMENT.LABEL_SAME_FPX : PAYMENT.LABEL_SAME_DDA;
  if (allowedRecurringType !== undefined && allowedRecurringType !== null && allowedRecurringType.includes("FPX")) {
    recurringOptions.push(PAYMENT.OPTION_FPX);
  }
  recurringOptions.push(PAYMENT.OPTION_DDA);

  const handleBankAccountNumber = (name: string) => {
    setPayment({ ...payment, bankAccountNumber: name });
  };

  const handleBankAccountName = (name: string) => {
    const checkCombined = name === "Combined" ? { isCombined: true } : {};
    setPayment({ ...payment, bankAccountName: name, ...checkCombined });
  };

  const handleCombinedName = (name: string) => {
    setPayment({ ...payment, combinedBankAccountName: name });
  };

  const handleBankName = (value: string) => {
    if (value !== "Combined" && combinedBankAccountName !== "") {
      handleCombinedName("");
    }
    handleBankAccountName(value);
  };

  const handleFrequency = (currentFrequency: string) => {
    setPayment({ ...payment, frequency: currentFrequency });
  };

  const handleRecurringBank = (updatedRecurringBank: string) => {
    setPayment({ ...payment, recurringBank: updatedRecurringBank });
  };

  const generateNewInfo = (updatedRecurringType: string) => {
    return {
      bankAccountName: accountNames.length === 1 ? accountNames[0].value : "",
      bankAccountNumber: "",
      combinedBankAccountName: undefined,
      frequency: "15th of the month",
      recurringBank: updatedRecurringType === "DDA" ? "Public Bank" : "",
      usePreviousRecurring: false,
    };
  };

  const handleRecurringType = (updatedRecurringType: string) => {
    const updatedInfo = generateNewInfo(updatedRecurringType);
    setPayment({ ...payment, recurringType: updatedRecurringType, ...updatedInfo });
  };
  const lastRecurringInfo: IRecurringInfo | undefined =
    recurringDetails !== undefined ? recurringDetails[recurringType.toLowerCase()][0] : undefined;

  const handleUsePreviousInfo = () => {
    const updatedPayment = { ...payment, usePreviousRecurring: !payment.usePreviousRecurring };
    const updatedLastAppliedInfo =
      lastRecurringInfo !== undefined && updatedPayment.usePreviousRecurring === true
        ? {
            bankAccountName: lastRecurringInfo.bankAccountName,
            bankAccountNumber: lastRecurringInfo.bankAccountNumber,
            frequency: lastRecurringInfo.frequency,
            recurringBank: lastRecurringInfo.recurringBank,
          }
        : generateNewInfo(updatedPayment.recurringType);
    setPayment({ ...updatedPayment, ...updatedLastAppliedInfo });
  };

  const useRecurringLabel = recurringType === "DDA" ? PAYMENT.LABEL_USE_PREVIOUS_DDA : PAYMENT.LABEL_USE_PREVIOUS_FPX;
  const frequencyList = DICTIONARY_RECURRING_FREQUENCY.map((eachFrequency: TypeLabelValue) => eachFrequency.value);
  const optionItems = [
    <View style={{ width: sw360 }}>
      <TextSpaceArea spaceToBottom={sh8} text={PAYMENT.LABEL_RECURRING_TYPE} />
      <RadioButtonGroup
        direction="row"
        optionStyle={{ width: sw119 }}
        options={recurringOptions}
        selected={recurringType}
        setSelected={handleRecurringType}
        space={sw64}
      />
    </View>,
  ];

  const lastAppliedInfo = (
    <Switch label={useRecurringLabel} labelStyle={fs16RegBlack2} onPress={handleUsePreviousInfo} toggle={usePreviousRecurring!} />
  );

  if (recurringDetails !== undefined) {
    if (
      recurringDetails.dda &&
      recurringDetails.dda.length > 0 &&
      recurringType === "DDA" &&
      recurringDetails.dda[0].orderNumber !== orderNumber
    ) {
      optionItems.push(lastAppliedInfo);
    }
    if (
      recurringDetails.fpx &&
      recurringDetails.fpx.length > 0 &&
      recurringType === "FPX" &&
      recurringDetails.fpx[0].orderNumber !== orderNumber
    ) {
      optionItems.push(lastAppliedInfo);
    }
  }

  const infoItems = [
    <LabeledTitle label={PAYMENT.LABEL_BANK_ACCOUNT_NAME} spaceToLabel={sh4} title={accountNames[0].value} style={{ width: sw360 }} />,
    <View>
      <CustomTextInput
        keyboardType="numeric"
        label={PAYMENT.LABEL_BANK_ACCOUNT_NUMBER}
        onChangeText={handleBankAccountNumber}
        value={bankAccountNumber}
      />
    </View>,
    <NewDropdown items={ddaBank} handleChange={handleRecurringBank} label={PAYMENT.LABEL_SELECT_RECURRING_BANK} value={recurringBank} />,
    <RadioButtonGroup
      direction="column"
      label={PAYMENT.LABEL_RECURRING_TYPE}
      labelStyle={fs12BoldGray5}
      options={frequencyList}
      selected={frequency}
      setSelected={handleFrequency}
      space={sh16}
    />,
  ];

  if (accountNames.length > 1) {
    infoItems.splice(
      0,
      1,
      <NewDropdown items={accountNames} handleChange={handleBankName} label={PAYMENT.LABEL_BANK_ACCOUNT_NAME} value={bankAccountName} />,
    );
  }

  if (recurringType === "DDA") {
    infoItems.splice(
      2,
      1,
      <LabeledTitle
        label={PAYMENT.LABEL_SELECT_RECURRING_BANK}
        spaceToLabel={sh2}
        title={DICTIONARY_DDA_BANK[0].label}
        style={{ width: sw360 }}
      />,
    );
  }

  if (bankAccountName === "Combined") {
    infoItems.splice(
      1,
      0,
      <CustomTextInput
        autoCapitalize="words"
        label={PAYMENT.LABEL_COMBINED}
        onChangeText={handleCombinedName}
        value={combinedBankAccountName}
      />,
    );
  }

  useEffect(() => {
    const currentRecurringInfo = {
      bankAccountName: payment.bankAccountName,
      bankAccountNumber: payment.bankAccountNumber,
      frequency: payment.frequency,
      recurringBank: payment.recurringBank,
    };
    if (
      payment.usePreviousRecurring === true &&
      lastRecurringInfo !== undefined &&
      isObjectEqual(currentRecurringInfo, deleteKey(lastRecurringInfo, ["orderNumber"])) === false
    ) {
      setPayment({ ...payment, usePreviousRecurring: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  return (
    <View style={px(sw24)}>
      <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={sw64} items={optionItems} />
      <Dash />
      <CustomSpacer space={sh24} />
      <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={sw64} items={infoItems} />
      <Dash />
    </View>
  );
};
