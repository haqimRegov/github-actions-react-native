import React, { Fragment, FunctionComponent, useEffect } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_MALAYSIA_STATES } from "../../data/dictionary";
import { sh32 } from "../../styles";
import { AdvancedDropdown } from "../Dropdown/Advance";
import { CustomTextInput, TextInputArea } from "../Input";
import { CustomSpacer } from "./Spacer";

const { ADDRESS } = Language.PAGE;
interface AddressFieldProps {
  addressType?: "Malaysia" | "Other";
  inputAddress: string;
  inputCity: string;
  inputCountry?: string;
  inputPostCode: string;
  inputState: string;
  labelAddress: string;
  onBlurPostCode?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  postCodeError?: string;
  setInputAddress: (input: string) => void;
  setInputCity: (input: string) => void;
  setInputCountry?: (input: string) => void;
  setInputPostCode: (input: string) => void;
  setInputState: (input: string) => void;
  stateDropdownStyle?: ViewStyle;
}
export const AddressField: FunctionComponent<AddressFieldProps> = ({
  addressType,
  inputAddress,
  inputCity,
  inputCountry,
  inputPostCode,
  inputState,
  labelAddress,
  onBlurPostCode,
  postCodeError,
  setInputAddress,
  setInputCity,
  setInputCountry,
  setInputPostCode,
  setInputState,
  stateDropdownStyle,
}: AddressFieldProps) => {
  useEffect(() => {
    if (addressType === "Other" && inputCountry === DICTIONARY_COUNTRIES[0].value) {
      // TODO Address field enhancement when changing to Country: Malaysia
      // setInputState("");
    }
  }, [addressType, inputCountry, inputState, setInputState]);

  return (
    <Fragment>
      <TextInputArea autoCapitalize="words" label={labelAddress} maxLength={255} onChangeText={setInputAddress} value={inputAddress} />
      <CustomTextInput
        error={postCodeError}
        keyboardType="numeric"
        label={ADDRESS.LABEL_POSTCODE}
        maxLength={15}
        onBlur={onBlurPostCode}
        onChangeText={setInputPostCode}
        spaceToTop={sh32}
        value={inputPostCode}
      />
      <CustomTextInput autoCapitalize="words" label={ADDRESS.LABEL_CITY} onChangeText={setInputCity} spaceToTop={sh32} value={inputCity} />
      <CustomSpacer space={sh32} />
      {addressType !== "Other" || inputCountry === DICTIONARY_COUNTRIES[0].value ? (
        <AdvancedDropdown
          items={DICTIONARY_MALAYSIA_STATES}
          handleChange={setInputState}
          label={ADDRESS.LABEL_STATE}
          style={stateDropdownStyle}
          value={inputState}
        />
      ) : (
        <CustomTextInput label={ADDRESS.LABEL_STATE_PROVINCE} onChangeText={setInputState} value={inputState} />
      )}
      {setInputCountry !== undefined ? (
        <AdvancedDropdown
          items={DICTIONARY_COUNTRIES}
          handleChange={setInputCountry}
          label={ADDRESS.LABEL_COUNTRY}
          spaceToTop={sh32}
          value={inputCountry || ""}
        />
      ) : null}
    </Fragment>
  );
};
