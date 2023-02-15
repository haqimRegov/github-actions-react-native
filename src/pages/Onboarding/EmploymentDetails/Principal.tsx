import React, { FunctionComponent } from "react";

import { EmploymentInfo } from "./Details";

interface PrincipalEmploymentDetails {
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
  setPersonalInfoDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IEmploymentDetailsValidations) => void;
  validations: IEmploymentDetailsValidations;
}

export const PrincipalEmploymentDetails: FunctionComponent<PrincipalEmploymentDetails> = ({
  accountType,
  employmentDetails,
  personalDetails,
  setEmploymentDetails,
  setPersonalInfoDetails,
  setValidations,
  validations,
}: PrincipalEmploymentDetails) => {
  return (
    <EmploymentInfo
      accountType={accountType}
      employmentDetails={employmentDetails}
      personalDetails={personalDetails}
      setEmploymentDetails={setEmploymentDetails}
      setPersonalInfoDetails={setPersonalInfoDetails}
      setValidations={setValidations}
      validations={validations}
    />
  );
};
