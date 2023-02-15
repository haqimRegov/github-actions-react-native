import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader } from "../../../components";
import { Language } from "../../../constants";
import { px, sw24 } from "../../../styles";
import { IDDetails, IDDetailsProps } from "./Details";

const { ID_VERIFICATION } = Language.PAGE;

type JointVerificationProps = IDDetailsProps;

export const JointVerification: FunctionComponent<JointVerificationProps> = ({
  addressInfo,
  clientDetails,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
  setValidations,
  validations,
}: JointVerificationProps) => {
  const jointHolderName = personalDetails.name !== undefined ? personalDetails.name : ID_VERIFICATION.LABEL_JOINT;

  return (
    <View style={px(sw24)}>
      <AccountHeader title={ID_VERIFICATION.LABEL_JOINT_HOLDER} subtitle={jointHolderName} />
      <IDDetails
        accountHolder="Joint"
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
