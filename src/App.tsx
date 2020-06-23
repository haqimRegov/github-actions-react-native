import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, YellowBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import { RootNavigator } from "./Navigator";
import { flexChild } from "./styles";

// TODO to be removed
// eslint-disable-next-line no-console
console.disableYellowBox = true;
YellowBox.ignoreWarnings(["Warning:"]);

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      {Platform.select({
        android: <RootNavigator />,
        ios: (
          <KeyboardAvoidingView behavior="padding" style={flexChild}>
            <RootNavigator />
          </KeyboardAvoidingView>
        ),
      })}
    </SafeAreaProvider>
  );
};
