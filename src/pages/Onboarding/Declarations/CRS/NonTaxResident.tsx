import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import {
  AdvancedDropdown,
  AdvanceTextInputArea,
  AdvanceToggleButton,
  CheckBox,
  CustomSpacer,
  CustomTextInput,
} from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_COUNTRIES, OPTIONS_CRS_TIN_REASONS } from "../../../../data/dictionary";
import { fs12BoldBlack2, fs16RegBlack2, fs16SemiBoldBlack2, sh16, sh20, sh24, sh32, sh8 } from "../../../../styles";

const { DECLARATIONS } = Language.PAGE;

interface NonTaxResidentProps {
  country: string;
  explanation: string;
  explanationSaved: boolean;
  handleCountry: (value: string) => void;
  handleExplanation: (value: string) => void;
  handleNoTin: () => void;
  handleSave: (value: boolean) => void;
  handleTinNumber: (value: string) => void;
  handleTinReason: (value: TypeAdvanceToggleButtonValue) => void;
  noTin: boolean;
  reason: TypeAdvanceToggleButtonValue;
  tinNumber: string;
}

export const NonTaxResident: FunctionComponent<NonTaxResidentProps> = ({
  country,
  explanation,
  explanationSaved,
  handleCountry,
  handleExplanation,
  handleNoTin,
  handleSave,
  handleTinNumber,
  handleTinReason,
  noTin,
  reason,
  tinNumber,
}: NonTaxResidentProps) => {
  return (
    <View>
      <CustomSpacer space={sh32} />
      <Text style={fs16RegBlack2}>{DECLARATIONS.LABEL_DECLARE_TIN}</Text>
      <AdvancedDropdown
        items={DICTIONARY_COUNTRIES}
        handleChange={handleCountry}
        label={DECLARATIONS.LABEL_COUNTRY}
        spaceToTop={sh16}
        value={country}
      />
      <CustomSpacer space={sh24} />
      <CustomTextInput label={DECLARATIONS.LABEL_TIN} onChangeText={handleTinNumber} value={tinNumber} disabled={country === ""} />
      <CustomSpacer space={sh20} />
      <CheckBox
        disabled={country === ""}
        toggle={noTin}
        onPress={handleNoTin}
        label={DECLARATIONS.LABEL_NO_TIN}
        labelStyle={fs12BoldBlack2}
      />
      {noTin === true ? (
        <Fragment>
          <CustomSpacer space={sh32} />
          <Text style={fs16SemiBoldBlack2}>{DECLARATIONS.LABEL_REASON_HEADING}</Text>
          <CustomSpacer space={sh8} />
          <AdvanceToggleButton direction="column" labels={OPTIONS_CRS_TIN_REASONS} onSelect={handleTinReason} space={sh24} value={reason} />
          {reason === 2 ? (
            <View>
              <CustomSpacer space={sh16} />
              <AdvanceTextInputArea
                handleContinue={handleExplanation}
                handleSave={handleSave}
                placeholder={DECLARATIONS.PLACEHOLDER}
                saved={explanationSaved}
                value={explanation}
              />
            </View>
          ) : null}
        </Fragment>
      ) : null}
    </View>
  );
};
