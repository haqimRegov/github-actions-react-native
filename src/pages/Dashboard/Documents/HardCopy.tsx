import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { Image, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../../assets/LocalAssets";
import { ActionButtons, AdvancedDropdown, BasicModal, CheckBox, CustomSpacer, RoundedButton } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_BRANCHES } from "../../../data/dictionary";
import { SAMPLE_DOCUMENTS_1 } from "../../../mocks";
import {
  borderBottomBlack21,
  centerHV,
  centerVertical,
  colorGray,
  colorWhite,
  flexRowCC,
  fs16SemiBoldBlack2,
  fs24BoldBlue2,
  fsAlignCenter,
  fullHW,
  px,
  sh16,
  sh17,
  sh174,
  sh24,
  sh32,
  sh50,
  sh56,
  sh96,
  sw164,
  sw218,
  sw24,
  sw453,
  sw48,
  sw5,
  sw565,
  sw8,
} from "../../../styles";
import { DashboardLayout } from "../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface UploadHardCopyProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  handleRoute: (route: string) => void;
}

export const UploadHardCopy = ({ navigation, handleRoute }: UploadHardCopyProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [branch, setBranch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [data, setData] = useState<IRelatedDocuments[]>();

  const handleBack = () => {
    handleRoute("");
  };

  const handleDone = () => {
    handleRoute("");
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // TODO remove data checking when using redux data
  const buttonDisabled =
    (data !== undefined && data.map(({ documents }) => documents.some(({ document }) => document === undefined)).includes(true)) ||
    !toggle ||
    branch === "";

  useEffect(() => {
    setData(SAMPLE_DOCUMENTS_1);
  }, []);

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw8,
    borderBottomRightRadius: sw8,
    height: sh96,
  };
  const modalContainer: ViewStyle = {
    backgroundColor: colorGray._5,
    borderRadius: sw5,
    width: sw565,
  };

  return (
    <Fragment>
      <DashboardLayout
        hideQuickActions={true}
        navigation={navigation}
        titleIconOnPress={handleBack}
        title={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_SUBMISSION}
        titleIcon="arrow-left">
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>{data !== undefined ? <DocumentList data={data} setData={setData} /> : null}</View>
        <CustomSpacer space={sh32} />
        <View style={borderBottomBlack21} />
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />
          <AdvancedDropdown
            handleChange={setBranch}
            items={DICTIONARY_BRANCHES}
            label={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_SUBMISSION_BRANCH}
            value={branch}
          />
          <CustomSpacer space={sh32} />
          <CheckBox label={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_CHECKBOX} onPress={handleToggle} toggle={toggle} />
          <CustomSpacer space={sh56} />
          <ActionButtons
            continueDisabled={buttonDisabled}
            labelContinue={UPLOAD_HARD_COPY_DOCUMENTS.BUTTON_SUBMIT}
            handleCancel={handleBack}
            handleContinue={handleSubmit}
          />
        </View>
        <CustomSpacer space={sh56} />
      </DashboardLayout>
      <BasicModal visible={showModal}>
        <View style={{ ...centerHV, ...fullHW }}>
          <View style={modalContainer}>
            <View style={{ ...centerVertical, ...px(sw48) }}>
              <CustomSpacer space={sh50} />
              <Image source={LocalAssets.illustration.uploadSuccess} style={{ height: sh174, width: sw164 }} />
              <CustomSpacer space={sh17} />
              <Text style={{ ...fs24BoldBlue2, ...fsAlignCenter, maxWidth: sw453 }}>
                {UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_SUBMITTED}
              </Text>
              <CustomSpacer space={sh16} />
              <Text style={{ ...fs16SemiBoldBlack2, ...fsAlignCenter }}>{UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_RECEIVED}</Text>
              <CustomSpacer space={sh56} />
            </View>
            <View style={buttonContainer}>
              <RoundedButton
                buttonStyle={{ width: sw218 }}
                onPress={handleDone}
                radius={sw24}
                text={UPLOAD_HARD_COPY_DOCUMENTS.BUTTON_DONE}
              />
            </View>
          </View>
        </View>
      </BasicModal>
    </Fragment>
  );
};
