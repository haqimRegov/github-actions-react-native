import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { CustomSpacer, PromptModal, SelectionBanner, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { getSoftCopyDocuments, submitSoftCopyDocuments } from "../../../../network-actions";
import { TransactionsMapDispatchToProps, TransactionsMapStateToProps, TransactionsStoreProps } from "../../../../store";
import {
  borderBottomGray4,
  centerHV,
  colorGray,
  flexChild,
  fs12BoldBlack2,
  fs16RegBlack2,
  px,
  sh176,
  sh24,
  sh32,
  sh8,
  sw24,
  sw64,
} from "../../../../styles";
import { AlertDialog } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_DOCUMENTS } = Language.PAGE;

interface UploadDocumentsProps extends TransactionsStoreProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  setScreen: (route: TransactionsPageType) => void;
}

const UploadDocumentsComponent: FunctionComponent<UploadDocumentsProps> = (props: UploadDocumentsProps) => {
  const { currentOrder, setScreen, updateCurrentOrder } = props;
  const [documentList, setDocumentList] = useState<IGetSoftCopyDocumentsResult | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<boolean>(false);

  const handleBackToTransactions = () => {
    setScreen("Transactions");
    updateCurrentOrder(undefined);
  };

  const uploadedOrder = `${UPLOAD_DOCUMENTS.LABEL_UPLOADED_ORDER} ${currentOrder!.orderNumber} ${UPLOAD_DOCUMENTS.LABEL_UPLOAD_SUCCESSFUL}`;

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
  const footer =
    pendingDocCount === 0 ? UPLOAD_DOCUMENTS.LABEL_DOCUMENT_COMPLETED : `${pendingDocCount} ${UPLOAD_DOCUMENTS.LABEL_DOCUMENT_PENDING}`;

  const handlePrincipalData = (value: ISoftCopyDocument[]) => {
    setDocumentList({ ...documentList!, principal: value });
  };

  const handleJointData = (value: ISoftCopyDocument[]) => {
    setDocumentList({ ...documentList!, joint: value });
  };

  const handleFetch = async () => {
    const req: IGetSoftCopyDocumentsRequest = {
      orderNumber: currentOrder!.orderNumber,
    };
    // eslint-disable-next-line no-console
    console.log("getSoftCopyDocuments", req);
    const response: IGetSoftCopyDocumentsResponse = await getSoftCopyDocuments(req);
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
    // eslint-disable-next-line no-console
    console.log("submitSoftCopyDocuments", request);
    const response: ISubmitSoftCopyDocumentsResponse = await submitSoftCopyDocuments(request);
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
        <View style={px(sw64)}>
          <TextSpaceArea spaceToBottom={sh24} spaceToTop={sh8} style={fs16RegBlack2} text={UPLOAD_DOCUMENTS.LABEL_SUBTITLE} />
        </View>
        {documentList !== undefined ? (
          <Fragment>
            {documentList.principal === undefined || documentList.principal === null ? null : (
              <View style={px(sw24)}>
                {documentList.joint ? <TextSpaceArea spaceToBottom={sh8} style={fs12BoldBlack2} text={"Principal Holder"} /> : null}

                <DocumentList data={documentsPrincipal} setData={handlePrincipalData} />
              </View>
            )}
            {documentList.joint === undefined || documentList.joint === null ? null : (
              <Fragment>
                <CustomSpacer space={sh32} />
                <View style={borderBottomGray4} />
                <CustomSpacer space={sh32} />
                <View style={px(sw24)}>
                  <TextSpaceArea spaceToBottom={sh8} style={fs12BoldBlack2} text={"Joint Holder"} />
                  <DocumentList data={documentsJoint} setData={handleJointData} />
                </View>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <View style={{ ...centerHV, ...flexChild }}>
            <ActivityIndicator color={colorGray._7} size="small" />
          </View>
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
        handleContinue={handleBackToTransactions}
        illustration={LocalAssets.illustration.orderReceived}
        isLoading={loading}
        label={uploadedOrder}
        labelContinue={UPLOAD_DOCUMENTS.BUTTON_DONE}
        visible={prompt}
      />
    </Fragment>
  );
};

export const UploadDocuments = connect(TransactionsMapStateToProps, TransactionsMapDispatchToProps)(UploadDocumentsComponent);
