import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AdvancedDropdown, CustomSpacer, CustomTextInput, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_DDA_BANK, DICTIONARY_MALAYSIA_BANK_BASE, DICTIONARY_RECURRING_FREQUENCY } from "../../../data/dictionary";
import { flexRow, px, sh24, sh8, sw24, sw360, sw40, sw64 } from "../../../styles";

const { PAYMENT } = Language.PAGE;

export interface RecurringProps {
  allowedRecurringType?: string[];
  bankNames: TypeLabelValue[];
  bankAccountName: string;
  bankAccountNumber: string;
  frequency: string;
  recurringBank: string;
  recurringType: string;
  setBankAccountName: (value: string) => void;
  setBankAccountNumber: (value: string) => void;
  setFrequency: (value: string) => void;
  setRecurringBank: (value: string) => void;
  setRecurringType: (value: string) => void;
}

export const Recurring: FunctionComponent<RecurringProps> = ({
  allowedRecurringType,
  bankNames,
  bankAccountName,
  bankAccountNumber,
  frequency,
  recurringBank,
  recurringType,
  setBankAccountName,
  setBankAccountNumber,
  setFrequency,
  setRecurringBank,
  setRecurringType,
}: RecurringProps) => {
  const recurringOptions = [PAYMENT.OPTION_DDA];
  const ddaBank = recurringType === "FPX" ? DICTIONARY_MALAYSIA_BANK_BASE : DICTIONARY_DDA_BANK;
  // const sameRecurringInfoLabel = recurringType === "FPX" ? PAYMENT.LABEL_SAME_FPX : PAYMENT.LABEL_SAME_DDA;
  if (allowedRecurringType !== undefined && allowedRecurringType.includes("FPX")) {
    recurringOptions.push(PAYMENT.OPTION_FPX);
  }

  return (
    <View>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <View style={{ width: sw360 }}>
            <TextSpaceArea spaceToBottom={sh8} text={PAYMENT.LABEL_RECURRING_TYPE} />
            <RadioButtonGroup
              direction="row"
              options={recurringOptions}
              selected={recurringType}
              setSelected={setRecurringType}
              space={sw40}
            />
          </View>
          <CustomSpacer isHorizontal={true} space={sw64} />
          {/* <Switch label={sameRecurringInfoLabel} onPress={() => {}} toggle={false} /> */}
        </View>
      </View>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <AdvancedDropdown
            items={bankNames}
            handleChange={setBankAccountName}
            label={PAYMENT.LABEL_BANK_ACCOUNT_NAME}
            value={bankAccountName}
          />
          <CustomSpacer isHorizontal={true} space={sw64} />
          <CustomTextInput
            keyboardType="numeric"
            label={PAYMENT.LABEL_BANK_ACCOUNT_NUMBER}
            onChangeText={setBankAccountNumber}
            value={bankAccountNumber}
          />
        </View>
      </View>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <View style={flexRow}>
            <AdvancedDropdown
              items={DICTIONARY_RECURRING_FREQUENCY}
              handleChange={setFrequency}
              label={PAYMENT.LABEL_FREQUENCY}
              value={frequency}
            />
          </View>
          <CustomSpacer isHorizontal={true} space={sw64} />
          <View>
            <AdvancedDropdown
              items={ddaBank}
              handleChange={setRecurringBank}
              label={PAYMENT.LABEL_SELECT_RECURRING_BANK}
              value={recurringBank}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
