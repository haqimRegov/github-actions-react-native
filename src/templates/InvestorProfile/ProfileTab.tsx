import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { Avatar, CustomSpacer, LabeledTitle } from "../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../constants";
import { getInitials } from "../../helpers";
import {
  flexRow,
  fs12BoldGray5,
  fs12RegGray6,
  fs16BoldBlack2,
  fs24BoldBlue1,
  fs24BoldWhite1,
  px,
  sh16,
  sh24,
  sw24,
  sw80,
} from "../../styles";
import { getStructuredInvestorProfile, isNotEmpty } from "../../utils";
import { SummaryColorCard } from "../Dashboard";

const { INVESTOR_PROFILE } = Language.PAGE;
declare interface ProfileTabProps {
  data: IInvestorAccount;
  setFile: (value?: FileBase64) => void;
}

export const ProfileTab: FunctionComponent<ProfileTabProps> = ({ data }: ProfileTabProps) => {
  const { investorOverview } = data;
  const { lastUpdated, name } = investorOverview[0];
  const { identificationDetails, personalDetails, contactDetails, employmentDetails, employmentAddress, permanentAddress } =
    getStructuredInvestorProfile(data);

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

  const initials = name ? getInitials(name) : "";
  const riskProfileLastUpdated = isNotEmpty(lastUpdated) ? moment(lastUpdated, "x").format(DEFAULT_DATE_FORMAT) : "-";

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <View style={flexRow}>
        <Avatar size={sw80} text={initials} textStyle={fs24BoldWhite1} type="client" />
        <CustomSpacer isHorizontal={true} space={sw24} />
        <View>
          <Text style={fs24BoldBlue1}>{name}</Text>
          <CustomSpacer space={sh16} />
          <LabeledTitle
            label={INVESTOR_PROFILE.LABEL_RISK_PROFILE}
            labelStyle={fs12BoldGray5}
            title={data.personalDetails !== null && data.personalDetails.riskProfile ? data.personalDetails.riskProfile : "-"}
            titleStyle={fs16BoldBlack2}
            subtitle={riskProfileLastUpdated}
            subtitleStyle={fs12RegGray6}
          />
        </View>
      </View>
      <SummaryColorCard
        headerTitle={INVESTOR_PROFILE.CARD_TITLE_IDENTIFICATION}
        data={identificationDetails}
        section={identificationSection}
        spaceToTop={sh24}
      />
      <SummaryColorCard data={contactDetails} headerTitle={INVESTOR_PROFILE.CARD_TITLE_CONTACT} spaceToTop={sh24} />
      <SummaryColorCard data={permanentAddress} headerTitle={INVESTOR_PROFILE.CARD_TITLE_PERMANENT_ADDRESS} spaceToTop={sh24} />
      <SummaryColorCard
        headerTitle={INVESTOR_PROFILE.CARD_TITLE_EMPLOYMENT}
        data={employmentDetails}
        section={employmentSection}
        spaceToTop={sh24}
      />
    </View>
  );
};
