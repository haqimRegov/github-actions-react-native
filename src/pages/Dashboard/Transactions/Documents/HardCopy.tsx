import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import {
  CustomSpacer,
  IconText,
  Loading,
  NewDropdown,
  PromptModal,
  SelectionBanner,
  SubmissionSummaryModal,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_ORDER_STATUS, ERRORS } from "../../../../data/dictionary";
import { S3UrlGenerator, StorageUtil } from "../../../../integrations";
import { getHardCopyDocuments, submitHardCopyDocuments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  alignFlexStart,
  borderBottomBlue4,
  colorBlue,
  flexChild,
  fs10RegGray5,
  fs14BoldBlack2,
  fs16RegGray5,
  fs20BoldBlack2,
  fsAlignLeft,
  px,
  rowCenterVertical,
  sh12,
  sh200,
  sh24,
  sh32,
  sw16,
  sw24,
  sw56,
  sw8,
} from "../../../../styles";
import { AlertDialog, isArrayNotEmpty, isNotEmpty } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { PAYMENT, SUBMISSION_SUMMARY, UPLOAD_DOCUMENTS, UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface UploadHardCopyProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const UploadHardCopyComponent: FunctionComponent<UploadHardCopyProps> = (props: UploadHardCopyProps) => {
  const { currentOrder, navigation, setScreen, updateCurrentOrder, updatePill } = props;
  const fetching = useRef<boolean>(false);
  const [branch, setBranch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [documentList, setDocumentList] = useState<IGetHardCopyDocumentsResult | undefined>(undefined);
  const [backPrompt, setBackPrompt] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [submissionSummary, setSubmissionSummary] = useState<ISubmissionSummaryOrder[] | undefined>(undefined);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [promptType, setPromptType] = useState<"summary" | "success">("summary");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleBackToTransactions = () => {
    setScreen("Transactions");
    updateCurrentOrder(undefined);
  };

  const handleBack = () => {
    const checkDocuments = isNotEmpty(documentList?.documents)
      ? documentList?.documents.every((eachSection: IHardCopyDocument) =>
          eachSection.docs.every((eachDoc: IHardCopyFile) => eachDoc?.base64 === undefined),
        ) === false
      : false;
    const checkPrincipal =
      isNotEmpty(documentList?.account) && isNotEmpty(documentList?.account.principal)
        ? documentList?.account.principal.every((eachPrincipal: IHardCopyDocument) =>
            eachPrincipal.docs.every((eachDoc: IHardCopyFile) => eachDoc?.base64 === undefined),
          ) === false
        : false;
    const checkJoint =
      isNotEmpty(documentList?.account) && isNotEmpty(documentList?.account.joint)
        ? documentList?.account.joint!.every((eachPrincipal: IHardCopyDocument) =>
            eachPrincipal.docs.every((eachDoc: IHardCopyFile) => eachDoc?.base64 === undefined),
          ) === false
        : false;
    const checkEdited = checkDocuments || checkPrincipal || checkJoint;
    if (checkEdited === true) {
      setBackPrompt(true);
    } else {
      handleBackToTransactions();
    }
  };

  const handleCancel = () => {
    setBackPrompt(false);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleFetch = async () => {
    const request: IGetHardCopyDocumentsRequest = { orderNumber: currentOrder!.orderNumber };
    const response: IGetHardCopyDocumentsResponse = await getHardCopyDocuments(request, navigation);
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

  const handleUpload = async (docs: IHardCopyDocument[], accountHolder?: TypeAccountHolder) => {
    const personalDocsWithKeys = await Promise.all(
      docs.map(async ({ docs: documentArray, name }: IHardCopyDocument) => {
        return {
          docs: await Promise.all(
            documentArray.map(async (document) => {
              // check if file is updated
              if ("path" in document && document.path !== undefined) {
                try {
                  const url =
                    accountHolder === undefined
                      ? S3UrlGenerator.hardcopy(currentOrder!.clientId, currentOrder!.orderNumber, name, document.title!, document.type!)
                      : S3UrlGenerator.hardcopyAccount(
                          currentOrder!.clientId,
                          currentOrder!.orderNumber,
                          accountHolder,
                          document.title!,
                          document.type!,
                        );
                  const uploadedFile = await StorageUtil.put(document.path, url, document.type!);
                  if (uploadedFile === undefined) {
                    throw new Error();
                  }
                  return {
                    title: document.title!,
                    file: {
                      // base64: documents!.base64!,
                      name: document.name!,
                      size: document.size!,
                      type: document.type!,
                      date: document.date!,
                      path: document.path,
                      url: uploadedFile.key,
                    },
                  };

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                  // // eslint-disable-next-line no-console
                  fetching.current = true;
                  return undefined;
                }
              }
              // return undefined if file is already uploaded in S3 by other orders
              return undefined;
            }),
          ),
          name: name,
        };
      }),
    );
    return personalDocsWithKeys;
  };

  const handleSubmit = async (confirmed?: boolean) => {
    if (fetching.current === true) {
      fetching.current = false;
    }
    if (fetching.current === false) {
      fetching.current = true;
      if (confirmed === undefined) {
        setShowPopup(true);
      } else {
        setButtonLoading(true);
      }
      const findBranch = documentList!.branchList.filter(({ name }: IHardCopyBranchList) => name === branch);
      const branchId = findBranch.length > 0 ? findBranch[0].branchId.toString() : "";
      const principalDocs =
        isNotEmpty(documentList?.account) && isNotEmpty(documentList?.account.principal)
          ? await handleUpload(documentList?.account.principal!, "Principal")
          : [];
      const jointDocs =
        isNotEmpty(documentList?.account) && isNotEmpty(documentList?.account.joint)
          ? await handleUpload(documentList?.account.joint!, "Joint")
          : [];
      const fundDocs: ISubmitHardCopyDocuments[] =
        isNotEmpty(documentList?.documents) && documentList!.documents.length > 0
          ? ((await handleUpload(documentList?.documents!)) as ISubmitHardCopyDocuments[])
          : [];

      const filterUploadedPrincipalDocs =
        principalDocs.length > 0 ? principalDocs.filter((doc) => doc.docs.includes(undefined) === false) : [];
      const filterUploadedJointDocs = jointDocs.length > 0 ? jointDocs.filter((doc) => doc.docs.includes(undefined) === false) : [];

      const checkPrincipal = filterUploadedPrincipalDocs.length > 0 ? { principal: filterUploadedPrincipalDocs } : {};
      const checkJoint = filterUploadedJointDocs.length > 0 ? { joint: filterUploadedJointDocs } : {};

      const checkAccount = isNotEmpty(documentList?.account)
        ? {
            account: {
              ...checkPrincipal,
              ...checkJoint,
            },
          }
        : {};
      const checkFundDocsWithKeys =
        fundDocs.length > 0 ? fundDocs.findIndex(({ docs }) => docs === undefined || docs.includes(undefined)) : -1;
      // no need to check for principal and joint docs without keys since it can happen if the docs are already uploaded in S3 by other others
      if (checkFundDocsWithKeys !== -1) {
        setPromptType("summary");
        setButtonLoading(false);
        setShowPopup(false);
        setTimeout(() => {
          Alert.alert(ERRORS.storage.message);
        }, 100);
      } else {
        const request: ISubmitHardCopyDocumentsRequest = {
          branchId: branchId,
          hardcopy: fundDocs.length > 0 ? fundDocs : [],
          isConfirmed: confirmed === true,
          orderNumber: currentOrder!.orderNumber,
          ...checkAccount,
        };
        const response: ISubmitHardCopyDocumentsResponse = await submitHardCopyDocuments(request, navigation, setShowPopup);
        if (confirmed === true) {
          setButtonLoading(false);
        }
        if (response !== undefined) {
          const { data, error } = response;
          if (error === null && data !== null) {
            if (confirmed === true) {
              setPromptType("success");
            }
            const structuredRemarks: ISubmissionSummaryOrder[] = data.result.orders.map((eachOrder) => {
              const findHardcopy = eachOrder.docList.findIndex((eachDocList) => eachDocList.title === "Hardcopy Documents");

              const hardcopyDocList = findHardcopy !== -1 ? eachOrder.docList[findHardcopy] : undefined;
              let hardcopyDocs: string[] = [];

              if (hardcopyDocList !== undefined) {
                const principalHardcopy: string[] = [];
                const jointHardcopy: string[] = [];
                const bothHardcopy: string[] = [];

                hardcopyDocList.remarks.principalHolder.forEach((eachPrincipalDoc) => {
                  if (hardcopyDocList.remarks.jointHolder.includes(eachPrincipalDoc)) {
                    // hardcopy is for both
                    bothHardcopy.push(eachPrincipalDoc);
                  } else {
                    // hardcopy is for principal
                    principalHardcopy.push(eachPrincipalDoc);
                  }
                });

                hardcopyDocList.remarks.jointHolder.forEach((eachJointDoc) => {
                  if (hardcopyDocList.remarks.principalHolder.includes(eachJointDoc) && bothHardcopy.includes(eachJointDoc) === false) {
                    // hardcopy is for both
                    bothHardcopy.push(eachJointDoc);
                  } else {
                    // hardcopy is for joint
                    jointHardcopy.push(eachJointDoc);
                  }
                });

                const principalDocList = principalHardcopy.map((eachDoc) =>
                  isArrayNotEmpty(jointHardcopy) ? `${SUBMISSION_SUMMARY.LABEL_PRINCIPAL} ${eachDoc}` : eachDoc,
                );
                const jointDocList = jointHardcopy.map((eachDoc) => `${SUBMISSION_SUMMARY.LABEL_JOINT} ${eachDoc}`);
                const bothDocList = bothHardcopy.map((eachDoc) => `${SUBMISSION_SUMMARY.LABEL_PRINCIPAL_JOINT} ${eachDoc}`);
                const utmcDocList = isArrayNotEmpty(hardcopyDocList.remarks.hardcopy) ? hardcopyDocList.remarks.hardcopy! : [];

                hardcopyDocs = principalDocList.concat(jointDocList).concat(bothDocList).concat(utmcDocList);
              }

              const hardcopyDocuments: ISubmissionSummaryRemarks[] = isArrayNotEmpty(hardcopyDocs)
                ? [{ title: SUBMISSION_SUMMARY.TITLE_HARDCOPY, remarks: hardcopyDocs }]
                : [];

              const remarks: ISubmissionSummaryRemarks[] = hardcopyDocuments;
              return { orderNumber: eachOrder.orderNumber, status: eachOrder.status, remarks: remarks };
            });

            setSubmissionSummary(structuredRemarks);
          } else {
            setPromptType("summary");
            setTimeout(() => {
              setButtonLoading(false);
              setShowPopup(false);
              Alert.alert(error!.message);
            }, 100);
          }
        }
      }
    }
    return undefined;
  };

  const handleCancelPopup = () => {
    if (buttonLoading === false) {
      if (toggle === true) {
        setToggle(false);
      }
      setSubmissionSummary(undefined);
      setShowPopup(false);
    }
  };

  const handleConfirmPopup = async () => {
    if (isConfirmed === true) {
      handleBackToTransactions();
      return updatePill("submitted");
    }

    const response = await handleSubmit(true);
    if (response === undefined) {
      setIsConfirmed(true);
      return true;
    }

    return undefined;
  };

  const branchList: TypeLabelValue[] =
    documentList && documentList.branchList ? documentList.branchList.map(({ name }) => ({ label: name, value: name })) : [];

  const handleSetPrincipalDocument = (value: IHardCopyDocument[]) => {
    setDocumentList({
      ...documentList!,
      account: { ...documentList?.account, principal: value },
    });
  };

  const handleSetJointDocument = (value: IHardCopyDocument[]) => {
    if (documentList?.account.joint !== undefined) {
      setDocumentList({
        ...documentList,
        account: { ...documentList?.account, joint: value },
      });
    }
  };

  const handleSetDocument = (value: IHardCopyDocument[]) => {
    setDocumentList({ ...documentList!, documents: value });
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkRerouted =
    submissionSummary !== undefined &&
    submissionSummary!.filter(
      (eachResult: ISubmissionSummaryOrder) =>
        eachResult.status === DICTIONARY_ORDER_STATUS.reroutedBr || eachResult.status === DICTIONARY_ORDER_STATUS.reroutedHq,
    ).length > 0;

  const checkNonPendingOrder =
    submissionSummary !== undefined &&
    submissionSummary.findIndex((order) => order.status === "Completed" || order.status === "Submitted") !== -1;
  const allOrdersSubmitted =
    submissionSummary !== undefined &&
    submissionSummary.findIndex((order) => order.status !== "Completed" && order.status !== "Submitted") === -1;

  const illustration = checkNonPendingOrder === true ? LocalAssets.illustration.orderReceived : LocalAssets.illustration.orderSaved;
  let message = "";
  let subtitle =
    checkRerouted === true
      ? UPLOAD_HARD_COPY_DOCUMENTS.LABEL_PROMPT_SUBTITLE_PARTLY_SUCCESS_REROUTED
      : UPLOAD_HARD_COPY_DOCUMENTS.LABEL_PROMPT_SUBTITLE_PARTLY_SUCCESS;

  if (checkNonPendingOrder === true) {
    if (allOrdersSubmitted === true) {
      message =
        submissionSummary !== undefined && submissionSummary.length === 1
          ? `${submissionSummary[0].orderNumber} ${PAYMENT.PROMPT_TITLE_SUBMITTED_SINGLE}`
          : PAYMENT.PROMPT_TITLE_SUBMITTED;
      subtitle = UPLOAD_HARD_COPY_DOCUMENTS.LABEL_PROMPT_SUBTITLE_SUCCESS;
    } else {
      message = PAYMENT.PROMPT_TITLE_ORDER;
    }
  } else {
    message =
      submissionSummary !== undefined && submissionSummary.length === 1
        ? `${submissionSummary[0].orderNumber} ${PAYMENT.PROMPT_TITLE_SAVED_SINGLE}`
        : PAYMENT.PROMPT_TITLE_SAVED;
  }

  const pendingDocumentsPrincipal = documentList && isNotEmpty(documentList.account) ? documentList.account.principal : [];
  const pendingDocumentsJoint =
    documentList && isNotEmpty(documentList.account) && isNotEmpty(documentList.account.joint) ? documentList.account.joint : [];
  const principalDocsCount = isNotEmpty(pendingDocumentsPrincipal) ? pendingDocumentsPrincipal.map(({ docs }) => docs).flat() : [];
  const principalDocsRemaining = principalDocsCount.filter(
    (docs) => docs !== undefined && "base64" in docs === false && !isNotEmpty(docs.url),
  ).length;
  const jointDocsCount = isNotEmpty(pendingDocumentsJoint) ? pendingDocumentsJoint!.map(({ docs }) => docs).flat() : [];
  const jointDocsRemaining = jointDocsCount.filter(
    (docs) => docs !== undefined && "base64" in docs === false && !isNotEmpty(docs.url),
  ).length;
  const accountDocsCount =
    isNotEmpty(documentList?.documents) && documentList!.documents.length > 0 ? documentList!.documents.map(({ docs }) => docs).flat() : [];
  const accountDocsRemaining = accountDocsCount.filter(
    (docs) => docs !== undefined && "base64" in docs === false && !isNotEmpty(docs.url),
  ).length;
  const totalCount = principalDocsCount.length + jointDocsCount.length + accountDocsCount.length;
  const pendingDocCount = principalDocsRemaining + jointDocsRemaining + accountDocsRemaining;
  const completedCount = totalCount - pendingDocCount;
  const checkAllCompleted = pendingDocCount !== 0 ? `${pendingDocCount} pending, ` : "";
  const checkCompleted = completedCount !== 0 ? `${completedCount} completed` : "";
  const completedLabel = pendingDocCount === 0 ? `All (${totalCount}) completed` : checkCompleted;
  const pendingLabel = pendingDocCount === totalCount ? `All (${pendingDocCount}) pending` : checkAllCompleted;
  const footer = `${UPLOAD_HARD_COPY_DOCUMENTS.LABEL_PHYSICAL_DOC_SUMMARY}: ${pendingLabel}${completedLabel}`;
  const checkIsIndividual = isNotEmpty(documentList?.documents);

  return (
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
        titleIconOnPress={handleBack}
        title={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_SUBMIT_PHYSICAL_DOCUMENTS}
        titleIcon="arrow-left">
        <TextSpaceArea style={{ ...fs16RegGray5, ...px(sw56) }} text={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_UPLOAD_HARDCOPY_SUBTITLE} />
        <CustomSpacer space={sh24} />
        {documentList !== undefined ? (
          <Fragment>
            <View style={px(sw24)}>
              {isNotEmpty(documentList.account) ? (
                <Fragment>
                  {isNotEmpty(documentList.account.principal) ? (
                    <Fragment>
                      <DocumentList
                        data={documentList.account.principal}
                        header={
                          isNotEmpty(documentList.account.principal) ? (
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
                                <Text style={fs10RegGray5}>{checkIsIndividual ? "" : UPLOAD_DOCUMENTS.LABEL_PRINCIPAL}</Text>
                                <CustomSpacer isHorizontal={true} space={sw16} />
                                <View style={{ ...borderBottomBlue4, ...flexChild }} />
                              </View>
                              <CustomSpacer space={sh12} />
                            </Fragment>
                          ) : (
                            <View />
                          )
                        }
                        headerSpace={false}
                        setData={handleSetPrincipalDocument}
                      />
                    </Fragment>
                  ) : null}
                  {isNotEmpty(documentList.account.joint) ? (
                    <Fragment>
                      {isNotEmpty(documentList.account.principal) ? <CustomSpacer space={sh24} /> : null}
                      <DocumentList
                        data={documentList.account.joint!}
                        setData={handleSetJointDocument}
                        header={
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
                        }
                      />
                    </Fragment>
                  ) : null}
                </Fragment>
              ) : null}
              {isNotEmpty(documentList.documents) && documentList.documents.length > 0 ? (
                <Fragment>
                  {isNotEmpty(documentList.account) ? <CustomSpacer space={sh32} /> : null}
                  <DocumentList data={documentList.documents} setData={handleSetDocument} />
                </Fragment>
              ) : null}
            </View>
            <CustomSpacer space={sh24} />
            <View style={borderBottomBlue4} />
            <View style={{ ...flexChild, ...px(sw24) }}>
              <CustomSpacer space={sh24} />
              <NewDropdown
                handleChange={setBranch}
                items={branchList}
                label={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_SUBMISSION_BRANCH}
                value={branch}
              />
            </View>
          </Fragment>
        ) : (
          <Loading />
        )}
        <CustomSpacer space={sh200} />
      </DashboardLayout>
      {documentList !== undefined ? (
        <SelectionBanner
          continueDisabled={pendingDocCount > 0 || branch === ""}
          label={footer}
          labelStyle={fs20BoldBlack2}
          submitOnPress={handleSubmit}
          labelSubmit={UPLOAD_HARD_COPY_DOCUMENTS.BUTTON_SAVE}
        />
      ) : null}
      <SubmissionSummaryModal
        data={submissionSummary}
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
          primary: { disabled: !toggle, loading: buttonLoading, onPress: handleConfirmPopup },
          secondary: { onPress: handleCancelPopup },
          title: UPLOAD_HARD_COPY_DOCUMENTS.PROMPT_TITLE_STATUS,
        }}
        visible={showPopup}
      />
      <PromptModal
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

export const UploadHardCopy = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(UploadHardCopyComponent);
