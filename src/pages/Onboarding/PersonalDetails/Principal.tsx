import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { fs16SemiBoldBlack2, fs24BoldBlack2, px, sh8, sw24 } from "../../../styles";
import { PersonalInfo } from "./Details";

const { PERSONAL_DETAILS } = Language.PAGE;

interface PrincipalDetails {
  accountType: TypeAccountChoices;
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

export const PrincipalDetails: FunctionComponent<PrincipalDetails> = ({
  accountType,
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
}: PrincipalDetails) => {
  const padding = accountType === "Joint" ? px(sw24) : {};

  return (
    <View>
      <View style={px(sw24)}>
        {accountType === "Individual" ? null : (
          <AccountHeader subtitle={PERSONAL_DETAILS.LABEL_PRINCIPAL_HOLDER} title={personalDetails.name!} />
        )}
        <LabeledTitle
          label={PERSONAL_DETAILS.SUBHEADING_PERSONAL}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          style={padding}
          title={PERSONAL_DETAILS.SUBTITLE_REACH}
          titleStyle={fs16SemiBoldBlack2}
        />
      </View>
      <View style={padding}>
        <PersonalInfo
          accountType={accountType}
          accountHolder="Principal"
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
