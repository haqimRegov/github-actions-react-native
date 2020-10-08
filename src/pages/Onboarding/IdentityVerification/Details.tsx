import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";

import {
  AddressField,
  AdvancedDropdown,
  CheckBox,
  CustomDatePicker,
  CustomSpacer,
  CustomTextInput,
  TextSpaceArea,
} from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_GENDER, DICTIONARY_SALUTATION } from "../../../data/dictionary";
import { colorTransparent, fs12BoldBlack2, px, sh143, sh24, sh32, sh8, sw16, sw48 } from "../../../styles";

const { ID_VERIFICATION } = Language.PAGE;

export interface IDDetailsProps {
  accountHolder?: TypeAccountHolder;
  addressInfo: IAddressInfoState;
  personalDetails: IPersonalDetailsState;
  setAddressInfo: (value: IAddressInfoState) => void;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
}

export const IDDetails: FunctionComponent<IDDetailsProps> = ({
  accountHolder,
  addressInfo,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
}: IDDetailsProps) => {
  const [sameAddressToggle, setSameAddressToggle] = useState<boolean>(true);
  const [principalMailingAddress] = useState<IAddressState>(addressInfo.mailingAddress!);

  const idNumber = personalDetails.idNumber!;
  const idType = personalDetails.idType!;
  const dateOfBirth = personalDetails!.dateOfBirth!;
  const formattedDOB = moment(dateOfBirth).format(DEFAULT_DATE_FORMAT);
  const labelId = `${idType} No.`;
  const isPassport = idType === "Passport";
  const addressType = isPassport ? "Other" : "Malaysia";

  const inputCountryOfBirth = personalDetails.countryOfBirth!;
  const inputExpiryDate = personalDetails.expirationDate!;
  const inputGender = personalDetails.gender!;
  const inputMailingAddress = addressInfo!.mailingAddress!.address!;
  const inputMailingCity = addressInfo!.mailingAddress!.city!;
  const inputMailingCountry = addressInfo!.mailingAddress!.country!;
  const inputMailingPostCode = addressInfo!.mailingAddress!.postCode!;
  const inputMailingState = addressInfo!.mailingAddress!.state!;
  const inputName = personalDetails.name!;
  const inputNationality = personalDetails.nationality!;
  const inputPermanentAddress = addressInfo!.permanentAddress!.address!;
  const inputPermanentCity = addressInfo!.permanentAddress!.city!;
  const inputPermanentCountry = addressInfo!.permanentAddress!.country!;
  const inputPermanentPostCode = addressInfo!.permanentAddress!.postCode!;
  const inputPermanentState = addressInfo!.permanentAddress!.state!;
  const inputPlaceOfBirth = personalDetails.placeOfBirth!;
  const inputSalutation = personalDetails.salutation!;

  const setPermanentInfo = (value: IAddressState) => {
    const sameMailingAddress = sameAddressToggle === true ? { mailingAddress: { ...addressInfo.mailingAddress, ...value } } : {};
    setAddressInfo({ permanentAddress: { ...addressInfo.permanentAddress, ...value }, ...sameMailingAddress });
  };
  const setMailingInfo = (value: IAddressState) => {
    setAddressInfo({ mailingAddress: { ...addressInfo.mailingAddress, ...value } });
  };

  const setExpiryDate = (value: Date) => setPersonalDetails({ expirationDate: value });
  const setInputCountryOfBirth = (value: string) => setPersonalDetails({ countryOfBirth: value });
  const setInputGender = (value: string) => setPersonalDetails({ gender: value });
  const setInputMailingAddress = (value: string) => setMailingInfo({ address: value });
  const setInputMailingCity = (value: string) => setMailingInfo({ city: value });
  const setInputMailingCountry = (value: string) => setMailingInfo({ country: value });
  const setInputMailingPostCode = (value: string) => setMailingInfo({ postCode: value });
  const setInputMailingState = (value: string) => setMailingInfo({ state: value });
  const setInputName = (value: string) => setPersonalDetails({ name: value });
  const setInputNationality = (value: string) => setPersonalDetails({ nationality: value });
  const setInputPermanentAddress = (value: string) => setPermanentInfo({ address: value });
  const setInputPermanentCity = (value: string) => setPermanentInfo({ city: value });
  const setInputPermanentCountry = (value: string) => setPermanentInfo({ country: value });
  const setInputPermanentPostCode = (value: string) => setPermanentInfo({ postCode: value });
  const setInputPermanentState = (value: string) => setPermanentInfo({ state: value });
  const setInputPlaceOfBirth = (value: string) => setPersonalDetails({ placeOfBirth: value });
  const setInputSalutation = (value: string) => setPersonalDetails({ salutation: value });

  const handleAddressToggle = () => {
    if (sameAddressToggle) {
      setSameAddressToggle(false);
      setAddressInfo({ ...addressInfo, mailingAddress: { address: "", postCode: "", city: "", state: "", country: "" } });
    } else {
      setSameAddressToggle(true);
      const mailingAddress = accountHolder === "Joint" ? principalMailingAddress : addressInfo.permanentAddress;
      setAddressInfo({ ...addressInfo, mailingAddress: { ...mailingAddress } });
    }
  };

  const labelSameMailing = accountHolder === "Joint" ? ID_VERIFICATION.LABEL_MAILING_SAME_PRINCIPAL : ID_VERIFICATION.LABEL_MAILING_SAME;

  return (
    <Fragment>
      <CustomSpacer space={sh24} />
      <CustomTextInput disabled={true} label={labelId} value={idNumber} />
      <CustomTextInput disabled={true} label={ID_VERIFICATION.LABEL_DOB} rightIcon="calendar" spaceToTop={sh32} value={formattedDOB} />
      <CustomTextInput label={ID_VERIFICATION.LABEL_NAME} onChangeText={setInputName} spaceToTop={sh32} value={inputName} />
      {isPassport ? (
        <Fragment>
          <AdvancedDropdown
            items={DICTIONARY_COUNTRIES}
            handleChange={setInputNationality}
            label={ID_VERIFICATION.LABEL_NATIONALITY}
            spaceToTop={sh32}
            value={inputNationality}
          />
          <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} style={px(sw16)} text={ID_VERIFICATION.LABEL_EXPIRY} />
          <CustomDatePicker
            datePickerStyle={{ height: sh143 }}
            dropdownStyle={{ borderBottomLeftRadius: sw48, borderBottomRightRadius: sw48, borderBottomColor: colorTransparent }}
            mode="date"
            setValue={setExpiryDate}
            value={inputExpiryDate}
          />
        </Fragment>
      ) : null}
      <AdvancedDropdown
        items={DICTIONARY_SALUTATION}
        handleChange={setInputSalutation}
        label={ID_VERIFICATION.LABEL_SALUTATION}
        spaceToTop={sh32}
        value={inputSalutation}
      />
      <CustomSpacer space={sh32} />
      <AdvancedDropdown items={DICTIONARY_GENDER} handleChange={setInputGender} label={ID_VERIFICATION.LABEL_GENDER} value={inputGender} />
      <CustomSpacer space={sh32} />
      <CustomTextInput label={ID_VERIFICATION.LABEL_POB} onChangeText={setInputPlaceOfBirth} value={inputPlaceOfBirth} />
      <AdvancedDropdown
        items={DICTIONARY_COUNTRIES}
        handleChange={setInputCountryOfBirth}
        label={ID_VERIFICATION.LABEL_COB}
        spaceToTop={sh32}
        value={inputCountryOfBirth}
      />
      <CustomSpacer space={sh32} />
      <AddressField
        addressType={addressType}
        inputAddress={inputPermanentAddress}
        inputCity={inputPermanentCity}
        inputPostCode={inputPermanentPostCode}
        inputState={inputPermanentState}
        inputCountry={isPassport ? inputPermanentCountry : undefined}
        setInputCountry={isPassport ? setInputPermanentCountry : undefined}
        labelAddress={ID_VERIFICATION.LABEL_PERMANENT}
        setInputAddress={setInputPermanentAddress}
        setInputCity={setInputPermanentCity}
        setInputPostCode={setInputPermanentPostCode}
        setInputState={setInputPermanentState}
      />
      <CustomSpacer space={sh32} />
      <CheckBox label={labelSameMailing} labelStyle={fs12BoldBlack2} onPress={handleAddressToggle} toggle={sameAddressToggle} />
      {sameAddressToggle === true ? null : (
        <Fragment>
          <CustomSpacer space={sh32} />
          <AddressField
            addressType={addressType}
            inputAddress={inputMailingAddress}
            inputCity={inputMailingCity}
            inputCountry={isPassport ? inputMailingCountry : undefined}
            setInputCountry={isPassport ? setInputMailingCountry : undefined}
            inputPostCode={inputMailingPostCode}
            inputState={inputMailingState}
            labelAddress={ID_VERIFICATION.LABEL_MAILING}
            setInputAddress={setInputMailingAddress}
            setInputCity={setInputMailingCity}
            setInputPostCode={setInputMailingPostCode}
            setInputState={setInputMailingState}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
