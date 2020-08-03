import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { DashboardPage, LoginPage, OnboardingPage } from "./pages";

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login" headerMode="none">
        <Screen name="Dashboard" component={DashboardPage} />
        <Screen name="Login" component={LoginPage} />
        <Screen name="Onboarding" component={OnboardingPage} />
      </Navigator>
    </NavigationContainer>
  );
};
