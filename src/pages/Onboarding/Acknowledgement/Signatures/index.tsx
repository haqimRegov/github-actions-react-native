import React, { Fragment, FunctionComponent, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { flexChild } from "../../../../styles";
import { EditPdf } from "./EditPDF";
import { PDFList } from "./PDFList";

interface SignaturesProps extends AcknowledgementStoreProps, OnboardingContentProps {}

export const SignaturesComponent: FunctionComponent<SignaturesProps> = ({ handleNextStep, handleResetOnboarding }: SignaturesProps) => {
  const [editReceipt, setEditReceipt] = useState<IOnboardingReceiptState | undefined>(undefined);
  const [pageWidth, setPageWidth] = useState<number>(0);

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        setPageWidth(e.nativeEvent.layout.width);
      }}
      style={flexChild}>
      {editReceipt === undefined ? (
        <PDFList handleNextStep={handleNextStep} handleResetOnboarding={handleResetOnboarding} setEditReceipt={setEditReceipt} />
      ) : (
        <EditPdf pageWidth={pageWidth} setEditReceipt={setEditReceipt} editReceipt={editReceipt} />
      )}
    </View>
  );
};

export const Signatures = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(SignaturesComponent);
