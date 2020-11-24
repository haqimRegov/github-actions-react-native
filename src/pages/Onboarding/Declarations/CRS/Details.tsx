import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { AdvanceToggleButton, CustomFlexSpacer, CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_CRS_TAX_RESIDENCY } from "../../../../data/dictionary";
import {
  borderBottomRed4,
  centerVertical,
  colorWhite,
  flexChild,
  flexRow,
  fs16RegBlack2,
  fs24BoldBlack2,
  px,
  sh12,
  sh24,
  sh64,
  shadowBlue204,
  sw24,
  sw8,
} from "../../../../styles";
import { CrsTerms } from "./Declaration";
import { NonTaxResident } from "./NonTaxResident";

const { DECLARATIONS } = Language.PAGE;

interface ICrsValidations {
  isNonTaxResident?: boolean;
  isTaxResident?: boolean;
  isTinDeclared?: boolean;
  noTinOtherReason?: boolean;
  noTinWithReason?: boolean;
  showTerms: boolean;
}

interface CrsDeclarationProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  crs: ICrsState;
  handleCrsDeclaration: (declaration: ICrsState) => void;
  name: string;
  validations: ICrsValidations;
}

const initialState = {
  acceptCrs: false,
  country: "",
  explanation: "",
  explanationSaved: true,
  noTin: false,
  reason: -1,
  taxResident: -1,
  tinNumber: "",
};

export const CrsDeclarationDetails: FunctionComponent<CrsDeclarationProps> = ({
  accountHolder,
  accountType,
  crs,
  handleCrsDeclaration,
  name,
  validations,
}: CrsDeclarationProps) => {
  const { acceptCrs, country, explanation, explanationSaved, noTin, reason, taxResident, tinNumber } = crs;
  const { showTerms } = validations;
  const setExplanationSaved = (value: boolean) => handleCrsDeclaration({ ...crs, explanationSaved: value });

  const handleResident = (value: TypeAdvanceToggleButtonValue) => {
    handleCrsDeclaration({ ...initialState, taxResident: value });
  };

  const handleCountry = (value: string) => {
    handleCrsDeclaration({ ...initialState, country: value, taxResident: taxResident, tinNumber: tinNumber });
  };

  const handleTinNumber = (value: string) => {
    handleCrsDeclaration({ ...crs, tinNumber: value });
  };

  const handleNoTin = () => {
    handleCrsDeclaration({ ...initialState, noTin: !noTin, taxResident: taxResident });
  };

  const handleTinReason = (value: TypeAdvanceToggleButtonValue) => {
    handleCrsDeclaration({ ...initialState, noTin: noTin, reason: value, taxResident: taxResident });
  };

  const handleExplanation = (value: string) => {
    const newCrs: ICrsState = { ...crs };
    if (value === "") {
      newCrs.acceptCrs = false;
    }
    handleCrsDeclaration({ ...newCrs, explanation: value, explanationSaved: true });
  };

  const handleAcceptCrs = () => handleCrsDeclaration({ ...crs, acceptCrs: !acceptCrs });

  const headerStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...borderBottomRed4,
    ...shadowBlue204,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh64,
    position: "relative",
    zIndex: 1,
  };

  const headerTitle = accountHolder === "Principal" ? DECLARATIONS.TITLE_PRINCIPAL : DECLARATIONS.TITLE_JOINT;

  return (
    <View>
      <View style={{ ...flexChild, ...px(sw24) }}>
        {accountType === "Individual" ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <View style={headerStyle}>
              <Text style={fs24BoldBlack2}>{name}</Text>
              <CustomFlexSpacer />
              <Text style={fs16RegBlack2}>{headerTitle}</Text>
            </View>
          </Fragment>
        )}
        <CustomSpacer space={sh24} />
        <Text style={fs16RegBlack2}>{DECLARATIONS.CRS_ARE_YOU}</Text>
        <CustomSpacer space={sh12} />
        <AdvanceToggleButton direction="column" labels={OPTIONS_CRS_TAX_RESIDENCY} onSelect={handleResident} value={taxResident!} />
        {taxResident! > 0 ? (
          <NonTaxResident
            country={country!}
            explanation={explanation!}
            explanationSaved={explanationSaved!}
            handleCountry={handleCountry}
            handleExplanation={handleExplanation}
            handleNoTin={handleNoTin}
            handleSave={setExplanationSaved}
            handleTinNumber={handleTinNumber}
            handleTinReason={handleTinReason}
            noTin={noTin!}
            reason={reason!}
            tinNumber={tinNumber!}
          />
        ) : null}
      </View>
      {showTerms ? <CrsTerms accepted={acceptCrs!} setAccepted={handleAcceptCrs} /> : null}
    </View>
  );
};
