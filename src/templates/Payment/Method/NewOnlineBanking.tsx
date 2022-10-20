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
import { DEVICE, fsTransformNone, px, sh143, sh24, sh4, sw24, sw360, sw4, sw64 } from "../../../styles";
import { scaledSpaceBetween } from "../helpers";

const { PAYMENT } = Language.PAGE;

export interface NewOnlineBankingProps {
  createdOn: Date;
  payment: IPaymentInfo;
  setPayment: (value: IPaymentInfo) => void;
  setViewFile: (value: FileBase64 | undefined) => void;
  useOfSurplus?: boolean;
}

export const NewOnlineBanking: FunctionComponent<NewOnlineBankingProps> = ({
  createdOn,
  payment,
  setPayment,
  setViewFile,
  useOfSurplus,
}: NewOnlineBankingProps) => {
  const { bankName, currency, isEditable, kibBankName, kibBankAccountNumber, proof, referenceNumber, transactionDate } = payment;

  const setBankName = (value: string) => {
    setPayment({ ...payment, bankName: value });
  };

  const setReferenceNumber = (value: string) => {
    setPayment({ ...payment, referenceNumber: value });
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
    <LabeledTitle label={PAYMENT.LABEL_CURRENCY_NEW} spaceToLabel={sh4} title={currency || "-"} style={{ width: sw360 }} />,
  ];

  const inputItems = [
    <NewDropdown items={DICTIONARY_MALAYSIA_BANK_BASE} handleChange={setBankName} label={PAYMENT.LABEL_BANK_NAME} value={bankName} />,
    <CustomTextInput label={PAYMENT.LABEL_REFERENCE_NO} onChangeText={setReferenceNumber} value={referenceNumber} />,
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
    <LabeledTitle label={PAYMENT.LABEL_REFERENCE_NO} spaceToLabel={sh4} title={referenceNumber} style={{ width: sw360 }} />,
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
      spaceToIcon={sw4}
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
      <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={scaledSpace} items={infoItems} />
      <Dash />
      <CustomSpacer space={sh24} />
      <CustomCard
        spaceBetweenGroup={sh24}
        spaceBetweenItem={scaledSpace}
        items={useOfSurplus === true || isEditable === false ? surplusItems : inputItems}
      />
      {useOfSurplus === true ? <Dash /> : null}
    </View>
  );
};
