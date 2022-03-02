import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { ActionButtons, CheckBox, CustomFlexSpacer, CustomSpacer, Loading, NewDropdown, PromptModal } from "../../../../components";
import { Language } from "../../../../constants";
import { S3UrlGenerator, StorageUtil } from "../../../../integrations";
import { getHardCopyDocuments, submitHardCopyDocuments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import { borderBottomGray2, flexChild, px, sh24, sh32, sh56, sw24 } from "../../../../styles";
import { AlertDialog } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

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
    (documentList !== undefined &&
      documentList.documents
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

  const handleUpload = async () => {
    const personalDocsWithKeys = await Promise.all(
      documentList!.documents.map(async ({ docs, name }: ISoftCopyDocument) => {
        return {
          docs: await Promise.all(
            docs.map(async (documents) => {
              try {
                const url = S3UrlGenerator.hardcopy(
                  currentOrder!.clientId,
                  currentOrder!.orderNumber,
                  name,
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
                // console.log("Error in Uploading", error);
                AlertDialog(error, () => setLoading(false));
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

  const handleSubmit = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      setPrompt(true);
      const findBranch = documentList!.branchList.filter(({ name }: IHardCopyBranchList) => name === branch);
      const branchId = findBranch.length > 0 ? findBranch[0].branchId.toString() : "";
      const documentWithKeys = await handleUpload();

      const request: ISubmitHardCopyDocumentsRequest = {
        orderNumber: currentOrder!.orderNumber,
        branchId: branchId,
        hardcopy: documentWithKeys,
      };
      const response: ISubmitHardCopyDocumentsResponse = await submitHardCopyDocuments(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          if (data.result.status === true) {
            setLoading(false);
          }
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
  };

  const physicalDocuments =
    documentList && documentList.documents
      ? documentList.documents
          .map(({ docs, name }) => {
            return {
              docs: docs.filter((documents) => documents?.url === null || documents?.url === undefined || "url" in documents === false),
              name: name,
            };
          })
          .filter(({ docs }) => docs.length > 0)
      : [];

  const branchList: TypeLabelValue[] =
    documentList && documentList.branchList ? documentList.branchList.map(({ name }) => ({ label: name, value: name })) : [];

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
        {documentList !== undefined ? (
          <Fragment>
            <View style={px(sw24)}>
              <DocumentList data={physicalDocuments} setData={handleSetDocument} />
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
