import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE, DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY, DICTIONARY_MOBILE_CODE } from "../../../data/dictionary";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { borderBottomBlack21, fs16SemiBoldBlack2, fs24BoldBlack2, px, sh16, sh24, sh32, sw24, sw48 } from "../../../styles";
import { BankDetails } from "./BankDetails";
import { ContactDetails } from "./ContactDetails";
import { EPFDetails } from "./EPFDetails";
import { MalaysianDetails } from "./MalaysianDetails";
import { PRSDetails } from "./PRSDetails";

const { PERSONAL_DETAILS } = Language.PAGE;

interface PersonalDetailsProps extends PersonalInfoStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
  navigation: IStackNavigationProp;
}

const mobileNumberState: IContactNumber = {
  code: DICTIONARY_MOBILE_CODE[0].value,
  label: PERSONAL_DETAILS.LABEL_MOBILE_NUMBER,
  value: "",
};

// TODO joint and dynamic handling of data
const PersonalDetailsComponent: FunctionComponent<PersonalDetailsProps> = ({
  addPersonalInfo,
  details,
  handleNextStep,
  personalInfo,
}: PersonalDetailsProps) => {
  const { principal } = personalInfo;

  const initialLocalBankState: IBankingDetails = {
    accountName: "",
    accountNumber: "",
    bankName: "",
    currency: [DICTIONARY_CURRENCY[0].value],
    otherBankName: "",
  };

  const [contactNumber, setContactNumber] = useState<IContactNumber[]>([mobileNumberState]);
  const [localBankDetails, setLocalBankDetails] = useState<IBankingDetails[]>([initialLocalBankState]);
  const [foreignBankDetails, setForeignBankDetails] = useState<IBankingDetails[]>([]);
  const [inputRace, setInputRace] = useState<string>("");
  const [inputBumiputera, setInputBumiputera] = useState<string>(PERSONAL_DETAILS.OPTION_BUMIPUTERA_NO);
  const [inputEpfType, setInputEpfType] = useState<string>("");
  const [inputEpfNumber, setInputEpfNumber] = useState<string>("");
  const [inputMotherName, setInputMotherName] = useState<string>("");
  const [inputMaritalStatus, setInputMaritalStatus] = useState<string>("");
  const [inputEducation, setInputEducation] = useState<string>("");
  const [inputOtherEducation, setInputOtherEducation] = useState<string>("");

  const [inputDistribution, setInputDistribution] = useState<string>(PERSONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT);

  const handleCancel = () => {
    handleNextStep("EmploymentDetails");
  };

  const handleSubmit = () => {
    const contactDetails = { ...principal!.contactDetails! };
    contactNumber.forEach((number: IContactNumber) => {
      if (number.label === PERSONAL_DETAILS.LABEL_MOBILE_NUMBER) {
        contactDetails.mobileNumber = number.value;
        contactDetails.mobileNumberCode = number.code;
      }
      if (number.label === PERSONAL_DETAILS.LABEL_HOME_NUMBER) {
        contactDetails.homeNumber = number.value;
        contactDetails.homeNumberCode = number.code;
      }
      if (number.label === PERSONAL_DETAILS.LABEL_OFFICE_NUMBER) {
        contactDetails.officeNumber = number.value;
        contactDetails.officeNumberCode = number.code;
      }
      if (number.label === PERSONAL_DETAILS.LABEL_FAX_NUMBER) {
        contactDetails.faxNumber = number.value;
        contactDetails.faxNumberCode = number.code;
      }
    });

    const personalDetails: IPersonalDetailsState = {
      ...principal!.personalDetails!,
      bumiputera: inputBumiputera,
      race: inputRace,
      mothersMaidenName: inputMotherName,
      maritalStatus: inputMaritalStatus,
      educationLevel: inputOtherEducation !== "" ? inputOtherEducation : inputEducation,
    };

    const localBank = localBankDetails.map((bank: IBankingDetails) => {
      return {
        bankAccountName: bank.accountName,
        currency: bank.currency,
        bankAccountNumber: bank.accountNumber,
        bankSwiftCode: bank.bankSwiftCode,
        bankName: bank.otherBankName !== "" ? bank.otherBankName : bank.bankName,
        bankLocation: DICTIONARY_COUNTRIES[133].value,
      };
    });
    const foreignBank = foreignBankDetails.map((bank: IBankingDetails) => {
      return {
        bankAccountName: bank.accountName,
        currency: bank.currency,
        bankAccountNumber: bank.accountNumber,
        bankSwiftCode: bank.bankSwiftCode,
        bankName: bank.otherBankName !== "" ? bank.otherBankName : bank.bankName,
        bankLocation: DICTIONARY_COUNTRIES[133].value,
      };
    });

    const bankDetails: IBankSummaryState = {
      localBank: localBank as IBankDetailsState[],
      foreignBank: foreignBank as IBankDetailsState[],
    };

    const epfDetails =
      personalInfo.epfInvestment === true
        ? {
            epfAccountType: inputEpfType,
            epfMemberNumber: inputEpfNumber,
          }
        : undefined;

    const principalDetails: IHolderInfoState = {
      personalDetails: personalDetails,
      bankSummary: bankDetails,
      contactDetails: contactDetails,
      epfDetails: epfDetails,
    };
    addPersonalInfo({ principal: principalDetails });
    handleNextStep("EmploymentDetails");
  };

  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(details?.idType!) !== 1;

  return (
    <ContentPage
      handleCancel={handleCancel}
      handleContinue={handleSubmit}
      subheading={PERSONAL_DETAILS.SUBHEADING_ONE_STEP}
      subtitle={PERSONAL_DETAILS.SUBTITLE}>
      <ContactDetails contactNumber={contactNumber} setContactNumber={setContactNumber} />
      {isMalaysian ? (
        <MalaysianDetails
          inputBumiputera={inputBumiputera}
          inputRace={inputRace}
          setInputBumiputera={setInputBumiputera}
          setInputRace={setInputRace}
        />
      ) : null}
      <PRSDetails
        inputEducation={inputEducation}
        inputMaritalStatus={inputMaritalStatus}
        inputMotherName={inputMotherName}
        inputOtherEducation={inputOtherEducation}
        setInputEducation={setInputEducation}
        setInputMaritalStatus={setInputMaritalStatus}
        setInputMotherName={setInputMotherName}
        setInputOtherEducation={setInputOtherEducation}
      />
      {personalInfo.epfInvestment === true ? (
        <EPFDetails
          inputEpfNumber={inputEpfNumber}
          inputEpfType={inputEpfType}
          setInputEpfNumber={setInputEpfNumber}
          setInputEpfType={setInputEpfType}
        />
      ) : null}
      <Fragment>
        <View style={borderBottomBlack21} />
        <View style={px(sw24)}>
          <TextSpaceArea spaceToBottom={sh24} spaceToTop={sh32} style={fs24BoldBlack2} text={PERSONAL_DETAILS.HEADING_ADDITIONAL} />
        </View>
        <BankDetails
          foreignBankDetails={foreignBankDetails}
          localBankDetails={localBankDetails}
          setForeignBankDetails={setForeignBankDetails}
          setLocalBankDetails={setLocalBankDetails}
        />
        <View style={borderBottomBlack21} />
        <View style={px(sw24)}>
          <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs16SemiBoldBlack2} text={PERSONAL_DETAILS.LABEL_DISTRIBUTION} />
          <RadioButtonGroup
            direction="row"
            options={[PERSONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT, PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST]}
            selected={inputDistribution}
            setSelected={setInputDistribution}
            space={sw48}
          />
        </View>
      </Fragment>
    </ContentPage>
  );
};

export const PersonalDetails = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalDetailsComponent);
