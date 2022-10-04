import { CommonActions } from "@react-navigation/native";
import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";

import { Splash } from "../components";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../store";

interface LogoutPageProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
}
const LogoutPageComponent: FunctionComponent<LogoutPageProps> = (props: LogoutPageProps) => {
  const { navigation } = props;
  useEffect(() => {
    props.resetEDD();
    props.resetForceUpdate();
    props.resetTransactions();
    props.resetAcknowledgement();
    props.resetClientDetails();
    props.resetInvestors();
    props.resetPersonalInfo();
    props.resetRiskAssessment();
    props.resetSelectedFund();
    props.resetProducts();
    props.resetOnboarding();
    props.resetGlobal();
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Public" }],
        }),
      );
    }, 1400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Splash />;
};

export const LogoutPage = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(LogoutPageComponent);
