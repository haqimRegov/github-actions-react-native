import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTooltip, IconButton } from "../../components";
import { Language } from "../../constants";
import {
  borderLeftGray3,
  colorBlue,
  colorWhite,
  disabledOpacity6,
  fs12RegWhite1,
  fs14BoldGray6,
  fs14RegGray5,
  px,
  rowCenterVertical,
  sh24,
  sh72,
  sh80,
  sw12,
  sw16,
  sw24,
  sw240,
  sw7,
  sw8,
} from "../../styles";
import { formatAmount } from "../../utils";

const { PAYMENT } = Language.PAGE;

interface AddedInfoProps {
  availableBalance: IPaymentInfo[];
  handleEdit: () => void;
  payment: IPaymentInfo;
  tempPayments: IPaymentInfo[];
}

export const AddedInfo: FunctionComponent<AddedInfoProps> = ({ availableBalance, handleEdit, payment, tempPayments }: AddedInfoProps) => {
  const findSurplus = availableBalance.filter((eachAvailableBalance: IPaymentInfo) => {
    const findSurplusPayment = tempPayments.filter(
      (eachPayment: IPaymentInfo) => eachPayment.paymentId === eachAvailableBalance.parent && eachPayment.paymentId !== undefined,
    );
    return findSurplusPayment.length > 0;
  });
  const filteredSurplus = findSurplus.filter((eachSurplus: IPaymentInfo) => eachSurplus.currency === payment.currency);
  const ctaAccountNumber = payment.clientTrustAccountNumber !== "" && payment.clientTrustAccountNumber !== null;

  return (
    <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
      <View style={{ ...rowCenterVertical, ...px(sw24), height: sh72 }}>
        <Text style={fs14RegGray5}>{PAYMENT.LABEL_ADDED_INFO}</Text>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <Text style={fs14BoldGray6}>{payment.paymentMethod}</Text>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={{ ...borderLeftGray3, height: sh24 }} />
        <CustomSpacer isHorizontal={true} space={sw16} />
        {ctaAccountNumber ? (
          <Fragment>
            <Text style={fs14BoldGray6}>{payment.clientTrustAccountNumber}</Text>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={{ ...borderLeftGray3, height: sh24 }} />
            <CustomSpacer isHorizontal={true} space={sw16} />
          </Fragment>
        ) : null}

        <Text style={fs14BoldGray6}>{`${payment.currency} ${formatAmount(payment.amount)}`}</Text>
        <CustomSpacer isHorizontal={true} space={sw16} />
        {filteredSurplus.length === 0 ||
        payment.paymentId === filteredSurplus[0].parent ||
        payment.currency !== filteredSurplus[0].currency ? (
          <IconButton color={colorBlue._1} name="pencil" onPress={handleEdit} size={sw16} />
        ) : (
          <CustomTooltip
            content={<Text style={fs12RegWhite1}>{PAYMENT.TOOLTIP_EDIT_NORMAL_POP}</Text>}
            contentStyle={{ height: sh80, width: sw240 }}
            arrowSize={{ width: sw12, height: sw7 }}>
            <View onStartShouldSetResponderCapture={() => true}>
              <IconButton color={colorBlue._1} name="pencil" onPress={handleEdit} size={sw16} style={disabledOpacity6} />
            </View>
          </CustomTooltip>
        )}
      </View>
    </View>
  );
};
