import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { fs16SemiBoldGray6, fs24BoldGray6, px, sh8, sw24 } from "../../../styles";
import { EmploymentInfo } from "./Details";

const { EMPLOYMENT_DETAILS } = Language.PAGE;

interface PrincipalEmploymentDetails {
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
  setValidations: (value: IEmploymentDetailsValidations) => void;
  validations: IEmploymentDetailsValidations;
}

export const PrincipalEmploymentDetails: FunctionComponent<PrincipalEmploymentDetails> = ({
  accountType,
  employmentDetails,
  personalDetails,
  setEmploymentDetails,
  setValidations,
  validations,
}: PrincipalEmploymentDetails) => {
  const padding = accountType === "Joint" ? px(sw24) : {};

  return (
    <View>
      <View style={px(sw24)}>
        {accountType === "Joint" ? <AccountHeader subtitle={EMPLOYMENT_DETAILS.LABEL_PRINCIPAL} title={personalDetails.name!} /> : null}
        <LabeledTitle
          label={EMPLOYMENT_DETAILS.HEADING}
          labelStyle={fs24BoldGray6}
          spaceToLabel={sh8}
          style={padding}
          title={EMPLOYMENT_DETAILS.SUBHEADING}
          titleStyle={fs16SemiBoldGray6}
        />
      </View>
      <View style={padding}>
        <EmploymentInfo
          accountType={accountType}
          employmentDetails={employmentDetails}
          setEmploymentDetails={setEmploymentDetails}
          setValidations={setValidations}
          validations={validations}
        />
      </View>
    </View>
  );
};
