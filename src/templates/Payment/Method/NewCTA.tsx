import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomCard, CustomSpacer, CustomTextInput, Dash, LabeledTitle, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import { DEVICE, fsTransformNone, px, sh24, sh4, sw24, sw360, sw4, sw64 } from "../../../styles";
import { scaledSpaceBetween, validateCtaNumber } from "../helpers";
import { IPaymentError } from "../PaymentInfo";

const { PAYMENT } = Language.PAGE;

export interface NewCTAProps {
  accountNames: TypeLabelValue[];
  error: IPaymentError;
  payment: IPaymentInfo;
  setError: (value: IPaymentError) => void;
  setPayment: (value: IPaymentInfo) => void;
  setViewFile: (value: FileBase64 | undefined) => void;
}

export const NewCTA: FunctionComponent<NewCTAProps> = ({
  accountNames,
  error,
  payment,
  setError,
  setPayment,
  setViewFile,
}: NewCTAProps) => {
  const { clientName, clientTrustAccountNumber, isEditable, proof, ctaTag } = payment;

  const handleClientAccountName = (name: string) => {
    setPayment({ ...payment, clientName: name });
  };

  const handleClientName = (value: string) => {
    handleClientAccountName(value);
  };

  const checkCTANumber = () => {
    setError({ ...error, ctaNumber: validateCtaNumber(payment) });
  };

  const handleClientTrustAccountNumber = (accountNumber: string) => {
    setPayment({ ...payment, clientTrustAccountNumber: accountNumber });
  };

  const handleViewFile = () => {
    setViewFile(proof);
  };

  const updatedAccountNames = accountNames.filter((eachAccountName: TypeLabelValue) => eachAccountName.value !== "Combined");

  const inputItems = [
    <LabeledTitle label={PAYMENT.LABEL_CLIENT_NAME} spaceToLabel={sh4} title={accountNames[0].value} style={{ width: sw360 }} />,
    <CustomTextInput
      error={error.ctaNumber}
      label={PAYMENT.LABEL_TRUST_ACCOUNT_NO}
      maxLength={9}
      onBlur={checkCTANumber}
      onChangeText={handleClientTrustAccountNumber}
      value={clientTrustAccountNumber}
    />,
  ];

  if (accountNames.length > 1) {
    inputItems.splice(
      0,
      1,
      <NewDropdown items={updatedAccountNames} handleChange={handleClientName} label={PAYMENT.LABEL_CLIENT_NAME} value={clientName} />,
    );
  }

  const ctaItems = [
    <LabeledTitle label={PAYMENT.LABEL_CLIENT_NAME} spaceToLabel={sh4} title={clientName} style={{ width: sw360 }} />,
    <LabeledTitle label={PAYMENT.LABEL_TRUST_ACCOUNT_NO} spaceToLabel={sh4} title={clientTrustAccountNumber} style={{ width: sw360 }} />,
    <LabeledTitle
      iconSize={sh24}
      label={PAYMENT.LABEL_PROOF}
      onPress={handleViewFile}
      spaceToIcon={sw4}
      spaceToLabel={sh4}
      style={{ width: sw360 }}
      title={payment.proof ? `${payment.proof.name}` : "-"}
      titleIcon="file"
      titleStyle={fsTransformNone}
    />,
  ];

  const scaledSpace = DEVICE.SCREEN.WIDTH !== 1080 ? scaledSpaceBetween() : sw64;

  return (
    <View style={px(sw24)}>
      <Dash />
      <CustomSpacer space={sh24} />
      <CustomCard
        spaceBetweenGroup={sh24}
        spaceBetweenItem={scaledSpace}
        items={ctaTag !== undefined || isEditable === false ? ctaItems : inputItems}
      />
    </View>
  );
};
