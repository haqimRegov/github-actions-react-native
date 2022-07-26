import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import {
  AccountHeader,
  CheckBox,
  CustomSpacer,
  Loading,
  NewDropdown,
  PromptModal,
  SelectionBanner,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { ERRORS } from "../../../../data/dictionary";
import { S3UrlGenerator, StorageUtil } from "../../../../integrations";
import { getHardCopyDocuments, submitHardCopyDocuments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  alignFlexStart,
  borderBottomBlue4,
  colorBlue,
  flexChild,
  fs10RegGray6,
  fs12BoldBlack2,
  fs12BoldGray6,
  fs16RegGray5,
  fsAlignLeft,
  px,
  sh12,
  sh124,
  sh24,
  sh32,
  sh8,
  sw24,
  sw56,
} from "../../../../styles";
import { DocumentsPopup } from "../../../../templates/Payment/DocumentsPopup";
import { AlertDialog, isNotEmpty } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { PAYMENT, UPLOAD_DOCUMENTS, UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface UploadHardCopyProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const UploadHardCopyComponent: FunctionComponent<UploadHardCopyProps> = (props: UploadHardCopyProps) => {
  const { currentOrder, navigation, setScreen, updateCurrentOrder, updatePill } = props;
  const fetching = useRef<boolean>(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [branch, setBranch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [documentList, setDocumentList] = useState<IGetHardCopyDocumentsResult | undefined>(undefined);
  const [backPrompt, setBackPrompt] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<ISubmitHardCopyDocumentsResult | undefined>(undefined);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

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
    const response: IGetHardCopyDocumentsResponse = await getHardCopyDocuments(request, navigation, setLoading);
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
                      ? S3UrlGenerator.hardcopy(currentOrder!.clientId, currentOrder!.orderNumber, name, document!.title!, document!.type!)
                      : S3UrlGenerator.hardcopyAccount(
                          currentOrder!.clientId,
                          currentOrder!.orderNumber,
                          accountHolder,
                          document!.title!,
                          document!.type!,
                        );
                  const uploadedFile = await StorageUtil.put(document!.path!, url, document!.type!);
                  if (uploadedFile === undefined) {
                    throw new Error();
                  }
                  return {
                    title: document!.title!,
                    file: {
                      // base64: documents!.base64!,
                      name: document!.name!,
                      size: document!.size!,
                      type: document!.type!,
                      date: document!.date!,
                      path: document!.path!,
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
      setLoading(true);
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
        setPrompt(false);
        setLoading(false);
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
        const response: ISubmitHardCopyDocumentsResponse = await submitHardCopyDocuments(request, navigation, setLoading);
        if (response !== undefined) {
          const { data, error } = response;
          if (error === null && data !== null) {
            setSubmissionResult(data.result);
          } else {
            setPrompt(false);
            setLoading(false);
            setTimeout(() => {
              Alert.alert(error!.message);
            }, 100);
          }
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
      handleBack();
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
        ...documentList!,
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
  const completedLabel = pendingDocCount === 0 ? `All(${totalCount}) completed` : checkCompleted;
  const pendingLabel = pendingDocCount === totalCount ? `All(${pendingDocCount}) pending` : checkAllCompleted;
  const footer = `${UPLOAD_HARD_COPY_DOCUMENTS.LABEL_PHYSICAL_DOC_SUMMARY}: ${pendingLabel}${completedLabel}`;

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
                  <TextSpaceArea spaceToBottom={sh12} style={fs12BoldGray6} text={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_ACCOUNT} />
                  {isNotEmpty(documentList.account.principal) ? (
                    <Fragment>
                      <DocumentList
                        data={documentList.account.principal}
                        header={
                          isNotEmpty(documentList.account.joint) ? (
                            <AccountHeader
                              headerStyle={{ height: sh32, backgroundColor: colorBlue._3 }}
                              spaceToBottom={sh8}
                              subtitle={UPLOAD_DOCUMENTS.LABEL_PRINCIPAL}
                              subtitleStyle={fs10RegGray6}
                              title={currentOrder?.investorName.principal!}
                              titleStyle={fs12BoldBlack2}
                            />
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
                          <AccountHeader
                            headerStyle={{ height: sh32, backgroundColor: colorBlue._3 }}
                            spaceToBottom={sh8}
                            subtitle={UPLOAD_DOCUMENTS.LABEL_JOINT}
                            subtitleStyle={fs10RegGray6}
                            title={currentOrder?.investorName.joint!}
                            titleStyle={fs12BoldBlack2}
                          />
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
              <CustomSpacer space={sh32} />
              <CheckBox label={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_CHECKBOX} onPress={handleToggle} toggle={toggle} />
            </View>
          </Fragment>
        ) : (
          <Loading />
        )}
        <CustomSpacer space={sh124} />
      </DashboardLayout>
      {documentList !== undefined ? (
        <SelectionBanner
          continueDisabled={pendingDocCount > 0 || branch === "" || toggle === false}
          label={footer}
          submitOnPress={handleSubmit}
          labelSubmit={UPLOAD_DOCUMENTS.BUTTON_CONTINUE}
        />
      ) : null}
      <PromptModal
        backdropOpacity={loading ? 0.4 : undefined}
        handleContinue={handleBackToTransactions}
        isLoading={loading}
        illustration={LocalAssets.illustration.hardcopySuccess}
        label={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_SUBMITTED}
        labelContinue={UPLOAD_HARD_COPY_DOCUMENTS.BUTTON_DONE}
        title={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_RECEIVED}
        visible={prompt}
      />
      <DocumentsPopup
        handleBack={handleBackToTransactions}
        handleCancel={handleCancelPopup}
        handleConfirm={handleConfirmPopup}
        loading={loading}
        result={submissionResult}
        subtitle={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_PROCEED_TO_DOWNLOAD}
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

export const UploadHardCopy = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(UploadHardCopyComponent);
