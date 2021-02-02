import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, CustomTextInput } from "../../../components";
import { Language } from "../../../constants";
import { flexRow, px, sh24, sw24 } from "../../../styles";

const { PAYMENT } = Language.PAGE;

export interface EPFProps {
  setReferenceNumber: (value: string) => void;
  referenceNumber: string;
}

export const EPF: FunctionComponent<EPFProps> = ({ setReferenceNumber, referenceNumber }: EPFProps) => {
  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <View style={flexRow}>
        <CustomTextInput label={PAYMENT.LABEL_EPF_REFERENCE} onChangeText={setReferenceNumber} value={referenceNumber} />
      </View>
    </View>
  );
};
