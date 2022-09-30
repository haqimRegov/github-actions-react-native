import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, defaultContentProps, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { px, sw24 } from "../../../styles";
import { PersonalInfo } from "./Details";

const { PERSONAL_DETAILS } = Language.PAGE;

interface JointDetails {
  accountNames: TypeLabelValue[];
  bankDetails: IBankSummaryState;
  contactDetails: IContactDetailsState;
  epfDetails: IEpfDetailsState;
  epfInvestment: boolean;
  epfShariah: boolean;
  investmentCurrencies: string[];
  jointContactCheck: boolean;
  personalDetails: IPersonalDetailsState;
  setBankDetails: (value: IBankSummaryState) => void;
  setContactDetails: (value: IContactDetailsState) => void;
  setEpfDetails: (value: IEpfDetailsState) => void;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IPersonalDetailsValidations) => void;
  validations: IPersonalDetailsValidations;
}

export const JointDetails: FunctionComponent<JointDetails> = ({
  accountNames,
  bankDetails,
  contactDetails,
  epfDetails,
  epfInvestment,
  epfShariah,
  investmentCurrencies,
  jointContactCheck,
  personalDetails,
  setBankDetails,
  setContactDetails,
  setEpfDetails,
  setPersonalDetails,
  setValidations,
  validations,
}: JointDetails) => {
  return (
    <View>
      <View style={px(sw24)}>
        <AccountHeader subtitle={PERSONAL_DETAILS.LABEL_JOINT} title={personalDetails.name!} />
        <View style={px(sw24)}>
          <LabeledTitle
            label={PERSONAL_DETAILS.SUBHEADING_PERSONAL}
            labelStyle={defaultContentProps.subheadingStyle}
            spaceToLabel={defaultContentProps.spaceToTitle}
            title={PERSONAL_DETAILS.SUBTITLE_REACH}
            titleStyle={defaultContentProps.subtitleStyle}
          />
        </View>
        <PersonalInfo
          accountHolder="Joint"
          accountNames={accountNames}
          accountType="Joint"
          bankDetails={bankDetails}
          contactDetails={contactDetails}
          epfDetails={epfDetails}
          epfInvestment={epfInvestment}
          epfShariah={epfShariah}
          investmentCurrencies={investmentCurrencies}
          jointContactCheck={jointContactCheck}
          personalDetails={personalDetails}
          setBankDetails={setBankDetails}
          setContactDetails={setContactDetails}
          setEpfDetails={setEpfDetails}
          setPersonalDetails={setPersonalDetails}
          setValidations={setValidations}
          validations={validations}
        />
      </View>
    </View>
  );
};
