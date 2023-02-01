import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, Switch } from "../../../components";
import { Language } from "../../../constants";
import { px, sh16, sh40, sw24 } from "../../../styles";
import { EmploymentInfo, initialJointEmploymentDetails } from "./Details";

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

  const jointAgeCheck = accountType === "Joint" && moment().diff(moment(personalDetails?.dateOfBirth), "years") < 18;
  const enabled = employmentDetails.isEnabled !== undefined ? employmentDetails.isEnabled : true;

  return (
    <View>
      <View style={px(sw24)}>
        {jointAgeCheck === true ? (
          <Fragment>
            <CustomSpacer space={sh40} />
            <Switch label={EMPLOYMENT_DETAILS.LABEL_DETAILS_OPTIONAL} onPress={handleEnable} toggle={enabled} />
            <CustomSpacer space={sh16} />
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
