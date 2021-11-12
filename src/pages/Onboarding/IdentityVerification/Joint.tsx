import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AccountHeader, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { fs16SemiBoldGray6, fs24BoldGray6, px, sh8, sw24 } from "../../../styles";
import { IDDetails, IDDetailsProps } from "./Details";

const { ID_VERIFICATION } = Language.PAGE;

type JointVerificationProps = IDDetailsProps;

export const JointVerification: FunctionComponent<JointVerificationProps> = ({
  addressInfo,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
  setValidations,
  validations,
}: JointVerificationProps) => {
  const jointHolderName = personalDetails.name !== undefined ? personalDetails.name : ID_VERIFICATION.LABEL_JOINT;

  return (
    <View style={px(sw24)}>
      <AccountHeader subtitle={ID_VERIFICATION.LABEL_JOINT} title={jointHolderName} />
      <View style={px(sw24)}>
        <LabeledTitle
          label={ID_VERIFICATION.LABEL_ID_VERIFY}
          labelStyle={fs24BoldGray6}
          spaceToLabel={sh8}
          title={ID_VERIFICATION.TITLE}
          titleStyle={fs16SemiBoldGray6}
        />
        <IDDetails
          accountHolder="Joint"
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
