import React from "react";
import { Alert, View } from "react-native";

import { CustomSpacer, LinkText, RadioButtonGroup, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_TAX_RESIDENCY } from "../../../../data/dictionary";
import { borderBottomBlack21, fs16SemiBoldBlack2, fs24BoldBlack2, px, sh16, sh24, sh32, sh8, sw24 } from "../../../../styles";
import { NO_TIN_OPTIONS, TaxIdentificationNumber } from "./TaxIdentificationNumber";

interface ICRSDeclarationTaxNumber {
  country: string;
  noTaxIdNumber: boolean;
  otherReason?: string;
  reason?: string;
  taxIdNumber: string;
}

const { DECLARATION } = Language.PAGE;

interface CRSDeclarationProps {
  inputTaxIdNumber: ICRSDeclarationTaxNumber[];
  inputTaxResidency: string;
  setInputTaxIdNumber: (input: ICRSDeclarationTaxNumber[]) => void;
  setTaxResidency: (input: string) => void;
}

export const CRSDeclaration = ({ inputTaxIdNumber, inputTaxResidency, setInputTaxIdNumber, setTaxResidency }: CRSDeclarationProps) => {
  // TODO Note for CRS from FRS
  // TODO Section Logic: This will not appear if EPF investment is selected.
  // TODO Section Logic: This will not appear for the joint holder if joint holder is below 18 years old.
  // TODO Add Additional TaxNumber only when Non-Malaysian.
  // TODO Question: If add additional TaxNumber, User then will need to answer Q2, Q3 and Q4 again. Why give the No TaxNumber choice if they are adding another TaxNumber?

  const initialStateTaxNumber: ICRSDeclarationTaxNumber = {
    country: "",
    taxIdNumber: "",
    noTaxIdNumber: false,
    reason: NO_TIN_OPTIONS[0].value,
    otherReason: "",
  };

  const handleCRSPress = () => {
    Alert.alert("CRS CRSDeclaration!");
  };

  const handleTaxResidency = (input: string) => {
    if (input === OPTIONS_TAX_RESIDENCY[0]) {
      setInputTaxIdNumber([initialStateTaxNumber]);
    }
    setTaxResidency(input);
  };

  return (
    <View>
      <View style={borderBottomBlack21} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} style={fs24BoldBlack2} text={DECLARATION.LABEL_CRS} />
        <LinkText text={DECLARATION.LABEL_DECLARATION} onPress={handleCRSPress} />
        <CustomSpacer space={sh24} />
        <TextSpaceArea spaceToBottom={sh16} style={fs16SemiBoldBlack2} text={DECLARATION.LABEL_TAX_RESIDENCY} />
        <RadioButtonGroup options={OPTIONS_TAX_RESIDENCY} selected={inputTaxResidency} setSelected={handleTaxResidency} />
      </View>
      {inputTaxResidency !== OPTIONS_TAX_RESIDENCY[0] ? (
        <TaxIdentificationNumber inputTaxIdNumber={inputTaxIdNumber} setInputTaxIdNumber={setInputTaxIdNumber} />
      ) : null}
    </View>
  );
};
