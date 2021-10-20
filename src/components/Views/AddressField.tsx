import React, { Fragment, FunctionComponent, useEffect } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_MALAYSIA_STATES } from "../../data/dictionary";
import { centerHorizontal, colorBlue, flexRow, fs12BoldBlue2, py, sh16, sh24, sh32, sh8, sw360, sw40, sw424 } from "../../styles";
import { NewDropdown } from "../Dropdown/NewDropdown";
import { CustomTextInput, TextInputMultiline } from "../Input";
import { IconButton, OutlineButton } from "../Touchables";
import { CustomSpacer } from "./Spacer";

const { ADDRESS } = Language.PAGE;
interface AddressFieldProps {
  addressType?: "Malaysia" | "Other";
  countryDropdownStyle?: ViewStyle;
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
  countryDropdownStyle,
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
    <View>
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

        const labelLine = index === 0 ? "" : ` - Line ${index + 1}`;

        return (
          <View key={index} style={{ width: sw424 }}>
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
                  viewStyle={{ width: sw360 }}
                />
                {index === 0 ? null : (
                  <Fragment>
                    <CustomSpacer isHorizontal={true} space={sw40} />
                    <View style={{ ...centerHorizontal }}>
                      <IconButton name="trash" color={colorBlue._2} onPress={handleRemoveLine} size={sh24} style={py(sh8)} />
                    </View>
                  </Fragment>
                )}
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
        autoCapitalize="words"
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
        <NewDropdown
          items={DICTIONARY_MALAYSIA_STATES}
          handleChange={setInputState}
          label={ADDRESS.LABEL_STATE}
          style={stateDropdownStyle}
          value={inputState}
        />
      ) : (
        <CustomTextInput autoCapitalize="words" label={ADDRESS.LABEL_STATE_PROVINCE} onChangeText={setInputState} value={inputState} />
      )}
      {setInputCountry !== undefined ? (
        <NewDropdown
          items={DICTIONARY_COUNTRIES}
          handleChange={setInputCountry}
          label={ADDRESS.LABEL_COUNTRY}
          spaceToTop={sh32}
          style={countryDropdownStyle}
          value={inputCountry || ""}
        />
      ) : null}
    </View>
  );
};
