import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { AccountHeader, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { fs16SemiBoldBlack2, fs24BoldBlack2, px, sh8, sw24 } from "../../../styles";
import { IDDetails, IDDetailsProps } from "./Details";

const { ID_VERIFICATION } = Language.PAGE;

interface PrincipalVerificationProps extends IDDetailsProps {
  accountType: TypeAccountChoices;
}

export const PrincipalVerification: FunctionComponent<PrincipalVerificationProps> = ({
  accountType,
  addressInfo,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
  setValidations,
  validations,
}: PrincipalVerificationProps) => {
  const principalHolderName = personalDetails.name !== undefined ? personalDetails.name : ID_VERIFICATION.LABEL_PRINCIPAL;
  const jointStyle: ViewStyle = accountType === "Joint" ? px(sw24) : {};

  return (
    <View style={px(sw24)}>
      {accountType === "Individual" ? null : <AccountHeader subtitle={ID_VERIFICATION.LABEL_PRINCIPAL} title={principalHolderName} />}
      <View style={jointStyle}>
        <LabeledTitle
          label={ID_VERIFICATION.LABEL_ID_VERIFY}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          title={ID_VERIFICATION.TITLE}
          titleStyle={fs16SemiBoldBlack2}
        />
        <IDDetails
          accountType={accountType}
          addressInfo={addressInfo}
          personalDetails={personalDetails}
          setAddressInfo={setAddressInfo}
          setPersonalDetails={setPersonalDetails}
          setValidations={setValidations}
          validations={validations}
        />
      </View>
    </View>
  );
};
