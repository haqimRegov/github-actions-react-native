import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, CustomSpacer, LabeledTitle, Switch } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_COUNTRIES } from "../../../data/dictionary";
import { fs16SemiBoldBlack2, fs24BoldBlack2, px, sh56, sh8, sw24 } from "../../../styles";
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
    setEmploymentDetails({ ...employmentDetails, isEnabled: toggle, ...initialEmploymentDetails });

  const enabled = employmentDetails.isEnabled !== undefined ? employmentDetails.isEnabled : true;

  return (
    <View>
      <View style={px(sw24)}>
        <Switch label={EMPLOYMENT_DETAILS.LABEL_DETAILS_OPTIONAL} onPress={handleEnable} toggle={enabled} />
        <CustomSpacer space={sh56} />
        {employmentDetails.isEnabled === true ? (
          <Fragment>
            <AccountHeader subtitle={EMPLOYMENT_DETAILS.LABEL_JOINT} title={personalDetails.name!} />
            <LabeledTitle
              label={EMPLOYMENT_DETAILS.HEADING}
              labelStyle={fs24BoldBlack2}
              spaceToLabel={sh8}
              style={padding}
              title={EMPLOYMENT_DETAILS.SUBHEADING}
              titleStyle={fs16SemiBoldBlack2}
            />
            <View style={padding}>
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
