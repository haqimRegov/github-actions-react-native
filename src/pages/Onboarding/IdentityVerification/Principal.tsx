import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { LabeledTitle, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { fs10BoldBlack2, fs16RegBlack2, fs24BoldBlack2, px, sh24, sh8, sw24 } from "../../../styles";
import { IDDetails, IDDetailsProps } from "./Details";

const { ID_VERIFICATION } = Language.PAGE;

interface PrincipalVerificationProps extends IDDetailsProps {
  accountType: TypeAccountChoices;
  details: IClientDetailsState;
}

export const PrincipalVerification: FunctionComponent<PrincipalVerificationProps> = ({
  accountType,
  addressInfo,
  details,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
}: PrincipalVerificationProps) => {
  const principalHolderName = details.name !== undefined ? details.name : ID_VERIFICATION.LABEL_PRINCIPAL;
  return (
    <View style={px(sw24)}>
      {accountType === "Individual" ? null : <TextSpaceArea spaceToBottom={sh8} style={fs10BoldBlack2} text={principalHolderName} />}
      <LabeledTitle
        label={ID_VERIFICATION.LABEL_ID_VERIFY}
        labelStyle={fs24BoldBlack2}
        spaceToLabel={sh8}
        title={ID_VERIFICATION.TITLE}
        titleStyle={{ ...fs16RegBlack2, lineHeight: sh24 }}
      />
      <IDDetails
        addressInfo={addressInfo}
        personalDetails={personalDetails}
        setAddressInfo={setAddressInfo}
        setPersonalDetails={setPersonalDetails}
      />
    </View>
  );
};
