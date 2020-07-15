import React, { useState } from "react";
import { Alert, View } from "react-native";

import { ContentPage, CustomSpacer, CustomTextInput, TextInputArea, TextSpaceArea } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { px, sh24, sh8, sw16, sw24 } from "../../styles";
import { AlertDialog } from "../../utils";

const { EMPLOYMENT_DETAILS } = Language.PAGE;
interface EmploymentDetailsProps {
  handleNextStep: (route: string) => void;
}

export const EmploymentDetails = ({ handleNextStep }: EmploymentDetailsProps) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputEmployerName, setInputEmployerName] = useState<string>("");
  const [inputPostCode, setInputPostCode] = useState<string>("");

  const handleButtonPress = () => {
    Alert.alert("test");
  };

  const handleNavigate = () => {
    handleNextStep(ONBOARDING_ROUTES.Declaration);
  };

  const handleSubmit = () => {
    const details = `${inputAddress} ${inputEmployerName} ${inputPostCode}`;
    AlertDialog(details, handleNavigate);
  };

  return (
    <ContentPage
      handleCancel={handleButtonPress}
      handleContinue={handleSubmit}
      noBounce={true}
      subheading={EMPLOYMENT_DETAILS.HEADING}
      subtitle={EMPLOYMENT_DETAILS.SUBHEADING}>
      <View style={px(sw24)}>
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_OCCUPATION} rightIcon="caret-down" spaceToTop={sh24} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_NATURE_BUSINESS} rightIcon="caret-down" spaceToBottom={sh24} spaceToTop={sh24} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_NAME} onChangeText={setInputEmployerName} value={inputEmployerName} />
        <TextSpaceArea spaceToTop={sh24} spaceToBottom={sh8} style={px(sw16)} text={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_ADDRESS} />
        <TextInputArea onChangeText={setInputAddress} value={inputAddress} />
        <CustomSpacer space={sh24} />
        <CustomTextInput label={EMPLOYMENT_DETAILS.LABEL_POST_CODE} onChangeText={setInputPostCode} value={inputPostCode} />
      </View>
    </ContentPage>
  );
};
