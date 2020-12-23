import { useNavigation } from "@react-navigation/native";
import { Buffer } from "buffer";
import { PDFDocument } from "pdf-lib";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../assets/LocalAssets";
import { ContentPage, CustomSpacer, PromptModal } from "../../../components";
import { PdfEditWithModal } from "../../../components/PdfEdit";
import { ONBOARDING_KEYS, ONBOARDING_ROUTES } from "../../../constants";
import { Language } from "../../../constants/language";
import { SAMPLE_PDFS } from "../../../mocks";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import { centerVertical, fs12RegBlack2, px, sh24, sh8, sw24, sw452 } from "../../../styles";
import { GetEmbeddedBase64 } from "../../../utils";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

const initialData: PdfWithSignature = {
  adviserSignature: "",
  principalSignature: "",
  orderNo: "",
  pdf: {
    name: "",
    type: "",
  },
};

export interface PDFListProps extends AcknowledgementStoreProps {
  currentPdf: PdfWithIndex;
  handleNextStep: (route: TypeOnboardingRoute) => void;
  initialPdfArray: FileBase64[];
  pdfList: PdfWithSignature[];
  setCurrentPdf: (pdf: PdfWithIndex) => void;
  setInitialPdfArray: (data: FileBase64[]) => void;
  setPage: (page: number) => void;
  setPdfList: (data: PdfWithSignature[]) => void;
}

export const PDFListComponent: FunctionComponent<PDFListProps> = ({
  accountType,
  finishedSteps,
  handleNextStep,
  initialPdfArray,
  pdfList,
  setCurrentPdf,
  setInitialPdfArray,
  setPage,
  setPdfList,
  updateFinishedSteps,
}: PDFListProps) => {
  const navigation = useNavigation();
  const [showPrompt, setShowPrompt] = useState(false);
  const handleCancel = () => {
    Alert.alert("Cancel");
  };

  const handleSubmit = async () => {
    const pdfSubmission: PdfWithSignature[] = [];
    pdfList.map(async (pdf: PdfWithSignature) => {
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
      pdfSubmission.push(pdfWithSignature);
    });
    setShowPrompt(true);
  };

  const handleBackToDashboard = () => {
    navigation.navigate("Dashboard");
  };

  const handleContinue = () => {
    handleNextStep(ONBOARDING_ROUTES.Payment);
    const updatedSteps: TypeOnboardingKey[] = [...finishedSteps];
    updatedSteps.push(ONBOARDING_KEYS.Acknowledgement);
    updateFinishedSteps(updatedSteps);
  };

  useEffect(() => {
    setInitialPdfArray(SAMPLE_PDFS);
    const initialDataArray: PdfWithSignature[] = [];
    if (pdfList.length === 0) {
      SAMPLE_PDFS.map((pdf, index) => {
        let active: boolean = false;
        if (index === 0) {
          active = true;
        }
        const jointInitial = accountType === "Joint" ? { jointSignature: "" } : {};
        return initialDataArray.push({ ...initialData, pdf: pdf, active: active, ...jointInitial });
      });
      setPdfList(initialDataArray);
    }
  }, [pdfList, setInitialPdfArray, setPdfList, accountType]);

  const buttonDisabled =
    pdfList !== [] &&
    pdfList
      .map(({ pdf, principalSignature, adviserSignature, jointSignature }) => {
        const accountTypeCheck = accountType === "Joint" ? jointSignature !== "" : true;
        return pdf.base64 !== "" && principalSignature !== "" && adviserSignature !== "" && accountTypeCheck;
      })
      .includes(false);

  return (
    <Fragment>
      <ContentPage
        continueDisabled={buttonDisabled}
        handleCancel={handleCancel}
        handleContinue={handleSubmit}
        labelContinue={TERMS_AND_CONDITIONS.BUTTON_CONTINUE}
        subheading={TERMS_AND_CONDITIONS.HEADING}
        subtitle={TERMS_AND_CONDITIONS.SUBTITLE}
        spaceToBottom={sh24}>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          {initialPdfArray !== undefined
            ? initialPdfArray.map((pdf, index) => {
                const { adviserSignature, principalSignature, jointSignature } = pdfList[index];
                const value = pdfList[index].pdf.base64 !== undefined ? pdfList[index].pdf : pdf;
                const completed =
                  accountType === "Individual"
                    ? adviserSignature !== "" && principalSignature !== ""
                    : adviserSignature !== "" && principalSignature !== "" && jointSignature !== "";
                const handleEdit = () => {
                  const pdfData = pdfList[index].pdf.base64 !== undefined ? pdfList[index].pdf : pdf;
                  setCurrentPdf({ pdf: pdfData, index: index });
                  setPage(2);
                };
                const handleRemove = () => {
                  const dataClone = [...pdfList];
                  const jointInitial = accountType === "Joint" ? { jointSignature: "" } : {};
                  dataClone[index] = { ...initialData, ...jointInitial, pdf: pdf };
                  setPdfList(dataClone);
                };
                const disabledCondition = pdfList[index].active === false;
                const disabled = index === 0 ? false : disabledCondition;
                return (
                  <Fragment key={index}>
                    <PdfEditWithModal
                      active={pdfList[index].active}
                      completed={completed}
                      completedText={TERMS_AND_CONDITIONS.LABEL_COMPLETED}
                      disabled={disabled}
                      label={pdf.name}
                      onPressEdit={handleEdit}
                      onPressRemove={handleRemove}
                      onSuccess={() => {}}
                      resourceType="base64"
                      setValue={() => {}}
                      title={pdf.title}
                      tooltipLabel={TERMS_AND_CONDITIONS.LABEL_PROCEED}
                      value={value}
                    />
                    <CustomSpacer space={sh8} />
                  </Fragment>
                );
              })
            : null}
        </View>
      </ContentPage>
      <PromptModal
        labelCancel={TERMS_AND_CONDITIONS.BUTTON_DASHBOARD}
        labelContinue={TERMS_AND_CONDITIONS.BUTTON_PAY}
        handleCancel={handleBackToDashboard}
        handleContinue={handleContinue}
        illustration={LocalAssets.illustration.orderReceived}
        label={TERMS_AND_CONDITIONS.PROMPT_TITLE}
        title={TERMS_AND_CONDITIONS.PROMPT_SUBTITLE}
        visible={showPrompt}>
        <View style={centerVertical}>
          <CustomSpacer space={sh8} />
          <View style={{ width: sw452 }}>
            <Text style={fs12RegBlack2}>{TERMS_AND_CONDITIONS.PROMPT_TEXT_1}</Text>
            <CustomSpacer space={sh8} />
            <Text style={fs12RegBlack2}>{TERMS_AND_CONDITIONS.PROMPT_TEXT_2}</Text>
          </View>
        </View>
      </PromptModal>
    </Fragment>
  );
};

export const PDFList = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PDFListComponent);
