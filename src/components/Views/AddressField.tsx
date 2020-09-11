import React, { Fragment, FunctionComponent, useEffect } from "react";

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
  setInputAddress: (input: string) => void;
  setInputCity: (input: string) => void;
  setInputCountry?: (input: string) => void;
  setInputPostCode: (input: string) => void;
  setInputState: (input: string) => void;
}
export const AddressField: FunctionComponent<AddressFieldProps> = ({
  addressType,
  inputAddress,
  inputCity,
  inputCountry,
  inputPostCode,
  inputState,
  labelAddress,
  setInputAddress,
  setInputCity,
  setInputCountry,
  setInputPostCode,
  setInputState,
}: AddressFieldProps) => {
  useEffect(() => {
    if (addressType === "Other" && inputCountry === DICTIONARY_COUNTRIES[133].value) {
      setInputState("");
    }
  }, [addressType, inputCountry, setInputState]);

  return (
    <Fragment>
      <TextInputArea label={labelAddress} onChangeText={setInputAddress} value={inputAddress} />
      <CustomTextInput label={ADDRESS.LABEL_CITY} onChangeText={setInputCity} spaceToTop={sh32} value={inputCity} />
      <CustomSpacer space={sh32} />
      {addressType !== "Other" || inputCountry === DICTIONARY_COUNTRIES[133].value ? (
        <AdvancedDropdown items={DICTIONARY_MALAYSIA_STATES} handleChange={setInputState} label={ADDRESS.LABEL_STATE} value={inputState} />
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
      <CustomTextInput label={ADDRESS.LABEL_POSTCODE} onChangeText={setInputPostCode} spaceToTop={sh32} value={inputPostCode} />
    </Fragment>
  );
};
