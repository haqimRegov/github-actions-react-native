import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { View } from "react-native";

import { LocalAssets } from "../../../assets/LocalAssets";
import { ActionButtons, AdvancedDropdown, CheckBox, CustomSpacer, PromptModal } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_BRANCHES } from "../../../data/dictionary";
import { SAMPLE_DOCUMENTS_1 } from "../../../mocks";
import { borderBottomBlack21, px, sh24, sh32, sh56, sw24 } from "../../../styles";
import { DashboardLayout } from "../DashboardLayout";
import { DocumentList } from "./DocumentList";

const { UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface UploadHardCopyProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  handleRoute: (route: string) => void;
}

export const UploadHardCopy = (props: UploadHardCopyProps) => {
  const { handleRoute } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [branch, setBranch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [data, setData] = useState<IRelatedDocuments[]>();

  const handleBack = () => {
    handleRoute("Transactions");
  };

  const handleDone = () => {
    handleRoute("Transactions");
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

  return (
    <Fragment>
      <DashboardLayout
        {...props}
        hideQuickActions={true}
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
      <PromptModal
        handleContinue={handleDone}
        illustration={LocalAssets.illustration.submissionSummary}
        label={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_SUBMITTED}
        labelContinue={UPLOAD_HARD_COPY_DOCUMENTS.BUTTON_DONE}
        title={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HARD_COPY_RECEIVED}
        visible={showModal}
      />
    </Fragment>
  );
};
