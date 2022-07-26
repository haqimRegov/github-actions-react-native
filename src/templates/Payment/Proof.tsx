import React, { Fragment, FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { UploadWithModal } from "../../components";
import { Language } from "../../constants";
import { colorWhite, shadow12Blue108, sw8 } from "../../styles";

const { PAYMENT } = Language.PAGE;
interface PaymentProofProps {
  payment: IPaymentInfo;
  setPayment: (value: IPaymentInfo) => void;
}

export const PaymentProof: FunctionComponent<PaymentProofProps> = ({ payment, setPayment }: PaymentProofProps) => {
  const { isEditable, paymentMethod, proof, tag, ctaTag } = payment;

  const setProof = (value?: FileBase64) => {
    setPayment({ ...payment, proof: value });
  };

  const container: ViewStyle = {
    ...shadow12Blue108,
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
  };

  return (
    <View style={container}>
      {paymentMethod === "EPF" ||
      paymentMethod === "Recurring" ||
      tag !== undefined ||
      proof === null ||
      isEditable === false ||
      ctaTag !== undefined ? null : (
        <Fragment>
          <UploadWithModal
            features={["camera", "gallery", "file"]}
            label={proof !== undefined ? PAYMENT.LABEL_PROOF_ADDED : PAYMENT.LABEL_PROOF_ADD}
            value={proof}
            setValue={setProof}
            onSuccess={setProof}
          />
        </Fragment>
      )}
    </View>
  );
};
