import React, { Fragment, FunctionComponent, useState } from "react";
import { View, ViewStyle } from "react-native";

import { CustomSpacer, RoundedButton } from "../../components";
import { Language } from "../../constants";
import { colorBlue, colorTransparent, flexRow, fs10BoldBlue1, fs10BoldWhite1, px, sh24, sw1, sw120, sw24 } from "../../styles";
import { getStructuredInvestorProfile, isArrayNotEmpty, isNotEmpty } from "../../utils";
import { SummaryColorCard } from "./SummaryColorCard";

const { INVESTOR_PROFILE } = Language.PAGE;
declare interface ProfileTabProps {
  data: IDashboardOrderSummary;
}

export const ProfileTabNew: FunctionComponent<ProfileTabProps> = ({ data }: ProfileTabProps) => {
  const { profile, documentSummary } = data;
  const [toggle, setToggle] = useState<number>(0);
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

  const { contactDetails, declarations, personalDetails, employmentAddress, identificationDetails, permanentAddress, employmentDetails } =
    getStructuredInvestorProfile(profileToStructure);

  const { crs, crsTin, fatca } = declarations;

  const buttonPrincipalStyle: ViewStyle = {
    borderColor: colorBlue._1,
    borderWidth: sw1,
    height: sh24,
    width: sw120,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: toggle === 0 ? colorBlue._1 : colorTransparent,
  };
  const buttonJointStyle: ViewStyle = {
    borderColor: colorBlue._1,
    borderWidth: sw1,
    borderLeftWidth: 0,
    height: sh24,
    width: sw120,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: toggle === 1 ? colorBlue._1 : colorTransparent,
  };

  const identificationSection: ISummaryColorCardSection = {
    iconName: "account",
    text: INVESTOR_PROFILE.SECTION_PERSONAL_DETAILS,
    data: [personalDetails],
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

  return (
    <View style={px(sw24)}>
      {accountType === "Joint" ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <View style={buttonContainerStyle}>
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
          </View>
        </Fragment>
      ) : null}

      {isNotEmpty(identificationDetails) ? (
        <SummaryColorCard
          headerTitle={INVESTOR_PROFILE.CARD_TITLE_IDENTIFICATION}
          data={identificationDetails}
          section={[identificationSection]}
          spaceToTop={sh24}
        />
      ) : null}

      {isArrayNotEmpty(contactDetails) ? (
        <SummaryColorCard data={contactDetails} headerTitle={INVESTOR_PROFILE.CARD_TITLE_CONTACT} spaceToTop={sh24} />
      ) : null}

      {isArrayNotEmpty(permanentAddress) ? (
        <SummaryColorCard data={permanentAddress} headerTitle={INVESTOR_PROFILE.CARD_TITLE_PERMANENT_ADDRESS} spaceToTop={sh24} />
      ) : null}
      {isArrayNotEmpty(employmentAddress) ? (
        <SummaryColorCard
          headerTitle={INVESTOR_PROFILE.CARD_TITLE_EMPLOYMENT}
          data={employmentDetails}
          section={[employmentSection]}
          spaceToTop={sh24}
        />
      ) : null}

      {declaration !== null && declaration.fatca !== null ? (
        <SummaryColorCard headerTitle={INVESTOR_PROFILE.CARD_TITLE_FATCA} data={fatca} spaceToTop={sh24} />
      ) : null}
      {declaration !== null && declaration.crs !== null ? (
        <SummaryColorCard headerTitle={INVESTOR_PROFILE.CARD_TITLE_CRS} data={crs} section={[crsSection]} spaceToTop={sh24} />
      ) : null}
    </View>
  );
};
