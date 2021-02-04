import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { ContentPage, CustomSpacer, PromptModal } from "../../../../components";
import { PdfEditWithModal } from "../../../../components/PdfEdit";
import { ONBOARDING_KEYS, ONBOARDING_ROUTES } from "../../../../constants";
import { Language } from "../../../../constants/language";
import { generatePdf, getReceiptSummaryList, submitPdf } from "../../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { centerVertical, fs12RegBlack2, px, sh24, sh8, sw24, sw452 } from "../../../../styles";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

export interface PDFListProps extends AcknowledgementStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
  setEditReceipt: (pdf: IOnboardingReceiptState | undefined) => void;
}

const PDFListComponent: FunctionComponent<PDFListProps> = ({
  accountType,
  finishedSteps,
  handleNextStep,
  details,
  receipts,
  setEditReceipt,
  setLoading,
  updateFinishedSteps,
  updateReceipts,
}: PDFListProps) => {
  const sampleClientId = "554664d0-4db8-11eb-9ebd-d311147a1957";
  // console.log("details", details);
  // console.log("receipts", receipts);
  const clientId = details!.principalHolder!.clientId !== undefined ? details!.principalHolder!.clientId : sampleClientId;

  const navigation = useNavigation();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // const pdfSubmission: PdfWithSignature[] = [];
    const documents: ISubmitPdfDocument[] = receipts!.map((receipt) => {
      return {
        adviserSignature: receipt.adviserSignature!,
        clientSignature: receipt.principalSignature!,
        jointSignature: receipt.jointSignature!.base64 !== undefined ? receipt.jointSignature : undefined,
        orderNumber: receipt.orderNumber!,
        pdf: receipt.signedPdf!,
      };
    });
    const req: ISubmitPdfRequest = {
      clientId: clientId!,
      documents: documents,
    };
    // eslint-disable-next-line no-console
    console.log("req", req);
    const submitPdfResponse: ISubmitPdfResponse = await submitPdf(req);
    setLoading(false);
    // eslint-disable-next-line no-console
    console.log("submitPdfResponse", submitPdfResponse);
    if (submitPdfResponse !== undefined) {
      const { data, error } = submitPdfResponse;
      if (error === null && data !== null) {
        setShowPrompt(true);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
    return undefined;
  };

  const handleBack = () => {
    handleNextStep("TermsAndConditions");
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

  const getReceiptSummary = async () => {
    setLoading(true);
    const req = {
      clientId: clientId!,
    };
    // eslint-disable-next-line no-console
    console.log("getReceiptSummaryList request", req);
    const summary: IGetReceiptSummaryListResponse = await getReceiptSummaryList(req);
    setLoading(false);
    // eslint-disable-next-line no-console
    console.log("getReceiptSummaryList", summary);
    if (summary !== undefined) {
      const { data, error } = summary;
      if (error === null && data !== null) {
        updateReceipts(data.result.orders);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
    return undefined;
  };

  useEffect(() => {
    if (receipts === undefined || receipts.length === 0) {
      getReceiptSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incompleteIndex = receipts !== undefined ? receipts.findIndex((receipt) => receipt.completed !== true) : 0;
  const buttonDisabled = incompleteIndex !== -1;

  return (
    <Fragment>
      <ContentPage
        continueDisabled={buttonDisabled}
        handleCancel={handleBack}
        handleContinue={handleSubmit}
        labelContinue={TERMS_AND_CONDITIONS.BUTTON_CONTINUE}
        subheading={TERMS_AND_CONDITIONS.HEADING}
        subtitle={TERMS_AND_CONDITIONS.SUBTITLE}>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          {receipts !== undefined &&
            receipts.map((receipt: IOnboardingReceiptState, index: number) => {
              const handleGetPDF = async () => {
                setLoading(true);
                const req = {
                  clientId: clientId!,
                  orderNo: receipt.orderNumber!,
                };
                // eslint-disable-next-line no-console
                console.log("generatePdf request", req);
                const onboardingReceipt: IGeneratePdfResponse = await generatePdf(req);
                setLoading(false);
                // eslint-disable-next-line no-console
                console.log("generatePdf", onboardingReceipt);
                if (onboardingReceipt !== undefined) {
                  const { data, error } = onboardingReceipt;
                  if (error === null && data !== null) {
                    // setErrorMessage(undefined);
                    const updatedReceipts = [...receipts];

                    const newReceipt: IOnboardingReceiptState = {
                      ...updatedReceipts[index],
                      pdf: {
                        base64: data.result.pdf.base64,
                        date: `${moment().valueOf()}`,
                        name: updatedReceipts[index].name!,
                        type: "application/pdf",
                      },
                      signedPdf: {
                        base64: data.result.pdf.base64,
                        date: `${moment().valueOf()}`,
                        name: updatedReceipts[index].name!,
                        type: "application/pdf",
                      },
                      url: data.result.pdf.url,
                      urlPageCount: data.result.pdf.urlPageCount,
                    };
                    updatedReceipts[index] = newReceipt;
                    updateReceipts(updatedReceipts);
                    setEditReceipt(newReceipt);
                    // return data.result.message === "NTB" ? setClientType("NTB") : Alert.alert("Client is ETB");
                  }
                  if (error !== null) {
                    setTimeout(() => {
                      Alert.alert(error.message);
                    }, 100);
                  }
                }
                // return undefined;
              };
              const handleEdit = () => {
                if (receipt.pdf === undefined) {
                  handleGetPDF();
                } else {
                  setEditReceipt(receipt);
                }
              };
              const handleRemove = () => {
                const updatedReceipts = [...receipts];
                updatedReceipts[index] = {
                  ...updatedReceipts[index],
                  signedPdf: updatedReceipts[index].pdf,
                  adviserSignature: undefined,
                  principalSignature: undefined,
                  jointSignature: undefined,
                };
                updateReceipts(updatedReceipts);
              };

              const baseSignatureValid =
                "adviserSignature" in receipt &&
                receipt.adviserSignature !== undefined &&
                "principalSignature" in receipt &&
                receipt.principalSignature !== undefined;
              const completed =
                accountType === "Individual"
                  ? baseSignatureValid
                  : baseSignatureValid && "jointSignature" in receipt && receipt.jointSignature !== undefined;
              // const disable = receipt.completed !== true;
              // const disabled = index === 0 ? false : disabledCondition;
              const amountTitle = receipt!.orderTotalAmount!.map((totalAmount) => `${totalAmount.currency} ${totalAmount.amount}`).concat();
              const epfTitle = receipt!.isEpf === "true" ? "- EPF" : "";
              const recurringTitle = receipt!.isScheduled === "true" ? "- Recurring" : "";
              const title = `${receipt.fundCount} ${receipt.fundType}${epfTitle}${recurringTitle} - ${amountTitle}`;
              return (
                <Fragment key={index}>
                  <PdfEditWithModal
                    active={true}
                    completed={completed}
                    completedText={TERMS_AND_CONDITIONS.LABEL_COMPLETED}
                    disabled={false}
                    label={receipt.name}
                    onPressEdit={handleEdit}
                    onPressRemove={handleRemove}
                    onSuccess={() => {}}
                    resourceType="base64"
                    setValue={() => {}}
                    title={title}
                    onPress={handleEdit}
                    tooltipLabel={TERMS_AND_CONDITIONS.LABEL_PROCEED}
                    value={receipt.signedPdf}
                  />
                  <CustomSpacer space={sh8} />
                </Fragment>
              );
            })}
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

export const NewPDFList = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PDFListComponent);
