import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { LabeledTitle, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { fs10BoldBlack2, fs16RegBlack2, fs24BoldBlack2, px, sh8, sw24 } from "../../../styles";
import { IDDetails, IDDetailsProps } from "./Details";

const { ID_VERIFICATION } = Language.PAGE;

interface JointVerificationProps extends IDDetailsProps {}

export const JointVerification: FunctionComponent<JointVerificationProps> = ({
  addressInfo,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
}: JointVerificationProps) => {
  return (
    <View style={px(sw24)}>
      <TextSpaceArea spaceToBottom={sh8} style={fs10BoldBlack2} text={ID_VERIFICATION.LABEL_JOINT} />
      <LabeledTitle
        label={ID_VERIFICATION.LABEL_ID_VERIFY}
        labelStyle={fs24BoldBlack2}
        spaceToLabel={sh8}
        title={ID_VERIFICATION.TITLE}
        titleStyle={fs16RegBlack2}
      />
      <IDDetails
        accountHolder="Joint"
        addressInfo={addressInfo}
        personalDetails={personalDetails}
        setAddressInfo={setAddressInfo}
        setPersonalDetails={setPersonalDetails}
      />
    </View>
  );
};
