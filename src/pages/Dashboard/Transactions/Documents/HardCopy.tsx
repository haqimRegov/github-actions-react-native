import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import {
  AccountHeader,
  ActionButtons,
  CheckBox,
  CustomFlexSpacer,
  CustomSpacer,
  Loading,
  NewDropdown,
  PromptModal,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants";
import { ERRORS } from "../../../../data/dictionary";
import { S3UrlGenerator, StorageUtil } from "../../../../integrations";
import { getHardCopyDocuments, submitHardCopyDocuments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  borderBottomGray2,
  colorBlue,
  flexChild,
  fs10RegGray6,
  fs12BoldBlack2,
  fs12BoldGray6,
  px,
  sh24,
  sh32,
  sh56,
  sh8,
  sw24,
} from "../../../../styles";
import { AlertDialog, isNotEmpty } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_DOCUMENTS, UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface UploadHardCopyProps extends TransactionsStoreProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
}

const UploadHardCopyComponent: FunctionComponent<UploadHardCopyProps> = (props: UploadHardCopyProps) => {
  const { currentOrder, navigation, setScreen, updateCurrentOrder } = props;
  const fetching = useRef<boolean>(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [branch, setBranch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [documentList, setDocumentList] = useState<IGetHardCopyDocumentsResult | undefined>(undefined);

  const handleBackToTransactions = () => {
    setScreen("Transactions");
    updateCurrentOrder(undefined);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const buttonDisabled =
    (isNotEmpty(documentList) &&
      isNotEmpty(documentList?.documents) &&
      documentList!.documents
        .map(({ docs }) => docs.some((doc) => doc === undefined || doc.base64 === undefined || doc.base64 === null))
        .includes(true)) ||
    toggle === false ||
    branch === "";

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
            documentArray.map(async (documents) => {
              try {
                const url =
                  accountHolder === undefined
                    ? S3UrlGenerator.hardcopy(currentOrder!.clientId, currentOrder!.orderNumber, name, documents!.title!, documents!.type!)
                    : S3UrlGenerator.hardcopyAccount(
                        currentOrder!.clientId,
                        currentOrder!.orderNumber,
                        accountHolder,
                        documents!.title!,
                        documents!.type!,
                      );
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
                fetching.current = true;
                return undefined;
              }
            }),
          ),
          name: name,
        };
      }),
    );
    return personalDocsWithKeys;
  };

  const handleSubmit = async () => {
    if (fetching.current === true) {
      fetching.current = false;
    }
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const findBranch = documentList!.branchList.filter(({ name }: IHardCopyBranchList) => name === branch);
      const branchId = findBranch.length > 0 ? findBranch[0].branchId.toString() : "";
      const principalDocs = isNotEmpty(documentList?.account.principal)
        ? await handleUpload(documentList?.account.principal!, "Principal")
        : [];
      const jointDocs = isNotEmpty(documentList?.account.joint) ? await handleUpload(documentList?.account.joint!, "Joint") : [];
      const fundDocs: ISubmitHardCopyDocuments[] =
        isNotEmpty(documentList?.documents) && documentList!.documents.length > 0
          ? ((await handleUpload(documentList?.documents!)) as ISubmitHardCopyDocuments[])
          : [];
      const checkJoint = jointDocs.length > 0 ? { joint: jointDocs } : {};
      const checkAccount = isNotEmpty(documentList?.account)
        ? {
            account: {
              principal: principalDocs,
              ...checkJoint,
            },
          }
        : {};

      const checkPrincipalDocsWithKeys = principalDocs.length > 0 ? principalDocs.findIndex(({ docs }) => docs.includes(undefined)) : -1;
      const checkJointDocsWithKeys = jointDocs.length > 0 ? jointDocs.findIndex(({ docs }) => docs.includes(undefined)) : -1;
      const checkFundDocsWithKeys =
        fundDocs.length > 0 ? fundDocs.findIndex(({ docs }) => docs === undefined || docs.includes(undefined)) : -1;
      if (checkPrincipalDocsWithKeys !== -1 || checkJointDocsWithKeys !== -1 || checkFundDocsWithKeys !== -1) {
        setPrompt(false);
        setLoading(false);
        setTimeout(() => {
          Alert.alert(ERRORS.storage.message);
        }, 100);
      } else {
        const request: ISubmitHardCopyDocumentsRequest = {
          orderNumber: currentOrder!.orderNumber,
          branchId: branchId,
          hardcopy: fundDocs.length > 0 ? fundDocs : [],
          ...checkAccount,
        };
        const response: ISubmitHardCopyDocumentsResponse = await submitHardCopyDocuments(request, navigation, setLoading);
        fetching.current = false;
        setLoading(false);
        if (response !== undefined) {
          const { data, error } = response;
          if (error === null && data !== null) {
            if (data.result.status === true) {
              setLoading(false);
              setPrompt(true);
            }
          }
        }
      }
    }
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

  return (
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
        titleIconOnPress={handleBackToTransactions}
        title={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_SUBMISSION}
        titleIcon="arrow-left">
        <CustomSpacer space={sh24} />
        {documentList !== undefined && fetching.current === false ? (
          <Fragment>
            <View style={px(sw24)}>
              <TextSpaceArea spaceToBottom={sh8} style={fs12BoldGray6} text={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_ACCOUNT} />
              <DocumentList
                data={documentList.account.principal}
                header={
                  isNotEmpty(documentList.account.joint) ? (
                    <AccountHeader
                      headerStyle={{ height: sh32, backgroundColor: colorBlue._3 }}
                      titleStyle={fs12BoldBlack2}
                      subtitle={UPLOAD_DOCUMENTS.LABEL_PRINCIPAL}
                      title={currentOrder?.investorName.principal!}
                      subtitleStyle={fs10RegGray6}
                    />
                  ) : (
                    <View />
                  )
                }
                headerSpace={false}
                setData={handleSetPrincipalDocument}
              />
              {isNotEmpty(documentList.account.joint) ? (
                <Fragment>
                  <CustomSpacer space={sh24} />
                  <DocumentList
                    data={documentList.account.joint!}
                    setData={handleSetJointDocument}
                    header={
                      <AccountHeader
                        headerStyle={{ height: sh32, backgroundColor: colorBlue._3 }}
                        titleStyle={fs12BoldBlack2}
                        subtitle={UPLOAD_DOCUMENTS.LABEL_JOINT}
                        title={currentOrder?.investorName.joint!}
                        subtitleStyle={fs10RegGray6}
                      />
                    }
                  />
                </Fragment>
              ) : null}
              {isNotEmpty(documentList.documents) && documentList.documents.length > 0 ? (
                <Fragment>
                  <CustomSpacer space={sh32} />
                  <DocumentList data={documentList.documents} setData={handleSetDocument} />
                </Fragment>
              ) : null}
            </View>
            <CustomSpacer space={sh32} />
            <View style={borderBottomGray2} />
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
              <CustomFlexSpacer />
              <CustomSpacer space={sh56} />
              <ActionButtons
                continueDisabled={buttonDisabled}
                labelContinue={UPLOAD_HARD_COPY_DOCUMENTS.BUTTON_SUBMIT}
                handleCancel={handleBackToTransactions}
                handleContinue={handleSubmit}
              />
            </View>
          </Fragment>
        ) : (
          <Loading />
        )}
        <CustomSpacer space={sh56} />
      </DashboardLayout>
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
    </Fragment>
  );
};

export const UploadHardCopy = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(UploadHardCopyComponent);
