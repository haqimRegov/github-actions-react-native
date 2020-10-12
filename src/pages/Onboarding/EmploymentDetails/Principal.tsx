import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { LabeledTitle, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { fs10BoldBlack2, fs16RegBlack2, fs24BoldBlack2, px, sh24, sh8, sw24 } from "../../../styles";
import { EmploymentInfo } from "./Details";

const { EMPLOYMENT_DETAILS } = Language.PAGE;

interface PrincipalEmploymentDetails {
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
}

export const PrincipalEmploymentDetails: FunctionComponent<PrincipalEmploymentDetails> = ({
  accountType,
  employmentDetails,
  personalDetails,
  setEmploymentDetails,
}: PrincipalEmploymentDetails) => {
  return (
    <View>
      <View style={px(sw24)}>
        {accountType === "Individual" ? null : <TextSpaceArea spaceToBottom={sh8} style={fs10BoldBlack2} text={personalDetails.name!} />}
        <LabeledTitle
          label={EMPLOYMENT_DETAILS.HEADING}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          title={EMPLOYMENT_DETAILS.SUBHEADING}
          titleStyle={{ ...fs16RegBlack2, lineHeight: sh24 }}
        />
      </View>
      <EmploymentInfo accountType={accountType} employmentDetails={employmentDetails} setEmploymentDetails={setEmploymentDetails} />
    </View>
  );
};
