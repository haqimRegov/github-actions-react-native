import React, { useState } from "react";
import { Alert, View } from "react-native";

import { ContentPage } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { OPTIONS_TAX_RESIDENCY, OPTIONS_US_BORN, OPTIONS_US_CITIZEN } from "../../../data/dictionary";
import { borderBottomBlack21 } from "../../../styles";
import { CRSDeclaration } from "./CRS";
import { NO_TIN_OPTIONS } from "./CRS/TaxIdentificationNumber";
import { FATCADeclaration } from "./FATCA";

const { DECLARATION } = Language.PAGE;

interface DeclarationProps {
  handleNextStep: (route: string) => void;
}

export const Declaration = ({ handleNextStep }: DeclarationProps) => {
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

  const initialStateTaxNumber: IDeclarationTaxNumber = {
    country: "",
    explanation: "",
    noTaxIdNumber: false,
    reason: NO_TIN_OPTIONS[0].value,
    taxIdNumber: "",
  };

  const initialStateCertificate: ILossCertificate = {
    acknowledgement: undefined,
    certificate: undefined,
    explanation: undefined,
    noCertificate: false,
    reason: undefined,
    uploadLater: false,
  };

  const [inputAmerican, setInputAmerican] = useState<string>(OPTIONS_US_CITIZEN[1]);
  const [inputLossCertificate, setInputLossCertificate] = useState<ILossCertificate>(initialStateCertificate);
  const [inputTaxIdNumber, setInputTaxIdNumber] = useState<IDeclarationTaxNumber[]>([initialStateTaxNumber]);
  const [inputTaxResidency, setInputTaxResidency] = useState<string>(OPTIONS_TAX_RESIDENCY[0]);
  const [inputUSBorn, setInputUSBorn] = useState<string>(OPTIONS_US_BORN[1]);

  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.Acknowledgement);
  };

  const handleCancelPress = () => {
    Alert.alert("Cancel Pressed!");
  };

  const handleTaxResidency = (input: string) => {
    if (input === OPTIONS_TAX_RESIDENCY[0]) {
      setInputTaxIdNumber([initialStateTaxNumber]);
    }
    setInputTaxResidency(input);
  };

  return (
    <ContentPage handleCancel={handleCancelPress} handleContinue={handleSubmit} labelContinue={DECLARATION.BUTTON_AGREE}>
      <FATCADeclaration
        inputAmerican={inputAmerican}
        inputLossCertificate={inputLossCertificate}
        inputUSBorn={inputUSBorn}
        setInputAmerican={setInputAmerican}
        setInputUSBorn={setInputUSBorn}
        setInputLossCertificate={setInputLossCertificate}
      />
      <View style={borderBottomBlack21} />
      <CRSDeclaration
        inputTaxIdNumber={inputTaxIdNumber}
        inputTaxResidency={inputTaxResidency}
        setInputTaxIdNumber={setInputTaxIdNumber}
        setTaxResidency={handleTaxResidency}
      />
    </ContentPage>
  );
};
