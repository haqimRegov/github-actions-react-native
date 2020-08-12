import React, { useState } from "react";
import { Alert, View } from "react-native";

import { ContentPage, CustomDropdown, CustomSpacer, CustomTextInput, TextInputArea } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_GENDER, DICTIONARY_SALUTATION, DICTIONARY_STATES } from "../../../data/dictionary";
import { SAMPLE_CLIENT } from "../../../mocks";
import { fs12BoldBlack26, fs16BoldBlack26, px, sh32, sw24 } from "../../../styles";
import { AlertDialog } from "../../../utils";

const { ID_VERIFICATION } = Language.PAGE;

interface IDVerificationProps {
  handleNextStep: (route: string) => void;
  isPassport?: boolean;
}

export const IDVerification = ({ handleNextStep, isPassport }: IDVerificationProps) => {
  const [inputMailingAddress, setInputMailingAddress] = useState<string>(SAMPLE_CLIENT.address);
  const [inputPostCode, setInputPostCode] = useState<string>(SAMPLE_CLIENT.postCode);
  const [inputSalutation, setInputSalutation] = useState(SAMPLE_CLIENT.salutation);
  const [inputGender, setInputGender] = useState(SAMPLE_CLIENT.gender);
  const [inputCity, setInputCity] = useState(SAMPLE_CLIENT.city);
  const [inputState, setInputState] = useState(SAMPLE_CLIENT.state);
  const [inputName, setInputName] = useState(SAMPLE_CLIENT.name);
  const [inputCountry, setInputCountry] = useState(SAMPLE_CLIENT.country);

  const isID = isPassport !== true;

  const handleButtonPress = () => {
    Alert.alert("test");
  };

  const handleNavigate = () => {
    handleNextStep(ONBOARDING_ROUTES.PersonalDetails);
  };

  const handleSubmit = () => {
    const details = `${inputMailingAddress} ${inputPostCode}`;
    AlertDialog(details, handleNavigate, "Full Address!");
  };

  const continueDisabled: boolean =
    inputName === "" ||
    inputSalutation === "" ||
    inputGender === "" ||
    inputMailingAddress === "" ||
    inputPostCode === "" ||
    inputCity === "" ||
    (inputCountry === "" && !isID) ||
    inputState === "";

  const labelId = isID ? ID_VERIFICATION.LABEL_NRIC : ID_VERIFICATION.LABEL_PASSPORT;

  return (
    <ContentPage
      continueDisabled={continueDisabled}
      handleCancel={handleButtonPress}
      handleContinue={handleSubmit}
      labelCancel={ID_VERIFICATION.BUTTON_BACK}
      labelContinue={ID_VERIFICATION.BUTTON_VERIFY}
      subheading={ID_VERIFICATION.LABEL_ID_VERIFY}
      subtitle={ID_VERIFICATION.TITLE}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh32} />
        <CustomTextInput editable={false} label={labelId} labelStyle={fs12BoldBlack26} style={fs16BoldBlack26} value={SAMPLE_CLIENT.id} />
        <CustomTextInput
          editable={false}
          label={ID_VERIFICATION.LABEL_DOB}
          labelStyle={fs12BoldBlack26}
          rightIcon="calendar"
          spaceToTop={sh32}
          style={fs16BoldBlack26}
          value={SAMPLE_CLIENT.dateOfBirth}
        />
        <CustomTextInput label={ID_VERIFICATION.LABEL_NAME} onChangeText={setInputName} spaceToTop={sh32} value={inputName} />
        <CustomDropdown
          data={DICTIONARY_SALUTATION}
          handleChange={setInputSalutation}
          label={ID_VERIFICATION.LABEL_SALUTATION}
          spaceToTop={sh32}
          value={inputSalutation}
        />
        <CustomSpacer space={sh32} />
        <CustomDropdown data={DICTIONARY_GENDER} handleChange={setInputGender} label={ID_VERIFICATION.LABEL_GENDER} value={inputGender} />
        <CustomSpacer space={sh32} />
        <TextInputArea label={ID_VERIFICATION.LABEL_PERMANENT} onChangeText={setInputMailingAddress} value={inputMailingAddress} />
        <CustomTextInput label={ID_VERIFICATION.LABEL_POSTCODE} onChangeText={setInputPostCode} spaceToTop={sh32} value={inputPostCode} />
        <TextInputArea label={ID_VERIFICATION.LABEL_PERMANENT} onChangeText={setInputMailingAddress} value={inputMailingAddress} />
        <CustomTextInput label={ID_VERIFICATION.LABEL_CITY} onChangeText={setInputCity} spaceToTop={sh32} value={inputCity} />
        <CustomSpacer space={sh32} />
        <CustomDropdown data={DICTIONARY_STATES} handleChange={setInputState} label={ID_VERIFICATION.LABEL_STATE} value={inputState} />
        {isID ? null : (
          <CustomDropdown
            data={DICTIONARY_COUNTRIES}
            handleChange={setInputCountry}
            label={ID_VERIFICATION.LABEL_COUNTRY}
            spaceToTop={sh32}
            value={inputCountry}
          />
        )}
      </View>
    </ContentPage>
  );
};
