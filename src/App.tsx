import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import { RootNavigator } from "./Navigator";
import { flexChild } from "./styles";

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
