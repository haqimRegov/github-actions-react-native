import React, { useState } from "react";
import { Alert, View } from "react-native";

import { ContentPage, CustomDropdown, CustomSpacer, CustomTextInput } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { DICTIONARY_EDUCATION, DICTIONARY_MONTHLY_INCOME } from "../../data/dictionary";
import { px, sh24, sh32, sw24 } from "../../styles";

const { PRS } = Language.PAGE;

interface PaymentProps {
  handleNextStep: (route: string) => void;
}

export const PRSDetails = ({ handleNextStep }: PaymentProps) => {
  const [inputMotherName, setInputMotherName] = useState<string>("");
  const [inputMaritalStatus, setInputMaritalStatus] = useState<string>("");
  const [inputEducation, setInputEducation] = useState<string>("");
  const [inputIncome, setInputIncome] = useState<string>("");

  const handleCancel = () => {
    Alert.alert("Cancel");
  };

  const handleContinue = () => {
    handleNextStep(ONBOARDING_ROUTES.EmploymentDetails);
  };

  const handleMotherName = (text: string) => {
    setInputMotherName(text);
  };

  const handleMaritalStatus = (text: string) => {
    setInputMaritalStatus(text);
  };

  const handleEducation = (text: string) => {
    setInputEducation(text);
  };

  const handleIncome = (text: string) => {
    setInputIncome(text);
  };

  return (
    <ContentPage
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      noBounce={true}
      subheading={PRS.HEADING}
      subtitle={PRS.SUBHEADING}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <CustomTextInput label={PRS.LABEL_MOTHER_NAME} onChangeText={handleMotherName} spaceToBottom={sh32} value={inputMotherName} />
        <CustomTextInput label={PRS.LABEL_MARITAL} onChangeText={handleMaritalStatus} spaceToBottom={sh32} value={inputMaritalStatus} />
        <CustomDropdown data={DICTIONARY_EDUCATION} handleChange={handleEducation} label={PRS.LABEL_EDUCATION} value={inputEducation} />
        <CustomSpacer space={sh32} />
        <CustomDropdown data={DICTIONARY_MONTHLY_INCOME} handleChange={handleIncome} label={PRS.LABEL_MONTHLY_INCOME} value={inputIncome} />
      </View>
    </ContentPage>
  );
};
