import React from "react";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { NewSignatures } from "./NewIndex";

interface SignaturesProps extends AcknowledgementStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

// const initialData = {
//   pdf: {
//     name: "",
//     type: "",
//   },
//   index: 0,
// };

export const SignaturesComponent = ({ handleNextStep }: SignaturesProps) => {
  // const [page, setPage] = useState<number>(1);
  // const [initialPdfArray, setInitialPdfArray] = useState<FileBase64[]>([]);
  // const [pdfList, setPdfList] = useState<PdfWithSignature[]>([]);
  // const [currentPdf, setCurrentPdf] = useState<PdfWithIndex>(initialData);
  // const props = {
  //   handleNextStep: handleNextStep,
  //   setPage: setPage,
  //   currentPdf: currentPdf,
  //   initialPdfArray: initialPdfArray,
  //   setInitialPdfArray: setInitialPdfArray,
  //   setCurrentPdf: setCurrentPdf,
  //   pdfList: pdfList,
  //   setPdfList: setPdfList,
  // };
  // let content: JSX.Element = <View />;
  // switch (page) {
  //   case 1:
  //     content = <PDFList {...props} />;
  //     break;
  //   case 2:
  //     content = <EditPdf {...props} />;
  //     break;
  //   default:
  //     content = <PDFList {...props} />;
  // }
  return <NewSignatures handleNextStep={handleNextStep} />;
};

export const Signatures = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(SignaturesComponent);
