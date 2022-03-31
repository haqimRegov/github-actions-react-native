import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, Switch, TextInputMultiline } from "../../components";
import { Language } from "../../constants";
import { fs16RegBlack2, sh24 } from "../../styles";

const { PAYMENT } = Language.PAGE;

interface PaymentRemarkProps {
  payment: IPaymentInfo;
  setPayment: (value: IPaymentInfo) => void;
}

export const PaymentRemark: FunctionComponent<PaymentRemarkProps> = ({ payment, setPayment }: PaymentRemarkProps) => {
  const { remark } = payment;

  const toggleRemark = () => {
    setPayment({ ...payment, remark: payment.remark === undefined ? "" : undefined });
  };

  const setRemark = (value: string) => {
    setPayment({ ...payment, remark: value });
  };

  return (
    <View>
      <CustomSpacer space={sh24} />
      <Switch label={PAYMENT.LABEL_REMARK} labelStyle={fs16RegBlack2} onPress={toggleRemark} toggle={remark !== undefined} />
      {remark === undefined ? null : (
        <Fragment>
          <TextInputMultiline maxLength={255} onChangeText={setRemark} showLength={true} spaceToTop={sh24} value={remark} />
        </Fragment>
      )}
    </View>
  );
};
