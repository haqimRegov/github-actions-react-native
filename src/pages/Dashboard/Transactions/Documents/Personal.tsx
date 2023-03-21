import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import {
  CustomSpacer,
  IconText,
  Loading,
  PromptModal,
  SelectionBanner,
  SubmissionSummaryModal,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_ORDER_STATUS, ERRORS } from "../../../../data/dictionary";
import { S3UrlGenerator, StorageUtil } from "../../../../integrations";
import { getSoftCopyDocuments, submitSoftCopyDocuments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  alignFlexStart,
  borderBottomBlue4,
  colorBlue,
  flexChild,
  fs10RegGray5,
  fs14BoldBlack2,
  fs16RegGray5,
  fsAlignLeft,
  px,
  rowCenterVertical,
  sh12,
  sh176,
  sh24,
  sw16,
  sw24,
  sw56,
  sw8,
} from "../../../../styles";
import { AlertDialog, isArrayNotEmpty, isNotEmpty } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { PAYMENT, SUBMISSION_SUMMARY, UPLOAD_DOCUMENTS, UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface UploadDocumentsProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const UploadDocumentsComponent: FunctionComponent<UploadDocumentsProps> = (props: UploadDocumentsProps) => {
  const { currentOrder, navigation, setScreen, updateCurrentOrder, updatePill } = props;
  const fetching = useRef<boolean>(false);
  const [documentList, setDocumentList] = useState<IGetSoftCopyDocumentsResult | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [backPrompt, setBackPrompt] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<ISubmissionSummaryOrder[] | undefined>(undefined);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [promptType, setPromptType] = useState<"summary" | "success">("summary");
  const [toggle, setToggle] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const checkIsJoint = documentList !== undefined && documentList.joint !== undefined && isNotEmpty(documentList.joint);

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

  const checkRerouted =
    submissionResult !== undefined &&
    submissionResult.filter(
      (eachResult: ISubmissionSummaryOrder) =>
        eachResult.status === DICTIONARY_ORDER_STATUS.reroutedBr || eachResult.status === DICTIONARY_ORDER_STATUS.reroutedHq,
    ).length > 0;

  const checkNonPendingOrder =
    submissionResult !== undefined &&
    submissionResult.findIndex((order) => order.status === "Completed" || order.status === "Submitted") !== -1;

  const allOrdersSubmitted =
    submissionResult !== undefined &&
    submissionResult.findIndex((order) => order.status !== "Completed" && order.status !== "Submitted") === -1;

  const illustration = checkNonPendingOrder === true ? LocalAssets.illustration.orderReceived : LocalAssets.illustration.orderSaved;

  let message = "";
  let subtitle =
    checkRerouted === true
      ? UPLOAD_DOCUMENTS.LABEL_PROMPT_SUBTITLE_PARTLY_SUCCESS_REROUTED
      : UPLOAD_DOCUMENTS.LABEL_PROMPT_SUBTITLE_PARTLY_SUCCESS;

  if (checkNonPendingOrder === true) {
    if (allOrdersSubmitted === true) {
      message =
        submissionResult !== undefined && submissionResult.length === 1
          ? `${submissionResult[0].orderNumber} ${PAYMENT.PROMPT_TITLE_SUBMITTED_SINGLE}`
          : PAYMENT.PROMPT_TITLE_SUBMITTED;
      subtitle = UPLOAD_DOCUMENTS.LABEL_PROMPT_SUBTITLE_SUCCESS;
    } else {
      message = PAYMENT.PROMPT_TITLE_ORDER;
    }
  } else {
    message =
      submissionResult !== undefined && submissionResult.length === 1
        ? `${submissionResult[0].orderNumber} ${PAYMENT.PROMPT_TITLE_SAVED_SINGLE}`
        : PAYMENT.PROMPT_TITLE_SAVED;
  }

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
  const checkCompleted = completedCount !== 0 ? `${completedCount} completed` : "";
  const completedLabel = pendingDocCount === 0 ? `All (${totalCount}) completed` : checkCompleted;
  const pendingLabel = pendingDocCount === totalCount ? `All (${pendingDocCount}) pending` : checkAllCompleted;
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
          AlertDialog(error.message, () => handleBackToTransactions());
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
                  if (documents.title === "Passport") {
                    title = "passport";
                  } else if (documents.title === "Certificate of Loss of Nationality") {
                    title = "certificate";
                  } else {
                    title = `${documents.title!.toLowerCase().replace(" - ", "_")}`;
                  }

                  const url = S3UrlGenerator.document(clientId, title, documents.type!);
                  const uploadedFile = await StorageUtil.put(documents.path!, url, documents.type!);

                  if (uploadedFile === undefined) {
                    throw new Error();
                  }
                  return {
                    title: documents.title!,
                    file: {
                      // base64: documents.base64!,
                      name: documents.name!,
                      size: documents.size!,
                      type: documents.type!,
                      date: documents.date!,
                      path: documents.path!,
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
      if (confirmed === undefined) {
        setShowPopup(true);
      } else {
        setLoading(true);
      }

      let pendingDocumentsPrincipalWithKeys: ISubmitSoftCopyDocuments[] = [];
      let pendingDocumentsJointWithKeys: ISubmitSoftCopyDocuments[] = [];

      if (pendingDocumentsPrincipal.length !== 0) {
        pendingDocumentsPrincipalWithKeys = await handleUpload(pendingDocumentsPrincipal, currentOrder!.clientId);
        if (pendingDocumentsPrincipalWithKeys === undefined) {
          setPromptType("summary");
          setShowPopup(false);
          AlertDialog(ERRORS.storage.message, () => setLoading(false));
          return undefined;
        }
      }

      if (pendingDocumentsJoint.length !== 0) {
        pendingDocumentsJointWithKeys = await handleUpload(pendingDocumentsJoint, currentOrder!.jointId!);
        if (pendingDocumentsJointWithKeys === undefined) {
          setPromptType("summary");
          setShowPopup(false);
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
          if (confirmed === true) {
            setPromptType("success");
          }
          const structuredRemarks: ISubmissionSummaryOrder[] = data.result.orders.map((eachOrder) => {
            const findSoftcopy = eachOrder.docList.findIndex((eachDocList) => eachDocList.title === "Softcopy Documents");

            const softcopyDocList = findSoftcopy !== -1 ? eachOrder.docList[findSoftcopy] : undefined;
            let softcopyDocs: string[] = [];

            if (softcopyDocList !== undefined) {
              const principalSoftcopy: string[] = [];
              const jointSoftcopy: string[] = [];
              const bothSoftcopy: string[] = [];

              softcopyDocList.remarks.principalHolder.forEach((eachPrincipalDoc) => {
                if (softcopyDocList.remarks.jointHolder.includes(eachPrincipalDoc)) {
                  // softcopy is for both
                  bothSoftcopy.push(eachPrincipalDoc);
                } else {
                  // softcopy is for principal
                  principalSoftcopy.push(eachPrincipalDoc);
                }
              });

              softcopyDocList.remarks.jointHolder.forEach((eachJointDoc) => {
                if (softcopyDocList.remarks.principalHolder.includes(eachJointDoc)) {
                  if (bothSoftcopy.includes(eachJointDoc) === false) {
                    // softcopy is for both
                    bothSoftcopy.push(eachJointDoc);
                  }
                } else {
                  // softcopy is for joint
                  jointSoftcopy.push(eachJointDoc);
                }
              });

              const principalDocList = principalSoftcopy.map((eachDoc) =>
                isArrayNotEmpty(jointSoftcopy) || isArrayNotEmpty(bothSoftcopy)
                  ? `${SUBMISSION_SUMMARY.LABEL_PRINCIPAL} ${eachDoc}`
                  : eachDoc,
              );
              const jointDocList = jointSoftcopy.map((eachDoc) => `${SUBMISSION_SUMMARY.LABEL_JOINT} ${eachDoc}`);
              const bothDocList = bothSoftcopy.map((eachDoc) => `${SUBMISSION_SUMMARY.LABEL_PRINCIPAL_JOINT} ${eachDoc}`);

              softcopyDocs = principalDocList.concat(jointDocList).concat(bothDocList);
            }

            const softcopyDocuments: ISubmissionSummaryRemarks[] = isArrayNotEmpty(softcopyDocs)
              ? [{ title: SUBMISSION_SUMMARY.TITLE_SOFTCOPY, remarks: softcopyDocs }]
              : [];

            const remarks: ISubmissionSummaryRemarks[] = softcopyDocuments;
            return { orderNumber: eachOrder.orderNumber, status: eachOrder.status, remarks: remarks };
          });

          setSubmissionResult(structuredRemarks);
        }
        if (error !== null) {
          setPromptType("summary");
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
    setShowPopup(false);
    if (loading === false) {
      if (toggle === true) {
        setToggle(false);
      }
      setSubmissionResult(undefined);
      setLoading(false);
    }
  };

  const handleConfirmPopup = async () => {
    if (isConfirmed === true) {
      handleBackToTransactions();
      if (
        submissionResult !== undefined &&
        submissionResult.filter((eachResult: ISubmissionSummaryOrder) => eachResult.status === "Submitted").length ===
          submissionResult.length
      ) {
        return updatePill("submitted");
      }
      return undefined;
    }

    const response = await handleSubmit(true);
    if (response === undefined) {
      setIsConfirmed(true);
      return true;
    }

    return undefined;
  };

  const handleToggle = () => {
    setToggle(!toggle);
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
        <TextSpaceArea style={{ ...fs16RegGray5, ...px(sw56) }} text={UPLOAD_DOCUMENTS.LABEL_SUBTITLE} />
        {documentList !== undefined ? (
          <Fragment>
            {documentList.principal === undefined || documentList.principal === null ? null : (
              <View style={px(sw24)}>
                <CustomSpacer space={sh24} />

                {documentList.joint && documentsPrincipal.length > 0 ? (
                  <Fragment>
                    <View style={rowCenterVertical}>
                      <IconText
                        color={colorBlue._1}
                        iconSize={sw16}
                        name={"account"}
                        text={currentOrder?.investorName.principal!}
                        textStyle={fs14BoldBlack2}
                      />
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <Text style={fs10RegGray5}>{!checkIsJoint ? "" : UPLOAD_DOCUMENTS.LABEL_PRINCIPAL}</Text>
                      <CustomSpacer isHorizontal={true} space={sw16} />
                      <View style={{ ...borderBottomBlue4, ...flexChild }} />
                    </View>
                    <CustomSpacer space={sh12} />
                  </Fragment>
                ) : null}
                <DocumentList data={documentsPrincipal} setData={handlePrincipalData} />
              </View>
            )}
            {documentList.joint === undefined || documentList.joint === null ? null : (
              <Fragment>
                <CustomSpacer space={sh24} />
                <View style={px(sw24)}>
                  {documentList.joint && documentsJoint.length > 0 ? (
                    <Fragment>
                      <View style={rowCenterVertical}>
                        <IconText
                          color={colorBlue._1}
                          iconSize={sw16}
                          name={"account-joint"}
                          text={currentOrder?.investorName.joint!}
                          textStyle={fs14BoldBlack2}
                        />
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={fs10RegGray5}>{UPLOAD_DOCUMENTS.LABEL_JOINT}</Text>
                        <CustomSpacer isHorizontal={true} space={sw16} />
                        <View style={{ ...borderBottomBlue4, ...flexChild }} />
                      </View>
                      <CustomSpacer space={sh12} />
                    </Fragment>
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
          labelSubmit={UPLOAD_DOCUMENTS.BUTTON_CONTINUE}
        />
      ) : null}

      <SubmissionSummaryModal
        data={submissionResult}
        prompt={{
          illustration: illustration,
          primary: { onPress: handleConfirmPopup, text: UPLOAD_HARD_COPY_DOCUMENTS.BUTTON_BACK_TO_DASHBOARD },
          subtitle: subtitle,
          subtitleStyle: fsAlignLeft,
          title: message,
        }}
        promptType={promptType}
        summary={{
          checkbox: { label: UPLOAD_HARD_COPY_DOCUMENTS.LABEL_CHECKBOX, onPress: handleToggle, toggle: toggle },
          primary: { disabled: !toggle, loading: loading, onPress: handleConfirmPopup },
          secondary: { onPress: handleCancelPopup },
          title: UPLOAD_HARD_COPY_DOCUMENTS.PROMPT_TITLE_STATUS,
        }}
        visible={showPopup}
      />
      <PromptModal
        // backdropOpacity={loading ? 0.4 : undefined}
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
