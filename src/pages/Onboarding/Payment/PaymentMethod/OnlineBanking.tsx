import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AdvancedDropdown, CustomDatePicker, CustomSpacer, LabeledTitle, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_MALAYSIA_BANK_BASE } from "../../../../data/dictionary";
import { colorTransparent, flexRow, fs16BoldBlack2, px, sh143, sh24, sh8, sw16, sw24, sw360, sw48, sw64 } from "../../../../styles";

const { PAYMENT } = Language.PAGE;

export interface OnlineBankingProps {
  bankName: string;
  currency: string;
  kibBankName: string;
  kibBankAccountNumber: string;
  setBankName: (value: string) => void;
  setTransactionDate: (value?: Date | undefined) => void;
  transactionDate: Date | undefined;
}

export const OnlineBanking: FunctionComponent<OnlineBankingProps> = ({
  bankName,
  currency,
  kibBankName,
  kibBankAccountNumber,
  setBankName,
  setTransactionDate,
  transactionDate,
}: OnlineBankingProps) => {
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
          <View>
            <TextSpaceArea text={PAYMENT.LABEL_TRANSACTION_DATE} />
            <CustomDatePicker
              datePickerStyle={{ height: sh143 }}
              dropdownStyle={{ borderBottomLeftRadius: sw48, borderBottomRightRadius: sw48, borderBottomColor: colorTransparent }}
              mode="date"
              maximumDate={moment().toDate()}
              minimumDate={moment().toDate()}
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
            label={PAYMENT.LABEL_KIB_ACCOUNT}
            spaceToLabel={sh8}
            title={`${kibBankName} - ${kibBankAccountNumber}`}
            titleStyle={{ ...fs16BoldBlack2, ...px(sw16) }}
            style={{ width: sw360 }}
          />
          <CustomSpacer isHorizontal={true} space={sw64} />
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
