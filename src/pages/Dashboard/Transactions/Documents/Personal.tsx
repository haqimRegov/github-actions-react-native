import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { AccountHeader, CustomSpacer, Loading, PromptModal, SelectionBanner, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { ERRORS } from "../../../../data/dictionary";
import { S3UrlGenerator, StorageUtil } from "../../../../integrations";
import { getSoftCopyDocuments, submitSoftCopyDocuments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  alignFlexStart,
  borderBottomGray2,
  colorBlue,
  fs10RegGray6,
  fs12BoldBlack2,
  fs16SemiBoldGray6,
  fsAlignLeft,
  px,
  sh176,
  sh24,
  sh32,
  sh8,
  sw24,
  sw68,
} from "../../../../styles";
import { DocumentsPopup } from "../../../../templates/Payment/DocumentsPopup";
import { AlertDialog, isNotEmpty } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { PAYMENT, UPLOAD_DOCUMENTS } = Language.PAGE;

interface UploadDocumentsProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const UploadDocumentsComponent: FunctionComponent<UploadDocumentsProps> = (props: UploadDocumentsProps) => {
  const { currentOrder, navigation, setScreen, updateCurrentOrder } = props;
  const fetching = useRef<boolean>(false);
  const [documentList, setDocumentList] = useState<IGetSoftCopyDocumentsResult | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [backPrompt, setBackPrompt] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<ISubmitHardCopyDocumentsResult | undefined>(undefined);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleBackToTransactions = () => {
    setScreen("Transactions");
    updateCurrentOrder(undefined);
  };

  const handleBack = () => {
    const checkEdited =
      documentList?.principal.every((eachPrincipal: ISoftCopyDocument) =>
        eachPrincipal.docs.every((eachDoc: ISoftCopyFile) => eachDoc?.base64 === undefined),
      ) === false ||
      (documentList?.joint !== undefined &&
        documentList?.principal.every((eachPrincipal: ISoftCopyDocument) =>
          eachPrincipal.docs.every((eachDoc: ISoftCopyFile) => eachDoc?.base64 === undefined),
        )) === false;
    if (checkEdited === true) {
      setBackPrompt(true);
    } else {
      handleBackToTransactions();
    }
  };

  const handleCancel = () => {
    setBackPrompt(false);
  };

  const pendingDocumentsPrincipal = documentList && documentList.principal ? documentList.principal : [];

  const documentsPrincipal =
    documentList && documentList.principal && (currentOrder!.status === "BR - Rerouted" || currentOrder!.status === "HQ - Rerouted")
      ? documentList.principal
      : pendingDocumentsPrincipal;

  const pendingDocumentsJoint = documentList && documentList.joint ? documentList.joint : [];

  const documentsJoint =
    documentList && documentList.joint && (currentOrder!.status === "BR - Rerouted" || currentOrder!.status === "HQ - Rerouted")
      ? documentList.joint
      : pendingDocumentsJoint;

  const principalDocsCount = pendingDocumentsPrincipal.map(({ docs }) => docs).flat();
  const principalDocsRemaining = principalDocsCount.filter(
    (docs) => docs !== undefined && "base64" in docs === false && !isNotEmpty(docs.url),
  ).length;
  const jointDocsCount = pendingDocumentsJoint.map(({ docs }) => docs).flat();
  const jointDocsRemaining = jointDocsCount.filter(
    (docs) => docs !== undefined && "base64" in docs === false && !isNotEmpty(docs.url),
  ).length;

  const totalCount = principalDocsCount.length + jointDocsCount.length;
  const pendingDocCount = principalDocsRemaining + jointDocsRemaining;
  const completedCount = totalCount - pendingDocCount;
  const checkAllCompleted = pendingDocCount !== 0 ? `${pendingDocCount} pending, ` : "";
  const completedLabel = pendingDocCount === 0 ? `All(${totalCount}) completed` : `${completedCount} completed`;
  const pendingLabel = pendingDocCount === totalCount ? `All(${pendingDocCount}) pending` : checkAllCompleted;
  const footer = `${UPLOAD_DOCUMENTS.LABEL_DOCUMENT_SUMMARY} ${pendingLabel}${completedLabel}`;

  const handlePrincipalData = (value: ISoftCopyDocument[]) => {
    setDocumentList({ ...documentList!, principal: value });
  };

  const handleJointData = (value: ISoftCopyDocument[]) => {
    setDocumentList({ ...documentList!, joint: value });
  };

  const handleFetch = async () => {
    const request: IGetSoftCopyDocumentsRequest = { orderNumber: currentOrder!.orderNumber };
    const response: IGetSoftCopyDocumentsResponse = await getSoftCopyDocuments(request, navigation, setLoading);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        setDocumentList(data.result);
      }
      if (error !== null) {
        setTimeout(() => {
          AlertDialog(error.message, handleBackToTransactions);
        }, 100);
      }
    }
  };

  const handleUpload = async (personalDocs: ISoftCopyDocument[], clientId: string) => {
    const personalDocsWithKeys = await Promise.all(
      personalDocs.map(async ({ docs, name }: ISoftCopyDocument) => {
        return {
          docs: await Promise.all(
            docs
              .filter((eachDoc: ISoftCopyFile) => !isNotEmpty(eachDoc?.url))
              .map(async (documents) => {
                try {
                  let title = "";
                  if (documents!.title === "Passport") {
                    title = "passport";
                  } else if (documents!.title === "Certificate of Loss of Nationality") {
                    title = "certificate";
                  } else {
                    title = `${documents!.title!.toLowerCase().replace(" - ", "_")}`;
                  }

                  const url = S3UrlGenerator.document(clientId, title, documents!.type!);
                  const uploadedFile = await StorageUtil.put(documents!.path!, url, documents!.type!);

                  if (uploadedFile === undefined) {
                    throw new Error();
                  }
                  return {
                    title: documents!.title!,
                    file: {
                      // base64: documents!.base64!,
                      name: documents!.name!,
                      size: documents!.size!,
                      type: documents!.type!,
                      date: documents!.date!,
                      path: documents!.path!,
                      url: uploadedFile.key,
                    },
                  };

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                  // // eslint-disable-next-line no-console
                  AlertDialog(ERRORS.storage.message, () => setLoading(false));
                  fetching.current = true;
                  return error;
                }
              }),
          ),
          name: name,
        };
      }),
    );
    return personalDocsWithKeys;
  };

  const handleSubmit = async (confirmed?: boolean) => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      let pendingDocumentsPrincipalWithKeys: ISubmitSoftCopyDocuments[] = [];
      let pendingDocumentsJointWithKeys: ISubmitSoftCopyDocuments[] = [];

      if (pendingDocumentsPrincipal.length !== 0) {
        pendingDocumentsPrincipalWithKeys = await handleUpload(pendingDocumentsPrincipal, currentOrder!.clientId!);
        if (pendingDocumentsPrincipalWithKeys === undefined) {
          AlertDialog(ERRORS.storage.message, () => setLoading(false));
          return undefined;
        }
      }

      if (pendingDocumentsJoint.length !== 0) {
        pendingDocumentsJointWithKeys = await handleUpload(pendingDocumentsJoint, currentOrder!.jointId!);
        if (pendingDocumentsJointWithKeys === undefined) {
          AlertDialog(ERRORS.storage.message, () => setLoading(false));
          return undefined;
        }
      }
      const filteredPrincipalWithKeys = pendingDocumentsPrincipalWithKeys.filter(
        (eachDocumentToSubmit: ISubmitSoftCopyDocuments) => eachDocumentToSubmit.docs.length > 0,
      );
      const filteredJointWithKeys = pendingDocumentsJointWithKeys.filter(
        (eachDocumentToSubmit: ISubmitSoftCopyDocuments) => eachDocumentToSubmit.docs.length > 0,
      );

      const request: ISubmitSoftCopyDocumentsRequest = {
        joint: filteredJointWithKeys,
        isConfirmed: confirmed === true,
        orderNumber: currentOrder!.orderNumber,
        principal: filteredPrincipalWithKeys,
      };
      const response: ISubmitSoftCopyDocumentsResponse = await submitSoftCopyDocuments(request, navigation, setLoading);
      fetching.current = false;
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          setSubmissionResult(data.result);
        }
        if (error !== null) {
          setPrompt(false);
          setLoading(false);
          setTimeout(() => {
            Alert.alert(error.message);
          }, 100);
        }
      }
    }
    return undefined;
  };

  const handleCancelPopup = () => {
    setSubmissionResult(undefined);
    setLoading(false);
  };

  const handleConfirmPopup = async () => {
    if (isConfirmed === true) {
      return handleBack();
    }

    const response = await handleSubmit(true);
    if (response === undefined) {
      setIsConfirmed(true);
      return true;
    }

    return undefined;
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
        titleIconOnPress={handleBack}
        title={UPLOAD_DOCUMENTS.LABEL_UPLOAD_DOCUMENTS}
        titleIcon="arrow-left">
        <View style={px(sw68)}>
          <TextSpaceArea spaceToBottom={sh24} spaceToTop={sh8} style={fs16SemiBoldGray6} text={UPLOAD_DOCUMENTS.LABEL_SUBTITLE} />
        </View>
        {documentList !== undefined ? (
          <Fragment>
            {documentList.principal === undefined || documentList.principal === null ? null : (
              <View style={px(sw24)}>
                {documentList.joint && documentsPrincipal.length > 0 ? (
                  <AccountHeader
                    headerStyle={{ height: sh32, backgroundColor: colorBlue._3 }}
                    titleStyle={fs12BoldBlack2}
                    subtitle={UPLOAD_DOCUMENTS.LABEL_PRINCIPAL}
                    title={currentOrder?.investorName.principal!}
                    subtitleStyle={fs10RegGray6}
                  />
                ) : null}
                <DocumentList data={documentsPrincipal} setData={handlePrincipalData} />
              </View>
            )}
            {documentList.joint === undefined || documentList.joint === null ? null : (
              <Fragment>
                {documentsPrincipal.length > 0 && documentsJoint.length > 0 ? (
                  <Fragment>
                    <CustomSpacer space={sh32} />
                    <View style={borderBottomGray2} />
                    <CustomSpacer space={sh32} />
                  </Fragment>
                ) : null}
                <View style={px(sw24)}>
                  {documentList.joint && documentsJoint.length > 0 ? (
                    <AccountHeader
                      headerStyle={{ height: sh32, backgroundColor: colorBlue._3 }}
                      titleStyle={fs12BoldBlack2}
                      subtitle={UPLOAD_DOCUMENTS.LABEL_JOINT}
                      title={currentOrder?.investorName.joint!}
                      subtitleStyle={fs10RegGray6}
                    />
                  ) : null}
                  <DocumentList data={documentsJoint} setData={handleJointData} />
                </View>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Loading />
        )}
        <CustomSpacer space={sh176} />
      </DashboardLayout>
      {documentList !== undefined ? (
        <SelectionBanner
          continueDisabled={pendingDocCount > 0}
          label={footer}
          submitOnPress={handleSubmit}
          labelSubmit={UPLOAD_DOCUMENTS.BUTTON_DONE}
        />
      ) : null}
      <DocumentsPopup
        handleBack={handleBackToTransactions}
        handleCancel={handleCancelPopup}
        handleConfirm={handleConfirmPopup}
        loading={loading}
        result={submissionResult}
      />
      <PromptModal
        backdropOpacity={loading ? 0.4 : undefined}
        handleContinue={handleBackToTransactions}
        illustration={LocalAssets.illustration.orderReceived}
        isLoading={loading}
        label={UPLOAD_DOCUMENTS.LABEL_UPLOAD_SUCCESSFUL}
        labelContinue={UPLOAD_DOCUMENTS.BUTTON_DONE}
        visible={prompt}
      />
      <PromptModal
        backdropOpacity={loading ? 0.4 : undefined}
        contentStyle={alignFlexStart}
        handleCancel={handleBackToTransactions}
        handleContinue={handleCancel}
        label={PAYMENT.PROMPT_TITLE_UNSAVED}
        labelCancel={PAYMENT.BUTTON_CLOSE}
        labelContinue={UPLOAD_DOCUMENTS.LABEL_BACK_PROMPT_CONTINUE}
        labelStyle={fsAlignLeft}
        title={UPLOAD_DOCUMENTS.LABEL_BACK_PROMPT_SUBTITLE}
        titleStyle={fsAlignLeft}
        visible={backPrompt}
      />
    </Fragment>
  );
};

export const UploadDocuments = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(UploadDocumentsComponent);
