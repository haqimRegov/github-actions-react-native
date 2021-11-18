import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/images/LocalAssets";
import { CustomSpacer, Loading, PromptModal, SelectionBanner, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { getSoftCopyDocuments, submitSoftCopyDocuments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import { borderBottomGray2, fs12BoldGray6, fs16SemiBoldGray6, px, sh176, sh24, sh32, sh8, sw24, sw68 } from "../../../../styles";
import { AlertDialog } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_DOCUMENTS } = Language.PAGE;

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

  const handleBackToTransactions = () => {
    setScreen("Transactions");
    updateCurrentOrder(undefined);
  };

  const pendingDocumentsPrincipal =
    documentList && documentList.principal
      ? documentList.principal
          .map(({ docs, name }) => {
            return {
              docs: docs.filter((documents) => documents?.url === null || documents?.url === undefined || "url" in documents === false),
              name: name,
            };
          })
          .filter(({ docs }) => docs.length > 0)
      : [];

  const documentsPrincipal =
    documentList && documentList.principal && (currentOrder!.status === "BR - Rerouted" || currentOrder!.status === "HQ - Rerouted")
      ? documentList.principal
      : pendingDocumentsPrincipal;

  const pendingDocumentsJoint =
    documentList && documentList.joint
      ? documentList.joint
          .map(({ docs, name }) => {
            return {
              docs: docs.filter((documents) => documents?.url === null || documents?.url === undefined || "url" in documents === false),
              name: name,
            };
          })
          .filter(({ docs }) => docs.length > 0)
      : [];

  const documentsJoint =
    documentList && documentList.joint && (currentOrder!.status === "BR - Rerouted" || currentOrder!.status === "HQ - Rerouted")
      ? documentList.joint
      : pendingDocumentsJoint;

  const principalDocsCount = pendingDocumentsPrincipal
    .map(({ docs }) => docs)
    .flat()
    .filter((docs) => docs !== undefined && "base64" in docs === false).length;
  const jointDocsCount = pendingDocumentsJoint
    .map(({ docs }) => docs)
    .flat()
    .filter((docs) => docs !== undefined && "base64" in docs === false).length;

  const pendingDocCount = principalDocsCount + jointDocsCount;
  const footer = pendingDocCount === 0 ? UPLOAD_DOCUMENTS.LABEL_DOCUMENT_COMPLETED : UPLOAD_DOCUMENTS.LABEL_DOCUMENT_PENDING;

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

  const handleSubmit = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      setPrompt(true);
      const request: ISubmitSoftCopyDocumentsRequest = {
        orderNumber: currentOrder!.orderNumber,
        principal: pendingDocumentsPrincipal.map(({ docs, name }) => {
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
        joint: pendingDocumentsJoint.map(({ docs, name }) => {
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
      const response: ISubmitSoftCopyDocumentsResponse = await submitSoftCopyDocuments(request, navigation, setLoading);
      fetching.current = false;
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
                  <TextSpaceArea
                    spaceToBottom={sh8}
                    style={{ ...fs12BoldGray6, lineHeight: sh24 }}
                    text={UPLOAD_DOCUMENTS.LABEL_PRINCIPAL}
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
                    <TextSpaceArea spaceToBottom={sh8} style={{ ...fs12BoldGray6, lineHeight: sh24 }} text={UPLOAD_DOCUMENTS.LABEL_JOINT} />
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
      <PromptModal
        backdropOpacity={loading ? 0.4 : undefined}
        handleContinue={handleBackToTransactions}
        illustration={LocalAssets.illustration.orderReceived}
        isLoading={loading}
        label={UPLOAD_DOCUMENTS.LABEL_UPLOAD_SUCCESSFUL}
        labelContinue={UPLOAD_DOCUMENTS.BUTTON_DONE}
        visible={prompt}
      />
    </Fragment>
  );
};

export const UploadDocuments = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(UploadDocumentsComponent);
