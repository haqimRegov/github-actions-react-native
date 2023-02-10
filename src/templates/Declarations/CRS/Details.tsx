import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import {
  AdvanceToggleButton,
  AdvanceToggleButtonProps,
  CheckBox,
  ColorCard,
  CustomSpacer,
  CustomTextInput,
  NewDropdown,
  OutlineButton,
  TextInputMultiline,
} from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_COUNTRIES, OPTIONS_CRS_TAX_RESIDENCY, OPTIONS_CRS_TIN_REASONS_NEW } from "../../../data/dictionary";
import {
  alignSelfStart,
  borderBottomGray2,
  centerHV,
  flexRow,
  fs12BoldGray6,
  fs16RegBlack2,
  px,
  sh16,
  sh20,
  sh24,
  sw12,
  sw20,
  sw24,
  sw729,
} from "../../../styles";
import { CRSTerms } from "./Terms";

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
  crs: ICrsState;
  handleCrsDeclaration: (declaration: ICrsState) => void;
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
  crs,
  handleCrsDeclaration,
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

  const checkBoxStyle = { fontSize: sh16 };

  const advanceToggleProps: Partial<AdvanceToggleButtonProps> = {
    buttonContainerStyle: { ...centerHV, height: sw24, width: sw24 },
    buttonStyle: { borderRadius: sw12, height: sw20, width: sw20 },
    labelStyle: { ...fs16RegBlack2, maxWidth: sw729 },
    subLabelStyle: { maxWidth: sw729 },
    iconSize: sw12,
  };

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <ColorCard
        header={{ label: DECLARATIONS.CRS_ARE_YOU }}
        content={
          <View>
            <AdvanceToggleButton
              {...advanceToggleProps}
              direction="column"
              labels={OPTIONS_CRS_TAX_RESIDENCY}
              onSelect={handleResident}
              value={taxResident!}
            />
          </View>
        }
      />
      {taxResident! > 0 && tin !== undefined ? (
        <View>
          <CustomSpacer space={sh24} />
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

            const handleRemoveTin = () => {
              const updatedTin = [...tin];
              updatedTin.splice(index, 1);
              handleCrsDeclaration({ ...crs, tin: updatedTin });
            };

            const labelCountry =
              tin.length > 1
                ? `${DECLARATIONS.LABEL_TIN_NEW} ${index + 1} ${DECLARATIONS.LABEL_RESIDENCE}`
                : `${DECLARATIONS.LABEL_TIN_NEW} ${DECLARATIONS.LABEL_RESIDENCE}`;
            const labelTin =
              tin.length > 1
                ? `${DECLARATIONS.LABEL_TIN_NEW} ${index + 1} ${DECLARATIONS.LABEL_TIN_FULL_NEW}`
                : `${DECLARATIONS.LABEL_TIN_NEW} ${DECLARATIONS.LABEL_TIN_FULL_NEW}`;
            const headerTitle = tin.length > 1 ? `${DECLARATIONS.CARD_HEADER_TIN} ${index + 1}` : DECLARATIONS.CARD_HEADER_TIN;

            return (
              <View key={index}>
                {index === 0 ? null : <CustomSpacer space={sh24} />}
                <ColorCard
                  header={{ label: headerTitle }}
                  headerIcon={index === 0 ? undefined : { name: "trash", onPress: handleRemoveTin }}
                  content={
                    <View>
                      <NewDropdown items={DICTIONARY_COUNTRIES} handleChange={handleCountry} label={labelCountry} value={tax.country!} />
                      <CustomSpacer space={sh24} />
                      <CustomTextInput
                        disabled={tax.country === "" || tax.noTin === true}
                        label={labelTin}
                        onChangeText={handleTinNumber}
                        value={tax.tinNumber}
                      />
                      <CustomSpacer space={sh20} />
                      <CheckBox
                        disabled={tax.country === "" || (tax.country !== "" && tax.tinNumber !== "")}
                        toggle={tax.noTin!}
                        onPress={handleNoTin}
                        label={DECLARATIONS.LABEL_NO_TIN}
                        labelStyle={checkBoxStyle}
                      />
                      {tax.noTin === true ? (
                        <Fragment>
                          <CustomSpacer space={sh16} />
                          <View style={borderBottomGray2} />
                          <CustomSpacer space={sh16} />
                          <Text style={fs12BoldGray6}>{DECLARATIONS.LABEL_REASON_HEADING}</Text>
                          <CustomSpacer space={sh16} />
                          <AdvanceToggleButton
                            {...advanceToggleProps}
                            buttonContainerStyle={{ ...advanceToggleProps.buttonContainerStyle, ...alignSelfStart }}
                            direction="column"
                            labels={OPTIONS_CRS_TIN_REASONS_NEW}
                            onSelect={handleTinReason}
                            value={tax.reason!}
                          />
                          {tax.reason === 2 ? (
                            <View style={flexRow}>
                              <View>
                                <CustomSpacer space={sh16} />
                                <TextInputMultiline
                                  maxLength={100}
                                  onChangeText={handleExplanation}
                                  showLength={true}
                                  value={tax.explanation}
                                />
                              </View>
                            </View>
                          ) : null}
                        </Fragment>
                      ) : null}
                      {index < 6 && index === tin.length - 1 ? (
                        <Fragment>
                          <CustomSpacer space={sh16} />
                          <View style={borderBottomGray2} />
                          <CustomSpacer space={sh16} />
                          <OutlineButton
                            buttonType="dashed"
                            disabled={
                              tax.country === "" ||
                              (tax.tinNumber === "" && tax.noTin === false) ||
                              (tax.noTin === true && tax.reason === -1) ||
                              (tax.noTin === true && tax.reason === 2 && tax.explanation === "")
                            }
                            icon="plus"
                            onPress={handleAddTin}
                            text={DECLARATIONS.BUTTON_ADD_TIN}
                          />
                        </Fragment>
                      ) : null}
                    </View>
                  }
                />
              </View>
            );
          })}
        </View>
      ) : null}
      {showTerms && taxResident !== undefined && taxResident !== -1 ? (
        <CRSTerms
          acceptCrs={acceptCrs!}
          handleAcceptCrs={handleAcceptCrs}
          taxResident={OPTIONS_CRS_TAX_RESIDENCY[taxResident].label}
          tin={tin}
        />
      ) : null}
    </View>
  );
};
