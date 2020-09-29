import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AuthPage, DashboardPage, OnboardingPage } from "./pages";

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator = () => {
  const defaultOptions = { animationEnabled: false };

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login" headerMode="none">
        <Screen name="Dashboard" component={DashboardPage} options={defaultOptions} />
        <Screen name="Login" component={AuthPage} options={defaultOptions} />
        <Screen name="Onboarding" component={OnboardingPage} options={defaultOptions} />
      </Navigator>
    </NavigationContainer>
  );
};
