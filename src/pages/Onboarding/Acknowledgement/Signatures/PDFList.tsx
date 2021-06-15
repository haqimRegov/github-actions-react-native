import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { ContentPage, CustomSpacer, PromptModal } from "../../../../components";
import { PdfEditWithModal } from "../../../../components/PdfEdit";
import { ONBOARDING_ROUTES } from "../../../../constants";
import { Language } from "../../../../constants/language";
import { generatePdf, getReceiptSummaryList, submitPdf } from "../../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { centerVertical, fs12RegBlack2, px, sh24, sh8, sw24, sw452 } from "../../../../styles";
import { formatAmount } from "../../../../utils";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

export interface PDFListProps extends AcknowledgementStoreProps, OnboardingContentProps {
  setEditReceipt: (pdf: IOnboardingReceiptState | undefined) => void;
}

const PDFListComponent: FunctionComponent<PDFListProps> = ({
  accountType,
  details,
  finishedSteps,
  handleNextStep,
  handleResetOnboarding,
  onboarding,
  receipts,
  setEditReceipt,
  setLoading,
  updateOnboarding,
  updateReceipts,
}: PDFListProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { clientId } = details!.principalHolder!;
  const [showPrompt, setShowPrompt] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const documents: ISubmitPdfDocument[] = receipts!.map((receipt) => {
      const receiptData: ISubmitPdfDocument = {
        adviserSignature: receipt.adviserSignature!,
        clientSignature: receipt.principalSignature!,
        orderNumber: receipt.orderNumber!,
        pdf: receipt.signedPdf!,
      };
      if (receipt.jointSignature?.base64 !== undefined) {
        receiptData.jointSignature = receipt.jointSignature;
      }
      return receiptData;
    });
    const request: ISubmitPdfRequest = {
      clientId: clientId!,
      documents: documents,
    };
    const submitPdfResponse: ISubmitPdfResponse = await submitPdf(request, navigation);
    setLoading(false);
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

  const handleContinue = () => {
    handleNextStep(ONBOARDING_ROUTES.Payment);
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    updatedFinishedSteps.push("Acknowledgement");
    const newDisabledStep: TypeOnboardingKey[] = ["RiskAssessment", "Products", "PersonalInformation", "Declarations", "Acknowledgement"];
    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: newDisabledStep });
  };

  const getReceiptSummary = async () => {
    setLoading(true);
    const request = { clientId: clientId! };
    const summary: IGetReceiptSummaryListResponse = await getReceiptSummaryList(request, navigation);
    setLoading(false);
    if (summary !== undefined) {
      const { data, error } = summary;
      if (error === null && data !== null) {
        updateReceipts(data.result.orders);
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 200);
      }
    }
    return undefined;
  };

  const handleGetPDF = async (receipt: IOnboardingReceiptState, index: number) => {
    setLoading(true);
    const request = { clientId: clientId!, orderNo: receipt.orderNumber! };
    const onboardingReceipt: IGeneratePdfResponse = await generatePdf(request, navigation);
    setLoading(false);
    if (onboardingReceipt !== undefined) {
      const { data, error } = onboardingReceipt;
      if (error === null && data !== null) {
        // setErrorMessage(undefined);
        const updatedReceipts = [...receipts!];

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
        }, 150);
      }
    }
    // return undefined;
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
              const handleEdit = () => {
                if (receipt.pdf === undefined) {
                  handleGetPDF(receipt, index);
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
                  completed: false,
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
              const amountTitle = receipt
                .orderTotalAmount!.map((totalAmount) => `${totalAmount.currency} ${formatAmount(totalAmount.amount)}`)
                .join(", ");
              const epfTitle = receipt.isEpf === "true" ? "- EPF" : "";
              const recurringTitle = receipt.isScheduled === "true" ? "- Recurring" : "";
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
                    tooltip={incompleteIndex === index}
                    onPress={handleEdit}
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
        handleCancel={handleResetOnboarding}
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
