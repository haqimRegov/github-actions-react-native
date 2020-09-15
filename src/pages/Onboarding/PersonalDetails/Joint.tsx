import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, LabeledTitle, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { borderBottomGray4, fs10BoldBlack2, fs16RegBlack2, fs24BoldBlack2, px, sh32, sh8, sw24 } from "../../../styles";
import { PersonalInfo } from "./Details";

const { PERSONAL_DETAILS } = Language.PAGE;

interface JointDetails {
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

export const JointDetails: FunctionComponent<JointDetails> = ({
  bankDetails,
  contactDetails,
  epfDetails,
  epfInvestment,
  personalDetails,
  setBankDetails,
  setContactDetails,
  setEpfDetails,
  setPersonalDetails,
}: JointDetails) => {
  return (
    <View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray4} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh8} style={fs10BoldBlack2} text={personalDetails.name!} />
        <LabeledTitle
          label={PERSONAL_DETAILS.SUBHEADING_PERSONAL}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          title={PERSONAL_DETAILS.SUBTITLE_REACH}
          titleStyle={fs16RegBlack2}
        />
      </View>
      <PersonalInfo
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
