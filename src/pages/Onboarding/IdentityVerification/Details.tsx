import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";

import { AddressField, CheckBox, CustomSpacer, CustomTextInput, NewDatePicker, NewDropdown, TextSpaceArea } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import {
  DICTIONARY_COUNTRIES,
  DICTIONARY_GENDER,
  DICTIONARY_MALAYSIA_STATES_LIST,
  DICTIONARY_SALUTATION,
  ERROR,
} from "../../../data/dictionary";
import { sh136, sh143, sh176, sh24, sh32, sh4 } from "../../../styles";
import { formatNumber, isNonNumber, isNumber } from "../../../utils";

const { ID_VERIFICATION } = Language.PAGE;

export interface IDDetailsProps {
  accountType?: TypeAccountChoices;
  accountHolder: TypeAccountHolder;
  addressInfo: IAddressInfoState;
  personalDetails: IPersonalDetailsState;
  setAddressInfo: (value: IAddressInfoState) => void;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IIDVerificationValidations) => void;
  validations: IIDVerificationValidations;
}

export const IDDetails: FunctionComponent<IDDetailsProps> = ({
  accountType,
  accountHolder,
  addressInfo,
  personalDetails,
  setAddressInfo,
  setPersonalDetails,
  setValidations,
  validations,
}: IDDetailsProps) => {
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
  const sameAddressToggle = addressInfo.sameAddress!;

  const setPermanentInfo = (value: IAddressState) => {
    const sameMailingAddress =
      sameAddressToggle === true && accountHolder === "Principal" ? { mailingAddress: { ...addressInfo.mailingAddress, ...value } } : {};
    setAddressInfo({ ...addressInfo, permanentAddress: { ...addressInfo.permanentAddress, ...value }, ...sameMailingAddress });
  };
  const setMailingInfo = (value: IAddressState) => {
    setAddressInfo({ ...addressInfo, mailingAddress: { ...addressInfo.mailingAddress, ...value } });
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
    const mailingAddress = sameAddressToggle
      ? {
          ...addressInfo.mailingAddress!,
          address: { line1: "", line2: undefined, line3: undefined },
          postCode: "",
          city: "",
          state: "",
          country: inputPermanentCountry === "Malaysia" ? "Malaysia" : "",
        }
      : { ...addressInfo.permanentAddress };

    setAddressInfo({ ...addressInfo, mailingAddress: { ...mailingAddress }, sameAddress: !sameAddressToggle });
  };

  const setInputPermanentCountry = (input: string) => {
    if (inputPermanentCountry !== input) {
      const newState =
        input === "Malaysia" && DICTIONARY_MALAYSIA_STATES_LIST.includes(inputPermanentState as TypeMalaysiaState) === false
          ? ""
          : inputPermanentState;
      setPermanentInfo({
        postCode: input === "Malaysia" ? formatNumber(inputPermanentPostCode) : inputPermanentPostCode,
        country: input,
        state: newState,
      });
      setValidations({ ...validations, permanentPostCode: undefined });
    } else {
      setPermanentInfo({ country: input });
    }
  };

  const setInputMailingCountry = (input: string) => {
    if (inputMailingCountry !== input) {
      const newState =
        input === "Malaysia" && DICTIONARY_MALAYSIA_STATES_LIST.includes(inputMailingState as TypeMalaysiaState) === false
          ? ""
          : inputMailingState;
      setMailingInfo({
        postCode: input === "Malaysia" ? formatNumber(inputMailingPostCode) : inputMailingPostCode,
        country: input,
        state: newState,
      });
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
  const countryHeight = accountType === "Joint" && accountHolder !== "Joint" ? sh176 : sh136;

  return (
    <Fragment>
      <CustomTextInput disabled={true} label={labelId} spaceToTop={sh24} value={idNumber} />
      <CustomTextInput
        disabled={true}
        label={ID_VERIFICATION.LABEL_DOB}
        rightIcon={{ name: "calendar" }}
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
          <NewDropdown
            items={DICTIONARY_COUNTRIES}
            handleChange={setInputNationality}
            label={ID_VERIFICATION.LABEL_NATIONALITY}
            spaceToTop={sh32}
            value={inputNationality}
          />
          <TextSpaceArea spaceToBottom={sh4} spaceToTop={sh32} text={ID_VERIFICATION.LABEL_EXPIRY} />
          <NewDatePicker
            datePickerStyle={{ height: sh143 }}
            mode="date"
            minimumDate={moment().toDate()}
            setValue={setExpiryDate}
            value={inputExpiryDate}
          />
        </Fragment>
      ) : null}
      <NewDropdown
        items={DICTIONARY_SALUTATION}
        handleChange={setInputSalutation}
        label={ID_VERIFICATION.LABEL_SALUTATION}
        spaceToTop={sh32}
        value={inputSalutation}
      />
      <CustomSpacer space={sh32} />
      <NewDropdown items={DICTIONARY_GENDER} handleChange={setInputGender} label={ID_VERIFICATION.LABEL_GENDER} value={inputGender} />
      <CustomSpacer space={sh32} />
      <CustomTextInput
        autoCapitalize="words"
        label={ID_VERIFICATION.LABEL_POB}
        onChangeText={setInputPlaceOfBirth}
        value={inputPlaceOfBirth}
      />
      <NewDropdown
        items={DICTIONARY_COUNTRIES}
        handleChange={setInputCountryOfBirth}
        label={ID_VERIFICATION.LABEL_COB}
        spaceToTop={sh32}
        value={inputCountryOfBirth}
      />
      <CustomSpacer space={sh32} />
      <AddressField
        addressType={addressType}
        countryDropdownStyle={{ height: countryHeight }}
        inputAddress={inputPermanentAddress}
        inputCity={inputPermanentCity}
        inputCountry={isPassport ? inputPermanentCountry : undefined}
        inputPostCode={inputPermanentPostCode}
        inputState={inputPermanentState}
        labelAddress={ID_VERIFICATION.LABEL_PERMANENT}
        onBlurPostCode={checkPermanentPostCode}
        postCodeError={validations.permanentPostCode}
        setInputAddress={setInputPermanentAddress}
        setInputCity={setInputPermanentCity}
        setInputCountry={isPassport ? setInputPermanentCountry : undefined}
        setInputPostCode={setInputPermanentPostCode}
        setInputState={setInputPermanentState}
      />
      <CustomSpacer space={sh32} />
      <CheckBox label={labelSameMailing} onPress={handleAddressToggle} toggle={sameAddressToggle} />
      {sameAddressToggle === true ? null : (
        <Fragment>
          <CustomSpacer space={sh32} />
          <AddressField
            addressType="Other"
            countryDropdownStyle={{ height: countryHeight }}
            inputAddress={inputMailingAddress}
            inputCity={inputMailingCity}
            inputCountry={inputMailingCountry}
            inputPostCode={inputMailingPostCode}
            inputState={inputMailingState}
            labelAddress={ID_VERIFICATION.LABEL_MAILING}
            onBlurPostCode={checkMailingPostCode}
            postCodeError={validations.mailingPostCode}
            setInputAddress={setInputMailingAddress}
            setInputCity={setInputMailingCity}
            setInputCountry={setInputMailingCountry}
            setInputPostCode={setInputMailingPostCode}
            setInputState={setInputMailingState}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
