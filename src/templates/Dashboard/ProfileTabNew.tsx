import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View, ViewStyle } from "react-native";

import { AccountHeader, ColorCard, CustomSpacer, RoundedButton, TextCard } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlue4,
  colorBlue,
  colorTransparent,
  flexChild,
  flexRow,
  fs10BoldBlue1,
  fs10BoldWhite1,
  fs16BoldBlue1,
  px,
  rowCenterVertical,
  sh16,
  sh20,
  sh24,
  sh32,
  sw1,
  sw120,
  sw16,
  sw24,
  sw328,
  sw64,
  sw8,
} from "../../styles";
import { getStructuredInvestorProfile, isArrayNotEmpty, isNotEmpty } from "../../utils";
import { SummaryColorCard, summaryColorCardStyleProps } from "./SummaryColorCard";

const { INVESTOR_PROFILE } = Language.PAGE;
declare interface ProfileTabProps {
  data: IDashboardOrderSummary;
}

export const ProfileTabNew: FunctionComponent<ProfileTabProps> = ({ data }: ProfileTabProps) => {
  const { profile, documentSummary } = data;
  const [principal, joint] = profile;
  const isEtbInvestor = { principal: principal?.isEtb || false, joint: joint?.isEtb || false };
  const [toggle, setToggle] = useState<number>(isEtbInvestor.joint === false && isEtbInvestor.principal === true ? 1 : 0);
  const investor = profile[toggle];
  const { declaration } = investor;
  const { accountType } = documentSummary;

  const handleTogglePrincipal = () => {
    setToggle(0);
  };
  const handleToggleJoint = () => {
    setToggle(1);
  };

  const profileToStructure: IInvestorAccount = {
    accountDetails: null,
    addressInformation: investor.addressInformation,
    bankInformation: null,
    contactDetails: investor.contactDetails,
    declaration: investor.declaration,
    documentSummary: null,
    employmentInformation: investor.employmentInformation,
    epfDetails: investor.epfDetails,
    orderHistory: null,
    personalDetails: investor.personalDetails,
    investorOverview: [
      {
        clientId: investor.clientId!,
        name: investor.name,
        idNumber: investor.idNumber,
        idType: investor.idType,
        riskProfile: investor.personalDetails.riskProfile,
      },
    ],
  };

  const { contactDetails, declarations, employmentAddress, identificationDetails, personalDetails, permanentAddress, employmentDetails } =
    getStructuredInvestorProfile(profileToStructure);

  const identificationDetailsSummary: LabeledTitleProps[] = [
    { label: INVESTOR_PROFILE.LABEL_NAME, title: investor.name },
    ...identificationDetails,
  ];

  const { crs, crsTin, fatca } = declarations;

  const buttonStyle: ViewStyle = {
    borderColor: colorBlue._1,
    borderWidth: sw1,
    height: sh24,
    width: sw120,
  };

  const buttonPrincipalStyle: ViewStyle = {
    ...buttonStyle,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: toggle === 0 ? colorBlue._1 : colorTransparent,
  };

  const buttonJointStyle: ViewStyle = {
    ...buttonStyle,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: toggle === 1 ? colorBlue._1 : colorTransparent,
  };

  const employmentSection: ISummaryColorCardSection = {
    iconName: "location",
    text: INVESTOR_PROFILE.SECTION_EMPLOYER_ADDRESS,
    data: [employmentAddress],
  };

  const crsSection: ISummaryColorCardSection = {
    iconName: "tax-card",
    text: INVESTOR_PROFILE.LABEL_TAXPAYER,
    textWithCount: true,
    data: crsTin,
  };

  const buttonContainerStyle: ViewStyle = { ...flexRow, marginLeft: "auto" };
  const investorHolder = toggle === 0 ? INVESTOR_PROFILE.LABEL_PRINCIPAL_HOLDER : INVESTOR_PROFILE.LABEL_JOINT_HOLDER;

  return (
    <View style={px(sw24)}>
      {accountType === "Joint" ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <View style={buttonContainerStyle}>
            {isEtbInvestor.principal === false && isEtbInvestor.joint === false ? (
              <Fragment>
                <RoundedButton
                  buttonStyle={buttonPrincipalStyle}
                  text={INVESTOR_PROFILE.BUTTON_PRINCIPAL}
                  onPress={handleTogglePrincipal}
                  textStyle={toggle === 0 ? fs10BoldWhite1 : fs10BoldBlue1}
                />
                <RoundedButton
                  buttonStyle={buttonJointStyle}
                  text={INVESTOR_PROFILE.BUTTON_JOINT}
                  onPress={handleToggleJoint}
                  textStyle={toggle === 1 ? fs10BoldWhite1 : fs10BoldBlue1}
                />
              </Fragment>
            ) : null}
          </View>
        </Fragment>
      ) : null}

      {accountType === "Joint" && (isEtbInvestor.principal === true || isEtbInvestor.joint === true) ? (
        <AccountHeader title={investorHolder} subtitle={investor.name} spaceToBottom={0} />
      ) : null}

      {isNotEmpty(identificationDetails) ? (
        <Fragment>
          <CustomSpacer space={sh20} />
          <ColorCard
            {...summaryColorCardStyleProps}
            content={
              <Fragment>
                <TextCard data={identificationDetailsSummary} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                <View style={flexRow}>
                  <IcoMoon color={colorBlue._1} name="account" size={sw24} />
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <View style={flexChild}>
                    <View style={rowCenterVertical}>
                      <Text style={fs16BoldBlue1}>{INVESTOR_PROFILE.SECTION_PERSONAL_DETAILS}</Text>
                      <CustomSpacer isHorizontal={true} space={sw16} />
                      <View style={flexChild}>
                        <View style={borderBottomBlue4} />
                      </View>
                    </View>
                  </View>
                </View>
                <CustomSpacer space={sh16} />
                <TextCard data={personalDetails} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                {investor.epfDetails !== null ? (
                  <Fragment>
                    <View style={flexRow}>
                      <View style={flexChild}>
                        <View style={borderBottomBlue4} />
                      </View>
                    </View>
                    <CustomSpacer space={sh16} />
                    <TextCard data={personalDetails.splice(-2, 2)} itemStyle={{ width: sw328 }} spaceBetweenItem={sw64} />
                  </Fragment>
                ) : null}
              </Fragment>
            }
            header={{ ...summaryColorCardStyleProps.header, label: INVESTOR_PROFILE.CARD_TITLE_IDENTIFICATION }}
          />
        </Fragment>
      ) : null}

      {isArrayNotEmpty(contactDetails) ? (
        <SummaryColorCard data={contactDetails} headerTitle={INVESTOR_PROFILE.CARD_TITLE_CONTACT} spaceToTop={sh32} />
      ) : null}

      {isArrayNotEmpty(permanentAddress) ? (
        <SummaryColorCard data={permanentAddress} headerTitle={INVESTOR_PROFILE.CARD_TITLE_PERMANENT_ADDRESS} spaceToTop={sh32} />
      ) : null}
      {isArrayNotEmpty(employmentAddress) ? (
        <SummaryColorCard
          headerTitle={INVESTOR_PROFILE.CARD_TITLE_EMPLOYMENT}
          data={employmentDetails}
          section={[employmentSection]}
          spaceToTop={sh32}
        />
      ) : null}

      {declaration !== null && declaration.fatca !== null ? (
        <SummaryColorCard headerTitle={INVESTOR_PROFILE.CARD_TITLE_FATCA} data={fatca} spaceToTop={sh32} />
      ) : null}
      {declaration !== null && declaration.crs !== null ? (
        <SummaryColorCard headerTitle={INVESTOR_PROFILE.CARD_TITLE_CRS} data={crs} section={[crsSection]} spaceToTop={sh32} />
      ) : null}
    </View>
  );
};
