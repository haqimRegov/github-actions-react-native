import { Buffer } from "buffer";
import { PDFDocument } from "pdf-lib";
import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer } from "../../../components";
import { PdfEditWithModal } from "../../../components/PdfEdit";
import { ONBOARDING_ROUTES } from "../../../constants";
import { Language } from "../../../constants/language";
import { SAMPLE_PDFS } from "../../../mocks";
import { ClientMapDispatchToProps, ClientMapStateToProps, ClientStoreProps } from "../../../store";
import { px, sh24, sh8, sw24 } from "../../../styles";
import { GetEmbeddedBase64 } from "../../../utils";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

const initialData: PdfWithSignature = {
  pdf: {
    name: "",
    type: "",
  },
  orderNo: "",
  clientSignature: "",
  adviserSignature: "",
};

export interface SignatureProps extends ClientStoreProps {
  currentPdf: PdfWithIndex;
  handleNextStep: (route: TypeOnboardingRoute) => void;
  initialPdfArray: FileBase64[];
  pdfList: PdfWithSignature[];
  setCurrentPdf: (pdf: PdfWithIndex) => void;
  setInitialPdfArray: (data: FileBase64[]) => void;
  setPage: (page: number) => void;
  setPdfList: (data: PdfWithSignature[]) => void;
}

export const SignaturesComponent: FunctionComponent<SignatureProps> = ({
  accountType,
  handleNextStep,
  initialPdfArray,
  pdfList,
  setCurrentPdf,
  setInitialPdfArray,
  setPage,
  setPdfList,
}: SignatureProps) => {
  const handleCancel = () => {
    Alert.alert("Cancel");
  };

  const handleDataToBackend = async () => {
    const dataToBackend: PdfWithSignature[] = [];
    pdfList.map(async (pdf) => {
      const dataUri = GetEmbeddedBase64(pdf.pdf);
      const loadPdf = await PDFDocument.load(dataUri);
      const pages = loadPdf.getPages();
      const lastPagePdf = await PDFDocument.create();
      const [last] = await lastPagePdf.copyPages(loadPdf, [pages.length - 1]);
      lastPagePdf.addPage(last);
      const pdfBytes = await lastPagePdf.save();
      const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
      const pdfLastPage: FileBase64 = {
        ...pdf.pdf,
        base64: pdfBase64,
      };
      const pdfWithSignature = {
        ...pdf,
        pdf: pdfLastPage,
      };
      dataToBackend.push(pdfWithSignature);
    });
  };

  const handleContinue = async () => {
    await handleDataToBackend();
    handleNextStep(ONBOARDING_ROUTES.Payment);
  };

  useEffect(() => {
    setInitialPdfArray(SAMPLE_PDFS);
    const initialDataArray: PdfWithSignature[] = [];
    if (pdfList.length === 0) {
      SAMPLE_PDFS.map(() => {
        return initialDataArray.push(initialData);
      });
      setPdfList(initialDataArray);
    }
  }, []);

  const buttonDisabled =
    pdfList !== [] &&
    pdfList
      .map(({ pdf, clientSignature, adviserSignature, jointSignature }) => {
        const accountTypeCheck = accountType === "Joint" ? jointSignature !== "" : true;
        return pdf.base64 !== "" && clientSignature !== "" && adviserSignature !== "" && accountTypeCheck;
      })
      .includes(false);

  return (
    <ContentPage
      continueDisabled={buttonDisabled}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      labelContinue={TERMS_AND_CONDITIONS.BUTTON_CONTINUE}
      subheading={TERMS_AND_CONDITIONS.HEADING}
      subtitle={TERMS_AND_CONDITIONS.SUBTITLE}
      spaceToBottom={sh24}>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        {initialPdfArray !== undefined
          ? initialPdfArray.map((pdf, index) => {
              const { adviserSignature, clientSignature, jointSignature } = pdfList[index];
              const value = pdfList[index].pdf.base64 !== undefined ? pdfList[index].pdf : pdf;
              const completed =
                accountType === "Individual" && pdfList[index] === undefined
                  ? adviserSignature !== "" && clientSignature !== ""
                  : adviserSignature !== "" && clientSignature !== "" && jointSignature !== "";

              const handleEdit = () => {
                const pdfData = pdfList[index].pdf.base64 !== undefined ? pdfList[index].pdf : pdf;
                setCurrentPdf({ pdf: pdfData, index: index });
                setPage(2);
              };
              const handleRemove = () => {
                const dataClone = [...pdfList];
                dataClone[index] = { ...initialData, pdf: pdf };
                setPdfList(dataClone);
              };
              return (
                <Fragment key={index}>
                  <PdfEditWithModal
                    completed={completed}
                    label={pdf.name}
                    onPressEdit={handleEdit}
                    onPressRemove={handleRemove}
                    onSuccess={() => {}}
                    resourceType="base64"
                    setValue={() => {}}
                    title={pdf.title}
                    value={value}
                  />
                  <CustomSpacer space={sh8} />
                </Fragment>
              );
            })
          : null}
      </View>
    </ContentPage>
  );
};

export const Signatures = connect(ClientMapStateToProps, ClientMapDispatchToProps)(SignaturesComponent);
