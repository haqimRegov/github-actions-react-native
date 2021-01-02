import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomDatePicker, CustomSpacer, LabeledTitle, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { colorTransparent, flexRow, fs16BoldBlack2, px, sh143, sh24, sh8, sw16, sw24, sw360, sw48, sw64 } from "../../../../styles";

const { PAYMENT } = Language.PAGE;

export interface CashDepositMachineProps {
  currency: string;
  kibBankName: string;
  kibBankAccountNumber: string;
  setTransactionDate: (value?: Date | undefined) => void;
  setTransactionTime: (value?: Date | undefined) => void;
  transactionDate: Date | undefined;
  transactionTime: Date | undefined;
}

export const CashDepositMachine: FunctionComponent<CashDepositMachineProps> = ({
  currency,
  kibBankName,
  kibBankAccountNumber,
  setTransactionDate,
  setTransactionTime,
  transactionDate,
  transactionTime,
}: CashDepositMachineProps) => {
  return (
    <View>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <View>
            <TextSpaceArea text={PAYMENT.LABEL_TRANSACTION_DATE} />
            <CustomDatePicker
              datePickerStyle={{ height: sh143 }}
              dropdownStyle={{ borderBottomLeftRadius: sw48, borderBottomRightRadius: sw48, borderBottomColor: colorTransparent }}
              mode="date"
              setValue={setTransactionDate}
              value={transactionDate}
            />
          </View>
          <CustomSpacer isHorizontal={true} space={sw64} />
          <View>
            <TextSpaceArea text={PAYMENT.LABEL_TRANSACTION_TIME} />
            <CustomDatePicker
              datePickerStyle={{ height: sh143 }}
              dropdownStyle={{ borderBottomLeftRadius: sw48, borderBottomRightRadius: sw48, borderBottomColor: colorTransparent }}
              mode="time"
              setValue={setTransactionTime}
              value={transactionTime}
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
    </View>
  );
};
