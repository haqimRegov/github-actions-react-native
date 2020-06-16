import * as React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { flexChild } from "../../styles";
import { ONBOARDING_ROUTES } from "./Content";

interface EmploymentDetailsProps {
  handleNextStep: (route: string) => void;
}

export const EmploymentDetails = ({ handleNextStep }: EmploymentDetailsProps) => {
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.Declaration);
  };

  return (
    <View style={flexChild}>
      <Text>EmploymentDetails</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
