import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { LabeledTitle, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { fs10BoldBlack2, fs16RegBlack2, fs24BoldBlack2, px, sh32, sh8, sw24 } from "../../../styles";
import { PersonalInfo } from "./Details";

const { PERSONAL_DETAILS } = Language.PAGE;

interface PrincipalDetails {
  accountType: TypeAccountChoices;
  bankDetails: IBankSummaryState;
  contactDetails: IContactDetailsState;
  epfDetails: IEpfDetailsState;
  epfInvestment: boolean;
  personalDetails: IPersonalDetailsState;
  setBankDetails: (value: IBankSummaryState) => void;
  setContactDetails: (value: IContactDetailsState) => void;
  setEpfDetails: (value: IEpfDetailsState) => void;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
}

export const PrincipalDetails: FunctionComponent<PrincipalDetails> = ({
  accountType,
  bankDetails,
  contactDetails,
  epfDetails,
  epfInvestment,
  personalDetails,
  setBankDetails,
  setContactDetails,
  setEpfDetails,
  setPersonalDetails,
}: PrincipalDetails) => {
  return (
    <View>
      <View style={px(sw24)}>
        {accountType === "Individual" ? null : (
          <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} style={fs10BoldBlack2} text={personalDetails.name!} />
        )}
        <LabeledTitle
          label={PERSONAL_DETAILS.SUBHEADING_PERSONAL}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          title={PERSONAL_DETAILS.SUBTITLE_REACH}
          titleStyle={fs16RegBlack2}
        />
      </View>
      <PersonalInfo
        accountType={accountType}
        accountHolder="Principal"
        bankDetails={bankDetails}
        contactDetails={contactDetails}
        epfDetails={epfDetails}
        epfInvestment={epfInvestment}
        personalDetails={personalDetails}
        setBankDetails={setBankDetails}
        setContactDetails={setContactDetails}
        setEpfDetails={setEpfDetails}
        setPersonalDetails={setPersonalDetails}
      />
    </View>
  );
};
