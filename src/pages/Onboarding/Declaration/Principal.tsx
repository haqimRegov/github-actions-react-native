import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { TextSpaceArea } from "../../../components";
import { fs10BoldBlack2, px, sh8, sw24 } from "../../../styles";
import { DeclarationDetails } from "./Details";

interface PrincipalDeclaration {
  accountType: TypeAccountChoices;
  declaration: IDeclarationState;
  epfInvestment?: boolean;
  personalDetails: IPersonalDetailsState;
  setDeclaration: (value: IDeclarationState) => void;
}

export const PrincipalDeclaration: FunctionComponent<PrincipalDeclaration> = ({
  accountType,
  declaration,
  epfInvestment,
  personalDetails,
  setDeclaration,
}: PrincipalDeclaration) => {
  return (
    <View>
      {accountType === "Individual" ? null : (
        <TextSpaceArea spaceToBottom={sh8} style={{ ...fs10BoldBlack2, ...px(sw24) }} text={personalDetails.name!} />
      )}
      <DeclarationDetails
        accountHolder="Principal"
        accountType={accountType}
        declaration={declaration}
        epfInvestment={epfInvestment}
        personalDetails={personalDetails}
        setDeclaration={setDeclaration}
      />
    </View>
  );
};
