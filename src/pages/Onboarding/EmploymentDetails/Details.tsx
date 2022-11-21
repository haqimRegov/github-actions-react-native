import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { AddressField, CustomSpacer, CustomTextInput, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import {
  DICTIONARY_BUSINESS_NATURE,
  DICTIONARY_GROSS_INCOME,
  DICTIONARY_MALAYSIA_STATES_LIST,
  DICTIONARY_OCCUPATION,
  ERROR,
} from "../../../data/dictionary";
import { px, sh136, sh176, sh24, sh32, sw24 } from "../../../styles";
import { formatNumber, isNumber } from "../../../utils";

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
  const setInputAddress = (value: IAddressMultiline) => setEmploymentDetails({ address: { ...value } });
  const setInputBusinessNature = (value: string) => setEmploymentDetails({ businessNature: value });
  const setInputCity = (value: string) => setEmploymentDetails({ city: value });
  const setInputEmployerName = (value: string) => setEmploymentDetails({ employerName: value });
  const setInputGross = (value: string) => setEmploymentDetails({ grossIncome: value });
  const setInputOccupation = (value: string) => setEmploymentDetails({ occupation: value });
  const setInputPostCode = (value: string) => setEmploymentDetails({ postCode: value });
  const setInputState = (value: string) => setEmploymentDetails({ state: value });

  const checkPermanentPostCode = () => {
    setValidations({
      ...validations,
      postCode: isNumber(inputPostCode) === false && inputCountry === "Malaysia" ? ERROR.INVALID_POST_CODE : undefined,
    });
  };

  const setInputCountry = (input: string) => {
    if (inputCountry !== input) {
      const newState =
        input === "Malaysia" && DICTIONARY_MALAYSIA_STATES_LIST.includes(inputState as TypeMalaysiaState) === false ? "" : inputState;
      setEmploymentDetails({
        postCode: input === "Malaysia" ? formatNumber(inputPostCode) : inputPostCode,
        country: input,
        state: newState,
      });
      setValidations({ ...validations, postCode: undefined });
    } else {
      setEmploymentDetails({ country: input });
    }
  };

  const labelAddress = inputOccupation === "Student" ? EMPLOYMENT_DETAILS.LABEL_SCHOOL_ADDRESS : EMPLOYMENT_DETAILS.LABEL_EMPLOYER_ADDRESS;
  const labelEmployer = inputOccupation === "Student" ? EMPLOYMENT_DETAILS.LABEL_SCHOOL_NAME : EMPLOYMENT_DETAILS.LABEL_EMPLOYER_NAME;
  const addressType = inputCountry !== "Malaysia" ? "Other" : "Malaysia";
  const countryHeight = accountType === "Joint" && accountHolder !== "Joint" ? sh176 : sh136;

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <NewDropdown
        items={DICTIONARY_OCCUPATION}
        handleChange={setInputOccupation}
        label={EMPLOYMENT_DETAILS.LABEL_OCCUPATION}
        value={inputOccupation}
      />
      <CustomSpacer space={sh32} />
      <NewDropdown
        items={DICTIONARY_BUSINESS_NATURE}
        handleChange={setInputBusinessNature}
        label={EMPLOYMENT_DETAILS.LABEL_NATURE_BUSINESS}
        value={inputBusinessNature}
      />
      {accountType === "Joint" && accountHolder === "Joint" ? (
        <Fragment>
          <CustomSpacer space={sh32} />
          <NewDropdown
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
      <AddressField
        addressType={addressType}
        countryDropdownStyle={{ height: countryHeight }}
        inputAddress={inputAddress}
        inputCity={inputCity}
        inputCountry={inputCountry}
        inputPostCode={inputPostCode}
        inputState={inputState}
        labelAddress={labelAddress}
        onBlurPostCode={checkPermanentPostCode}
        postCodeError={validations.postCode}
        setInputAddress={setInputAddress}
        setInputCity={setInputCity}
        setInputCountry={setInputCountry}
        setInputPostCode={setInputPostCode}
        setInputState={setInputState}
      />
    </View>
  );
};
