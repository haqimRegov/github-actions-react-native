import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { CollectionBankCard, CustomSpacer, NewPromptModal } from "../../../../components";
import { Language } from "../../../../constants/language";
import { generatePdf, generatePdfTransactions, getReceiptSummaryList, submitPdf, submitPdfTransactions } from "../../../../network-actions";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../../store";
import { flexRow, fs10BoldGray6, fs10RegGray6, sh16, sh8, sw10, sw212, sw3, sw440 } from "../../../../styles";
import { PDFListTemplate } from "../../../../templates/Signatures";
import { isArrayNotEmpty, isNotEmpty } from "../../../../utils";

const { NEW_SALES_PROMPT } = Language.PAGE;

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
  const { accountDetails, transactionType } = newSales;
  const { authorisedSignatory } = accountDetails;
  const { clientId } = details!.principalHolder!;
  const { emailAddress } = personalInfo.principal!.contactDetails!;
  const fetching = useRef<boolean>(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleSubmit = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const documents: ISubmitPdfTransactionsDocument[] = receipts!.map((receipt) => {
        const receiptData: ISubmitPdfTransactionsDocument = {
          adviserSignature: receipt.adviserSignature!,
          orderNumber: receipt.orderNumber!,
          pdf: receipt.signedPdf!,
        };
        if (receipt.principalSignature?.base64) {
          receiptData.clientSignature = receipt.principalSignature;
        }
        if (receipt.jointSignature?.base64) {
          receiptData.jointSignature = receipt.jointSignature;
        }
        return receiptData;
      });

      const request: ISubmitPdfTransactionsRequest | ISubmitPdfRequest = {
        clientId: clientId!,
        documents: documents,
        initId: details?.initId!,
        isConfirmed: true,
        isEtb: true,
        isForceUpdate: false,
      };

      const submitPdfResponse: ISubmitPdfTransactionsResponse | ISubmitPdfResponse =
        transactionType === "Sales"
          ? await submitPdfTransactions(request, navigation, setLoading)
          : await submitPdf(request, navigation, setLoading);

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
    const updatedFinishedSteps: TypeNewSalesKey[] = ["AccountList", "RiskSummary", "Products", "AccountInformation", "Acknowledgement"];
    const newDisabledStep: TypeNewSalesKey[] = ["AccountList", "RiskSummary", "Products", "AccountInformation", "Acknowledgement"];
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

      const transactionsRequest: IGeneratePdfTransactionsRequest = {
        accountNo: accountDetails.accountNo,
        clientId: clientId!,
        initId: details!.initId!,
        orderNo: receipt.orderNumber!,
      };

      const accountOpeningRequest: IGeneratePdfRequest = {
        clientId: clientId!,
        initId: details!.initId!,
        isEtb: true,
        isForceUpdate: false,
        orderNo: receipt.orderNumber!,
      };

      const accountOpeningReceipt: IGeneratePdfTransactionsResponse | IGeneratePdfResponse =
        transactionType === "Sales"
          ? await generatePdfTransactions(transactionsRequest, navigation, setLoading)
          : await generatePdf(accountOpeningRequest, navigation, setLoading);

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

  const orderNumberLabel = isArrayNotEmpty(receipts)
    ? receipts!.map(({ orderNumber }, index) => (index === 0 ? orderNumber : ` and ${orderNumber}`)).join("")
    : "";

  const ofLabel = receipts !== undefined && receipts.length > 1 ? " of" : "";
  const promptTitle =
    transactionType === "Sales" ? `${NEW_SALES_PROMPT.SUBHEADING_SALES}${ofLabel}\n${orderNumberLabel}.` : NEW_SALES_PROMPT.SUBHEADING;

  return (
    <Fragment>
      <PDFListTemplate
        accountType={accountType!}
        authorisedSignatory={authorisedSignatory}
        details={details}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        handleGetPDF={handleGetPDF}
        receipts={receipts}
        setEditReceipt={setEditReceipt}
        transactionType={transactionType!}
        updateReceipts={updateReceipts}
      />
      <NewPromptModal
        illustration={LocalAssets.illustration.orderReceived}
        primary={{ onPress: handleContinue, buttonStyle: { width: sw212 }, text: NEW_SALES_PROMPT.BUTTON_PAY_NOW }}
        secondary={{ onPress: handleResetNewSales, buttonStyle: { width: sw212 }, text: NEW_SALES_PROMPT.BUTTON_BACK }}
        title={promptTitle}
        visible={showPrompt}>
        <View style={{ width: sw440 }}>
          <CustomSpacer space={sh16} />
          <View>
            <Text style={fs10RegGray6}>{NEW_SALES_PROMPT.TEXT_1}</Text>
            <View style={flexRow}>
              <CustomSpacer isHorizontal={true} space={sw10} />
              <Text style={fs10BoldGray6}>{emailAddress}</Text>
              {accountType === "Joint" && isNotEmpty(personalInfo.joint) && isNotEmpty(personalInfo.joint!.contactDetails!.emailAddress) ? (
                <Fragment>
                  <CustomSpacer isHorizontal space={sw3} />
                  <Text style={fs10RegGray6}>{NEW_SALES_PROMPT.TEXT_1_SUB}</Text>
                  <CustomSpacer isHorizontal space={sw3} />
                  <Text style={fs10BoldGray6}>{personalInfo.joint!.contactDetails!.emailAddress}</Text>
                </Fragment>
              ) : null}
            </View>
            <Text style={fs10RegGray6}>{NEW_SALES_PROMPT.TEXT_2_AND_3}</Text>
          </View>
          <CustomSpacer space={sh8} />
          <CollectionBankCard data={orders!.grandTotal} />
        </View>
      </NewPromptModal>
    </Fragment>
  );
};

export const PDFList = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(PDFListComponent);
