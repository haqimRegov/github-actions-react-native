import React, { Fragment, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { EditPdf } from "./EditPDF";
import { PDFList } from "./PDFList";

interface SignaturesProps extends AcknowledgementStoreProps, ForceUpdateContentProps {}

export const SignaturesComponent: FunctionComponent<SignaturesProps> = ({ handleNextStep, handleResetForceUpdate }: SignaturesProps) => {
  const [editReceipt, setEditReceipt] = useState<IOnboardingReceiptState | undefined>(undefined);

  return (
    <Fragment>
      {editReceipt === undefined ? (
        <PDFList handleNextStep={handleNextStep} handleResetForceUpdate={handleResetForceUpdate} setEditReceipt={setEditReceipt} />
      ) : (
        <EditPdf setEditReceipt={setEditReceipt} editReceipt={editReceipt} />
      )}
    </Fragment>
  );
};

export const Signatures = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(SignaturesComponent);
