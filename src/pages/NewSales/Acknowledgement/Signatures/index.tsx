import React, { FunctionComponent, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { flexChild } from "../../../../styles";
import { EditPdf } from "../../../../templates/Signatures/EditPDF";
import { PDFList } from "./PDFList";

interface SignaturesProps extends AcknowledgementStoreProps, NewSalesContentProps {}

export const SignaturesComponent: FunctionComponent<SignaturesProps> = ({
  accountType,
  handleNextStep,
  handleResetNewSales,
  newSales,
  personalInfo,
  receipts,
  updateReceipts,
}: SignaturesProps) => {
  const [editReceipt, setEditReceipt] = useState<IOnboardingReceiptState | undefined>(undefined);
  const [pageWidth, setPageWidth] = useState<number>(0);

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        setPageWidth(e.nativeEvent.layout.width);
      }}
      style={flexChild}>
      {editReceipt === undefined ? (
        <PDFList handleNextStep={handleNextStep} handleResetNewSales={handleResetNewSales} setEditReceipt={setEditReceipt} />
      ) : (
        <EditPdf
          accountType={accountType}
          editReceipt={editReceipt}
          newSales={newSales}
          pageWidth={pageWidth}
          personalInfo={personalInfo}
          receipts={receipts}
          setEditReceipt={setEditReceipt}
          updateReceipts={updateReceipts}
        />
      )}
    </View>
  );
};

export const Signatures = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(SignaturesComponent);
