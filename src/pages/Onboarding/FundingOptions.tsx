import * as React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { flexChild } from "../../styles";
import { ONBOARDING_ROUTES } from "./Content";

interface FundingOptionsContentProps {
  handleNextStep: (route: string) => void;
}

export const FundingOptionsContent = ({ handleNextStep }: FundingOptionsContentProps) => {
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.ProductRecommendation);
  };

  return (
    <View style={flexChild}>
      <Text>FundingOptionsContent</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
