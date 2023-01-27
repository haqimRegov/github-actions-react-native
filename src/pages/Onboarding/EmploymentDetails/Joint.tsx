import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, Switch } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_COUNTRIES, EMPLOYMENT_EXEMPTIONS } from "../../../data/dictionary";
import { px, sh40, sw24 } from "../../../styles";
import { EmploymentInfo } from "./Details";

const { EMPLOYMENT_DETAILS } = Language.PAGE;

interface JointEmploymentDetails {
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
  setPersonalInfoDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IEmploymentDetailsValidations) => void;
  validations: IEmploymentDetailsValidations;
}

const initialJointEmploymentDetails: IEmploymentDetailsState = {
  businessNature: "",
  employerName: "",
  isEnabled: false,
  isOptional: false,
  grossIncome: "",
  occupation: "",
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

export const JointEmploymentDetails: FunctionComponent<JointEmploymentDetails> = ({
  accountType,
  employmentDetails,
  personalDetails,
  setEmploymentDetails,
  setPersonalInfoDetails,
  setValidations,
  validations,
}: JointEmploymentDetails) => {
  const handleEnable = (toggle: boolean | undefined) =>
    setEmploymentDetails({ ...employmentDetails, ...initialJointEmploymentDetails, isEnabled: toggle });

  const jointAgeCheck = accountType === "Joint" && moment().diff(moment(personalDetails?.dateOfBirth, DEFAULT_DATE_FORMAT), "years") < 18;
  const enabled = employmentDetails.isEnabled !== undefined ? employmentDetails.isEnabled : true;

  const handleOccupation = (occupation: string) => {
    if (employmentDetails.isOptional === false && EMPLOYMENT_EXEMPTIONS.indexOf(occupation) !== -1) {
      setEmploymentDetails({
        ...initialJointEmploymentDetails,
        country: "",
        isEnabled: employmentDetails.isEnabled,
        isOptional: employmentDetails.isOptional,
        occupation: occupation,
      });
    } else if (employmentDetails.isOptional === true && EMPLOYMENT_EXEMPTIONS.indexOf(occupation) !== -1) {
      setEmploymentDetails({
        ...initialJointEmploymentDetails,
        isEnabled: employmentDetails.isEnabled,
        isOptional: employmentDetails.isOptional,
        occupation: occupation,
      });
    } else if (occupation === "Others") {
      setEmploymentDetails({
        ...initialJointEmploymentDetails,
        isEnabled: employmentDetails.isEnabled,
        isOptional: employmentDetails.isOptional,
        occupation: occupation,
        othersOccupation: "",
      });
    } else {
      setEmploymentDetails({
        ...initialJointEmploymentDetails,
        isEnabled: employmentDetails.isEnabled,
        isOptional: employmentDetails.isOptional,
        occupation: occupation,
      });
    }
  };

  const handleToggle = (value: boolean) => {
    if (value === true) {
      setEmploymentDetails({
        ...initialJointEmploymentDetails,
        isEnabled: employmentDetails.isEnabled,
        isOptional: value,
        occupation: employmentDetails.occupation,
      });
    }

    if (value === false) {
      setEmploymentDetails({
        ...initialJointEmploymentDetails,
        country: "",
        isEnabled: employmentDetails.isEnabled,
        isOptional: value,
        occupation: employmentDetails.occupation,
      });
    }
  };

  return (
    <View>
      <View style={px(sw24)}>
        {jointAgeCheck === true ? (
          <Fragment>
            <Switch label={EMPLOYMENT_DETAILS.LABEL_DETAILS_OPTIONAL} onPress={handleEnable} toggle={enabled} />
            <CustomSpacer space={sh40} />
          </Fragment>
        ) : null}
        {employmentDetails.isEnabled === true ? (
          <Fragment>
            <View>
              <EmploymentInfo
                accountHolder="Joint"
                accountType={accountType}
                employmentDetails={employmentDetails}
                personalDetails={personalDetails}
                handleOccupation={handleOccupation}
                handleToggle={handleToggle}
                setEmploymentDetails={setEmploymentDetails}
                setPersonalInfoDetails={setPersonalInfoDetails}
                setValidations={setValidations}
                validations={validations}
              />
            </View>
          </Fragment>
        ) : null}
      </View>
    </View>
  );
};
