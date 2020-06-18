import * as React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { ONBOARDING_ROUTES } from "../../constants";
import { flexChild } from "../../styles";

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
