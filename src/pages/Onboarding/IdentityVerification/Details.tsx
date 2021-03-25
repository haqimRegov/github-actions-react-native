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
import { DICTIONARY_COUNTRIES, DICTIONARY_GENDER, DICTIONARY_SALUTATION, ERROR } from "../../../data/dictionary";
import { colorBlue, colorTransparent, fs12BoldBlack2, sh136, sh143, sh24, sh32, sh8, sw48 } from "../../../styles";
import { isNonNumber, isNumber } from "../../../utils";

const { ID_VERIFICATION } = Language.PAGE;

export interface IDDetailsProps {
  accountHolder?: TypeAccountHolder;
  addressInfo: IAddressInfoState;
  personalDetails: IPersonalDetailsState;
  setAddressInfo: (value: IAddressInfoState) => void;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IIDVerificationValidations) => void;
  validations: IIDVerificationValidations;
}

export const IDDetails: FunctionComponent<IDDetailsProps> = ({
  accountHolder,
  addressInfo,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
  setValidations,
  validations,
}: IDDetailsProps) => {
  const [sameAddressToggle, setSameAddressToggle] = useState<boolean>(true);
  const [principalMailingAddress] = useState<IAddressState>(addressInfo.mailingAddress!);

  const idNumber = personalDetails.idNumber!;
  const idType = personalDetails.idType!;
  const dateOfBirth = personalDetails.dateOfBirth!;
  const formattedDOB = moment(dateOfBirth).format(DEFAULT_DATE_FORMAT);
  const labelOtherId = idType !== "Passport" ? `${idType} ID` : idType;
  const labelId = idType !== "NRIC" ? `${labelOtherId} Number` : idType;
  const isPassport = idType === "Passport";
  const addressType = isPassport ? "Other" : "Malaysia";

  const inputCountryOfBirth = personalDetails.countryOfBirth!;
  const inputExpiryDate = personalDetails.expirationDate!;
  const inputGender = personalDetails.gender!;
  const inputMailingAddress = addressInfo.mailingAddress!.address!;
  const inputMailingCity = addressInfo.mailingAddress!.city!;
  const inputMailingCountry = addressInfo.mailingAddress!.country!;
  const inputMailingPostCode = addressInfo.mailingAddress!.postCode!;
  const inputMailingState = addressInfo.mailingAddress!.state!;
  const inputName = personalDetails.name!;
  const inputNationality = personalDetails.nationality!;
  const inputPermanentAddress = addressInfo.permanentAddress!.address!;
  const inputPermanentCity = addressInfo.permanentAddress!.city!;
  const inputPermanentCountry = addressInfo.permanentAddress!.country!;
  const inputPermanentPostCode = addressInfo.permanentAddress!.postCode!;
  const inputPermanentState = addressInfo.permanentAddress!.state!;
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
  const setInputMailingAddress = (value: IAddressMultiline) => setMailingInfo({ address: { ...value } });
  const setInputMailingCity = (value: string) => setMailingInfo({ city: value });
  const setInputMailingPostCode = (value: string) => setMailingInfo({ postCode: value });
  const setInputMailingState = (value: string) => setMailingInfo({ state: value });
  const setInputName = (value: string) => setPersonalDetails({ name: value });
  const setInputNationality = (value: string) => setPersonalDetails({ nationality: value });
  const setInputPermanentAddress = (value: IAddressMultiline) => setPermanentInfo({ address: { ...value } });
  const setInputPermanentCity = (value: string) => setPermanentInfo({ city: value });
  const setInputPermanentPostCode = (value: string) => setPermanentInfo({ postCode: value });
  const setInputPermanentState = (value: string) => setPermanentInfo({ state: value });
  const setInputPlaceOfBirth = (value: string) => setPersonalDetails({ placeOfBirth: value });
  const setInputSalutation = (value: string) => setPersonalDetails({ salutation: value });

  const handleAddressToggle = () => {
    if (sameAddressToggle) {
      setSameAddressToggle(false);
      setAddressInfo({
        ...addressInfo,
        mailingAddress: {
          ...addressInfo.mailingAddress!,
          address: {
            line1: "",
            line2: undefined,
            line3: undefined,
          },
          postCode: "",
          city: "",
          state: "",
        },
      });
    } else {
      setSameAddressToggle(true);
      const mailingAddress = accountHolder === "Joint" ? principalMailingAddress : addressInfo.permanentAddress;
      setAddressInfo({ ...addressInfo, mailingAddress: { ...mailingAddress } });
    }
  };

  const setInputPermanentCountry = (input: string) => {
    if (inputPermanentCountry !== input) {
      setPermanentInfo({ postCode: "", country: input });
      setValidations({ ...validations, permanentPostCode: undefined });
    } else {
      setPermanentInfo({ country: input });
    }
  };

  const setInputMailingCountry = (input: string) => {
    if (inputMailingCountry !== input) {
      setMailingInfo({ postCode: "", country: input });
      setValidations({ ...validations, mailingPostCode: undefined });
    } else {
      setMailingInfo({ country: input });
    }
  };

  const checkPermanentPostCode = () => {
    setValidations({
      ...validations,
      permanentPostCode:
        isNumber(inputPermanentPostCode) === false && inputPermanentCountry === "Malaysia" ? ERROR.INVALID_POST_CODE : undefined,
    });
  };

  const checkMailingPostCode = () => {
    setValidations({
      ...validations,
      mailingPostCode: isNumber(inputMailingPostCode) === false && inputMailingCountry === "Malaysia" ? ERROR.INVALID_POST_CODE : undefined,
    });
  };

  const checkName = () => {
    setValidations({ ...validations, name: isNonNumber(inputName) === false ? ERROR.INVALID_NAME : undefined });
  };

  const labelSameMailing = accountHolder === "Joint" ? ID_VERIFICATION.LABEL_MAILING_SAME_PRINCIPAL : ID_VERIFICATION.LABEL_MAILING_SAME;
  const nameLabel = `${ID_VERIFICATION.LABEL_NAME} (as per ${labelOtherId})`;

  return (
    <Fragment>
      <CustomTextInput disabled={true} label={labelId} spaceToTop={sh24} value={idNumber} />
      <CustomTextInput
        disabled={true}
        label={ID_VERIFICATION.LABEL_DOB}
        rightIcon="calendar"
        rightIconColor={colorBlue._2}
        spaceToTop={sh32}
        value={formattedDOB}
      />
      <CustomTextInput
        autoCapitalize="words"
        disabled={true}
        error={validations.name}
        label={nameLabel}
        onBlur={checkName}
        onChangeText={setInputName}
        spaceToTop={sh32}
        value={inputName}
      />
      {isPassport ? (
        <Fragment>
          <AdvancedDropdown
            items={DICTIONARY_COUNTRIES}
            handleChange={setInputNationality}
            label={ID_VERIFICATION.LABEL_NATIONALITY}
            spaceToTop={sh32}
            value={inputNationality}
          />
          <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} text={ID_VERIFICATION.LABEL_EXPIRY} />
          <CustomDatePicker
            datePickerStyle={{ height: sh143 }}
            dropdownStyle={{ borderBottomLeftRadius: sw48, borderBottomRightRadius: sw48, borderBottomColor: colorTransparent }}
            mode="date"
            minimumDate={moment().toDate()}
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
      <CustomTextInput
        autoCapitalize="words"
        label={ID_VERIFICATION.LABEL_POB}
        onChangeText={setInputPlaceOfBirth}
        value={inputPlaceOfBirth}
      />
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
        onBlurPostCode={checkPermanentPostCode}
        postCodeError={validations.permanentPostCode}
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
            onBlurPostCode={checkMailingPostCode}
            postCodeError={validations.mailingPostCode}
            setInputAddress={setInputMailingAddress}
            setInputCity={setInputMailingCity}
            setInputPostCode={setInputMailingPostCode}
            setInputState={setInputMailingState}
            stateDropdownStyle={{ height: sh136 }}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
