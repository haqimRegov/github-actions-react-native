import React, { useState } from "react";
import { Alert, View } from "react-native";

import { ContentPage, CustomDropdown, CustomSpacer, CustomTextInput, TextInputArea } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { DICTIONARY_BUSINESS_NATURE } from "../../data/dictionary/business-nature";
import { DICTIONARY_OCCUPATION } from "../../data/dictionary/occupation";
import { px, sh24, sh32, sw24 } from "../../styles";
import { AlertDialog } from "../../utils";

const { EMPLOYMENT_DETAILS } = Language.PAGE;
interface EmploymentDetailsProps {
  handleNextStep: (route: string) => void;
}

export const EmploymentDetails = ({ handleNextStep }: EmploymentDetailsProps) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputBusinessNature, setInputBusinessNature] = useState<string>("");
  const [inputEmployerName, setInputEmployerName] = useState<string>("");
  const [inputOccupation, setInputOccupation] = useState<string>("");
  const [inputPostCode, setInputPostCode] = useState<string>("");

  const buttonDisabled =
    inputAddress === "" || inputBusinessNature === "" || inputEmployerName === "" || inputOccupation === "" || inputPostCode === "";

  const handleButtonPress = () => {
    Alert.alert("test");
  };

  const handleNavigate = () => {
    handleNextStep(ONBOARDING_ROUTES.Declaration);
  };

  const handleSubmit = () => {
    const occupationIndex = DICTIONARY_OCCUPATION.findIndex((item) => item.value === inputOccupation);
    const natureIndex = DICTIONARY_BUSINESS_NATURE.findIndex((item) => item.value === inputBusinessNature);
    const details = `${occupationIndex} ${natureIndex} ${inputEmployerName} ${inputAddress} ${inputPostCode}`;
    AlertDialog(details, handleNavigate);
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
        <CustomDropdown
          data={DICTIONARY_OCCUPATION}
          handleChange={setInputOccupation}
          label={EMPLOYMENT_DETAILS.LABEL_OCCUPATION}
          value={inputOccupation}
        />
        <CustomSpacer space={sh32} />
        <CustomDropdown
          data={DICTIONARY_BUSINESS_NATURE}
          handleChange={setInputBusinessNature}
          label={EMPLOYMENT_DETAILS.LABEL_NATURE_BUSINESS}
          value={inputBusinessNature}
        />
        <CustomSpacer space={sh32} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_NAME} onChangeText={setInputEmployerName} value={inputEmployerName} />
        <CustomSpacer space={sh32} />
        <TextInputArea label={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_ADDRESS} onChangeText={setInputAddress} value={inputAddress} />
        <CustomSpacer space={sh32} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_POST_CODE} onChangeText={setInputPostCode} value={inputPostCode} />
      </View>
    </ContentPage>
  );
};
