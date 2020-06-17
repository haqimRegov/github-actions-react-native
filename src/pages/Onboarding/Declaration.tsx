import * as React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { flexChild } from "../../styles";
import { ONBOARDING_ROUTES } from "./Content";

interface DeclarationProps {
  handleNextStep: (route: string) => void;
}

export const Declaration = ({ handleNextStep }: DeclarationProps) => {
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.Confirmation);
  };

  return (
    <View style={flexChild}>
      <Text>Declaration</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
