import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { LoginPage, OnboardingPage, NetWorthAssessment } from "./pages";

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="NetWorthAssessment" headerMode="none">
        <Screen name="Login" component={LoginPage} />
        <Screen name="Onboarding" component={OnboardingPage} />
        <Screen name="NetWorthAssessment" component={NetWorthAssessment} />
      </Navigator>
    </NavigationContainer>
  );
};
