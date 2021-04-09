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
  borderBottomGray4,
  colorBlue,
  customShadow,
  flexRow,
  fs12SemiBoldBlack2,
  fs16BoldBlack2,
  fs16BoldBlue2,
  fs18BoldBlack2,
  fs40BoldWhite1,
  px,
  sh12,
  sh120,
  sh16,
  sh24,
  sh32,
  sh8,
  sw120,
  sw16,
  sw20,
  sw24,
  sw240,
  sw40,
  sw5,
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
  setAccountHolder: (holder: TypeAccountHolder) => void;
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
    accountSummaryDetails,
    contactDetails,
    declarations,
    employmentDetails,
    epfDetails,
    foreignBankDetails,
    localBankDetails,
    mailingAddress,
    permanentAddress,
    accountDocuments,
  } = data;

  const buttonStyle: ViewStyle = { ...px(sw16), height: sh24, width: "auto" };
  const holder = accountHolder === "Principal" ? DASHBOARD_PROFILE.LABEL_JOINT_ACCOUNT : DASHBOARD_PROFILE.LABEL_PRINCIPAL_ACCOUNT;
  const initials = name
    .split(" ")
    .filter((text) => text !== "")
    .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
    .join("");

  const labelOtherId = idType !== "Passport" ? `${idType} ID` : idType;
  const labelId = idType !== "NRIC" ? `${labelOtherId} Number` : idType;
  const handleAccountHolder = () => {
    setAccountHolder(accountHolder === "Principal" ? "Joint" : "Principal");
  };

  return (
    <Fragment>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View style={{ height: sh120, width: sw120, ...customShadow(colorBlue._5, 0, 0, 0.4, sw5) }}>
          <Avatar size={sw120} text={initials} textStyle={fs40BoldWhite1} type="client" />
        </View>
        <CustomSpacer isHorizontal={true} space={sw40} />
        <View style={{ width: sw240 }}>
          <LabeledTitle
            label={DASHBOARD_PROFILE.LABEL_FULL_NAME}
            labelStyle={{ lineHeight: sh16 }}
            spaceToLabel={sh8}
            title={name}
            titleStyle={fs16BoldBlack2}
          />
          <CustomSpacer space={sh16} />
          <LabeledTitle
            iconSize={sw20}
            label={labelId}
            labelStyle={{ lineHeight: sh16 }}
            onPress={handleViewId}
            spaceToIcon={sw20}
            spaceToLabel={sh8}
            title={idNumber}
            titleIcon="profile-card"
            titleStyle={fs16BoldBlack2}
          />
        </View>
        <CustomFlexSpacer />
        {accountType === "Joint" ? (
          <RoundedButton
            buttonStyle={buttonStyle}
            onPress={handleAccountHolder}
            secondary={true}
            text={holder}
            textStyle={fs12SemiBoldBlack2}
          />
        ) : null}
      </View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray4} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_PROFILE.TITLE_ACCOUNT_SUMMARY} />
        <TextCard data={accountSummaryDetails} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray4} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_PROFILE.TITLE_CONTACT_DETAILS} />
        <TextCard data={contactDetails} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray4} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_PROFILE.TITLE_ADDRESS_INFO} />
        <View style={flexRow}>
          <AddressInfo data={permanentAddress} labelAddress={DASHBOARD_PROFILE.LABEL_PERMANENT_ADDRESS} />
          <CustomSpacer isHorizontal={true} space={sw64} />
          <AddressInfo data={mailingAddress} labelAddress={DASHBOARD_PROFILE.LABEL_CORRESPONDENCE_ADDRESS} />
        </View>
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray4} />
      <CustomSpacer space={sh32} />
      {epfDetails.length !== 0 && accountHolder === "Principal" ? (
        <Fragment>
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_PROFILE.TITLE_EPF_DETAILS} />
            <TextCard data={epfDetails} spaceBetweenItem={sw64} />
          </View>
          <CustomSpacer space={sh16} />
          <View style={borderBottomGray4} />
          <CustomSpacer space={sh32} />
        </Fragment>
      ) : null}
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_PROFILE.TITLE_EMPLOYMENT_INFO} />
        <TextCard data={employmentDetails} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      {accountHolder === "Principal" ? (
        <Fragment>
          <View style={borderBottomGray4} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_PROFILE.TITLE_BANK_SUMMARY} />
            {localBankDetails.map((bank, numberIndex) => {
              const label = `${DASHBOARD_PROFILE.SUBTITLE_LOCAL_BANK} ${numberIndex + 1}`;
              return (
                <Fragment key={numberIndex}>
                  <IconText color={colorBlue._2} iconSize={sh24} name="bank" spaceBetween={sw16} textStyle={fs16BoldBlue2} text={label} />
                  <CustomSpacer space={sh16} />
                  <View style={borderBottomGray4} />
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
                  <IconText color={colorBlue._2} iconSize={sh24} name="bank" spaceBetween={sw16} textStyle={fs16BoldBlue2} text={label} />
                  <CustomSpacer space={sh16} />
                  <View style={borderBottomGray4} />
                  <CustomSpacer space={sh12} />
                  <TextCard data={bank} spaceBetweenItem={sw64} />
                </Fragment>
              );
            })}
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray4} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldBlack2} text={DECLARATION_SUMMARY.TITLE_FATCA} />
        <TextCard data={declarations.fatca} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray4} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldBlack2} text={DECLARATION_SUMMARY.TITLE_CRS} />
        <TextCard data={declarations.crs} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray4} />
      {/* <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldBlack2} text={DECLARATION_SUMMARY.TITLE_FEA} />
        <TextCard data={declarations.fea} spaceBetweenItem={sw64} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray4} /> */}
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <Text style={fs18BoldBlack2}>{DASHBOARD_PROFILE.TITLE_UPLOAD_DOCUMENTS}</Text>
        <CustomSpacer space={sh16} />
        <TextCard data={accountDocuments} spaceBetweenItem={sw64} />
        <CustomSpacer space={sh8} />
      </View>
    </Fragment>
  );
};
