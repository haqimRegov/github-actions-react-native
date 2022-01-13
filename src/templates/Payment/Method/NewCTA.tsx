import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomCard, CustomSpacer, CustomTextInput, Dash, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import { px, sh24, sw24, sw64 } from "../../../styles";

const { PAYMENT } = Language.PAGE;

export interface NewCTAProps {
  accountNames: TypeLabelValue[];
  payment: IPaymentInfo;
  setPayment: (value: IPaymentInfo) => void;
}

export const NewCTA: FunctionComponent<NewCTAProps> = ({ accountNames, payment, setPayment }: NewCTAProps) => {
  const { clientName, clientTrustAccountNumber } = payment;

  const handleClientAccountName = (name: string) => {
    setPayment({ ...payment, clientName: name });
  };

  const handleClientName = (value: string) => {
    handleClientAccountName(value);
  };

  const handleClientTrustAccountNumber = (accountNumber: string) => {
    setPayment({ ...payment, clientTrustAccountNumber: accountNumber });
  };
  const updatedAccountNames = accountNames.filter((eachAccountName: TypeLabelValue) => eachAccountName.value !== "Combined");

  const infoItems = [
    <NewDropdown items={updatedAccountNames} handleChange={handleClientName} label={PAYMENT.LABEL_CLIENT_NAME} value={clientName} />,
    <CustomTextInput
      label={PAYMENT.LABEL_TRUST_ACCOUNT_NO}
      onChangeText={handleClientTrustAccountNumber}
      value={clientTrustAccountNumber}
    />,
  ];

  return (
    <View style={px(sw24)}>
      <Dash />
      <CustomSpacer space={sh24} />
      <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={sw64} items={infoItems} />
    </View>
  );
};
