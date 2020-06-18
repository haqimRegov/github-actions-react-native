import React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { ONBOARDING_ROUTES } from "../../constants";
import { flexChild } from "../../styles";

interface QuestionnaireContentProps {
  handleNextStep: (route: string) => void;
}

export const QuestionnaireContent = ({ handleNextStep }: QuestionnaireContentProps) => {
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.FundingOptions);
  };

  return (
    <View style={flexChild}>
      <Text>QuestionnaireContent</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
