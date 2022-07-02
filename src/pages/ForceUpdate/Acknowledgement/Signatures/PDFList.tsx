import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { CheckBox, ContentPage, CustomSpacer, PromptModal, SignatureUploadWithModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { ERRORS } from "../../../../data/dictionary";
import { generatePdf, getReceiptSummaryList, submitPdf } from "../../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import {
  alignSelfStart,
  centerVertical,
  fs12RegGray6,
  fs16RegBlack2,
  px,
  sh2,
  sh24,
  sh32,
  sh40,
  sh8,
  sw24,
  sw400,
  sw452,
} from "../../../../styles";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

export interface PDFListProps extends AcknowledgementStoreProps, ForceUpdateContentProps {
  setEditReceipt: (pdf: IOnboardingReceiptState | undefined) => void;
}

const PDFListComponent: FunctionComponent<PDFListProps> = ({
  details,
  handleNextStep,
  handleResetForceUpdate,
  receipts,
  setEditReceipt,
  setLoading,
  updateReceipts,
}: PDFListProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { clientId } = details!.principalHolder!;
  const fetching = useRef<boolean>(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleSubmit = async (confirmed?: boolean) => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
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
        isForceUpdate: true,
        isConfirmed: confirmed === true,
      };
      const submitPdfResponse: ISubmitPdfResponse = await submitPdf(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      const submittedPdfKey = "submittedPdf";
      if (submitPdfResponse !== undefined) {
        const { data, error } = submitPdfResponse;
        if (error === null && data !== null) {
          if (confirmed === true) {
            setShowPrompt(false);
            handleResetForceUpdate();
          } else {
            setShowPrompt(true);
          }
        }
        if (error !== null) {
          if (error.message === ERRORS[submittedPdfKey].message) {
            setShowPrompt(true);
          } else {
            setTimeout(() => {
              Alert.alert(error.message);
            }, 100);
          }
        }
      }
    }
    return undefined;
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  const handleConfirm = () => {
    handleSubmit(true);
  };

  const handleBack = () => {
    handleNextStep("TermsAndConditions");
  };

  const handleCheckbox = () => {
    setToggle(!toggle);
  };

  const getReceiptSummary = async () => {
    setLoading(true);
    const request: IGetReceiptSummaryListRequest = { clientId: clientId!, initId: details!.initId!, isForceUpdate: true };
    // TODO temporary check because useEffect is still running after handleResetForceUpdate
    if (request.clientId === undefined) {
      return undefined;
    }
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

  const incompleteIndex = receipts !== undefined ? receipts.findIndex((receipt) => receipt.completed !== true) : 0;
  const buttonDisabled = incompleteIndex !== -1;

  return (
    <Fragment>
      <ContentPage
        continueDisabled={buttonDisabled}
        handleCancel={handleBack}
        handleContinue={handleSubmit}
        labelContinue={"Submit"}
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
                  completed: false,
                };
                updateReceipts(updatedReceipts);
              };
              const baseSignatureValid =
                "adviserSignature" in receipt &&
                receipt.adviserSignature !== undefined &&
                "principalSignature" in receipt &&
                receipt.principalSignature !== undefined;
              const completed = baseSignatureValid;
              // const disable = receipt.completed !== true;
              // const disabled = index === 0 ? false : disabledCondition;
              return (
                <Fragment key={index}>
                  <SignatureUploadWithModal
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
                    tooltip={incompleteIndex === index}
                    title={TERMS_AND_CONDITIONS.UPLOAD_CARD_SUBTITLE}
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
        labelContinue={"Confirm"}
        handleCancel={handleCancel}
        handleContinue={handleConfirm}
        continueDisabled={!toggle}
        illustration={LocalAssets.illustration.orderReceived}
        label={TERMS_AND_CONDITIONS.PROMPT_TITLE}
        spaceToButton={sh40}
        title={TERMS_AND_CONDITIONS.PROMPT_SUBTITLE}
        visible={showPrompt}>
        <View>
          <View style={centerVertical}>
            <CustomSpacer space={sh8} />
            <View style={{ width: sw452 }}>
              <Text style={fs12RegGray6}>{TERMS_AND_CONDITIONS.PROMPT_TEXT_1}</Text>
              <CustomSpacer space={sh8} />
              <Text style={fs12RegGray6}>{TERMS_AND_CONDITIONS.PROMPT_TEXT_2}</Text>
            </View>
          </View>
          <CustomSpacer space={sh32} />
          <CheckBox
            checkboxStyle={{ ...alignSelfStart, marginTop: sh2 }}
            onPress={handleCheckbox}
            label={TERMS_AND_CONDITIONS.CHECKBOX_CHANGE_REQUEST}
            labelStyle={fs16RegBlack2}
            toggle={toggle}
            style={{ width: sw400 }}
          />
        </View>
      </PromptModal>
    </Fragment>
  );
};

export const PDFList = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PDFListComponent);
