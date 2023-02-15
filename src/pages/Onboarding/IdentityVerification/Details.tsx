import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import {
  AddressField,
  CheckBox,
  ColorCard,
  CustomSpacer,
  CustomTextInput,
  NewDatePicker,
  NewDropdown,
  TextSpaceArea,
} from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import {
  DICTIONARY_ALL_ID_TYPE,
  DICTIONARY_COUNTRIES,
  DICTIONARY_GENDER,
  DICTIONARY_MALAYSIA_STATES_LIST,
  DICTIONARY_SALUTATION,
  ERROR,
} from "../../../data/dictionary";
import { borderBottomGray2, fs16BoldBlack2, sh136, sh143, sh16, sh176, sh24, sh4 } from "../../../styles";
import { formatNumber, isNonNumber, isNumber } from "../../../utils";
import { MalaysianDetails } from "./MalaysianDetails";
import { PRSDetails } from "./PRSDetails";

const { ID_VERIFICATION } = Language.PAGE;

export interface IDDetailsProps {
  accountType?: TypeAccountChoices;
  accountHolder: TypeAccountHolder;
  addressInfo: IAddressInfoState;
  clientDetails: IClientBasicInfo;
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
  const checkNameLabel = idType !== "NRIC" && idType !== "Passport" ? `${idType} ID` : idType;
  const idLabel = idType !== "NRIC" && idType !== "Passport" ? `${idType} ID Number` : `${idType} Number`;
  const isPassport = idType === "Passport";
  const addressType = isPassport ? "Other" : "Malaysia";

  const inputCountryIssuance = personalDetails.countryOfIssuance!;
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
  const inputRace = personalDetails.race!;
  const inputBumiputera = personalDetails.bumiputera!;
  const inputEducation = personalDetails.educationLevel!;
  const inputOtherEducation = personalDetails.otherEducationLevel!;
  const inputMaritalStatus = personalDetails.maritalStatus!;
  const inputMotherName = personalDetails.mothersMaidenName!;

  const setPermanentInfo = (value: IAddressState) => {
    const sameMailingAddress =
      sameAddressToggle === true && accountHolder === "Principal" ? { mailingAddress: { ...addressInfo.mailingAddress, ...value } } : {};
    setAddressInfo({ ...addressInfo, permanentAddress: { ...addressInfo.permanentAddress, ...value }, ...sameMailingAddress });
  };
  const setMailingInfo = (value: IAddressState) => {
    setAddressInfo({ ...addressInfo, mailingAddress: { ...addressInfo.mailingAddress, ...value } });
  };

  const setInputRace = (value: string) => setPersonalDetails({ race: value });
  const setInputBumiputera = (value: string) => setPersonalDetails({ bumiputera: value });
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
  const setInputMotherName = (value: string) => setPersonalDetails({ mothersMaidenName: value });
  const setInputMaritalStatus = (value: string) => setPersonalDetails({ maritalStatus: value });
  const setInputEducation = (value: string) =>
    setPersonalDetails({ educationLevel: value, otherEducationLevel: value !== "Others" ? "" : inputOtherEducation });
  const setInputOtherEducation = (value: string) => setPersonalDetails({ otherEducationLevel: value });

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

  const checkMothersName = () => {
    setValidations({
      ...validations,
      mothersName: isNonNumber(inputMotherName) === false || inputMotherName === "" ? ERROR.INVALID_NAME : undefined,
    });
  };

  const labelSameMailing = accountHolder === "Joint" ? ID_VERIFICATION.LABEL_MAILING_SAME_PRINCIPAL : ID_VERIFICATION.LABEL_MAILING_SAME;
  const checkReviewLabelPrincipal =
    accountType === "Individual"
      ? ID_VERIFICATION.LABEL_REVIEW_PRINCIPAL_HOLDER_DETAILS_INDIVIDUAL
      : ID_VERIFICATION.LABEL_REVIEW_PRINCIPAL_HOLDER_DETAILS;
  const checkReviewLabel = accountHolder === "Principal" ? checkReviewLabelPrincipal : ID_VERIFICATION.LABEL_REVIEW_JOINT_HOLDER_DETAILS;
  const checkPersonalDetailsLabelPrincipal =
    accountType === "Individual"
      ? ID_VERIFICATION.LABEL_ADD_PRINCIPAL_HOLDER_PERSONAL_DETAILS_INDIVIDUAL
      : ID_VERIFICATION.LABEL_ADD_PRINCIPAL_HOLDER_PERSONAL_DETAILS;
  const checkPersonalDetailsLabel =
    accountHolder === "Principal" ? checkPersonalDetailsLabelPrincipal : ID_VERIFICATION.LABEL_ADD_JOINT_HOLDER_PERSONAL_DETAILS;
  const checkPermanentAddressLabelPrincipal =
    accountType === "Individual"
      ? ID_VERIFICATION.LABEL_ADD_PRINCIPAL_HOLDER_PERMANENT_ADDRESS_INDIVIDUAL
      : ID_VERIFICATION.LABEL_ADD_PRINCIPAL_HOLDER_PERMANENT_ADDRESS;
  const checkPermanentAddressLabel =
    accountHolder === "Principal" ? checkPermanentAddressLabelPrincipal : ID_VERIFICATION.LABEL_ADD_JOINT_HOLDER_PERMANENT_ADDRESS;
  const checkCorrespondingAddressLabelPrincipal =
    accountType === "Individual"
      ? ID_VERIFICATION.LABEL_ADD_PRINCIPAL_HOLDER_CORRESPONDING_ADDRESS_INDIVIDUAL
      : ID_VERIFICATION.LABEL_ADD_PRINCIPAL_HOLDER_CORRESPONDING_ADDRESS;
  const checkCorrespondingAddressLabel =
    accountHolder === "Principal" ? checkCorrespondingAddressLabelPrincipal : ID_VERIFICATION.LABEL_ADD_JOINT_HOLDER_CORRESPONDING_ADDRESS;
  const nameLabel = `${ID_VERIFICATION.LABEL_NAME} as per ${checkNameLabel}`;
  const countryHeight = accountType === "Joint" && accountHolder !== "Joint" ? sh176 : sh136;
  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(personalDetails.idType! as TypeClientID) !== 1;

  return (
    <Fragment>
      <ColorCard
        header={{ label: checkReviewLabel }}
        content={
          <Fragment>
            <CustomTextInput
              autoCapitalize="words"
              disabled={true}
              error={validations.name}
              label={nameLabel}
              onBlur={checkName}
              onChangeText={setInputName}
              value={inputName}
            />
            <CustomTextInput disabled={true} label={idLabel} spaceToTop={sh16} value={idNumber} />
            <CustomTextInput
              disabled={true}
              label={ID_VERIFICATION.LABEL_DOB}
              rightIcon={{ name: "calendar" }}
              spaceToTop={sh16}
              value={formattedDOB}
            />
            {isPassport ? (
              <Fragment>
                <NewDropdown
                  disabled={true}
                  items={DICTIONARY_COUNTRIES}
                  handleChange={() => {}}
                  label={ID_VERIFICATION.LABEL_COUNTRY_ISSUANCE}
                  spaceToTop={sh16}
                  value={inputCountryIssuance!}
                />
                <TextSpaceArea spaceToBottom={sh4} spaceToTop={sh16} text={ID_VERIFICATION.LABEL_EXPIRY} />
                <NewDatePicker
                  datePickerStyle={{ height: sh143 }}
                  mode="date"
                  minimumDate={moment().toDate()}
                  setValue={setExpiryDate}
                  value={inputExpiryDate}
                />
              </Fragment>
            ) : null}
          </Fragment>
        }
      />
      <CustomSpacer space={sh24} />
      <ColorCard
        content={
          <Fragment>
            <NewDropdown
              items={DICTIONARY_SALUTATION}
              handleChange={setInputSalutation}
              label={ID_VERIFICATION.LABEL_SALUTATION}
              value={inputSalutation}
            />
            <CustomSpacer space={sh16} />
            <NewDropdown items={DICTIONARY_GENDER} handleChange={setInputGender} label={ID_VERIFICATION.LABEL_GENDER} value={inputGender} />
            <CustomSpacer space={sh16} />
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
              spaceToTop={sh16}
              value={inputCountryOfBirth}
            />
            <CustomSpacer space={sh16} />
            <View style={borderBottomGray2} />
            {isPassport ? (
              <Fragment>
                <NewDropdown
                  items={DICTIONARY_COUNTRIES}
                  handleChange={setInputNationality}
                  label={ID_VERIFICATION.LABEL_NATIONALITY}
                  spaceToTop={sh16}
                  value={inputNationality!}
                />
                <CustomSpacer space={sh16} />
                <View style={borderBottomGray2} />
              </Fragment>
            ) : null}
            {isMalaysian ? (
              <Fragment>
                <MalaysianDetails
                  inputBumiputera={inputBumiputera}
                  inputRace={inputRace}
                  setInputBumiputera={setInputBumiputera}
                  setInputRace={setInputRace}
                />
                <CustomSpacer space={sh16} />
                <View style={borderBottomGray2} />
              </Fragment>
            ) : null}
            <PRSDetails
              inputEducation={inputEducation}
              inputMaritalStatus={inputMaritalStatus}
              inputMotherName={inputMotherName}
              inputOtherEducation={inputOtherEducation}
              onBlurMothersName={checkMothersName}
              mothersNameError={validations.mothersName}
              setInputEducation={setInputEducation}
              setInputMaritalStatus={setInputMaritalStatus}
              setInputMotherName={setInputMotherName}
              setInputOtherEducation={setInputOtherEducation}
            />
          </Fragment>
        }
        header={{ label: checkPersonalDetailsLabel }}
      />
      <CustomSpacer space={sh24} />
      <ColorCard
        content={
          <Fragment>
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
            <CustomSpacer space={sh16} />
            <View style={borderBottomGray2} />
            <CustomSpacer space={sh16} />
            <CheckBox label={labelSameMailing} labelStyle={fs16BoldBlack2} onPress={handleAddressToggle} toggle={sameAddressToggle} />
          </Fragment>
        }
        header={{ label: checkPermanentAddressLabel }}
      />
      {sameAddressToggle === true ? null : (
        <Fragment>
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{ label: checkCorrespondingAddressLabel }}
            content={
              <Fragment>
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
            }
          />
        </Fragment>
      )}
    </Fragment>
  );
};
