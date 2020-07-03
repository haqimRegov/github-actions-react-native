import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AddClientPage, LoginPage, OnboardingPage, RiskAppetitePage } from "./pages";

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login" headerMode="none">
        <Screen name="AddClient" component={AddClientPage} />
        <Screen name="Login" component={LoginPage} />
        <Screen name="Onboarding" component={OnboardingPage} />
        <Screen name="RiskAppetite" component={RiskAppetitePage} />
      </Navigator>
    </NavigationContainer>
  );
};
