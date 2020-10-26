import React, { useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { OrderSummaryMapDispatchToProps, OrderSummaryMapStateToProps, OrderSummaryStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { EditPdf } from "./EditPDF";
import { Signature } from "./Signature";
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

export const TermsAndConditionPagesComponent = ({ handleNextStep, orders }: TermsAndConditionsPageProps) => {
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
      content = <Signature {...props} />;
      break;
    case 2:
      content = <EditPdf {...props} />;
      break;
    default:
      content = <TermsAndConditions orders={orders} setPage={setPage} />;
  }
  return <View style={flexChild}>{content}</View>;
};

export const TermsAndConditionsPages = connect(
  OrderSummaryMapStateToProps,
  OrderSummaryMapDispatchToProps,
)(TermsAndConditionPagesComponent);
