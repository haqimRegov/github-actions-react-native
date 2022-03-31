import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import {
  AccountHeader,
  AdvanceTextInputArea,
  AdvanceToggleButton,
  CheckBox,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  NewDropdown,
  OutlineButton,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_COUNTRIES, OPTIONS_CRS_TAX_RESIDENCY, OPTIONS_CRS_TIN_REASONS } from "../../../../data/dictionary";
import {
  colorBlack,
  flexChild,
  flexRow,
  fs16SemiBoldGray6,
  px,
  py,
  sh12,
  sh16,
  sh20,
  sh24,
  sh32,
  sh8,
  sw12,
  sw16,
  sw24,
} from "../../../../styles";
import { CrsTerms } from "./Declaration";

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
  taxResident: -1,
  tin: [
    {
      country: "",
      explanation: "",
      explanationSaved: true,
      noTin: false,
      reason: -1,
      tinNumber: "",
    },
  ],
};

export const CrsDeclarationDetails: FunctionComponent<CrsDeclarationProps> = ({
  accountHolder,
  accountType,
  crs,
  handleCrsDeclaration,
  name,
  validations,
}: CrsDeclarationProps) => {
  const { acceptCrs, taxResident, tin } = crs;
  const { showTerms } = validations;

  const handleResident = (value: TypeAdvanceToggleButtonValue) => {
    handleCrsDeclaration({ ...initialState, taxResident: value });
  };

  const handleAcceptCrs = () => handleCrsDeclaration({ ...crs, acceptCrs: !acceptCrs });

  const handleAddTin = () => {
    const updatedTin = [...tin!];
    updatedTin.push(initialState.tin[0]);
    handleCrsDeclaration({ ...crs, tin: updatedTin });
  };

  const headerTitle = accountHolder === "Principal" ? DECLARATIONS.TITLE_PRINCIPAL : DECLARATIONS.TITLE_JOINT;

  return (
    <View>
      <View style={{ ...flexChild, ...px(sw24) }}>
        {accountType === "Individual" ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <AccountHeader spaceToBottom={0} subtitle={headerTitle} title={name} />
          </Fragment>
        )}
        <CustomSpacer space={sh24} />
        <Text style={fs16SemiBoldGray6}>{DECLARATIONS.CRS_ARE_YOU}</Text>
        <CustomSpacer space={sh12} />
        <AdvanceToggleButton
          buttonStyle={{ borderRadius: sw12, height: sw24, width: sw24 }}
          direction="column"
          labels={OPTIONS_CRS_TAX_RESIDENCY}
          labelStyle={{ lineHeight: sh24 }}
          onSelect={handleResident}
          value={taxResident!}
        />
        {taxResident! > 0 && tin !== undefined ? (
          <View>
            <CustomSpacer space={sh32} />
            <Text style={fs16SemiBoldGray6}>{DECLARATIONS.LABEL_DECLARE_TIN}</Text>
            {tin.map((tax: ITinMultiple, index: number) => {
              const handleCountry = (value: string) => {
                const updatedTin = [...tin];
                updatedTin[index] = { ...initialState.tin[0], country: value, tinNumber: tax.tinNumber };
                handleCrsDeclaration({ ...initialState, taxResident: taxResident, tin: updatedTin });
              };

              const handleTinNumber = (value: string) => {
                const updatedTin = [...tin];
                updatedTin[index].tinNumber = value;
                handleCrsDeclaration({ ...crs, tin: updatedTin });
              };

              const handleNoTin = () => {
                const updatedTin = [...tin];
                updatedTin[index] = { ...initialState.tin[0], country: tax.country, noTin: !tax.noTin };
                handleCrsDeclaration({ ...initialState, taxResident: taxResident, tin: updatedTin });
              };

              const handleTinReason = (value: TypeAdvanceToggleButtonValue) => {
                const updatedTin = [...tin];
                updatedTin[index] = { ...initialState.tin[0], country: tax.country, noTin: tax.noTin, reason: value };
                handleCrsDeclaration({ ...initialState, taxResident: taxResident, tin: updatedTin });
              };

              const handleExplanation = (value: string) => {
                const newCrs: ICrsState = { ...crs };
                if (value === "") {
                  newCrs.acceptCrs = false;
                }
                const updatedTin = [...tin];
                updatedTin[index] = { ...updatedTin[index], country: tax.country, explanationSaved: true, explanation: value };
                handleCrsDeclaration({ ...newCrs, taxResident: taxResident, tin: updatedTin });
              };

              const handleSave = (value: boolean) => {
                const updatedTin = [...tin];
                updatedTin[index].explanationSaved = value;
                handleCrsDeclaration({ ...crs, tin: updatedTin });
              };

              const handleRemoveTin = () => {
                const updatedTin = [...tin];
                updatedTin.splice(index, 1);
                handleCrsDeclaration({ ...crs, tin: updatedTin });
              };

              const labelCountry =
                index === 0 ? DECLARATIONS.LABEL_COUNTRY : `${DECLARATIONS.LABEL_COUNTRY} - ${DECLARATIONS.LABEL_ADDITIONAL} ${index}`;
              const labelTin =
                index === 0 ? DECLARATIONS.LABEL_TIN : `${DECLARATIONS.LABEL_TIN} - ${DECLARATIONS.LABEL_ADDITIONAL} ${index}`;

              return (
                <View key={index}>
                  <View style={flexRow}>
                    <NewDropdown
                      items={DICTIONARY_COUNTRIES}
                      handleChange={handleCountry}
                      label={labelCountry}
                      spaceToTop={index === 0 ? sh16 : sh24}
                      value={tax.country!}
                    />
                    <CustomSpacer isHorizontal={true} space={sw16} />
                    {index === 0 ? null : (
                      <View>
                        <CustomFlexSpacer />
                        <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveTin} size={sh24} style={py(sh8)} />
                      </View>
                    )}
                  </View>
                  <CustomSpacer space={sh24} />
                  <CustomTextInput label={labelTin} onChangeText={handleTinNumber} value={tax.tinNumber} disabled={tax.country === ""} />
                  <CustomSpacer space={sh20} />
                  <CheckBox disabled={tax.country === ""} toggle={tax.noTin!} onPress={handleNoTin} label={DECLARATIONS.LABEL_NO_TIN} />
                  {tax.noTin === true ? (
                    <Fragment>
                      <CustomSpacer space={sh32} />
                      <Text style={fs16SemiBoldGray6}>{DECLARATIONS.LABEL_REASON_HEADING}</Text>
                      <CustomSpacer space={sh8} />
                      <AdvanceToggleButton
                        buttonStyle={{ borderRadius: sw12, height: sw24, width: sw24 }}
                        direction="column"
                        labels={OPTIONS_CRS_TIN_REASONS}
                        labelStyle={{ lineHeight: sh24 }}
                        onSelect={handleTinReason}
                        space={sh24}
                        value={tax.reason!}
                      />
                      {tax.reason === 2 ? (
                        <View style={flexRow}>
                          <View>
                            <CustomSpacer space={sh16} />
                            <AdvanceTextInputArea
                              handleContinue={handleExplanation}
                              handleSave={handleSave}
                              placeholder={DECLARATIONS.PLACEHOLDER}
                              saved={tax.explanationSaved!}
                              value={tax.explanation}
                            />
                          </View>
                        </View>
                      ) : null}
                    </Fragment>
                  ) : null}
                  {index < 6 && index === tin.length - 1 ? (
                    <Fragment>
                      <CustomSpacer space={sh24} />
                      <OutlineButton buttonType="dashed" icon="plus" onPress={handleAddTin} text={DECLARATIONS.BUTTON_ADD_TIN} />
                    </Fragment>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
      {showTerms ? <CrsTerms accepted={acceptCrs!} setAccepted={handleAcceptCrs} /> : null}
    </View>
  );
};
