import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { borderBottomBlack21 } from "../../../styles";
import { CRSDeclaration } from "./CRS";
import { FATCADeclaration } from "./FATCA";

interface DeclarationProps {
  accountHolder?: TypeAccountHolder;
  accountType?: TypeAccountChoices;
  declaration: IDeclarationState;
  epfInvestment?: boolean;
  personalDetails: IPersonalDetailsState;
  setDeclaration: (value: IDeclarationState) => void;
}

export const DeclarationDetails: FunctionComponent<DeclarationProps> = ({
  accountHolder,
  accountType,
  declaration,
  epfInvestment,
  personalDetails,
  setDeclaration,
}: DeclarationProps) => {
  // TODO Note for FATCA from FRS
  // TODO US Citizen will be populated from Nationality
  // TODO Section Logic: This will not appear for the joint holder if joint holder is below 18 years old.

  // TODO Note for CRS from FRS
  // TODO Section Logic: This will not appear if EPF investment is selected.
  // TODO Section Logic: This will not appear for the joint holder if joint holder is below 18 years old.
  // TODO Add Additional TaxNumber only when Non-Malaysian.
  // TODO Question: If add additional TaxNumber, User then will need to answer Q2, Q3 and Q4 again. Why give the No TaxNumber choice if they are adding another TaxNumber?

  // TODO Note for FEA
  // TODO Section Logic: The user will only answer this section if the fund currency purchased in Section 3.3.1 is non-MYR referring to the column “Fund Base Currency” in Master Fund List and this section will not appear if EPF investment is selected
  // TODO Section Logic: This section will not appear for the joint holder if joint holder is below 18 years old.
  const { crs, fatca } = declaration;

  const handleCrs = (value: ICrsState) => {
    setDeclaration({ ...declaration, crs: { ...declaration.crs, ...value } });
  };

  const handleFatca = (value: IFatcaState) => {
    setDeclaration({ ...declaration, fatca: { ...declaration.fatca, ...value } });
  };
  const dateOfBirth = personalDetails.dateOfBirth!;
  const age = moment().diff(dateOfBirth, "years");

  return (
    <View>
      {accountType === "Joint" && accountHolder === "Joint" && age < 18 ? null : <FATCADeclaration fatca={fatca!} setFatca={handleFatca} />}
      <View style={borderBottomBlack21} />
      {epfInvestment === true || (accountType === "Joint" && accountHolder === "Joint" && age < 18) ? null : (
        <CRSDeclaration crs={crs!} setCrs={handleCrs} />
      )}
    </View>
  );
};
