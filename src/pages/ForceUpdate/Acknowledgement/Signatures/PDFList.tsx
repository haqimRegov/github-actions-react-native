import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { BasicModal, CustomSpacer, NewPrompt, SubmissionSummaryPrompt } from "../../../../components";
import { Language } from "../../../../constants/language";
import { generatePdf, getReceiptSummaryList, submitPdf } from "../../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { centerHV, fsAlignLeft, fullHW, sh16 } from "../../../../styles";
import { SubmissionSummaryCollapsible } from "../../../../templates";
import { PDFListTemplate } from "../../../../templates/Signatures";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

export interface PDFListProps extends AcknowledgementStoreProps, ForceUpdateContentProps {
  setEditReceipt: (pdf: IOnboardingReceiptState | undefined) => void;
}

const PDFListComponent: FunctionComponent<PDFListProps> = ({
  details,
  forceUpdate,
  handleNextStep,
  handleResetForceUpdate,
  personalInfo,
  receipts,
  setEditReceipt,
  setLoading,
  updateReceipts,
}: PDFListProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { accountHolder, principalHolder } = details!;
  const { clientId } = principalHolder!;
  const { declarations } = forceUpdate;
  const fetching = useRef<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [promptType, setPromptType] = useState<"summary" | "success">("summary");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [submissionSummary, setSubmissionSummary] = useState<ISubmissionSummaryOrder[] | undefined>(undefined);

  const handleSubmit = async (confirmed?: boolean) => {
    if (fetching.current === false) {
      fetching.current = true;
      if (confirmed === undefined) {
        setLoading(true);
      } else {
        setButtonLoading(true);
      }
      const documents: ISubmitPdfDocument[] = receipts!.map((receipt) => {
        const receiptData: ISubmitPdfDocument = {
          adviserSignature: receipt.adviserSignature!,
          clientSignature: receipt.principalSignature!,
          orderNumber: receipt.orderNumber!,
          pdf: receipt.signedPdf!,
        };
        return receiptData;
      });
      const request: ISubmitPdfRequest = {
        clientId: clientId!,
        documents: documents,
        initId: details?.initId!,
        isConfirmed: confirmed === true,
        isEtb: true,
        isForceUpdate: true,
      };
      const submitPdfResponse: ISubmitPdfResponse = await submitPdf(request, navigation, setLoading);
      fetching.current = false;
      if (confirmed === undefined) {
        setLoading(false);
      } else {
        setButtonLoading(false);
      }
      if (submitPdfResponse !== undefined) {
        const { data, error } = submitPdfResponse;
        if (error === null && data !== null) {
          if (confirmed === true) {
            setPromptType("success");
          } else {
            const submissionResult: ISubmissionSummaryOrder[] = [
              {
                orderNumber: data.result.orderNumber,
                remarks: data.result.remarks,
                status: data.result.status,
              },
            ];
            setSubmissionSummary(submissionResult);
          }
        }
        if (error !== null) {
          setTimeout(() => {
            Alert.alert(error.message);
          }, 100);
        }
      }
    }
    return undefined;
  };

  const handleCancel = () => {
    if (buttonLoading === false) {
      if (toggle === true) {
        setToggle(false);
      }
      setSubmissionSummary(undefined);
    }
  };

  const handleConfirm = () => {
    handleSubmit(true);
  };

  const handleBack = () => {
    handleNextStep("TermsAndConditions");
  };

  const handleBackToDashboard = () => {
    handleResetForceUpdate();
  };

  const handleCheckbox = () => {
    setToggle(!toggle);
  };

  const getReceiptSummary = async () => {
    const request: IGetReceiptSummaryListRequest = { clientId: clientId!, initId: details!.initId!, isForceUpdate: true };
    // TODO temporary check because useEffect is still running after handleResetForceUpdate
    if (request.clientId === undefined) {
      return undefined;
    }
    setLoading(true);
    const summary: IGetReceiptSummaryListResponse = await getReceiptSummaryList(request, navigation, setLoading);
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
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const request: IGeneratePdfRequest = {
        clientId: clientId!,
        initId: details!.initId!,
        isEtb: true,
        isForceUpdate: true,
        orderNo: receipt.orderNumber!,
      };
      const changeRequestReceipt: IGeneratePdfResponse = await generatePdf(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (changeRequestReceipt !== undefined) {
        const { data, error } = changeRequestReceipt;
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
    }
    // return undefined;
  };

  useEffect(() => {
    if ((receipts === undefined || receipts.length === 0) && toggle === false) {
      getReceiptSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <PDFListTemplate
        accountHolder={accountHolder}
        accountType={"Individual"}
        authorisedSignatory={personalInfo.signatory!}
        declarations={declarations}
        details={details}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        handleGetPDF={handleGetPDF}
        receipts={receipts}
        setEditReceipt={setEditReceipt}
        transactionType={"CR"}
        updateReceipts={updateReceipts}
      />
      <BasicModal backdropOpacity={0.65} visible={submissionSummary !== undefined}>
        <View style={{ ...centerHV, ...fullHW }}>
          {promptType === "summary" ? (
            <SubmissionSummaryPrompt
              checkbox={{ label: TERMS_AND_CONDITIONS.CHECKBOX_CHANGE_REQUEST, onPress: handleCheckbox, toggle: toggle }}
              primary={{ disabled: !toggle, loading: buttonLoading, onPress: handleConfirm }}
              secondary={{ onPress: handleCancel }}
              title={TERMS_AND_CONDITIONS.PROMPT_TITLE_SUBMISSION}>
              <View>
                <CustomSpacer space={sh16} />
                <SubmissionSummaryCollapsible data={submissionSummary !== undefined ? submissionSummary : []} />
              </View>
            </SubmissionSummaryPrompt>
          ) : (
            <NewPrompt
              illustration={LocalAssets.illustration.orderReceived}
              primary={{ onPress: handleBackToDashboard, text: TERMS_AND_CONDITIONS.BUTTON_DASHBOARD }}
              subtitle={TERMS_AND_CONDITIONS.PROMPT_SUCCESS_SUBTITLE}
              subtitleStyle={fsAlignLeft}
              title={`${submissionSummary![0].orderNumber} ${TERMS_AND_CONDITIONS.PROMPT_SUCCESS_TITLE}`}
            />
          )}
        </View>
      </BasicModal>
    </Fragment>
  );
};

export const PDFList = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PDFListComponent);
