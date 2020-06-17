import * as React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { flexChild } from "../../styles";
import { ONBOARDING_ROUTES } from "./Content";

interface ProductRecommendationProps {
  handleNextStep: (route: string) => void;
}

export const ProductRecommendation = ({ handleNextStep }: ProductRecommendationProps) => {
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.Address);
  };

  return (
    <View style={flexChild}>
      <Text>ProductRecommendation</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
