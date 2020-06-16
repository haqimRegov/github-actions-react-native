import * as React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { flexChild } from "../../styles";
import { ONBOARDING_ROUTES } from "./Content";

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
