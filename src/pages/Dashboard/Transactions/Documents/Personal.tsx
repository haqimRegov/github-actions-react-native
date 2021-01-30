import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { LocalAssets } from "../../../../assets/LocalAssets";
import { CustomSpacer, PromptModal, SelectionBanner, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { getSoftCopyDocuments, submitSoftCopyDocuments } from "../../../../network-actions";
import { borderBottomGray4, fs12BoldBlack2, fs16RegBlack2, px, sh176, sh24, sh32, sh8, sw24, sw64 } from "../../../../styles";
import { AlertDialog } from "../../../../utils";
import { DashboardLayout } from "../../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_DOCUMENTS } = Language.PAGE;

interface UploadDocumentsProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  setScreen: (route: TransactionsPageType) => void;
  orderNumber: string;
}

export const UploadDocuments = (props: UploadDocumentsProps) => {
  const { setScreen, orderNumber } = props;
  const [documentList, setDocumentList] = useState<IGetSoftCopyDocumentsResult | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleBack = () => {
    setScreen("Transactions");
  };

  const handleDone = () => {
    setSuccessMessage("");
    setScreen("Transactions");
  };

  const uploadedOrder = `${UPLOAD_DOCUMENTS.LABEL_UPLOADED_ORDER} ${orderNumber} ${UPLOAD_DOCUMENTS.LABEL_UPLOAD_SUCCESSFUL}`;

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
      orderNumber: orderNumber,
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
          AlertDialog(error.message, handleBack);
        }, 100);
      }
    }
  };

  const handleSubmit = async () => {
    const request: ISubmitSoftCopyDocumentsRequest = {
      orderNumber: orderNumber,
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
          setSuccessMessage(data.result.message);
        }
      }
      if (error !== null) {
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
        titleIconOnPress={handleBack}
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

                <DocumentList data={pendingDocumentsPrincipal} setData={handlePrincipalData} />
              </View>
            )}
            {documentList.joint === undefined || documentList.joint === null ? null : (
              <Fragment>
                <CustomSpacer space={sh32} />
                <View style={borderBottomGray4} />
                <CustomSpacer space={sh32} />
                <View style={px(sw24)}>
                  <TextSpaceArea spaceToBottom={sh8} style={fs12BoldBlack2} text={"Joint Holder"} />
                  <DocumentList data={pendingDocumentsJoint} setData={handleJointData} />
                </View>
              </Fragment>
            )}
          </Fragment>
        ) : null}
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
        handleContinue={handleDone}
        illustration={LocalAssets.illustration.orderReceived}
        label={uploadedOrder}
        labelContinue={UPLOAD_DOCUMENTS.BUTTON_DONE}
        visible={successMessage !== ""}
      />
    </Fragment>
  );
};
