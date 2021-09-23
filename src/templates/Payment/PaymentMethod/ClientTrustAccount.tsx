import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomCard, CustomTextInput, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import { px, sh24, sw24, sw64 } from "../../../styles";

const { PAYMENT } = Language.PAGE;

export interface ClientTrustAccountProps {
  bankNames: TypeLabelValue[];
  clientName: string;
  clientTrustAccountNumber: string;
  combinedName: string;
  setClientName: (value: string) => void;
  setClientTrust: (value: string) => void;
  setCombinedName: (value: string) => void;
}

export const ClientTrustAccount: FunctionComponent<ClientTrustAccountProps> = ({
  bankNames,
  clientName,
  clientTrustAccountNumber,
  combinedName,
  setClientName,
  setClientTrust,
  setCombinedName,
}: ClientTrustAccountProps) => {
  const handleClientName = (value: string) => {
    if (value !== "Combined" && combinedName !== "") {
      setCombinedName("");
    }
    setClientName(value);
  };

  const items = [
    <NewDropdown items={bankNames} handleChange={handleClientName} label={PAYMENT.LABEL_CLIENT_NAME} value={clientName} />,
    <CustomTextInput
      keyboardType="numeric"
      label={PAYMENT.LABEL_TRUST_ACCOUNT_NO}
      onChangeText={setClientTrust}
      value={clientTrustAccountNumber}
    />,
  ];

  if (clientName === "Combined") {
    items.splice(
      1,
      0,
      <CustomTextInput autoCapitalize="words" label={PAYMENT.LABEL_COMBINED} onChangeText={setCombinedName} value={combinedName} />,
    );
  }

  return (
    <View style={px(sw24)}>
      <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={sw64} items={items} />
    </View>
  );
};
