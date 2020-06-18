import * as React from "react";
import { Text, View } from "react-native";

import { CustomButton } from "../../components";
import { ONBOARDING_ROUTES } from "../../constants";
import { flexChild } from "../../styles";

interface AddressProps {
  handleNextStep: (route: string) => void;
}

export const Address = ({ handleNextStep }: AddressProps) => {
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.ContactDetails);
  };

  return (
    <View style={flexChild}>
      <Text>Address</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
