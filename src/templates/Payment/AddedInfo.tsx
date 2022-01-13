import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, IconButton } from "../../components";
import { Language } from "../../constants";
import {
  borderLeftGray3,
  colorBlue,
  colorWhite,
  fs14BoldGray6,
  fs14RegGray5,
  px,
  rowCenterVertical,
  sh24,
  sh72,
  sw16,
  sw24,
  sw8,
} from "../../styles";
import { formatAmount } from "../../utils";

const { PAYMENT } = Language.PAGE;

interface AddedInfoProps {
  payment: IPaymentInfo;
  handleEdit: () => void;
}

export const AddedInfo: FunctionComponent<AddedInfoProps> = ({ payment, handleEdit }: AddedInfoProps) => {
  return (
    <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
      <View style={{ ...rowCenterVertical, ...px(sw24), height: sh72 }}>
        <Text style={fs14RegGray5}>{PAYMENT.LABEL_ADDED_INFO}</Text>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <Text style={fs14BoldGray6}>{payment.paymentMethod}</Text>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={{ ...borderLeftGray3, height: sh24 }} />
        <CustomSpacer isHorizontal={true} space={sw16} />
        <Text style={fs14BoldGray6}>{`${payment.currency} ${formatAmount(payment.amount)}`}</Text>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <IconButton color={colorBlue._1} name="pencil" onPress={handleEdit} size={sw16} />
      </View>
    </View>
  );
};
