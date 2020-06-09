import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./Navigator";
import { flexChild } from "./styles";

export const App = () => {
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
