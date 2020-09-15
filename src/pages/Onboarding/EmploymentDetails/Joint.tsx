import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, LabeledTitle, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { borderBottomGray4, fs10BoldBlack2, fs16RegBlack2, fs24BoldBlack2, px, sh32, sh8, sw24 } from "../../../styles";
import { EmploymentInfo } from "./Details";

const { EMPLOYMENT_DETAILS } = Language.PAGE;

interface JointEmploymentDetails {
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
}

export const JointEmploymentDetails: FunctionComponent<JointEmploymentDetails> = ({
  accountType,
  employmentDetails,
  personalDetails,
  setEmploymentDetails,
}: JointEmploymentDetails) => {
  return (
    <View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray4} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} style={fs10BoldBlack2} text={personalDetails.name!} />
        <LabeledTitle
          label={EMPLOYMENT_DETAILS.HEADING}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          title={EMPLOYMENT_DETAILS.SUBHEADING}
          titleStyle={fs16RegBlack2}
        />
      </View>
      <EmploymentInfo
        accountType={accountType}
        accountHolder="Joint"
        employmentDetails={employmentDetails}
        setEmploymentDetails={setEmploymentDetails}
      />
    </View>
  );
};
