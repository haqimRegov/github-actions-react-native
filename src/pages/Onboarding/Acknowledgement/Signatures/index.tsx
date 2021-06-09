import React, { Fragment, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { EditPdf } from "./EditPDF";
import { PDFList } from "./PDFList";

interface SignaturesProps extends AcknowledgementStoreProps, OnboardingContentProps {}

export const SignaturesComponent: FunctionComponent<SignaturesProps> = ({ handleNextStep, handleResetOnboarding }: SignaturesProps) => {
  const [editReceipt, setEditReceipt] = useState<IOnboardingReceiptState | undefined>(undefined);

  return (
    <Fragment>
      {editReceipt === undefined ? (
        <PDFList handleNextStep={handleNextStep} handleResetOnboarding={handleResetOnboarding} setEditReceipt={setEditReceipt} />
      ) : (
        <EditPdf handleNextStep={handleNextStep} setEditReceipt={setEditReceipt} editReceipt={editReceipt} />
      )}
    </Fragment>
  );
};

export const Signatures = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(SignaturesComponent);
