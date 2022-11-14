import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, KeyboardEvent, Platform, StatusBar } from "react-native";
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";

import { Loader } from "./components";
import { RNFirebase } from "./integrations";
import { RootNavigator } from "./navigation";
import { logout } from "./network-actions";
import { GlobalError } from "./pages";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "./store";
import { flexChild } from "./styles";

type AppProps = GlobalStoreProps;

const AppComponent: FunctionComponent<AppProps> = ({ isLoading }: AppProps) => {
  const [isFloating, setFloating] = useState(false);
  const { height, width } = Dimensions.get("window");

  const errorHandler = (_e, isFatal) => {
    // TODO crashlytics
    // // eslint-disable-next-line no-console
    // console.log("JSExceptionHandler", e, isFatal);
    if (isFatal) {
      Alert.alert(
        "Something went wrong",
        "Sorry, we encountered an unexpected error. Please contact support for more details.\n\nError Code: R005",
      );
    } else {
      // console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
  };

  setJSExceptionHandler(errorHandler, true);

  setNativeExceptionHandler((_errorString) => {
    // TODO crashlytics
    // // eslint-disable-next-line no-console
    // console.log("NativeExceptionHandler", errorString);
  });

  useEffect(() => {
    logout();
    SplashScreen.hide();

    const unsubscribe = RNFirebase.onMessage();
    return unsubscribe;
  }, []);

  const onKeyboardWillChangeFrame = (event: KeyboardEvent) => {
    setFloating(
      event.endCoordinates.width !== width || (event.endCoordinates.width === width && event.endCoordinates.height / height < 0.4),
    );
  };

  useEffect(() => {
    const keyboardWillChangeFrame = Keyboard.addListener("keyboardWillChangeFrame", onKeyboardWillChangeFrame);
    return () => {
      keyboardWillChangeFrame.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalError>
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
    </GlobalError>
  );
};

export const App = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(AppComponent);
