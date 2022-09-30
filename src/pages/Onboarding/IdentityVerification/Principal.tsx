import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { AccountHeader, defaultContentProps, LabeledTitle } from "../../../components";
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
          labelStyle={defaultContentProps.subheadingStyle}
          spaceToLabel={defaultContentProps.spaceToTitle!}
          title={ID_VERIFICATION.TITLE}
          titleStyle={defaultContentProps.subtitleStyle}
        />
        <IDDetails
          accountHolder="Principal"
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
