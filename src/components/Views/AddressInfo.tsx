import React, { FunctionComponent } from "react";
import { TextStyle, View } from "react-native";

import { Language } from "../../constants/language";
import { fs16BoldBlack1, sh16, sh8, sw240 } from "../../styles";
import { LabeledTitle } from "./LabeledTitle";

const { ADDRESS } = Language.PAGE;

export interface AddressInfoProps {
  data: IAddress;
  labelAddress: string;
}

export const AddressInfo: FunctionComponent<AddressInfoProps> = ({ data, labelAddress }: AddressInfoProps) => {
  const { address, postCode, city, state, country } = data;
  const labelStyle: TextStyle = { lineHeight: sh16 };
  const labeledTitleStyle = {
    labelStyle: labelStyle,
    spaceToBottom: sh16,
    spaceToLabel: sh8,
    titleStyle: fs16BoldBlack1,
  };

  return (
    <View style={{ width: sw240 }}>
      <LabeledTitle label={labelAddress} title={address} {...labeledTitleStyle} />
      <LabeledTitle label={ADDRESS.LABEL_POSTCODE} title={postCode} {...labeledTitleStyle} />
      <LabeledTitle label={ADDRESS.LABEL_CITY} title={city} {...labeledTitleStyle} />
      <LabeledTitle label={ADDRESS.LABEL_STATE} title={state} {...labeledTitleStyle} />
      <LabeledTitle label={ADDRESS.LABEL_COUNTRY} title={country} {...labeledTitleStyle} />
    </View>
  );
};
