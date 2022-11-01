import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import {
  CustomCard,
  CustomSpacer,
  CustomTextInput,
  Dash,
  LabeledTitle,
  NewDatePicker,
  NewDropdown,
  TextSpaceArea,
} from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_MALAYSIA_BANK_BASE } from "../../../data/dictionary";
import { DEVICE, fsTransformNone, px, sh143, sh24, sh4, sw24, sw360, sw64 } from "../../../styles";
import { scaledSpaceBetween, validateChequeNumber } from "../helpers";
import { IPaymentError } from "../PaymentInfo";

const { PAYMENT } = Language.PAGE;

export interface NewChequeProps {
  createdOn: Date;
  error: IPaymentError;
  payment: IPaymentInfo;
  setError: (value: IPaymentError) => void;
  setPayment: (value: IPaymentInfo) => void;
  setViewFile: (value: FileBase64 | undefined) => void;
  useOfSurplus?: boolean;
}

export const NewCheque: FunctionComponent<NewChequeProps> = ({
  createdOn,
  error,
  payment,
  setError,
  setPayment,
  setViewFile,
  useOfSurplus,
}: NewChequeProps) => {
  const { bankName, checkNumber, currency, isEditable, kibBankName, kibBankAccountNumber, transactionDate, proof } = payment;

  const setBankName = (value: string) => {
    setPayment({ ...payment, bankName: value });
  };

  const setChequeNumber = (value: string) => {
    setPayment({ ...payment, checkNumber: value });
  };

  const checkChequeNumber = () => {
    setError({ ...error, checkNumber: validateChequeNumber(payment) });
  };

  const setTransactionDate = (value?: Date) => {
    setPayment({ ...payment, transactionDate: value });
  };

  const handleViewFile = () => {
    setViewFile(proof);
  };

  const infoItems = [
    <LabeledTitle
      label={PAYMENT.LABEL_KIB_ACCOUNT}
      spaceToLabel={sh4}
      title={`${kibBankName} - ${kibBankAccountNumber}`}
      style={{ width: sw360 }}
    />,
    <LabeledTitle label={PAYMENT.LABEL_CURRENCY} spaceToLabel={sh4} title={currency || "-"} style={{ width: sw360 }} />,
  ];

  const inputItems = [
    <NewDropdown items={DICTIONARY_MALAYSIA_BANK_BASE} handleChange={setBankName} label={PAYMENT.LABEL_BANK_NAME} value={bankName} />,
    <CustomTextInput
      error={error.checkNumber}
      label={PAYMENT.LABEL_CHEQUE_NO}
      onBlur={checkChequeNumber}
      onChangeText={setChequeNumber}
      value={checkNumber}
    />,
    <View>
      <TextSpaceArea spaceToBottom={sh4} text={PAYMENT.LABEL_TRANSACTION_DATE} />
      <NewDatePicker
        datePickerStyle={{ height: sh143 }}
        mode="date"
        maximumDate={moment().toDate()}
        minimumDate={createdOn !== undefined ? createdOn : moment().toDate()}
        setValue={setTransactionDate}
        value={transactionDate}
      />
    </View>,
  ];

  const surplusItems = [
    <LabeledTitle label={PAYMENT.LABEL_BANK_NAME} spaceToLabel={sh4} title={bankName} style={{ width: sw360 }} />,
    <LabeledTitle label={PAYMENT.LABEL_CHEQUE_NO} spaceToLabel={sh4} title={checkNumber} style={{ width: sw360 }} />,
    <LabeledTitle
      label={PAYMENT.LABEL_TRANSACTION_DATE}
      spaceToLabel={sh4}
      title={transactionDate ? moment(transactionDate, "x").format(DEFAULT_DATE_FORMAT) : "-"}
      style={{ width: sw360 }}
    />,
    <LabeledTitle
      iconSize={sh24}
      label={PAYMENT.LABEL_PROOF}
      onPress={handleViewFile}
      spaceToLabel={sh4}
      style={{ width: sw360 }}
      title={payment.proof ? `${payment.proof.name}` : "-"}
      titleIcon="file"
      titleStyle={fsTransformNone}
    />,
  ];

  const scaledSpace = DEVICE.SCREEN.WIDTH !== 1080 ? scaledSpaceBetween() : sw64;

  return (
    <View style={px(sw24)}>
      <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={sw64} items={infoItems} />
      <Dash />
      <CustomSpacer space={sh24} />
      <CustomCard
        spaceBetweenGroup={sh24}
        spaceBetweenItem={scaledSpace}
        items={useOfSurplus === true || isEditable === false ? surplusItems : inputItems}
      />
    </View>
  );
};
