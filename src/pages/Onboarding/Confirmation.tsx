import React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { ONBOARDING_ROUTES } from "../../constants";
import { flexChild } from "../../styles";

interface ConfirmationProps {
  handleNextStep: (route: string) => void;
}

export const Confirmation = ({ handleNextStep }: ConfirmationProps) => {
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.Payment);
  };

  return (
    <View style={flexChild}>
      <Text>Confirmation</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
