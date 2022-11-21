import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, NewDropdown, Switch, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import {
  DICTIONARY_ALL_ID_TYPE,
  DICTIONARY_COUNTRIES,
  DICTIONARY_CURRENCY,
  DICTIONARY_HOUSEHOLD_INCOME,
  ERROR,
} from "../../../data/dictionary";
import { borderBottomGray2, fs12RegGray5, fs24BoldGray6, px, sh24, sh32, sh40, sh8, sw24, sw360, sw40 } from "../../../styles";
import { isNonNumber, isNumber } from "../../../utils";
import { BankDetails } from "./BankDetails";
import { ContactDetails } from "./ContactDetails";
import { EPFDetails } from "./EPFDetails";
import { JointRelationship } from "./JointRelationship";
import { MalaysianDetails } from "./MalaysianDetails";
import { PRSDetails } from "./PRSDetails";

const { PERSONAL_DETAILS } = Language.PAGE;

interface PersonalInfoProps {
  accountType: TypeAccountChoices;
  accountHolder: TypeAccountHolder;
  accountNames: TypeLabelValue[];
  bankDetails: IBankSummaryState;
  contactDetails: IContactDetailsState;
  epfDetails: IEpfDetailsState;
  epfInvestment: boolean;
  epfShariah: boolean;
  investmentCurrencies: string[];
  isAllEpf?: boolean;
  jointContactCheck?: boolean;
  personalDetails: IPersonalDetailsState;
  setBankDetails: (value: IBankSummaryState) => void;
  setContactDetails: (value: IContactDetailsState) => void;
  setEpfDetails: (value: IEpfDetailsState) => void;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
  setValidations: (value: IPersonalDetailsValidations) => void;
  validations: IPersonalDetailsValidations;
}

const initialBankDetails: IBankDetailsState = {
  bankAccountName: "",
  bankAccountNumber: "",
  bankLocation: DICTIONARY_COUNTRIES[0].value,
  bankName: "",
  bankSwiftCode: "",
  currency: [DICTIONARY_CURRENCY[0].value],
  otherBankName: "",
};

export const PersonalInfo: FunctionComponent<PersonalInfoProps> = ({
  accountType,
  accountHolder,
  accountNames,
  bankDetails,
  contactDetails,
  epfDetails,
  epfInvestment,
  epfShariah,
  investmentCurrencies,
  isAllEpf,
  jointContactCheck,
  personalDetails,
  setBankDetails,
  setContactDetails,
  setEpfDetails,
  setPersonalDetails,
  setValidations,
  validations,
}: PersonalInfoProps) => {
  const { localBank, foreignBank } = bankDetails;

  const inputEducation = personalDetails.educationLevel!;
  const inputOtherEducation = personalDetails.otherEducationLevel!;
  const inputRace = personalDetails.race!;
  const inputBumiputera = personalDetails.bumiputera!;
  const inputEpfType = epfDetails.epfAccountType!;
  const inputEpfNumber = epfDetails.epfMemberNumber!;
  const inputMotherName = personalDetails.mothersMaidenName!;
  const inputMaritalStatus = personalDetails.maritalStatus!;
  const inputMonthlyHousehold = personalDetails.monthlyHouseholdIncome!;

  const setInputRace = (value: string) => setPersonalDetails({ race: value });
  const setInputBumiputera = (value: string) => setPersonalDetails({ bumiputera: value });
  const setInputEpfType = (value: string) => setEpfDetails({ epfAccountType: value });
  const setInputEpfNumber = (value: string) => setEpfDetails({ epfMemberNumber: value });
  const setInputMotherName = (value: string) => setPersonalDetails({ mothersMaidenName: value });
  const setInputMaritalStatus = (value: string) => setPersonalDetails({ maritalStatus: value });
  const setInputEducation = (value: string) =>
    setPersonalDetails({ educationLevel: value, otherEducationLevel: value !== "Others" ? "" : inputOtherEducation });
  const setInputOtherEducation = (value: string) => setPersonalDetails({ otherEducationLevel: value });
  const setInputMonthlyHousehold = (value: string) => setPersonalDetails({ monthlyHouseholdIncome: value });

  const setLocalBank = (value: IBankDetailsState[]) => {
    setBankDetails({ localBank: value });
  };

  const handleEnable = (toggle: boolean | undefined) => {
    setPersonalDetails({ ...personalDetails, enableBankDetails: toggle });
    const bankSummary: IBankSummaryState = {
      localBank: [{ ...initialBankDetails }],
      foreignBank: [],
    };
    setBankDetails(bankSummary);
  };

  const setForeignBank = (value: IBankDetailsState[]) => {
    setBankDetails({ foreignBank: value });
  };

  const setContactNumber = (value: IContactNumberState[]) => {
    setContactDetails({ contactNumber: value });
  };

  const checkEpfNumber = () => {
    setValidations({
      ...validations,
      epfNumber: isNumber(inputEpfNumber) === false || inputEpfNumber === "" ? ERROR.INVALID_NUMBER : undefined,
    });
  };

  const checkMothersName = () => {
    setValidations({
      ...validations,
      mothersName: isNonNumber(inputMotherName) === false || inputMotherName === "" ? ERROR.INVALID_NAME : undefined,
    });
  };

  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(personalDetails.idType! as TypeClientID) !== 1;
  const isContactOptional = jointContactCheck !== undefined ? jointContactCheck : false;
  const enabled = personalDetails.enableBankDetails !== undefined ? personalDetails.enableBankDetails : true;

  return (
    <View>
      <ContactDetails contactNumber={contactDetails.contactNumber!} setContactNumber={setContactNumber} optional={isContactOptional} />
      {isMalaysian ? (
        <MalaysianDetails
          inputBumiputera={inputBumiputera}
          inputRace={inputRace}
          setInputBumiputera={setInputBumiputera}
          setInputRace={setInputRace}
        />
      ) : null}
      {accountType === "Joint" && accountHolder === "Principal" ? (
        <JointRelationship personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} />
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
      <View style={px(sw24)}>
        <NewDropdown
          items={DICTIONARY_HOUSEHOLD_INCOME}
          handleChange={setInputMonthlyHousehold}
          label={
            isContactOptional === true
              ? `${PERSONAL_DETAILS.LABEL_MONTHLY_INCOME} ${PERSONAL_DETAILS.LABEL_OPTIONAL}`
              : PERSONAL_DETAILS.LABEL_MONTHLY_INCOME
          }
          value={inputMonthlyHousehold}
        />
      </View>
      <TextSpaceArea spaceToTop={sh8} style={{ ...fs12RegGray5, ...px(sw40), width: sw360 }} text={PERSONAL_DETAILS.LABEL_COMBINED} />
      {epfInvestment === true && accountHolder === "Principal" ? (
        <EPFDetails
          epfNumberError={validations.epfNumber}
          epfShariah={epfShariah}
          inputEpfNumber={inputEpfNumber}
          inputEpfType={inputEpfType}
          onBlurEpfNumber={checkEpfNumber}
          setInputEpfNumber={setInputEpfNumber}
          setInputEpfType={setInputEpfType}
        />
      ) : (
        <CustomSpacer space={sh32} />
      )}
      {accountType === "Joint" && accountHolder === "Joint" ? null : (
        <Fragment>
          {isAllEpf === true ? (
            <View style={px(sw24)}>
              <Switch label={PERSONAL_DETAILS.LABEL_ADD_BANK_DETAILS_OPTIONAL} onPress={handleEnable} toggle={enabled} />
              <CustomSpacer space={sh40} />
            </View>
          ) : null}
          {enabled === true || isAllEpf === false ? (
            <Fragment>
              <View style={borderBottomGray2} />
              <View style={px(sw24)}>
                <TextSpaceArea spaceToBottom={sh24} spaceToTop={sh32} style={fs24BoldGray6} text={PERSONAL_DETAILS.HEADING_ADDITIONAL} />
              </View>
              <BankDetails
                bankNames={accountNames}
                foreignBankDetails={foreignBank!}
                investmentCurrencies={investmentCurrencies}
                localBankDetails={localBank!}
                setForeignBankDetails={setForeignBank}
                setLocalBankDetails={setLocalBank}
              />
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </View>
  );
};
