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
} from "../../../data/dictionary";
import { px, sh122, sh24, sh32, sw24 } from "../../../styles";

const { EMPLOYMENT_DETAILS } = Language.PAGE;
interface EmploymentInfoProps {
  accountType: TypeAccountChoices;
  accountHolder?: TypeAccountHolder;
  employmentDetails: IEmploymentDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
}

export const EmploymentInfo: FunctionComponent<EmploymentInfoProps> = ({
  accountType,
  accountHolder,
  employmentDetails,
  setEmploymentDetails,
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
      <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_NAME} onChangeText={setInputEmployerName} value={inputEmployerName} />
      <CustomSpacer space={sh32} />
      <TextInputArea
        label={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_ADDRESS}
        maxLength={255}
        onChangeText={setInputAddress}
        showLength={true}
        value={inputAddress}
      />
      <CustomSpacer space={sh32} />
      <CustomTextInput
        keyboardType="numeric"
        label={EMPLOYMENT_DETAILS.LABEL_POSTCODE}
        maxLength={15}
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
