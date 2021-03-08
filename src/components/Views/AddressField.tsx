import React, { Fragment, FunctionComponent, useEffect } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_MALAYSIA_STATES } from "../../data/dictionary";
import { colorBlack, colorBlue, flexRow, fs12BoldBlue2, py, sh16, sh24, sh32, sh8, sw16 } from "../../styles";
import { AdvancedDropdown } from "../Dropdown/Advance";
import { CustomTextInput, TextInputMultiline } from "../Input";
import { IconButton, OutlineButton } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

const { ADDRESS } = Language.PAGE;
interface AddressFieldProps {
  addressType?: "Malaysia" | "Other";
  inputAddress: IAddressMultiline;
  inputCity: string;
  inputCountry?: string;
  inputPostCode: string;
  inputState: string;
  labelAddress: string;
  onBlurPostCode?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  postCodeError?: string;
  setInputAddress: (input: IAddressMultiline) => void;
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

  const addressValues = Object.values(inputAddress);

  return (
    <Fragment>
      {addressValues.map((address: string | undefined, index: number) => {
        const handleAddress = (value?: string) => {
          setInputAddress({ ...inputAddress, [`line${index + 1}`]: value });
        };

        const handleAddLine = () => {
          handleAddress("");
        };

        const handleRemoveLine = () => {
          handleAddress();
        };

        const labelLine = index === 0 ? "" : ` - Line ${index + 1} (Optional)`;

        return (
          <View key={index}>
            {index === 0 ? null : <CustomSpacer space={sh16} />}
            {address !== undefined ? (
              <View style={flexRow}>
                <TextInputMultiline
                  autoCapitalize="words"
                  label={`${labelAddress}${labelLine}`}
                  maxLength={100}
                  onChangeText={handleAddress}
                  showLength={true}
                  value={address}
                />
                <CustomSpacer isHorizontal={true} space={sw16} />
                {index === 0 ? null : (
                  <View>
                    <CustomFlexSpacer />
                    <IconButton name="trash" color={colorBlack._1} onPress={handleRemoveLine} size={sh24} style={py(sh8)} />
                    <CustomSpacer space={sh16} />
                  </View>
                )}
                <CustomFlexSpacer />
              </View>
            ) : null}
            {address === undefined && index === addressValues.indexOf(undefined) ? (
              <OutlineButton
                buttonType="dashed"
                color={colorBlue._2}
                icon="plus"
                onPress={handleAddLine}
                text={"Add Additional Line"}
                textStyle={fs12BoldBlue2}
              />
            ) : null}
          </View>
        );
      })}
      <CustomTextInput
        error={postCodeError}
        keyboardType="numeric"
        label={ADDRESS.LABEL_POSTCODE}
        maxLength={15}
        onBlur={onBlurPostCode}
        onChangeText={setInputPostCode}
        spaceToTop={sh24}
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
