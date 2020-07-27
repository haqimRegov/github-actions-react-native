import React, { Fragment, useState } from "react";
import { View } from "react-native";

import { ContentPage, CustomSpacer, LabeledTitle, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { borderBottomBlack21, flexRow, fs24BoldBlack2, fs24RegBlack2, px, sh16, sh24, sh40, sh8, sw12, sw24 } from "../../../styles";
import { BankDetails } from "./BankDetails";
import { ContactDetails } from "./ContactDetails";

const { CONTACT_DETAILS } = Language.PAGE;

// TODO handle joint account
const JOINT_ACCOUNT = 100 / 2 === 50;

interface PersonalDetailsProps {
  handleNextStep: (route: string) => void;
  navigation: IStackNavigationProp;
}

const mobileNumberState: IContactNumber = {
  label: CONTACT_DETAILS.LABEL_MOBILE_NUMBER,
  type: "mobile",
  value: "",
};

const jointMobileNumberState: IContactNumber = {
  label: CONTACT_DETAILS.LABEL_MOBILE_NUMBER,
  type: "mobile",
  value: "",
};

const localBankState: IBankingDetails = {
  accountName: "",
  accountNumber: "",
  bankName: "",
};

export const PersonalDetails = ({ handleNextStep }: PersonalDetailsProps) => {
  const [contactNumber, setContactNumber] = useState<IContactNumber[]>([mobileNumberState]);
  const [inputEmailAddress, setInputEmailAddress] = useState<string>("");
  const [inputRace, setInputRace] = useState<string>("");
  const [inputBumiputera, setInputBumiputera] = useState<string>(CONTACT_DETAILS.OPTION_BUMIPUTERA_YES);

  const [jointContactNumber, setJointContactNumber] = useState<IContactNumber[]>([jointMobileNumberState]);
  const [jointInputEmailAddress, setJointInputEmailAddress] = useState<string>("");
  const [jointInputRace, setJointInputRace] = useState<string>("");
  const [jointInputBumiputera, setJointInputBumiputera] = useState<string>(CONTACT_DETAILS.OPTION_BUMIPUTERA_YES);

  const [bankingDetails, setBankingDetails] = useState<IBankingDetails[]>([localBankState]);
  const [inputApplicantSign, setIInputApplicantSign] = useState<string>(CONTACT_DETAILS.OPTION_CONTROL_PRINCIPAL);

  const handleCancel = () => {
    handleNextStep(ONBOARDING_ROUTES.EmploymentDetails);
  };

  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.PRSDetails);
  };

  return (
    <ContentPage
      handleCancel={handleCancel}
      handleContinue={handleSubmit}
      subheading={CONTACT_DETAILS.HEADING_PRINCIPAL}
      subtitle={CONTACT_DETAILS.SUBHEADING_CONTACT}>
      <View>
        <ContactDetails
          contactNumber={contactNumber}
          inputEmailAddress={inputEmailAddress}
          inputRace={inputRace}
          inputBumiputera={inputBumiputera}
          setContactNumber={setContactNumber}
          setInputEmailAddress={setInputEmailAddress}
          setInputRace={setInputRace}
          setInputBumiputera={setInputBumiputera}
        />
        {JOINT_ACCOUNT === false ? null : (
          <Fragment>
            <CustomSpacer space={sh24} />
            <View style={borderBottomBlack21} />
            <CustomSpacer space={sh24} />
            <LabeledTitle
              label={CONTACT_DETAILS.HEADING_JOINT}
              labelStyle={fs24BoldBlack2}
              style={px(sw24)}
              title={CONTACT_DETAILS.SUBHEADING_CONTACT}
              titleStyle={fs24RegBlack2}
            />
            <ContactDetails
              contactNumber={jointContactNumber}
              inputEmailAddress={jointInputEmailAddress}
              inputRace={jointInputRace}
              inputBumiputera={jointInputBumiputera}
              setContactNumber={setJointContactNumber}
              setInputEmailAddress={setJointInputEmailAddress}
              setInputRace={setJointInputRace}
              setInputBumiputera={setJointInputBumiputera}
            />
          </Fragment>
        )}
      </View>
      <CustomSpacer space={sh24} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <LabeledTitle
          label={CONTACT_DETAILS.HEADING_ADDITIONAL}
          labelStyle={fs24BoldBlack2}
          title={CONTACT_DETAILS.SUBHEADING_BANK}
          titleStyle={fs24RegBlack2}
        />
        <BankDetails bankingDetails={bankingDetails} setBankingDetails={setBankingDetails} />
        {JOINT_ACCOUNT === false ? null : (
          <Fragment>
            <CustomSpacer space={sh16} />
            <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh16} style={fs24RegBlack2} text={CONTACT_DETAILS.LABEL_CONTROL_OPERATION} />
            <View style={flexRow}>
              <CustomSpacer isHorizontal={true} space={sw12} />
              <View>
                <RadioButtonGroup
                  direction="row"
                  labels={[
                    CONTACT_DETAILS.OPTION_CONTROL_PRINCIPAL,
                    CONTACT_DETAILS.OPTION_CONTROL_BOTH,
                    CONTACT_DETAILS.OPTION_CONTROL_EITHER,
                  ]}
                  selected={inputApplicantSign}
                  setSelected={setIInputApplicantSign}
                  space={sh40}
                />
              </View>
            </View>
          </Fragment>
        )}
      </View>
      <CustomSpacer space={sh24} />
    </ContentPage>
  );
};
