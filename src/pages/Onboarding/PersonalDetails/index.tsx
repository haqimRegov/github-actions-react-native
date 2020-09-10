import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";

import { ContentPage, CustomSpacer, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_CURRENCY, DICTIONARY_MOBILE_CODE } from "../../../data/dictionary";
import { borderBottomBlack21, fs16SemiBoldBlack2, fs24BoldBlack2, px, sh16, sh24, sh32, sw24, sw48 } from "../../../styles";
import { BankDetails } from "./BankDetails";
import { ContactDetails } from "./ContactDetails";
import { EPFDetails } from "./EPFDetails";
import { MalaysianDetails } from "./MalaysianDetails";
import { PRSDetails } from "./PRSDetails";

const { PERSONAL_DETAILS } = Language.PAGE;

interface PersonalDetailsProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
  navigation: IStackNavigationProp;
}

const mobileNumberState: IContactNumber = {
  code: DICTIONARY_MOBILE_CODE[0].value,
  label: PERSONAL_DETAILS.LABEL_MOBILE_NUMBER,
  value: "",
};

// TODO joint and dynamic handling of data
export const PersonalDetails: FunctionComponent<PersonalDetailsProps> = ({ handleNextStep }: PersonalDetailsProps) => {
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
    handleNextStep("Declaration");
  };

  return (
    <ContentPage
      handleCancel={handleCancel}
      handleContinue={handleSubmit}
      subheading={PERSONAL_DETAILS.SUBHEADING_ONE_STEP}
      subtitle={PERSONAL_DETAILS.SUBTITLE}>
      <ContactDetails contactNumber={contactNumber} setContactNumber={setContactNumber} />
      <MalaysianDetails
        inputBumiputera={inputBumiputera}
        inputRace={inputRace}
        setInputBumiputera={setInputBumiputera}
        setInputRace={setInputRace}
      />
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
      <EPFDetails
        inputEpfNumber={inputEpfNumber}
        inputEpfType={inputEpfType}
        setInputEpfNumber={setInputEpfNumber}
        setInputEpfType={setInputEpfType}
      />
      <CustomSpacer space={sh32} />
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
