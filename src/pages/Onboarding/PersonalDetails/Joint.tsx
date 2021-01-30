import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { fs16SemiBoldBlack2, fs24BoldBlack2, px, sh8, sw24 } from "../../../styles";
import { PersonalInfo } from "./Details";

const { PERSONAL_DETAILS } = Language.PAGE;

interface JointDetails {
  bankDetails: IBankSummaryState;
  contactDetails: IContactDetailsState;
  epfDetails: IEpfDetailsState;
  epfInvestment: boolean;
  epfShariah: boolean;
  investmentCurrencies: string[];
  personalDetails: IPersonalDetailsState;
  setBankDetails: (value: IBankSummaryState) => void;
  setContactDetails: (value: IContactDetailsState) => void;
  setEpfDetails: (value: IEpfDetailsState) => void;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IPersonalDetailsValidations) => void;
  validations: IPersonalDetailsValidations;
}

export const JointDetails: FunctionComponent<JointDetails> = ({
  bankDetails,
  contactDetails,
  epfDetails,
  epfInvestment,
  epfShariah,
  investmentCurrencies,
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
            labelStyle={fs24BoldBlack2}
            spaceToLabel={sh8}
            title={PERSONAL_DETAILS.SUBTITLE_REACH}
            titleStyle={fs16SemiBoldBlack2}
          />
        </View>
        <PersonalInfo
          accountHolder="Joint"
          accountType="Joint"
          bankDetails={bankDetails}
          contactDetails={contactDetails}
          epfDetails={epfDetails}
          epfInvestment={epfInvestment}
          epfShariah={epfShariah}
          investmentCurrencies={investmentCurrencies}
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
