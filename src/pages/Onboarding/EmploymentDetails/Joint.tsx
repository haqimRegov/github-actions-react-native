import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, CustomSpacer, defaultContentProps, LabeledTitle, Switch } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_COUNTRIES } from "../../../data/dictionary";
import { px, sh40, sw24 } from "../../../styles";
import { EmploymentInfo } from "./Details";

const { EMPLOYMENT_DETAILS } = Language.PAGE;

interface JointEmploymentDetails {
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
  setValidations: (value: IEmploymentDetailsValidations) => void;
  validations: IEmploymentDetailsValidations;
}

const initialEmploymentDetails = {
  businessNature: "",
  employerName: "",
  isEnabled: true,
  grossIncome: "",
  occupation: "",
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
  setValidations,
  validations,
}: JointEmploymentDetails) => {
  const padding = accountType === "Joint" ? px(sw24) : {};

  const handleEnable = (toggle: boolean | undefined) =>
    setEmploymentDetails({ ...employmentDetails, ...initialEmploymentDetails, isEnabled: toggle });

  const jointAgeCheck = accountType === "Joint" && moment().diff(moment(personalDetails?.dateOfBirth, DEFAULT_DATE_FORMAT), "years") < 18;
  const enabled = employmentDetails.isEnabled !== undefined ? employmentDetails.isEnabled : true;

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
            <AccountHeader subtitle={EMPLOYMENT_DETAILS.LABEL_JOINT} title={personalDetails.name!} />
            <LabeledTitle
              label={EMPLOYMENT_DETAILS.HEADING}
              labelStyle={defaultContentProps.subheadingStyle}
              spaceToLabel={defaultContentProps.spaceToTitle}
              style={padding}
              title={EMPLOYMENT_DETAILS.SUBHEADING}
              titleStyle={defaultContentProps.subtitleStyle}
            />
            <View>
              <EmploymentInfo
                accountType={accountType}
                accountHolder="Joint"
                employmentDetails={employmentDetails}
                setEmploymentDetails={setEmploymentDetails}
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
