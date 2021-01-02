import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, CustomTextInput } from "../../../../components";
import { Language } from "../../../../constants";
import { flexRow, px, sh24, sw24, sw64 } from "../../../../styles";

const { PAYMENT } = Language.PAGE;

export interface ClientTrustAccountProps {
  clientName: string;
  clientTrustAccountNumber: string;
  setClientName: (value: string) => void;
  setClientTrust: (value: string) => void;
}

export const ClientTrustAccount: FunctionComponent<ClientTrustAccountProps> = ({
  clientName,
  clientTrustAccountNumber,
  setClientName,
  setClientTrust,
}: ClientTrustAccountProps) => {
  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <View style={flexRow}>
        <CustomTextInput label={PAYMENT.LABEL_CLIENT_NAME} onChangeText={setClientName} value={clientName} />
        <CustomSpacer isHorizontal={true} space={sw64} />
        <CustomTextInput label={PAYMENT.LABEL_TRUST_ACCOUNT_NO} onChangeText={setClientTrust} value={clientTrustAccountNumber} />
      </View>
    </View>
  );
};
