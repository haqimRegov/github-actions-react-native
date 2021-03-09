import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AdvancedDropdown, CustomCard, CustomTextInput, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_DDA_BANK, DICTIONARY_FPX_BANK, DICTIONARY_RECURRING_FREQUENCY } from "../../../data/dictionary";
import { px, sh32, sh8, sw24, sw360, sw40, sw64 } from "../../../styles";

const { PAYMENT } = Language.PAGE;

export interface RecurringProps {
  allowedRecurringType?: string[];
  bankNames: TypeLabelValue[];
  bankAccountName: string;
  bankAccountNumber: string;
  combinedName: string;
  frequency: string;
  recurringBank: string;
  recurringType: string;
  setBankAccountName: (value: string) => void;
  setBankAccountNumber: (value: string) => void;
  setCombinedName: (value: string) => void;
  setFrequency: (value: string) => void;
  setRecurringBank: (value: string) => void;
  setRecurringType: (value: string) => void;
}

export const Recurring: FunctionComponent<RecurringProps> = ({
  allowedRecurringType,
  bankNames,
  bankAccountName,
  bankAccountNumber,
  combinedName,
  frequency,
  recurringBank,
  recurringType,
  setBankAccountName,
  setBankAccountNumber,
  setCombinedName,
  setFrequency,
  setRecurringBank,
  setRecurringType,
}: RecurringProps) => {
  const recurringOptions = [PAYMENT.OPTION_DDA];
  const ddaBank = recurringType === "FPX" ? DICTIONARY_FPX_BANK : DICTIONARY_DDA_BANK;
  // const sameRecurringInfoLabel = recurringType === "FPX" ? PAYMENT.LABEL_SAME_FPX : PAYMENT.LABEL_SAME_DDA;
  if (allowedRecurringType !== undefined && allowedRecurringType.includes("FPX")) {
    recurringOptions.push(PAYMENT.OPTION_FPX);
  }

  const handleBankName = (value: string) => {
    if (value !== "Combined" && combinedName !== "") {
      setCombinedName("");
    }
    setBankAccountName(value);
  };

  const items = [
    <View style={{ width: sw360 }}>
      <TextSpaceArea spaceToBottom={sh8} text={PAYMENT.LABEL_RECURRING_TYPE} />
      <RadioButtonGroup direction="row" options={recurringOptions} selected={recurringType} setSelected={setRecurringType} space={sw40} />
    </View>,
    <View />,
    <AdvancedDropdown items={bankNames} handleChange={handleBankName} label={PAYMENT.LABEL_BANK_ACCOUNT_NAME} value={bankAccountName} />,
    <View>
      <CustomTextInput
        keyboardType="numeric"
        label={PAYMENT.LABEL_BANK_ACCOUNT_NUMBER}
        onChangeText={setBankAccountNumber}
        value={bankAccountNumber}
      />
    </View>,
    <AdvancedDropdown
      items={DICTIONARY_RECURRING_FREQUENCY}
      handleChange={setFrequency}
      label={PAYMENT.LABEL_FREQUENCY}
      value={frequency}
    />,
    <AdvancedDropdown items={ddaBank} handleChange={setRecurringBank} label={PAYMENT.LABEL_SELECT_RECURRING_BANK} value={recurringBank} />,
  ];

  if (bankAccountName === "Combined") {
    items.splice(
      3,
      0,
      <CustomTextInput autoCapitalize="words" label={PAYMENT.LABEL_COMBINED} onChangeText={setCombinedName} value={combinedName} />,
    );
  }

  return (
    <View>
      <View style={px(sw24)}>
        <CustomCard spaceBetweenGroup={sh32} spaceBetweenItem={sw64} items={items} />
        {/* <Switch label={sameRecurringInfoLabel} onPress={() => {}} toggle={false} /> */}
      </View>
    </View>
  );
};
