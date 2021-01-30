import React, { Fragment, useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { ActionButtons, AdvancedDropdown, CheckBox, CustomFlexSpacer, CustomSpacer, PromptModal } from "../../../../components";
import { Language } from "../../../../constants";
import { getHardCopyDocuments, submitHardCopyDocuments } from "../../../../network-actions";
import { borderBottomBlack21, flexChild, px, sh24, sh32, sh56, sw24 } from "../../../../styles";
import { AlertDialog } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface UploadHardCopyProps {
  navigation: IStackNavigationProp;
  setScreen: (route: TransactionsPageType) => void;
  orderNumber: string;
}

export const UploadHardCopy = (props: UploadHardCopyProps) => {
  const { setScreen, orderNumber } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [branch, setBranch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [documentList, setDocumentList] = useState<IGetHardCopyDocumentsResult | undefined>(undefined);

  const handleBack = () => {
    setScreen("Transactions");
  };

  const handleDone = () => {
    setScreen("Transactions");
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
    const request: IGetHardCopyDocumentsRequest = { orderNumber: orderNumber };
    // eslint-disable-next-line no-console
    console.log("getHardCopyDocuments request", request);
    const response: IGetHardCopyDocumentsResponse = await getHardCopyDocuments(request);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        setDocumentList(data.result);
      }
      if (error !== null) {
        setTimeout(() => {
          AlertDialog(error.message, handleBack);
        }, 100);
      }
    }
  };

  const handleSubmit = async () => {
    const findBranch = documentList!.branchList.filter(({ name }: IHardCopyBranchList) => name === branch);
    const branchId = findBranch.length > 0 ? findBranch[0].branchId.toString() : "";
    const request: ISubmitHardCopyDocumentsRequest = {
      orderNumber: orderNumber,
      branchId: branchId,
      hardcopy: documentList!.documents.map(({ docs, name }) => {
        return {
          docs: docs.map((documents) => ({
            title: documents!.title!,
            file: {
              base64: documents!.base64!,
              name: documents!.name!,
              size: documents!.size!,
              type: documents!.type!,
              date: documents!.date!,
              path: documents!.path!,
            },
          })),
          name: name,
        };
      }),
    };
    // eslint-disable-next-line no-console
    console.log("submitHardCopyDocuments request", request);
    const response: ISubmitHardCopyDocumentsResponse = await submitHardCopyDocuments(request);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        if (data.result.status === true) {
          setShowModal(true);
        }
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
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
        titleIconOnPress={handleBack}
        title={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_SUBMISSION}
        titleIcon="arrow-left">
        <CustomSpacer space={sh24} />
        {documentList !== undefined ? (
          <Fragment>
            <View style={px(sw24)}>
              <DocumentList data={physicalDocuments} setData={handleSetDocument} />
            </View>
            <CustomSpacer space={sh32} />
            <View style={borderBottomBlack21} />
            <View style={{ ...flexChild, ...px(sw24) }}>
              <CustomSpacer space={sh24} />
              <AdvancedDropdown
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
                handleCancel={handleBack}
                handleContinue={handleSubmit}
              />
            </View>
          </Fragment>
        ) : null}
        <CustomSpacer space={sh56} />
      </DashboardLayout>
      <PromptModal
        handleContinue={handleDone}
        illustration={LocalAssets.illustration.hardcopySuccess}
        label={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_SUBMITTED}
        labelContinue={UPLOAD_HARD_COPY_DOCUMENTS.BUTTON_DONE}
        title={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_RECEIVED}
        visible={showModal}
      />
    </Fragment>
  );
};
