import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, TextSpaceArea } from "../../../components";
import { borderBottomGray4, fs10BoldBlack2, px, sh32, sh8, sw24 } from "../../../styles";
import { DeclarationDetails } from "./Details";

interface JointDeclaration {
  accountType?: TypeAccountChoices;
  declaration: IDeclarationState;
  epfInvestment?: boolean;
  personalDetails: IPersonalDetailsState;
  setDeclaration: (value: IDeclarationState) => void;
}

export const JointDeclaration: FunctionComponent<JointDeclaration> = ({
  accountType,
  declaration,
  epfInvestment,
  personalDetails,
  setDeclaration,
}: JointDeclaration) => {
  return (
    <View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray4} />
      <CustomSpacer space={sh32} />
      <TextSpaceArea spaceToBottom={sh8} style={{ ...fs10BoldBlack2, ...px(sw24) }} text={personalDetails.name!} />
      <DeclarationDetails
        accountHolder="Joint"
        accountType={accountType}
        declaration={declaration}
        epfInvestment={epfInvestment}
        personalDetails={personalDetails}
        setDeclaration={setDeclaration}
      />
    </View>
  );
};
