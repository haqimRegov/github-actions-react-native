import React, { Fragment, FunctionComponent, useEffect } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_MALAYSIA_STATES } from "../../data/dictionary";
import {
  borderBottomGray2,
  centerHorizontal,
  colorBlue,
  DEVICE,
  flexRow,
  py,
  sh126,
  sh16,
  sh176,
  sh24,
  sh8,
  sw360,
  sw40,
  sw424,
} from "../../styles";
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
  const checkScaledDropdownHeight = DEVICE.SCREEN.WIDTH > 1080 || DEVICE.SCREEN.WIDTH < 1080 ? sh126 : sh176;

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

        const filteredAddressValues = addressValues.filter((eachAddress) => eachAddress !== undefined);
        const labelLine = index === 0 && filteredAddressValues.length === 1 ? "" : ` ${index + 1}`;

        return (
          <View key={index} style={{ width: sw424 }}>
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
                      <IconButton name="trash" color={colorBlue._1} onPress={handleRemoveLine} size={sh24} style={py(sh8)} />
                    </View>
                  </Fragment>
                )}
              </View>
            ) : null}
            {address === undefined && index === addressValues.indexOf(undefined) ? (
              <OutlineButton buttonType="dashed" icon="plus" onPress={handleAddLine} text={ADDRESS.BUTTON_ADD} />
            ) : null}
            <CustomSpacer space={sh16} />
          </View>
        );
      })}
      <View style={borderBottomGray2} />
      <CustomTextInput
        autoCapitalize="words"
        error={postCodeError}
        keyboardType="numeric"
        label={ADDRESS.LABEL_POSTCODE}
        maxLength={15}
        onBlur={onBlurPostCode}
        onChangeText={setInputPostCode}
        spaceToTop={sh16}
        value={inputPostCode}
      />
      <CustomTextInput autoCapitalize="words" label={ADDRESS.LABEL_CITY} onChangeText={setInputCity} spaceToTop={sh16} value={inputCity} />
      <CustomSpacer space={sh16} />
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
          maxHeight={checkScaledDropdownHeight}
          spaceToTop={sh16}
          style={countryDropdownStyle}
          value={inputCountry || ""}
        />
      ) : null}
    </View>
  );
};
