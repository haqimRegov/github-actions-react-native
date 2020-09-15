import React, { Fragment } from "react";
import { Alert, Image, ImageStyle, Text, View, ViewStyle } from "react-native";

import { IStructuredData } from ".";
import { CardWrap, CustomFlexSpacer, CustomSpacer, IconText, LabeledTitle, RoundedButton, TextSpaceArea } from "../../../../components";
import { AddressInfo } from "../../../../components/Views/AddressInfo";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  borderBottomBlack21,
  circleBorder,
  colorBlue,
  colorGreen,
  colorWhite,
  customShadow,
  flexRow,
  fs12BoldBlack2,
  fs12SemiBoldBlack2,
  fs16BoldBlack2,
  fs16BoldBlue2,
  fs18BoldBlack2,
  px,
  sh120,
  sh16,
  sh24,
  sh32,
  sh8,
  sw1,
  sw120,
  sw16,
  sw20,
  sw24,
  sw240,
  sw32,
  sw40,
  sw5,
  sw64,
} from "../../../../styles";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

declare interface AccountDetailsContentProps {
  data: IStructuredData;
  handleFile: (file: FileBase64) => void;
  handleToggle: () => void;
  toggle: boolean;
}

export const AccountDetailsContent = ({ data, handleFile, handleToggle, toggle }: AccountDetailsContentProps) => {
  const {
    accountSummaryDetails,
    contactDetails,
    employmentDetails,
    epfDetails,
    fatcaCrsDetails,
    foreignBankDetails,
    localBankDetails,
    mailingAddress,
    permanentAddress,
    uploadDocuments,
  } = data;

  const handleEdit = () => {
    Alert.alert("edit route");
  };

  const handleNric = () => {
    handleFile(data.idProof);
  };

  const buttonStyle: ViewStyle = { ...px(sw16), height: sh24, width: "auto" };
  const holder = toggle === false ? DASHBOARD_ORDER_DETAILS.LABEL_JOINT_ACCOUNT : DASHBOARD_ORDER_DETAILS.LABEL_PRINCIPAL_ACCOUNT;
  const profilePicStyle: ImageStyle = { ...circleBorder(sh120, sw1, colorWhite._1) };
  const cardWrapProps = { spaceBetween: sw64, noInitialSpace: true, labelStyle: fs12BoldBlack2 };

  return (
    <Fragment>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View style={{ height: sh120, width: sw120, ...customShadow(colorBlue._5, 0, 0, 0.4, sw5) }}>
          {data.profilePic !== undefined ? (
            <Image style={profilePicStyle} source={{ uri: data.profilePic!.url }} />
          ) : (
            <View style={{ ...profilePicStyle, backgroundColor: colorGreen._1 }} />
          )}
        </View>
        <CustomSpacer isHorizontal={true} space={sw40} />
        <View style={{ width: sw240 }}>
          <LabeledTitle label={DASHBOARD_ORDER_DETAILS.LABEL_NAME} spaceToLabel={sh8} title={data.name} titleStyle={fs16BoldBlack2} />
          <CustomSpacer space={sh16} />
          <LabeledTitle
            iconSize={sw20}
            label={DASHBOARD_ORDER_DETAILS.LABEL_NRIC}
            onPress={handleNric}
            spaceToIcon={sw20}
            spaceToLabel={sh8}
            title={data.id}
            titleIcon={"profile"}
            titleStyle={fs16BoldBlack2}
          />
        </View>
        <CustomFlexSpacer />
        {data.isJoint === true ? (
          <RoundedButton buttonStyle={buttonStyle} onPress={handleToggle} secondary={true} text={holder} textStyle={fs12SemiBoldBlack2} />
        ) : null}
      </View>
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_ORDER_DETAILS.LABEL_ACCOUNT_SUMMARY} />
        <CardWrap data={accountSummaryDetails} {...cardWrapProps} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_ORDER_DETAILS.LABEL_CONTACT_DETAILS} />
        <CardWrap data={contactDetails} {...cardWrapProps} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_ORDER_DETAILS.LABEL_ADDRESS_INFO} />
        <View style={flexRow}>
          <AddressInfo data={permanentAddress} labelAddress={DASHBOARD_ORDER_DETAILS.LABEL_PERMANENT_ADDRESS} />
          <CustomSpacer isHorizontal={true} space={sw64} />
          <AddressInfo data={mailingAddress} labelAddress={DASHBOARD_ORDER_DETAILS.LABEL_MAILING_ADDRESS} />
        </View>
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      {epfDetails.length !== 0 ? (
        <Fragment>
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_ORDER_DETAILS.LABEL_EPF_DETAILS} />
            <CardWrap data={epfDetails} {...cardWrapProps} />
          </View>
          <CustomSpacer space={sh16} />
          <View style={borderBottomBlack21} />
          <CustomSpacer space={sh32} />
        </Fragment>
      ) : null}
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_ORDER_DETAILS.LABEL_EMPLOYMENT_INFO} />
        <CardWrap data={employmentDetails} {...cardWrapProps} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_ORDER_DETAILS.LABEL_BANK_SUMMARY} />
        {localBankDetails.map((bank, numberIndex) => {
          const label = `${DASHBOARD_ORDER_DETAILS.LABEL_LOCAL_BANK} ${numberIndex + 1}`;
          return (
            <Fragment key={numberIndex}>
              <IconText color={colorBlue._2} iconSize={sh24} name="bank" spaceBetween={sw16} textStyle={fs16BoldBlue2} text={label} />
              <CustomSpacer space={sh16} />
              <View style={borderBottomBlack21} />
              <CustomSpacer space={sh16} />
              <CardWrap data={bank} {...cardWrapProps} />
            </Fragment>
          );
        })}
        <CustomSpacer space={sh16} />
        {foreignBankDetails.map((bank, numberIndex) => {
          const label = `${DASHBOARD_ORDER_DETAILS.LABEL_FOREIGN_BANK} ${numberIndex + 1}`;
          return (
            <Fragment key={numberIndex}>
              <IconText color={colorBlue._2} iconSize={sh24} name="bank" spaceBetween={sw16} textStyle={fs16BoldBlue2} text={label} />
              <CustomSpacer space={sh16} />
              <View style={borderBottomBlack21} />
              <CustomSpacer space={sh16} />
              <CardWrap data={bank} {...cardWrapProps} />
            </Fragment>
          );
        })}
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldBlack2} text={DASHBOARD_ORDER_DETAILS.LABEL_FATCA_CRS} />
        <CardWrap data={fatcaCrsDetails} {...cardWrapProps} />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <View style={flexRow}>
          <Text style={fs18BoldBlack2}>{DASHBOARD_ORDER_DETAILS.LABEL_UPLOAD_LIST}</Text>
          <CustomSpacer isHorizontal={true} space={sw32} />
          <IcoMoon color={colorBlue._1} name="edit" onPress={handleEdit} size={sw24} />
        </View>
        <CustomSpacer space={sh16} />
        <CardWrap data={uploadDocuments} {...cardWrapProps} />
        <CustomSpacer space={sh8} />
      </View>
    </Fragment>
  );
};
