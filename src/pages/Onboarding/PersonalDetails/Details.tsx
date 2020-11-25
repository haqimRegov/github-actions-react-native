import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { AdvancedDropdown, CustomSpacer, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_ALL_ID_TYPE, DICTIONARY_GROSS_INCOME } from "../../../data/dictionary";
import { borderBottomBlack21, fs12SemiBoldGray8, fs24BoldBlack2, px, sh24, sh32, sh8, sw24, sw40 } from "../../../styles";
import { BankDetails } from "./BankDetails";
import { ContactDetails } from "./ContactDetails";
import { EPFDetails } from "./EPFDetails";
import { JointRelationship } from "./JointRelationship";
import { MalaysianDetails } from "./MalaysianDetails";
import { PRSDetails } from "./PRSDetails";

const { PERSONAL_DETAILS } = Language.PAGE;

interface PersonalInfoProps {
  accountType?: TypeAccountChoices;
  accountHolder?: TypeAccountHolder;
  bankDetails: IBankSummaryState;
  contactDetails: IContactDetailsState;
  epfDetails: IEpfDetailsState;
  epfInvestment: boolean;
  personalDetails: IPersonalDetailsState;
  setBankDetails: (value: IBankSummaryState) => void;
  setContactDetails: (value: IContactDetailsState) => void;
  setEpfDetails: (value: IEpfDetailsState) => void;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
}

export const PersonalInfo: FunctionComponent<PersonalInfoProps> = ({
  accountType,
  accountHolder,
  bankDetails,
  contactDetails,
  epfDetails,
  epfInvestment,
  personalDetails,
  setBankDetails,
  setContactDetails,
  setEpfDetails,
  setPersonalDetails,
}: PersonalInfoProps) => {
  const { localBank, foreignBank } = bankDetails;

  const setInputRace = (value: string) => setPersonalDetails({ race: value });
  const setInputBumiputera = (value: string) => setPersonalDetails({ bumiputera: value });
  const setInputEpfType = (value: string) => setEpfDetails({ epfAccountType: value });
  const setInputEpfNumber = (value: string) => setEpfDetails({ epfMemberNumber: value });
  const setInputMotherName = (value: string) => setPersonalDetails({ mothersMaidenName: value });
  const setInputMaritalStatus = (value: string) => setPersonalDetails({ maritalStatus: value });
  const setInputEducation = (value: string) => setPersonalDetails({ educationLevel: value });
  const setInputOtherEducation = (value: string) => setPersonalDetails({ otherEducationLevel: value });
  const setInputMonthlyHousehold = (value: string) => setPersonalDetails({ monthlyHouseholdIncome: value });

  const inputEducation = personalDetails.educationLevel!;
  const inputOtherEducation = personalDetails.otherEducationLevel!;
  const inputRace = personalDetails.race!;
  const inputBumiputera = personalDetails.bumiputera!;
  const inputEpfType = epfDetails.epfAccountType!;
  const inputEpfNumber = epfDetails.epfMemberNumber!;
  const inputMotherName = personalDetails.mothersMaidenName!;
  const inputMaritalStatus = personalDetails.maritalStatus!;
  const inputMonthlyHousehold = personalDetails.monthlyHouseholdIncome!;

  const setLocalBank = (value: IBankDetailsState[]) => {
    setBankDetails({ localBank: value });
  };

  const setForeignBank = (value: IBankDetailsState[]) => {
    setBankDetails({ foreignBank: value });
  };

  const setContactNumber = (value: IContactNumberState[]) => {
    setContactDetails({ contactNumber: value });
  };

  const isMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(personalDetails!.idType! as TypeClientID) !== 1;

  return (
    <View>
      <ContactDetails contactNumber={contactDetails.contactNumber!} setContactNumber={setContactNumber} />
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
        setInputEducation={setInputEducation}
        setInputMaritalStatus={setInputMaritalStatus}
        setInputMotherName={setInputMotherName}
        setInputOtherEducation={setInputOtherEducation}
      />
      <View style={px(sw24)}>
        <AdvancedDropdown
          items={DICTIONARY_GROSS_INCOME}
          handleChange={setInputMonthlyHousehold}
          label={PERSONAL_DETAILS.LABEL_MONTHLY_INCOME}
          value={inputMonthlyHousehold}
        />
      </View>
      <TextSpaceArea spaceToTop={sh8} style={{ ...fs12SemiBoldGray8, ...px(sw40) }} text={PERSONAL_DETAILS.LABEL_COMBINED} />
      {epfInvestment === true ? (
        <EPFDetails
          inputEpfNumber={inputEpfNumber}
          inputEpfType={inputEpfType}
          setInputEpfNumber={setInputEpfNumber}
          setInputEpfType={setInputEpfType}
        />
      ) : null}
      <Fragment>
        <CustomSpacer space={sh24} />
        <View style={borderBottomBlack21} />
        <View style={px(sw24)}>
          <TextSpaceArea spaceToBottom={sh24} spaceToTop={sh32} style={fs24BoldBlack2} text={PERSONAL_DETAILS.HEADING_ADDITIONAL} />
        </View>
        <BankDetails
          foreignBankDetails={foreignBank!}
          localBankDetails={localBank!}
          setForeignBankDetails={setForeignBank}
          setLocalBankDetails={setLocalBank}
        />
      </Fragment>
    </View>
  );
};
