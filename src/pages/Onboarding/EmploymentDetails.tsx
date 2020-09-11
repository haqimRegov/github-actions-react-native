import React, { FunctionComponent, useState } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";

import { AdvancedDropdown, ContentPage, CustomSpacer, CustomTextInput, TextInputArea, TextSpaceArea } from "../../components";
import { Language } from "../../constants";
import {
  DICTIONARY_BUSINESS_NATURE,
  DICTIONARY_COUNTRIES,
  DICTIONARY_HOUSEHOLD_INCOME,
  DICTIONARY_OCCUPATION,
} from "../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../store";
import { fs12SemiBoldGray8, px, sh24, sh32, sh8, sw16, sw24 } from "../../styles";

const { EMPLOYMENT_DETAILS } = Language.PAGE;
interface EmploymentDetailsProps extends PersonalInfoStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

const EmploymentDetailsComponent: FunctionComponent<EmploymentDetailsProps> = ({
  addPersonalInfo,
  handleNextStep,
}: EmploymentDetailsProps) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputBusinessNature, setInputBusinessNature] = useState<string>("");
  const [inputCity, setInputCity] = useState("");
  const [inputCountry, setInputCountry] = useState<string>(DICTIONARY_COUNTRIES[133].value);
  const [inputEmployerName, setInputEmployerName] = useState<string>("");
  const [inputHousehold, setInputHousehold] = useState<string>("");
  const [inputOccupation, setInputOccupation] = useState<string>("");
  const [inputPostCode, setInputPostCode] = useState<string>("");
  const [inputState, setInputState] = useState("");

  const buttonDisabled =
    inputAddress === "" ||
    inputBusinessNature === "" ||
    inputCity === "" ||
    inputCountry === "" ||
    inputEmployerName === "" ||
    inputHousehold === "" ||
    inputOccupation === "" ||
    inputPostCode === "" ||
    inputState === "";

  const handleButtonPress = () => {
    Alert.alert("test");
  };

  const handleSubmit = () => {
    const principalDetails: IHolderInfoState = {
      employmentDetails: {
        occupation: inputOccupation,
        businessNature: inputBusinessNature,
        monthlyHouseholdIncome: inputHousehold,
        employerName: inputEmployerName,
        address: inputAddress,
        postCode: inputPostCode,
        city: inputCity,
        state: inputState,
        country: inputCountry,
      },
    };

    addPersonalInfo({ principal: principalDetails });
    handleNextStep("Declaration");
  };

  return (
    <ContentPage
      continueDisabled={buttonDisabled}
      handleCancel={handleButtonPress}
      handleContinue={handleSubmit}
      subheading={EMPLOYMENT_DETAILS.HEADING}
      subtitle={EMPLOYMENT_DETAILS.SUBHEADING}>
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
        <CustomSpacer space={sh32} />
        <AdvancedDropdown
          items={DICTIONARY_HOUSEHOLD_INCOME}
          handleChange={setInputHousehold}
          label={EMPLOYMENT_DETAILS.LABEL_HOUSEHOLD}
          value={inputHousehold}
        />
        <TextSpaceArea spaceToTop={sh8} style={{ ...fs12SemiBoldGray8, ...px(sw16) }} text={EMPLOYMENT_DETAILS.LABEL_COMBINED} />
        <CustomSpacer space={sh32} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_NAME} onChangeText={setInputEmployerName} value={inputEmployerName} />
        <CustomSpacer space={sh32} />
        <TextInputArea label={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_ADDRESS} onChangeText={setInputAddress} value={inputAddress} />
        <CustomSpacer space={sh32} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_POST_CODE} onChangeText={setInputPostCode} value={inputPostCode} />
        <CustomSpacer space={sh32} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_CITY} onChangeText={setInputCity} value={inputCity} />
        <CustomSpacer space={sh32} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_STATE} onChangeText={setInputState} value={inputState} />
        <CustomSpacer space={sh32} />
        <AdvancedDropdown
          items={DICTIONARY_COUNTRIES}
          handleChange={setInputCountry}
          label={EMPLOYMENT_DETAILS.LABEL_COUNTRY}
          value={inputCountry}
        />
      </View>
    </ContentPage>
  );
};

export const EmploymentDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmploymentDetailsComponent);
