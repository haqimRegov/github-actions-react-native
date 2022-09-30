import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, defaultContentProps, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { px, sw24 } from "../../../styles";
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
          labelStyle={defaultContentProps.subheadingStyle}
          spaceToLabel={defaultContentProps.spaceToTitle!}
          style={padding}
          title={EMPLOYMENT_DETAILS.SUBHEADING}
          titleStyle={defaultContentProps.subtitleStyle}
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
