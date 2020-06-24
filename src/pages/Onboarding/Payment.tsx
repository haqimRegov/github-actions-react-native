import React from "react";
import { Alert, Text, View } from "react-native";

import { CustomButton } from "../../components";
import { flexChild } from "../../styles";

interface PaymentProps {
  handleNextStep: (route: string) => void;
}

export const Payment = (props: PaymentProps) => {
  const handleSubmit = () => {
    Alert.alert("Payment done");
  };

  // TODO to be removed, just so that it's not unused
  if (!props) {
    return null;
  }

  return (
    <View style={flexChild}>
      <Text>Payment</Text>
      <CustomButton onPress={handleSubmit} text="Submit" />
    </View>
  );
};
