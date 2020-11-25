import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { fs16SemiBoldBlack2, fs24BoldBlack2, px, sh8, sw24 } from "../../../styles";
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
  const padding = accountType === "Joint" ? px(sw24) : {};

  return (
    <View>
      <View style={px(sw24)}>
        <AccountHeader subtitle={EMPLOYMENT_DETAILS.LABEL_JOINT} title={personalDetails.name!} />
        <LabeledTitle
          label={EMPLOYMENT_DETAILS.HEADING}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          style={padding}
          title={EMPLOYMENT_DETAILS.SUBHEADING}
          titleStyle={fs16SemiBoldBlack2}
        />
      </View>
      <View style={padding}>
        <EmploymentInfo
          accountType={accountType}
          accountHolder="Joint"
          employmentDetails={employmentDetails}
          setEmploymentDetails={setEmploymentDetails}
        />
      </View>
    </View>
  );
};
