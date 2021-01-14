import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { flexChild } from "../../../../styles";
import { EditPdf } from "./EditPDF";
import { PDFList } from "./PDFList";

interface SignaturesProps extends AcknowledgementStoreProps, OnboardingContentProps {}

export const SignaturesComponent: FunctionComponent<SignaturesProps> = ({ handleNextStep, handleResetOnboarding }: SignaturesProps) => {
  const [editReceipt, setEditReceipt] = useState<IOnboardingReceiptState | undefined>(undefined);

  return (
    <View style={flexChild}>
      {editReceipt === undefined ? (
        <PDFList handleNextStep={handleNextStep} handleResetOnboarding={handleResetOnboarding} setEditReceipt={setEditReceipt} />
      ) : (
        <EditPdf handleNextStep={handleNextStep} setEditReceipt={setEditReceipt} editReceipt={editReceipt} />
      )}
    </View>
  );
};

export const Signatures = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(SignaturesComponent);
