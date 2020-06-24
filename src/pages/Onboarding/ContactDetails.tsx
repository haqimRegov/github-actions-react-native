import React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { ONBOARDING_ROUTES } from "../../constants";
import { flexChild } from "../../styles";

interface ContactDetailsProps {
  handleNextStep: (route: string) => void;
}

export const ContactDetails = ({ handleNextStep }: ContactDetailsProps) => {
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.EmploymentDetails);
  };

  return (
    <View style={flexChild}>
      <Text>ContactDetails</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
