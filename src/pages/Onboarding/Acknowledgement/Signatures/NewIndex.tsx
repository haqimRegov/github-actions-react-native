import React, { useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { flexChild } from "../../../../styles";
import { NewEditPdf } from "./NewEditPDF";
import { NewPDFList } from "./NewPDFList";

interface SignaturesProps extends AcknowledgementStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

export const SignaturesComponent = ({ handleNextStep }: SignaturesProps) => {
  const [editReceipt, setEditReceipt] = useState<IOnboardingReceiptState | undefined>(undefined);

  return (
    <View style={flexChild}>
      {editReceipt === undefined ? (
        <NewPDFList handleNextStep={handleNextStep} setEditReceipt={setEditReceipt} />
      ) : (
        <NewEditPdf handleNextStep={handleNextStep} setEditReceipt={setEditReceipt} editReceipt={editReceipt} />
      )}
    </View>
  );
};

export const NewSignatures = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(SignaturesComponent);
