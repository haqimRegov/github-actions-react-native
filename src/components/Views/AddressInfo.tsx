import React from "react";
import { View } from "react-native";

import { Language } from "../../constants/language";
import { fs16BoldBlack1, sh16, sh8, sw240 } from "../../styles";
import { LabeledTitle } from "./LabeledTitle";

const { ADDRESS } = Language.PAGE;

export interface AddressInfoProps {
  data: IAddress;
  labelAddress: string;
}

export const AddressInfo = ({ data, labelAddress }: AddressInfoProps) => {
  const { address, postCode, city, state, country } = data;
  return (
    <View style={{ width: sw240 }}>
      <LabeledTitle label={labelAddress} spaceToBottom={sh16} spaceToLabel={sh8} title={address} titleStyle={fs16BoldBlack1} />
      <LabeledTitle label={ADDRESS.LABEL_POSTCODE} spaceToBottom={sh16} spaceToLabel={sh8} title={postCode} titleStyle={fs16BoldBlack1} />
      <LabeledTitle label={ADDRESS.LABEL_CITY} spaceToBottom={sh16} spaceToLabel={sh8} title={city} titleStyle={fs16BoldBlack1} />
      <LabeledTitle label={ADDRESS.LABEL_STATE} spaceToBottom={sh16} spaceToLabel={sh8} title={state} titleStyle={fs16BoldBlack1} />
      <LabeledTitle label={ADDRESS.LABEL_COUNTRY} spaceToBottom={sh16} spaceToLabel={sh8} title={country} titleStyle={fs16BoldBlack1} />
    </View>
  );
};
