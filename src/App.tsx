import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";

import { Loader } from "./components";
import { RNFirebase } from "./integrations";
import { RootNavigator } from "./navigation";
import { logout } from "./network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "./store";
import { flexChild } from "./styles";

interface AppProps extends GlobalStoreProps {}

const AppComponent: FunctionComponent<AppProps> = ({ isLoading }: AppProps) => {
  const [isFloating, setFloating] = useState(false);
  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    logout();
    SplashScreen.hide();

    const unsubscribe = RNFirebase.onMessage();
    return unsubscribe;
  }, []);

  const onKeyboardWillChangeFrame = (event: any) => {
    setFloating(
      event.endCoordinates.width !== width || (event.endCoordinates.width === width && event.endCoordinates.height / height < 0.4),
    );
  };

  useEffect(() => {
    Keyboard.addListener("keyboardWillChangeFrame", onKeyboardWillChangeFrame);
    return () => {
      Keyboard.removeListener("keyboardWillChangeFrame", onKeyboardWillChangeFrame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <Fragment>
          {Platform.select({
            android: <RootNavigator />,
            ios: (
              <KeyboardAvoidingView behavior="padding" enabled={!isFloating} style={flexChild}>
                <RootNavigator />
              </KeyboardAvoidingView>
            ),
          })}
        </Fragment>
        <Loader visible={isLoading === true} />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export const App = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(AppComponent);
