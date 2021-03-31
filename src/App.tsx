import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  useEffect(() => {
    logout();
    SplashScreen.hide();

    const unsubscribe = RNFirebase.onMessage();
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <Fragment>
        {Platform.select({
          android: <RootNavigator />,
          ios: (
            <KeyboardAwareScrollView extraHeight={8} contentContainerStyle={flexChild} scrollEnabled={false}>
              <RootNavigator />
            </KeyboardAwareScrollView>
          ),
        })}
      </Fragment>
      <Loader visible={isLoading === true} />
    </SafeAreaProvider>
  );
};

export const App = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(AppComponent);
