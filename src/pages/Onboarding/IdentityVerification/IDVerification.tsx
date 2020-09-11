import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { Alert, View } from "react-native";

import {
  AddressField,
  AdvancedDropdown,
  CheckBox,
  ContentPage,
  CustomDatePicker,
  CustomSpacer,
  CustomTextInput,
  TextSpaceArea,
} from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE, DICTIONARY_COUNTRIES, DICTIONARY_GENDER, DICTIONARY_SALUTATION } from "../../../data/dictionary";
import { SAMPLE_CLIENT_4 } from "../../../mocks";
import {
  colorTransparent,
  fs12BoldBlack2,
  fs12BoldBlack26,
  fs16BoldBlack26,
  px,
  sh143,
  sh32,
  sh8,
  sw16,
  sw24,
  sw48,
} from "../../../styles";

const { ID_VERIFICATION } = Language.PAGE;

interface IDVerificationProps {
  addClientDetails: (details: IClientDetailsState) => void;
  addPersonalInfo: (info: IPersonalInfoState) => void;
  handleNextStep: (route: TypeOnboardingRoute) => void;
  details: IClientDetailsState;
  personalInfo: IPersonalInfoState;
  riskScore: IRiskScoreState;
}

export const IDVerification: FunctionComponent<IDVerificationProps> = ({
  addPersonalInfo,
  details,
  handleNextStep,
  riskScore,
}: IDVerificationProps) => {
  const { dateOfBirth, id, idType, name, permanentAddress, mailingAddress }: IClientDetailsState = details || SAMPLE_CLIENT_4;
  const defaultNationality = DICTIONARY_ALL_ID_TYPE.indexOf(idType) !== 1 ? DICTIONARY_COUNTRIES[133].value : "";

  const [sameAddressToggle, setSameAddressToggle] = useState<boolean>(true);
  const [inputSalutation, setInputSalutation] = useState<string>("");
  const [inputGender, setInputGender] = useState<string>("");
  const [inputPlaceOfBirth, setInputPlaceOfBirth] = useState<string>("");
  const [inputNationality, setInputNationality] = useState<string>(defaultNationality);
  const [inputCountryOfBirth, setInputCountryOfBirth] = useState<string>("");
  const [inputExpiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [inputPermanentAddress, setInputPermanentAddress] = useState<string>(permanentAddress.address);
  const [inputPermanentPostCode, setInputPermanentPostCode] = useState<string>(permanentAddress.postCode);
  const [inputPermanentCity, setInputPermanentCity] = useState<string>(permanentAddress.city);
  const [inputPermanentState, setInputPermanentState] = useState<string>(permanentAddress.state);
  const [inputPermanentCountry, setInputPermanentCountry] = useState<string>(permanentAddress.country);
  const [inputMailingCountry, setInputMailingCountry] = useState<string>(mailingAddress!.country);
  const [inputMailingAddress, setInputMailingAddress] = useState<string>(mailingAddress!.address);
  const [inputMailingPostCode, setInputMailingPostCode] = useState<string>(mailingAddress!.postCode);
  const [inputMailingCity, setInputMailingCity] = useState<string>(mailingAddress!.city);
  const [inputMailingState, setInputMailingState] = useState<string>(mailingAddress!.state);
  const [inputName, setInputName] = useState<string>(name);

  const isPassport = idType === "Passport";

  const handleButtonPress = () => {
    Alert.alert("test");
  };

  const handleSubmit = () => {
    const personalDetails: IPersonalDetailsState = {
      idNumber: id,
      dateOfBirth: moment(dateOfBirth, DEFAULT_DATE_FORMAT).toDate(),
      name: name,
      salutation: inputSalutation,
      gender: inputGender,
      placeOfBirth: inputPlaceOfBirth,
      countryOfBirth: inputCountryOfBirth,
      idType: idType,
      riskProfile: riskScore.appetite,
      nationality: inputNationality,
    };
    const principalDetails: IHolderInfoState = {
      personalDetails: personalDetails,
      addressInformation: {
        mailingAddress: {
          address: inputMailingAddress,
          postCode: inputMailingPostCode,
          city: inputMailingCity,
          country: inputMailingCountry,
          state: inputMailingState,
        },
        permanentAddress: {
          address: inputPermanentAddress,
          postCode: inputPermanentPostCode,
          city: inputPermanentCity,
          country: inputPermanentCountry,
          state: inputPermanentState,
        },
      },
    };
    addPersonalInfo({ principal: principalDetails });
    handleNextStep("PersonalDetails");
  };

  // TODO enhancements
  const continueDisabled: boolean =
    inputSalutation === "" ||
    inputGender === "" ||
    inputPlaceOfBirth === "" ||
    inputCountryOfBirth === "" ||
    inputPermanentAddress === "" ||
    inputPermanentPostCode === "" ||
    inputPermanentCity === "" ||
    inputPermanentState === "" ||
    inputPermanentCountry === "" ||
    inputMailingCountry === "" ||
    inputMailingAddress === "" ||
    inputMailingPostCode === "" ||
    inputMailingCity === "" ||
    inputMailingState === "" ||
    inputName === "" ||
    (isPassport && inputExpiryDate === undefined && inputNationality === "");

  const labelId = `${idType} No.`;
  const addressType = isPassport ? "Other" : "Malaysia";

  // TODO enhancements
  const handleAddressToggle = () => {
    if (sameAddressToggle) {
      setSameAddressToggle(false);
      setInputMailingCountry("");
      setInputMailingAddress("");
      setInputMailingPostCode("");
      setInputMailingCity("");
      setInputMailingState("");
    } else {
      setSameAddressToggle(true);

      setInputMailingCountry(mailingAddress!.country);
      setInputMailingAddress(mailingAddress!.address);
      setInputMailingPostCode(mailingAddress!.postCode);
      setInputMailingCity(mailingAddress!.city);
      setInputMailingState(mailingAddress!.state);
    }
  };

  return (
    <ContentPage
      continueDisabled={continueDisabled}
      handleCancel={handleButtonPress}
      handleContinue={handleSubmit}
      labelCancel={ID_VERIFICATION.BUTTON_BACK}
      labelContinue={ID_VERIFICATION.BUTTON_VERIFY}
      subheading={ID_VERIFICATION.LABEL_ID_VERIFY}
      subtitle={ID_VERIFICATION.TITLE}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh32} />
        <CustomTextInput editable={false} label={labelId} labelStyle={fs12BoldBlack26} style={fs16BoldBlack26} value={id} />
        <CustomTextInput
          editable={false}
          label={ID_VERIFICATION.LABEL_DOB}
          labelStyle={fs12BoldBlack26}
          rightIcon="calendar"
          spaceToTop={sh32}
          style={fs16BoldBlack26}
          value={dateOfBirth}
        />
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
        <AdvancedDropdown
          items={DICTIONARY_GENDER}
          handleChange={setInputGender}
          label={ID_VERIFICATION.LABEL_GENDER}
          value={inputGender}
        />
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
        <CheckBox
          label={ID_VERIFICATION.LABEL_MAILING_SAME}
          labelStyle={fs12BoldBlack2}
          onPress={handleAddressToggle}
          toggle={sameAddressToggle}
        />
        <CustomSpacer space={sh32} />
        {sameAddressToggle === true ? null : (
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
        )}
      </View>
    </ContentPage>
  );
};
