import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AuthPage, DashboardPage, LogoutPage, OnboardingPage } from "./pages";

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator = () => {
  const defaultOptions = { animationEnabled: false };

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Auth" headerMode="none">
        <Screen name="Auth" component={AuthPage} options={defaultOptions} />
        <Screen name="Dashboard" component={DashboardPage} options={defaultOptions} />
        <Screen name="Logout" component={LogoutPage} options={defaultOptions} />
        <Screen name="Onboarding" component={OnboardingPage} options={defaultOptions} />
      </Navigator>
    </NavigationContainer>
  );
};
