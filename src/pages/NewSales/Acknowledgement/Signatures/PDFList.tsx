import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { CollectionBankCard, ContentPage, CustomSpacer, IconText, NewPromptModal, SignatureUploadWithModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { DICTIONARY_KIB_BANK_ACCOUNTS } from "../../../../data/dictionary";
import { generatePdf, getReceiptSummaryList, submitPdf } from "../../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import {
  borderBottomBlue5,
  colorBlue,
  flexChild,
  flexRow,
  fs10BoldGray6,
  fs10RegGray6,
  fs14BoldBlack2,
  fs14RegBlack2,
  px,
  rowCenterVertical,
  sh16,
  sh24,
  sh8,
  sw10,
  sw16,
  sw212,
  sw24,
  sw3,
  sw440,
  sw80,
} from "../../../../styles";
import { formatAmount, isNotEmpty } from "../../../../utils";
import { defaultContentProps } from "../../Content";

const { TERMS_AND_CONDITIONS, NEW_SALES_PROMPT } = Language.PAGE;

export interface PDFListProps extends AcknowledgementStoreProps, NewSalesContentProps {
  setEditReceipt: (pdf: IOnboardingReceiptState | undefined) => void;
}

const PDFListComponent: FunctionComponent<PDFListProps> = ({
  accountType,
  details,
  handleNextStep,
  handleResetNewSales,
  newSales,
  orders,
  personalInfo,
  receipts,
  setEditReceipt,
  setLoading,
  updateNewSales,
  updateReceipts,
}: PDFListProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { clientId } = details!.principalHolder!;
  const { emailAddress } = personalInfo!.principal!.contactDetails!;
  const fetching = useRef<boolean>(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleSubmit = async () => {
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
        if (receipt.jointSignature?.base64) {
          receiptData.jointSignature = receipt.jointSignature;
        }
        return receiptData;
      });
      const request: ISubmitPdfRequest = {
        clientId: clientId!,
        documents: documents,
        initId: details?.initId!,
        isConfirmed: true,
        isEtb: true,
        isForceUpdate: false,
      };
      const submitPdfResponse: ISubmitPdfResponse = await submitPdf(request, navigation, setLoading);
      fetching.current = false;
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
    }
    return undefined;
  };

  const handleBack = () => {
    handleNextStep("TermsAndConditions");
  };

  const handleContinue = () => {
    const updatedFinishedSteps: TypeNewSalesKey[] = ["RiskProfile", "Products", "AccountInformation", "Acknowledgement"];
    const newDisabledStep: TypeNewSalesKey[] = ["RiskProfile", "Products", "AccountInformation", "Acknowledgement"];
    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: newDisabledStep });
    handleNextStep("Payment");
  };

  const getReceiptSummary = async () => {
    const request: IGetReceiptSummaryListRequest = { clientId: clientId!, initId: details!.initId!, isForceUpdate: false };
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
        isForceUpdate: false,
        orderNo: receipt.orderNumber!,
      };
      const accountOpeningReceipt: IGeneratePdfResponse = await generatePdf(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (accountOpeningReceipt !== undefined) {
        const { data, error } = accountOpeningReceipt;
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
    if (receipts === undefined || receipts.length === 0) {
      getReceiptSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incompleteIndex = receipts !== undefined ? receipts.findIndex((receipt) => receipt.completed !== true) : 0;
  const buttonDisabled = incompleteIndex !== -1;

  const toSignLabel =
    accountType === "Individual"
      ? `${details!.principalHolder!.name} `
      : `${details!.principalHolder!.name} ${TERMS_AND_CONDITIONS.LABEL_AND} ${details!.jointHolder!.name} `;

  const getCollectionBank = orders!.grandTotal.map((eachTotal) => {
    const collectionBank = DICTIONARY_KIB_BANK_ACCOUNTS.filter((bank) => bank.currency === eachTotal.currency);
    return collectionBank[0];
  });

  return (
    <Fragment>
      <ContentPage
        continueDisabled={buttonDisabled}
        handleCancel={handleBack}
        handleContinue={handleSubmit}
        labelContinue={TERMS_AND_CONDITIONS.BUTTON_CREATE}
        subheading={TERMS_AND_CONDITIONS.HEADING_SIGNATURE}
        subtitle={TERMS_AND_CONDITIONS.SUBTITLE_SIGNATURE}
        {...defaultContentProps}>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <View style={rowCenterVertical}>
            <IconText color={colorBlue._1} name="account" text={toSignLabel} textStyle={fs14BoldBlack2} />
            <Text style={fs14RegBlack2}>{TERMS_AND_CONDITIONS.LABEL_TO_SIGN}</Text>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={{ ...borderBottomBlue5, ...flexChild }} />
          </View>
          <CustomSpacer space={sh16} />
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
              const epfTitle = receipt.isEpf === "true" ? " - EPF" : "";
              const recurringTitle = receipt.isScheduled === "true" ? " - Recurring" : "";
              const title = `${receipt.fundCount} ${receipt.fundType}${epfTitle}${recurringTitle} - ${amountTitle}`;
              const fullOpacity = { opacity: 1 };

              return (
                <Fragment key={index}>
                  <SignatureUploadWithModal
                    active={true}
                    buttonContainerStyle={completed === true ? undefined : { width: sw80 }}
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
                    tooltip={false}
                    onPress={handleEdit}
                    value={receipt.signedPdf}
                    containerStyle={fullOpacity}
                  />
                  <CustomSpacer space={sh8} />
                </Fragment>
              );
            })}
        </View>
      </ContentPage>
      <NewPromptModal
        illustration={LocalAssets.illustration.orderReceived}
        primary={{ onPress: handleContinue, buttonStyle: { width: sw212 }, text: NEW_SALES_PROMPT.BUTTON_PAY_NOW }}
        secondary={{ onPress: handleResetNewSales, buttonStyle: { width: sw212 }, text: NEW_SALES_PROMPT.BUTTON_BACK }}
        title={NEW_SALES_PROMPT.SUBHEADING}
        visible={showPrompt}>
        <View style={{ width: sw440 }}>
          <CustomSpacer space={sh16} />
          <View>
            <Text style={fs10RegGray6}>{NEW_SALES_PROMPT.TEXT_1}</Text>
            <View style={flexRow}>
              <CustomSpacer isHorizontal={true} space={sw10} />
              <Text style={fs10BoldGray6}>{emailAddress}</Text>
              {accountType === "Joint" && isNotEmpty(personalInfo!.principal!.contactDetails!.emailAddress) ? (
                <Fragment>
                  <CustomSpacer isHorizontal space={sw3} />
                  <Text style={fs10RegGray6}>{NEW_SALES_PROMPT.TEXT_1_SUB}</Text>
                  <CustomSpacer isHorizontal space={sw3} />
                  <Text style={fs10BoldGray6}>{personalInfo!.joint!.contactDetails!.emailAddress}</Text>
                </Fragment>
              ) : null}
            </View>
            <Text style={fs10RegGray6}>{NEW_SALES_PROMPT.TEXT_2_AND_3}</Text>
          </View>
          <CustomSpacer space={sh8} />
          <CollectionBankCard data={getCollectionBank} />
        </View>
      </NewPromptModal>
    </Fragment>
  );
};

export const PDFList = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PDFListComponent);
