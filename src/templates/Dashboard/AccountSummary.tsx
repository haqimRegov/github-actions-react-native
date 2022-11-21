import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { Avatar, CustomFlexSpacer, CustomSpacer, LabeledTitle, RoundedButton, TextCard, TextSpaceArea } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlue5,
  borderBottomGray2,
  colorBlue,
  flexChild,
  flexRow,
  fs12BoldBlue1,
  fs16BoldBlack1,
  fs18BoldBlack2,
  fs18BoldGray6,
  fs36BoldWhite1,
  px,
  rowCenterVertical,
  sh120,
  sh16,
  sh24,
  sh32,
  shadow16Blue112,
  sw1,
  sw120,
  sw16,
  sw24,
  sw240,
  sw32,
  sw328,
  sw40,
  sw64,
  sw8,
} from "../../styles";

const { DASHBOARD_PROFILE, DECLARATION_SUMMARY } = Language.PAGE;

interface AccountSummaryProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  data: IStructuredData;
  // handleViewId: () => void;
  idNumber: string;
  idType: TypeClientID;
  name: string;
  setAccountHolder?: (holder: TypeAccountHolder) => void;
}

export const AccountSummary: FunctionComponent<AccountSummaryProps> = ({
  accountHolder,
  accountType,
  data,
  // handleViewId,
  idNumber,
  idType,
  name,
  setAccountHolder,
}: AccountSummaryProps) => {
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
            // iconSize={sw20}
            label={labelId}
            // onPress={handleViewId}
            // spaceToIcon={sw20}
            title={idNumber}
            // titleIcon="profile-card"
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
        <View style={px(sw32)}>
          <TextCard data={accountSummaryDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
        </View>
      </View>
      {contactDetails.length !== 0 ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_CONTACT_DETAILS} />
            <View style={px(sw32)}>
              <TextCard data={contactDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
            </View>
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_ADDRESS_INFO} />
        <View style={px(sw32)}>
          <View style={flexRow}>
            <IcoMoon color={colorBlue._1} name="location" size={sw24} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <View style={flexChild}>
              <View style={rowCenterVertical}>
                <Text style={fs18BoldBlack2}>{DASHBOARD_PROFILE.LABEL_PERMANENT_ADDRESS}</Text>
                <CustomSpacer isHorizontal={true} space={sw16} />
                <View style={flexChild}>
                  <View style={borderBottomBlue5} />
                </View>
              </View>
            </View>
          </View>
          <CustomSpacer space={sh16} />
          <TextCard data={permanentAddress} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
          <CustomSpacer space={sh16} />
          <View style={flexRow}>
            <IcoMoon color={colorBlue._1} name="location" size={sw24} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <View style={flexChild}>
              <View style={rowCenterVertical}>
                <Text style={fs18BoldBlack2}>{DASHBOARD_PROFILE.LABEL_CORRESPONDENCE_ADDRESS}</Text>
                <CustomSpacer isHorizontal={true} space={sw16} />
                <View style={flexChild}>
                  <View style={borderBottomBlue5} />
                </View>
              </View>
            </View>
          </View>
          <CustomSpacer space={sh16} />
          <TextCard data={mailingAddress} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
        </View>
      </View>
      {epfDetails.length !== 0 && accountHolder === "Principal" ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} style={fs18BoldGray6} text={DASHBOARD_PROFILE.TITLE_EPF_DETAILS} />
            <View style={px(sw32)}>
              <TextCard data={epfDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
            </View>
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
            <View style={px(sw32)}>
              <TextCard data={employmentDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
            </View>
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
            <View style={px(sw32)}>
              {localBankDetails.map((bank, numberIndex) => {
                const label = `${DASHBOARD_PROFILE.SUBTITLE_LOCAL_BANK}`;
                return (
                  <Fragment key={numberIndex}>
                    <View style={flexRow}>
                      <IcoMoon color={colorBlue._1} name="bank" size={sw24} />
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <View style={flexChild}>
                        <View style={rowCenterVertical}>
                          <Text style={fs18BoldBlack2}>{label}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={flexChild}>
                            <View style={borderBottomBlue5} />
                          </View>
                        </View>
                      </View>
                    </View>
                    <CustomSpacer space={sh16} />
                    <TextCard data={bank} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                  </Fragment>
                );
              })}
              {foreignBankDetails.map((bank, numberIndex) => {
                const label = `${DASHBOARD_PROFILE.SUBTITLE_FOREIGN_BANK} ${foreignBankDetails.length > 1 ? numberIndex + 1 : ""}`;
                return (
                  <Fragment key={numberIndex}>
                    {numberIndex === 0 ? <CustomSpacer space={sh16} /> : null}
                    <View style={flexRow}>
                      <IcoMoon color={colorBlue._1} name="bank" size={sw24} />
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <View style={flexChild}>
                        <View style={rowCenterVertical}>
                          <Text style={fs18BoldBlack2}>{label}</Text>
                          <CustomSpacer isHorizontal={true} space={sw16} />
                          <View style={flexChild}>
                            <View style={borderBottomBlue5} />
                          </View>
                        </View>
                      </View>
                    </View>
                    <CustomSpacer space={sh16} />
                    <TextCard data={bank} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                  </Fragment>
                );
              })}
            </View>
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldGray6} text={DECLARATION_SUMMARY.TITLE_FATCA} />
        <View style={px(sw32)}>
          <TextCard data={declarations.fatca} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
        </View>
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldGray6} text={DECLARATION_SUMMARY.TITLE_CRS} />
        <View style={px(sw32)}>
          <TextCard data={declarations.crs} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
        </View>
      </View>
      <CustomSpacer space={sh16} />
    </Fragment>
  );
};
