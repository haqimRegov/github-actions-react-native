import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { View } from "react-native";

import { LocalAssets } from "../../../assets/LocalAssets";
import { CustomSpacer, PromptModal, SelectionBanner, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { SAMPLE_PERSONAL_DOCUMENTS } from "../../../mocks";
import { borderBottomGray4, fs12BoldBlack2, fs16RegBlack2, px, sh176, sh24, sh32, sh8, sw24, sw64 } from "../../../styles";
import { DashboardLayout } from "../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_DOCUMENTS } = Language.PAGE;
const orderNo = "O-RI001";

interface UploadDocumentsProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  handleRoute: (route: string) => void;
}

export const UploadDocuments = (props: UploadDocumentsProps) => {
  const { handleRoute } = props;
  // TODO ask for confirmatino when removing existing upload
  // TODO get orderNo from home page
  // TODO get account type and account names
  const [data, setData] = useState<IPersonalDocuments | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleBack = () => {
    handleRoute("Transactions");
  };

  const handleDone = () => {
    setShowModal(false);
    handleRoute("Transactions");
  };

  const handleSubmitDone = () => {
    setShowModal(true);
  };

  const uploadedOrder = `${UPLOAD_DOCUMENTS.LABEL_UPLOADED_ORDER} ${orderNo}`;
  const principalPendingDocs =
    data !== undefined && data.principal! !== undefined
      ? data
          .principal!.filter((relatedDocuments) => relatedDocuments)
          .map(({ documents }) => documents)
          .flat()
          .filter(({ document }) => document === undefined).length
      : 0;
  const jointPendingDocs =
    data !== undefined && data.joint !== undefined
      ? data
          .joint!.filter((relatedDocuments) => relatedDocuments)
          .map(({ documents }) => documents)
          .flat()
          .filter(({ document }) => document === undefined).length
      : 0;

  const pendingDoc = principalPendingDocs + jointPendingDocs;
  const footer = pendingDoc === 0 ? UPLOAD_DOCUMENTS.LABEL_DOCUMENT_COMPLETED : `${pendingDoc} ${UPLOAD_DOCUMENTS.LABEL_DOCUMENT_PENDING}`;

  useEffect(() => {
    setData(SAMPLE_PERSONAL_DOCUMENTS);
  }, []);

  const handlePrincipalData = (value: IRelatedDocuments[]) => {
    setData({ ...data, principal: value });
  };

  const handleJointData = (value: IRelatedDocuments[]) => {
    setData({ ...data, joint: value });
  };

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
        {data?.principal === undefined ? null : (
          <View style={px(sw24)}>
            {data?.joint === undefined ? null : <TextSpaceArea spaceToBottom={sh8} style={fs12BoldBlack2} text={"Edgar Constantine"} />}
            <DocumentList data={data?.principal!} setData={handlePrincipalData} />
          </View>
        )}
        {data?.joint === undefined ? null : (
          <Fragment>
            <CustomSpacer space={sh32} />
            <View style={borderBottomGray4} />
            <CustomSpacer space={sh32} />
            <View style={px(sw24)}>
              <TextSpaceArea spaceToBottom={sh8} style={fs12BoldBlack2} text={"Jane Constantine"} />
              <DocumentList data={data?.joint} setData={handleJointData} />
            </View>
          </Fragment>
        )}
        <CustomSpacer space={sh176} />
      </DashboardLayout>
      <SelectionBanner
        continueDisabled={pendingDoc > 0}
        label={footer}
        submitOnPress={handleSubmitDone}
        labelSubmit={UPLOAD_DOCUMENTS.BUTTON_DONE}
      />
      <PromptModal
        handleContinue={handleDone}
        illustration={LocalAssets.illustration.submissionSummary}
        label={UPLOAD_DOCUMENTS.LABEL_UPLOAD_SUCCESSFUL}
        labelContinue={UPLOAD_DOCUMENTS.BUTTON_DONE}
        title={uploadedOrder}
        visible={showModal}
      />
    </Fragment>
  );
};
