import React, { Fragment } from "react";
import { Text, View, ViewStyle } from "react-native";

import { IStructuredData } from ".";
import {
  AddressInfo,
  Avatar,
  CustomFlexSpacer,
  CustomSpacer,
  IconText,
  LabeledTitle,
  RoundedButton,
  TextCard,
  TextSpaceArea,
} from "../../../../../components";
import { Language } from "../../../../../constants";
import {
  borderBottomGray2,
  flexRow,
  fs12BoldBlue1,
  fs16BoldBlack1,
  fs16BoldBlue1,
  fs18BoldGray6,
  fs36BoldWhite1,
  px,
  sh12,
  sh120,
  sh16,
  sh24,
  sh32,
  sh8,
  shadow16Blue112,
  sw1,
  sw120,
  sw16,
  sw20,
  sw24,
  sw240,
  sw40,
  sw64,
} from "../../../../../styles";

const { DASHBOARD_PROFILE, DECLARATION_SUMMARY } = Language.PAGE;

declare interface AccountDetailsContentProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  data: IStructuredData;
  handleViewId: () => void;
  idNumber: string;
  idType: TypeClientID;
  name: string;
  setAccountHolder?: (holder: TypeAccountHolder) => void;
}

export const AccountDetailsContent = ({
  accountHolder,
  accountType,
  data,
  handleViewId,
  idNumber,
  idType,
  name,
  setAccountHolder,
}: AccountDetailsContentProps) => {
  const {
    accountDocuments,
    accountSummaryDetails,
    contactDetails,
    declarations,
    employmentDetails,
    epfDetails,
    foreignBankDetails,
    localBankDetails,
    mailingAddress,
    permanentAddress,
    showJointToggle,
  } = data;

  const buttonStyle: ViewStyle = { ...px(sw16), borderWidth: sw1, height: sh24, width: "auto" };
  const holder = accountHolder === "Principal" ? DASHBOARD_PROFILE.LABEL_JOINT_ACCOUNT : DASHBOARD_PROFILE.LABEL_PRINCIPAL_ACCOUNT;
  const initials = name
    .split(" ")
    .filter((text) => text !== "")
    .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
    .join("");

  const labelOtherId = idType !== "Passport" ? `${idType} ID` : idType;
  const labelId = idType !== "NRIC" ? `${labelOtherId} Number` : idType;
  const handleAccountHolder = () => {
    if (setAccountHolder !== undefined) {
      setAccountHolder(accountHolder === "Principal" ? "Joint" : "Principal");
    }
  };

  return (
    <Fragment>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View style={{ height: sh120, width: sw120, ...shadow16Blue112 }}>
          <Avatar size={sw120} text={initials} textStyle={fs36BoldWhite1} type="client" />
        </View>
        <CustomSpacer isHorizontal={true} space={sw40} />
        <View style={{ width: sw240 }}>
          <LabeledTitle label={DASHBOARD_PROFILE.LABEL_FULL_NAME} title={name} titleStyle={fs16BoldBlack1} />
          <CustomSpacer space={sh16} />
          <LabeledTitle
            iconSize={sw20}
            label={labelId}
            onPress={handleViewId}
            spaceToIcon={sw20}
            title={idNumber}
            titleIcon="profile-card"
            titleStyle={fs16BoldBlack1}
          />
        </View>
        <CustomFlexSpacer />
        {accountType === "Joint" && showJointToggle !== false ? (
          <RoundedButton buttonStyle={buttonStyle} onPress={handleAccountHolder} secondary={true} text={holder} textStyle={fs12BoldBlue1} />
        ) : null}
      </View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_ACCOUNT_SUMMARY} />
        <TextCard data={accountSummaryDetails} spaceBetweenItem={sw64} />
      </View>
      {contactDetails.length !== 0 ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_CONTACT_DETAILS} />
            <TextCard data={contactDetails} spaceBetweenItem={sw64} />
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_ADDRESS_INFO} />
        <View style={flexRow}>
          <AddressInfo data={permanentAddress} labelAddress={DASHBOARD_PROFILE.LABEL_PERMANENT_ADDRESS} />
          <CustomSpacer isHorizontal={true} space={sw64} />
          <AddressInfo data={mailingAddress} labelAddress={DASHBOARD_PROFILE.LABEL_CORRESPONDENCE_ADDRESS} />
        </View>
      </View>
      {epfDetails.length !== 0 && accountHolder === "Principal" ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_EPF_DETAILS} />
            <TextCard data={epfDetails} spaceBetweenItem={sw64} />
          </View>
        </Fragment>
      ) : null}
      {employmentDetails.length !== 0 ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_EMPLOYMENT_INFO} />
            <TextCard data={employmentDetails} spaceBetweenItem={sw64} />
          </View>
        </Fragment>
      ) : null}
      {accountHolder === "Principal" && (localBankDetails.length > 0 || foreignBankDetails.length > 0) ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_BANK_SUMMARY} />
            {localBankDetails.map((bank, numberIndex) => {
              const label = `${DASHBOARD_PROFILE.SUBTITLE_LOCAL_BANK} ${numberIndex + 1}`;
              return (
                <Fragment key={numberIndex}>
                  <IconText iconSize={sh24} name="bank" spaceBetween={sw16} text={label} textStyle={fs16BoldBlue1} />
                  <CustomSpacer space={sh16} />
                  <View style={borderBottomGray2} />
                  <CustomSpacer space={sh12} />
                  <TextCard data={bank} spaceBetweenItem={sw64} />
                </Fragment>
              );
            })}
            <CustomSpacer space={sh16} />
            {foreignBankDetails.map((bank, numberIndex) => {
              const label = `${DASHBOARD_PROFILE.SUBTITLE_FOREIGN_BANK} ${numberIndex + 1}`;
              return (
                <Fragment key={numberIndex}>
                  <IconText iconSize={sh24} name="bank" spaceBetween={sw16} text={label} textStyle={fs16BoldBlue1} />
                  <CustomSpacer space={sh16} />
                  <View style={borderBottomGray2} />
                  <CustomSpacer space={sh12} />
                  <TextCard data={bank} spaceBetweenItem={sw64} />
                </Fragment>
              );
            })}
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldGray6} text={DECLARATION_SUMMARY.TITLE_FATCA} />
        <TextCard data={declarations.fatca} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldGray6} text={DECLARATION_SUMMARY.TITLE_CRS} />
        <TextCard data={declarations.crs} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      {/* <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldGray6} text={DECLARATION_SUMMARY.TITLE_FEA} />
        <TextCard data={declarations.fea} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} /> */}
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <Text style={fs18BoldGray6}>{DASHBOARD_PROFILE.TITLE_UPLOAD_DOCUMENTS}</Text>
        <CustomSpacer space={sh16} />
        <TextCard data={accountDocuments} spaceBetweenItem={sw64} />
        <CustomSpacer space={sh8} />
      </View>
    </Fragment>
  );
};
