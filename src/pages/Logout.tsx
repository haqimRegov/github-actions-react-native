import { CommonActions } from "@react-navigation/native";
import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";

import { Splash } from "../components";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../store";

interface LogoutPageProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
}
const LogoutPageComponent: FunctionComponent<LogoutPageProps> = ({ navigation, resetGlobal }: LogoutPageProps) => {
  useEffect(() => {
    resetGlobal();
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        }),
      );
    }, 1400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Splash />;
};

export const LogoutPage = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(LogoutPageComponent);
