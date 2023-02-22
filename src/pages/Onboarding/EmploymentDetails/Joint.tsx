import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { EmploymentInfo } from "./Details";

interface JointEmploymentDetails {
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
  setPersonalInfoDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IEmploymentDetailsValidations) => void;
  validations: IEmploymentDetailsValidations;
}

export const JointEmploymentDetails: FunctionComponent<JointEmploymentDetails> = ({
  accountType,
  employmentDetails,
  personalDetails,
  setEmploymentDetails,
  setPersonalInfoDetails,
  setValidations,
  validations,
}: JointEmploymentDetails) => {
  // dateOfBirth saved in personalDetails is in Date type
  const jointAgeCheck = accountType === "Joint" && moment().diff(moment(personalDetails?.dateOfBirth), "years") < 18;

  return (
    <View>
      <EmploymentInfo
        accountHolder="Joint"
        accountType={accountType}
        employmentDetails={employmentDetails}
        isOptional={jointAgeCheck}
        personalDetails={personalDetails}
        setEmploymentDetails={setEmploymentDetails}
        setPersonalInfoDetails={setPersonalInfoDetails}
        setValidations={setValidations}
        validations={validations}
      />
    </View>
  );
};
