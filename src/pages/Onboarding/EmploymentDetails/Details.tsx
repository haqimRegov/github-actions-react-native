import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { AdvancedDropdown, CustomSpacer, CustomTextInput, TextInputArea } from "../../../components";
import { Language } from "../../../constants";
import {
  DICTIONARY_BUSINESS_NATURE,
  DICTIONARY_COUNTRIES,
  DICTIONARY_GROSS_INCOME,
  DICTIONARY_MALAYSIA_STATES,
  DICTIONARY_MALAYSIA_STATES_LIST,
  DICTIONARY_OCCUPATION,
  ERROR,
} from "../../../data/dictionary";
import { px, sh122, sh24, sh32, sw24 } from "../../../styles";
import { isNumber } from "../../../utils";

const { EMPLOYMENT_DETAILS } = Language.PAGE;
interface EmploymentInfoProps {
  accountHolder?: TypeAccountHolder;
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
  setValidations: (value: IEmploymentDetailsValidations) => void;
  validations: IEmploymentDetailsValidations;
}

export const EmploymentInfo: FunctionComponent<EmploymentInfoProps> = ({
  accountType,
  accountHolder,
  employmentDetails,
  setEmploymentDetails,
  setValidations,
  validations,
}: EmploymentInfoProps) => {
  const inputAddress = employmentDetails.address!;
  const inputBusinessNature = employmentDetails.businessNature!;
  const inputCity = employmentDetails.city!;
  const inputCountry = employmentDetails.country!;
  const inputEmployerName = employmentDetails.employerName!;
  const inputGross = employmentDetails.grossIncome!;
  const inputOccupation = employmentDetails.occupation!;
  const inputPostCode = employmentDetails.postCode!;
  const inputState = employmentDetails.state!;
  const setInputAddress = (value: string) => setEmploymentDetails({ address: value });
  const setInputBusinessNature = (value: string) => setEmploymentDetails({ businessNature: value });
  const setInputCity = (value: string) => setEmploymentDetails({ city: value });
  const setInputCountry = (value: string) =>
    setEmploymentDetails({
      country: value,
      state:
        value === DICTIONARY_COUNTRIES[0].value && DICTIONARY_MALAYSIA_STATES_LIST.includes(inputState as TypeMalaysiaState) === false
          ? ""
          : inputState,
    });
  const setInputEmployerName = (value: string) => setEmploymentDetails({ employerName: value });
  const setInputGross = (value: string) => setEmploymentDetails({ grossIncome: value });
  const setInputOccupation = (value: string) => setEmploymentDetails({ occupation: value });
  const setInputPostCode = (value: string) => setEmploymentDetails({ postCode: value });
  const setInputState = (value: string) => setEmploymentDetails({ state: value });

  const checkPermanentPostCode = () => {
    setValidations({ ...validations, postCode: isNumber(inputPostCode) === false ? ERROR.INVALID_POST_CODE : undefined });
  };

  const labelAddress = inputOccupation === "Student" ? EMPLOYMENT_DETAILS.LABEL_SCHOOL_ADDRESS : EMPLOYMENT_DETAILS.LABEL_EMPLOYER_ADDRESS;
  const labelEmployer = inputOccupation === "Student" ? EMPLOYMENT_DETAILS.LABEL_SCHOOL_NAME : EMPLOYMENT_DETAILS.LABEL_EMPLOYER_NAME;

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <AdvancedDropdown
        items={DICTIONARY_OCCUPATION}
        handleChange={setInputOccupation}
        label={EMPLOYMENT_DETAILS.LABEL_OCCUPATION}
        value={inputOccupation}
      />
      <CustomSpacer space={sh32} />
      <AdvancedDropdown
        items={DICTIONARY_BUSINESS_NATURE}
        handleChange={setInputBusinessNature}
        label={EMPLOYMENT_DETAILS.LABEL_NATURE_BUSINESS}
        value={inputBusinessNature}
      />
      {accountType === "Joint" && accountHolder === "Joint" ? (
        <Fragment>
          <CustomSpacer space={sh32} />
          <AdvancedDropdown
            items={DICTIONARY_GROSS_INCOME}
            handleChange={setInputGross}
            label={EMPLOYMENT_DETAILS.LABEL_GROSS}
            value={inputGross}
          />
        </Fragment>
      ) : null}

      <CustomSpacer space={sh32} />
      <CustomTextInput autoCapitalize="words" label={labelEmployer} onChangeText={setInputEmployerName} value={inputEmployerName} />
      <CustomSpacer space={sh32} />
      <TextInputArea
        autoCapitalize="words"
        label={labelAddress}
        maxLength={255}
        onChangeText={setInputAddress}
        showLength={true}
        value={inputAddress}
      />
      <CustomSpacer space={sh32} />
      <CustomTextInput
        error={validations.postCode}
        keyboardType="numeric"
        label={EMPLOYMENT_DETAILS.LABEL_POSTCODE}
        maxLength={15}
        onBlur={checkPermanentPostCode}
        onChangeText={setInputPostCode}
        value={inputPostCode}
      />
      <CustomSpacer space={sh32} />
      <CustomTextInput autoCapitalize="words" label={EMPLOYMENT_DETAILS.LABEL_CITY} onChangeText={setInputCity} value={inputCity} />
      <CustomSpacer space={sh32} />
      {inputCountry === DICTIONARY_COUNTRIES[0].value ? (
        <AdvancedDropdown
          items={DICTIONARY_MALAYSIA_STATES}
          handleChange={setInputState}
          label={EMPLOYMENT_DETAILS.LABEL_STATE}
          value={inputState}
        />
      ) : (
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_STATE} onChangeText={setInputState} value={inputState} />
      )}
      <CustomSpacer space={sh32} />
      <AdvancedDropdown
        items={DICTIONARY_COUNTRIES}
        handleChange={setInputCountry}
        label={EMPLOYMENT_DETAILS.LABEL_COUNTRY}
        style={{ height: sh122 }}
        value={inputCountry}
      />
    </View>
  );
};
