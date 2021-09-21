import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AdvancedDropdown, CustomSpacer, CustomTextInput, LabeledTitle, NewDatePicker, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_MALAYSIA_BANK_BASE } from "../../../data/dictionary";
import { flexRow, fs16BoldBlack2, px, sh143, sh24, sh32, sh8, sw16, sw24, sw360, sw64 } from "../../../styles";
import { isNumber } from "../../../utils";

const { PAYMENT } = Language.PAGE;

export interface ChequeProps {
  bankName: string;
  checkNumber: string;
  checkNumberError: string | undefined;
  currency: string;
  kibBankAccountNumber: string;
  kibBankName: string;
  onBlurCheckNumber: () => void;
  orderCreationDate?: Date;
  setBankName: (value: string) => void;
  setCheckNumber: (value: string) => void;
  setTransactionDate: (value: Date | undefined) => void;
  transactionDate: Date | undefined;
}

export const Cheque: FunctionComponent<ChequeProps> = ({
  bankName,
  checkNumber,
  checkNumberError,
  currency,
  kibBankAccountNumber,
  kibBankName,
  onBlurCheckNumber,
  orderCreationDate,
  setBankName,
  setCheckNumber,
  setTransactionDate,
  transactionDate,
}: ChequeProps) => {
  const handleCheckNumber = (value: string) => {
    if (isNumber(value) || value === "") {
      setCheckNumber(value);
    }
  };

  return (
    <View>
      <View style={px(sw24)}>
        <View style={flexRow}>
          <AdvancedDropdown
            items={DICTIONARY_MALAYSIA_BANK_BASE}
            handleChange={setBankName}
            label={PAYMENT.LABEL_BANK_NAME}
            value={bankName}
          />
          <CustomSpacer isHorizontal={true} space={sw64} />
          <CustomTextInput
            error={checkNumberError}
            keyboardType="numeric"
            label={PAYMENT.LABEL_CHEQUE_NO}
            onBlur={onBlurCheckNumber}
            onChangeText={handleCheckNumber}
            value={checkNumber}
          />
        </View>
      </View>
      <View style={px(sw24)}>
        <CustomSpacer space={sh32} />
        <View style={flexRow}>
          <LabeledTitle
            label={PAYMENT.LABEL_KIB_ACCOUNT}
            spaceToLabel={sh8}
            title={`${kibBankName} - ${kibBankAccountNumber}`}
            titleStyle={{ ...fs16BoldBlack2, ...px(sw16) }}
            style={{ width: sw360 }}
          />
          <CustomSpacer isHorizontal={true} space={sw64} />
          <View>
            <TextSpaceArea text={PAYMENT.LABEL_TRANSACTION_DATE} />
            <NewDatePicker
              datePickerStyle={{ height: sh143 }}
              mode="date"
              maximumDate={moment().toDate()}
              minimumDate={orderCreationDate !== undefined ? orderCreationDate : moment().toDate()}
              setValue={setTransactionDate}
              value={transactionDate}
            />
          </View>
        </View>
      </View>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <LabeledTitle
            label={PAYMENT.LABEL_CURRENCY}
            spaceToLabel={sh8}
            title={currency === "" ? "-" : currency}
            titleStyle={{ ...fs16BoldBlack2, ...px(sw16) }}
            style={{ width: sw360 }}
          />
        </View>
      </View>
    </View>
  );
};
