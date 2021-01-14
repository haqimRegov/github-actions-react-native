import React, { Fragment, FunctionComponent, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";

import { Loader } from "./components/Modals/Loader";
import { RootNavigator } from "./Navigator";
import { logout } from "./network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps, resetGlobal } from "./store";
import { flexChild } from "./styles";

interface AppProps extends GlobalStoreProps {}

const AppComponent: FunctionComponent<AppProps> = ({ isLoading }: AppProps) => {
  useEffect(() => {
    logout(resetGlobal);
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <Fragment>
        {Platform.select({
          android: <RootNavigator />,
          ios: (
            <KeyboardAvoidingView behavior="padding" style={flexChild}>
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
