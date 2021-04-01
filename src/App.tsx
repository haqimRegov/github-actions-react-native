import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";

import { Loader } from "./components/Modals/Loader";
import { RNFirebase } from "./integrations";
import { RootNavigator } from "./Navigator";
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
    <SafeAreaProvider>
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
  );
};

export const App = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(AppComponent);
