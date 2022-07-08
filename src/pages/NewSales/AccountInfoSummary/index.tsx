import React, { Component, Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { FileViewer, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { ClientData } from "./dummyData";
import { InvestorProfilePage } from "./Profile";
import { NewSalesAccountSummary } from "./Summary";

const { NEW_SALES_SUMMARY } = Language.PAGE;

interface AccountInfoSummaryProps extends PersonalInfoStoreProps, NewSalesContentProps {}

const AccountInfoSummaryComponent: FunctionComponent<AccountInfoSummaryProps> = (props: AccountInfoSummaryProps) => {
  const [currentProfile, setCurrentProfile] = useState<TypeAccountHolder>("Principal");
  const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const handleContinue = () => {
    props.handleNextStep("OrderPreview");
  };

  let content = <NewSalesAccountSummary {...props} setCurrentProfile={setCurrentProfile} setFile={setFile} setPage={setPage} />;
  if (page === 1) {
    content = <InvestorProfilePage {...props} currentProfile={currentProfile} setPage={setPage} />;
  }
  const checkAccountType =
    ClientData.accountType === "Individual"
      ? NEW_SALES_SUMMARY.LABEL_ACCOUNT_SUMMARY_INDIVIDUAL
      : NEW_SALES_SUMMARY.LABEL_ACCOUNT_SUMMARY_JOINT;
  return (
    <Fragment>
      <View style={flexChild}>
        {content}
        <SelectionBanner
          label={checkAccountType}
          submitOnPress={handleContinue}
          cancelOnPress={() => {}}
          labelSubmit={NEW_SALES_SUMMARY.BUTTON_CONTINUE}
          labelCancel={NEW_SALES_SUMMARY.BUTTON_CANCEL}
        />
      </View>
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="base64" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};

export const AdditionalInfoSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(AccountInfoSummaryComponent);
