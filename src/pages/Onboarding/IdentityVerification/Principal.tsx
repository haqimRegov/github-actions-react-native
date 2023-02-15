import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader } from "../../../components";
import { Language } from "../../../constants";
import { px, sw24 } from "../../../styles";
import { IDDetails, IDDetailsProps } from "./Details";

const { ID_VERIFICATION } = Language.PAGE;

interface PrincipalVerificationProps extends IDDetailsProps {
  accountType: TypeAccountChoices;
}

export const PrincipalVerification: FunctionComponent<PrincipalVerificationProps> = ({
  accountType,
  addressInfo,
  clientDetails,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
  setValidations,
  validations,
}: PrincipalVerificationProps) => {
  const principalHolderName = personalDetails.name !== undefined ? personalDetails.name : ID_VERIFICATION.LABEL_PRINCIPAL;

  return (
    <View style={px(sw24)}>
      {accountType === "Individual" ? null : (
        <AccountHeader title={ID_VERIFICATION.LABEL_PRINCIPAL_HOLDER} subtitle={principalHolderName} />
      )}
      <IDDetails
        accountHolder="Principal"
        accountType={accountType}
        addressInfo={addressInfo}
        clientDetails={clientDetails}
        personalDetails={personalDetails}
        setAddressInfo={setAddressInfo}
        setPersonalDetails={setPersonalDetails}
        setValidations={setValidations}
        validations={validations}
      />
    </View>
  );
};
