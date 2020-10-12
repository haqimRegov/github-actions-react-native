import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { Image, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../../assets/LocalAssets";
import { BasicModal, CustomSpacer, RoundedButton, SelectionBanner, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { SAMPLE_PERSONAL_DOCUMENTS } from "../../../mocks";
import {
  borderBottomGray4,
  centerHV,
  colorGray,
  colorWhite,
  flexRowCC,
  fs12BoldBlack2,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlue2,
  fullHW,
  px,
  sh16,
  sh174,
  sh176,
  sh24,
  sh32,
  sh40,
  sh50,
  sh8,
  sh96,
  sw164,
  sw218,
  sw24,
  sw5,
  sw56,
  sw565,
  sw64,
  sw8,
} from "../../../styles";
import { DashboardLayout } from "../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_DOCUMENTS } = Language.PAGE;
const orderNo = "O-RI001";

interface UploadDocumentsProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  handleRoute: (route: string) => void;
}

export const UploadDocuments = ({ navigation, handleRoute }: UploadDocumentsProps) => {
  // TODO ask for confirmatino when removing existing upload
  // TODO get orderNo from home page
  // TODO get account type and account names
  const [data, setData] = useState<IPersonalDocuments | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleBack = () => {
    handleRoute("");
  };

  const handleDone = () => {
    setShowModal(false);
    handleRoute("");
  };

  const handleSubmitDone = () => {
    setShowModal(true);
  };

  const modalContainer: ViewStyle = {
    backgroundColor: colorGray._5,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw8,
    borderBottomRightRadius: sw8,
    height: sh96,
  };

  const modalBodyContainer: ViewStyle = { height: 384, ...px(sw56), alignItems: "center" };
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
        hideQuickActions={true}
        navigation={navigation}
        titleIconOnPress={handleBack}
        title={UPLOAD_DOCUMENTS.LABEL_UPLOAD_DOCUMENTS}
        titleIcon={"arrow-left"}>
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
      <BasicModal visible={showModal}>
        <View style={{ ...centerHV, ...fullHW }}>
          <View style={modalContainer}>
            <View style={modalBodyContainer}>
              <CustomSpacer space={sh50} />
              <Image source={LocalAssets.uploadSuccess.uploadSuccess} style={{ height: sh174, width: sw164 }} />
              <CustomSpacer space={sh40} />
              <Text style={fs24BoldBlue2}>{UPLOAD_DOCUMENTS.LABEL_UPLOAD_SUCCESSFUL}</Text>
              <CustomSpacer space={sh16} />
              <Text style={fs16SemiBoldBlack2}>{uploadedOrder} </Text>
            </View>
            <View style={buttonContainer}>
              <RoundedButton buttonStyle={{ width: sw218 }} onPress={handleDone} radius={sw24} text={UPLOAD_DOCUMENTS.BUTTON_DONE} />
            </View>
          </View>
        </View>
      </BasicModal>
    </Fragment>
  );
};
