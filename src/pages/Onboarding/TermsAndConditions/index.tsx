import React, { useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { OrderSummaryMapDispatchToProps, OrderSummaryMapStateToProps, OrderSummaryStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { EditPdf } from "./EditPDF";
import { PDFList } from "./PDFList";
import { TermsAndConditions } from "./TermsAndConditions";

interface TermsAndConditionsPageProps extends OrderSummaryStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

const initialData = {
  pdf: {
    name: "",
    type: "",
  },
  index: 0,
};

export const TermsAndConditionPagesComponent = ({ addOrders, handleNextStep, orders }: TermsAndConditionsPageProps) => {
  const [page, setPage] = useState<number>(0);
  const [initialPdfArray, setInitialPdfArray] = useState<FileBase64[]>([]);
  const [pdfList, setPdfList] = useState<PdfWithSignature[]>([]);
  const [currentPdf, setCurrentPdf] = useState<PdfWithIndex>(initialData);
  const props = {
    handleNextStep: handleNextStep,
    setPage: setPage,
    currentPdf: currentPdf,
    initialPdfArray: initialPdfArray,
    setInitialPdfArray: setInitialPdfArray,
    setCurrentPdf: setCurrentPdf,
    pdfList: pdfList,
    setPdfList: setPdfList,
  };
  let content: JSX.Element = <View />;
  switch (page) {
    case 1:
      content = <PDFList {...props} />;
      break;
    case 2:
      content = <EditPdf {...props} />;
      break;
    default:
      content = <TermsAndConditions addOrders={addOrders} orders={orders} setPage={setPage} />;
  }
  return <View style={flexChild}>{content}</View>;
};

export const TermsAndConditionsPages = connect(
  OrderSummaryMapStateToProps,
  OrderSummaryMapDispatchToProps,
)(TermsAndConditionPagesComponent);
