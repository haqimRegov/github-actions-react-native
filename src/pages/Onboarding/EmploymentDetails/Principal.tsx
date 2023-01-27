import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { defaultContentProps, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_COUNTRIES, EMPLOYMENT_EXEMPTIONS } from "../../../data/dictionary";
import { px, sw24 } from "../../../styles";
import { EmploymentInfo } from "./Details";

const { EMPLOYMENT_DETAILS } = Language.PAGE;

interface PrincipalEmploymentDetails {
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
  setPersonalInfoDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IEmploymentDetailsValidations) => void;
  validations: IEmploymentDetailsValidations;
}

const initialPrincipalEmploymentDetails: IEmploymentDetailsState = {
  businessNature: "",
  employerName: "",
  occupation: "",
  isOptional: false,
  othersOccupation: "",
  address: {
    line1: "",
    line2: undefined,
    line3: undefined,
  },
  city: "",
  country: DICTIONARY_COUNTRIES[0].value,
  postCode: "",
  state: "",
};

export const PrincipalEmploymentDetails: FunctionComponent<PrincipalEmploymentDetails> = ({
  accountType,
  employmentDetails,
  personalDetails,
  setEmploymentDetails,
  setPersonalInfoDetails,
  setValidations,
  validations,
}: PrincipalEmploymentDetails) => {
  const padding = accountType === "Joint" ? px(sw24) : {};

  const handleOccupation = (occupation: string) => {
    if (employmentDetails.isOptional === false && EMPLOYMENT_EXEMPTIONS.indexOf(occupation) !== -1) {
      setEmploymentDetails({
        ...initialPrincipalEmploymentDetails,
        occupation: occupation,
        country: "",
        isOptional: employmentDetails.isOptional,
      });
    } else if (employmentDetails.isOptional === true && EMPLOYMENT_EXEMPTIONS.indexOf(occupation) !== -1) {
      setEmploymentDetails({
        ...initialPrincipalEmploymentDetails,
        occupation: occupation,
        isOptional: employmentDetails.isOptional,
      });
    } else if (occupation === "Others") {
      setEmploymentDetails({
        ...initialPrincipalEmploymentDetails,
        occupation: occupation,
        othersOccupation: "",
        isOptional: employmentDetails.isOptional,
      });
    } else {
      setEmploymentDetails({
        ...initialPrincipalEmploymentDetails,
        occupation: occupation,
        isOptional: employmentDetails.isOptional,
      });
    }
  };

  const handleToggle = (value: boolean) => {
    if (value === true) {
      setEmploymentDetails({
        ...initialPrincipalEmploymentDetails,
        occupation: employmentDetails.occupation,
        isOptional: value,
      });
    }

    if (value === false) {
      setEmploymentDetails({
        ...initialPrincipalEmploymentDetails,
        occupation: employmentDetails.occupation,
        country: "",
        isOptional: value,
      });
    }
  };

  return (
    <View>
      <View style={px(sw24)}>
        <LabeledTitle
          label={EMPLOYMENT_DETAILS.HEADING}
          labelStyle={defaultContentProps.subheadingStyle}
          spaceToLabel={defaultContentProps.spaceToTitle}
          style={padding}
          title={EMPLOYMENT_DETAILS.SUBHEADING}
          titleStyle={defaultContentProps.subtitleStyle}
        />
      </View>
      <View style={padding}>
        <EmploymentInfo
          accountType={accountType}
          employmentDetails={employmentDetails}
          handleOccupation={handleOccupation}
          handleToggle={handleToggle}
          personalDetails={personalDetails}
          setEmploymentDetails={setEmploymentDetails}
          setPersonalInfoDetails={setPersonalInfoDetails}
          setValidations={setValidations}
          validations={validations}
        />
      </View>
    </View>
  );
};
