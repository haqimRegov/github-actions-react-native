import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { AddressField, ColorCard, CustomSpacer, CustomTextInput, NewDropdown, Switch } from "../../../components";
import { Language } from "../../../constants";
import {
  DICTIONARY_BUSINESS_NATURE,
  DICTIONARY_COUNTRIES,
  DICTIONARY_GROSS_INCOME,
  DICTIONARY_HOUSEHOLD_INCOME,
  DICTIONARY_MALAYSIA_STATES_LIST,
  DICTIONARY_OCCUPATION,
  EMPLOYMENT_EXEMPTIONS,
  ERROR,
} from "../../../data/dictionary";
import {
  colorRed,
  flexRow,
  flexWrap,
  fs10RegGray6,
  fs12BoldBlack2,
  fs12RegGray5,
  fs16BoldBlack2,
  fs16BoldBlue1,
  px,
  py,
  sh136,
  sh16,
  sh176,
  sh20,
  sh24,
  sh26,
  sh32,
  sh4,
  sw1,
  sw12,
  sw16,
  sw24,
} from "../../../styles";
import { formatNumber, isNumber } from "../../../utils";

const { EMPLOYMENT_DETAILS, SUMMARY } = Language.PAGE;
interface EmploymentInfoProps {
  accountHolder?: TypeAccountHolder;
  accountType: TypeAccountChoices;
  employmentDetails: IEmploymentDetailsState;
  isOptional?: boolean;
  personalDetails: IPersonalDetailsState;
  setEmploymentDetails: (value: IEmploymentDetailsState) => void;
  setPersonalInfoDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IEmploymentDetailsValidations) => void;
  validations: IEmploymentDetailsValidations;
}

const initialBaseEmploymentDetails: IEmploymentDetailsState = {
  businessNature: "",
  employerName: "",
  grossIncome: "",
  monthlyHouseholdIncome: "",
  occupation: "",
  isOptional: false,
  othersOccupation: "",
  address: {
    line1: "",
    line2: undefined,
    line3: undefined,
  },
  city: "",
  country: "",
  postCode: "",
  state: "",
};

export const initialJointEmploymentDetails: IEmploymentDetailsState = {
  ...initialBaseEmploymentDetails,
  isEnabled: false,
};

export const EmploymentInfo: FunctionComponent<EmploymentInfoProps> = ({
  accountHolder,
  accountType,
  employmentDetails,
  isOptional,
  personalDetails,
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
  const inputMonthlyHousehold = employmentDetails?.monthlyHouseholdIncome!;
  const inputOccupation = employmentDetails.occupation!;
  const inputOthersOccupation = employmentDetails.othersOccupation!;
  const inputPostCode = employmentDetails.postCode!;
  const inputState = employmentDetails.state!;
  const setInputAddress = (value: IAddressMultiline) => setEmploymentDetails({ address: { ...value } });
  const setInputBusinessNature = (value: string) => setEmploymentDetails({ businessNature: value });
  const setInputCity = (value: string) => setEmploymentDetails({ city: value });
  const setInputEmployerName = (value: string) => setEmploymentDetails({ employerName: value });
  const setInputGross = (value: string) => setEmploymentDetails({ grossIncome: value });
  const setInputMonthlyHousehold = (value: string) => setEmploymentDetails({ monthlyHouseholdIncome: value });
  const setInputOccupation = (value: string) => {
    if (value !== employmentDetails.occupation) {
      const initialEmploymentDetails =
        accountHolder === "Joint" ? { ...initialJointEmploymentDetails } : { ...initialBaseEmploymentDetails, grossIncome: inputGross };

      const updatedEmploymentDetails = { ...initialEmploymentDetails, occupation: value, isOptional: false };

      setEmploymentDetails({
        ...updatedEmploymentDetails,
        country: employmentDetails.isOptional === false && EMPLOYMENT_EXEMPTIONS.indexOf(value) !== -1 ? "" : DICTIONARY_COUNTRIES[0].value,
        isEnabled: employmentDetails.isEnabled === true ? true : employmentDetails.isEnabled,
        othersOccupation: value !== "Others" ? "" : employmentDetails.othersOccupation,
      });
    }
  };
  const setInputOthersOccupation = (value: string) => setEmploymentDetails({ othersOccupation: value });
  const setInputPostCode = (value: string) => setEmploymentDetails({ postCode: value });
  const setInputState = (value: string) => setEmploymentDetails({ state: value });

  const handleUpdateOptional = (value: boolean) => {
    const baseEmployment = {
      country: value === false ? "" : employmentDetails.country,
      isEnabled: employmentDetails.isEnabled,
      isOptional: value,
      occupation: employmentDetails.occupation,
    };
    const initialEmploymentDetails =
      accountHolder === "Joint" ? { ...initialJointEmploymentDetails } : { ...initialBaseEmploymentDetails, grossIncome: inputGross };

    setEmploymentDetails({ ...initialEmploymentDetails, ...baseEmployment });
  };

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
  const addressType = inputCountry !== "Malaysia" ? "Other" : "Malaysia";
  const countryHeight = accountType === "Joint" && accountHolder !== "Joint" ? sh176 : sh136;
  const toggleValue = employmentDetails.isOptional !== undefined ? employmentDetails.isOptional : true;
  const headerTitle = accountHolder === "Joint" ? SUMMARY.TITLE_JOINT : SUMMARY.TITLE_PRINCIPAL;

  const handleSwitchOptional = () => {
    handleUpdateOptional(!employmentDetails.isOptional);
  };

  const occupationTitle =
    accountType === "Individual"
      ? EMPLOYMENT_DETAILS.TITLE_YOUR_OCCUPATION
      : `${EMPLOYMENT_DETAILS.LABEL_ADD} ${headerTitle}'s ${EMPLOYMENT_DETAILS.LABEL_OCCUPATION}`;
  const employmentTitle =
    accountType === "Individual"
      ? EMPLOYMENT_DETAILS.TITLE_YOUR_EMPLOYMENT_DETAILS
      : `${EMPLOYMENT_DETAILS.LABEL_ADD} ${headerTitle}'s ${EMPLOYMENT_DETAILS.TITLE_EMPLOYMENT_DETAILS}`;
  const employmentAddressTitle =
    accountType === "Individual"
      ? EMPLOYMENT_DETAILS.TITLE_YOUR_EMPLOYMENT_ADDRESS
      : `${EMPLOYMENT_DETAILS.LABEL_ADD} ${headerTitle}'s ${EMPLOYMENT_DETAILS.TITLE_EMPLOYMENT_ADDRESS}`;
  const checkOptional = isOptional === true ? EMPLOYMENT_DETAILS.LABEL_OCCUPATION_OPTIONAL : EMPLOYMENT_DETAILS.LABEL_OCCUPATION;

  return (
    <View style={px(sw24)}>
      {accountType === "Individual" ? null : (
        <View style={{ marginTop: sh26 }}>
          <View style={{ ...flexRow, paddingBottom: sh4, borderBottomColor: colorRed._1, borderBottomWidth: sw1 }}>
            <Text style={fs10RegGray6}>{headerTitle}</Text>
            <CustomSpacer space={sw16} isHorizontal={true} />
            <Text style={fs12BoldBlack2}>{personalDetails?.name}</Text>
          </View>
        </View>
      )}
      <CustomSpacer space={sh24} />
      <ColorCard
        header={{ labelStyle: fs16BoldBlue1, label: occupationTitle }}
        content={
          <View>
            <NewDropdown items={DICTIONARY_OCCUPATION} handleChange={setInputOccupation} label={checkOptional} value={inputOccupation} />
            {EMPLOYMENT_EXEMPTIONS.indexOf(inputOccupation) !== -1 ? (
              <View style={{ marginTop: sh20 }}>
                <Switch
                  label={EMPLOYMENT_DETAILS.LABEL_OPTIONAL}
                  labelStyle={fs16BoldBlack2}
                  toggle={toggleValue}
                  onPress={handleSwitchOptional}
                  style={{ marginRight: sw12 }}
                />
              </View>
            ) : null}
            {inputOccupation === "Others" ? (
              <View>
                <CustomSpacer space={sh32} />
                <CustomTextInput
                  autoCapitalize="words"
                  label={EMPLOYMENT_DETAILS.LABEL_OTHER_OCCUPATION}
                  onChangeText={setInputOthersOccupation}
                  value={inputOthersOccupation}
                />
              </View>
            ) : null}
          </View>
        }
      />

      {(employmentDetails.isOptional !== undefined && employmentDetails.isOptional === true) ||
      (EMPLOYMENT_EXEMPTIONS.indexOf(inputOccupation) === -1 && inputOccupation !== "") ? (
        <View>
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{ labelStyle: fs16BoldBlue1, label: employmentTitle }}
            content={
              <View>
                <NewDropdown
                  items={DICTIONARY_BUSINESS_NATURE}
                  handleChange={setInputBusinessNature}
                  label={EMPLOYMENT_DETAILS.LABEL_NATURE_BUSINESS}
                  value={inputBusinessNature}
                />
                <CustomSpacer space={sh16} />
                <CustomTextInput
                  autoCapitalize="words"
                  label={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_NAME}
                  onChangeText={setInputEmployerName}
                  value={inputEmployerName}
                />
                {accountType === "Joint" && accountHolder === "Joint" ? (
                  <Fragment>
                    <CustomSpacer space={sh16} />
                    <NewDropdown
                      items={DICTIONARY_GROSS_INCOME}
                      handleChange={setInputGross}
                      label={EMPLOYMENT_DETAILS.LABEL_GROSS}
                      value={inputGross}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <CustomSpacer space={sh16} />
                    <NewDropdown
                      items={DICTIONARY_GROSS_INCOME}
                      handleChange={setInputGross}
                      label={EMPLOYMENT_DETAILS.LABEL_GROSS}
                      value={inputGross}
                      disabled={true}
                    />
                    <Text style={{ ...flexWrap, ...fs12RegGray5, ...py(sh4) }}>{EMPLOYMENT_DETAILS.SUB_LABEL_GROSS}</Text>
                  </Fragment>
                )}

                <Fragment>
                  <CustomSpacer space={sh16} />
                  <NewDropdown
                    items={DICTIONARY_HOUSEHOLD_INCOME}
                    handleChange={setInputMonthlyHousehold}
                    label={EMPLOYMENT_DETAILS.LABEL_HOUSEHOLD}
                    value={inputMonthlyHousehold}
                  />
                  <CustomSpacer space={sh4} />
                  <Text style={{ ...flexWrap, ...fs12RegGray5 }}>{EMPLOYMENT_DETAILS.SUB_LABEL_HOUSEHOLD}</Text>
                </Fragment>
              </View>
            }
          />
          <CustomSpacer space={sh24} />
          <ColorCard
            header={{ labelStyle: fs16BoldBlue1, label: employmentAddressTitle }}
            content={
              <View>
                <AddressField
                  addressType={addressType}
                  countryDropdownStyle={{ height: countryHeight }}
                  inputAddress={inputAddress}
                  inputCity={inputCity}
                  inputCountry={inputCountry}
                  inputPostCode={inputPostCode}
                  inputState={inputState}
                  labelAddress={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_ADDRESS}
                  onBlurPostCode={checkPermanentPostCode}
                  postCodeError={validations.postCode}
                  setInputAddress={setInputAddress}
                  setInputCity={setInputCity}
                  setInputCountry={setInputCountry}
                  setInputPostCode={setInputPostCode}
                  setInputState={setInputState}
                />
              </View>
            }
          />
        </View>
      ) : null}
    </View>
  );
};
