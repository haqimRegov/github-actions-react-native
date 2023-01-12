import { CommonActions } from "@react-navigation/native";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { connect } from "react-redux";

import { Splash } from "../components";
import { ModalContext } from "../context";
import { removeStorageData } from "../integrations";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../store";

interface LogoutPageProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
}
const LogoutPageComponent: FunctionComponent<LogoutPageProps> = (props: LogoutPageProps) => {
  const { navigation } = props;
  const { handleContextState } = useContext(ModalContext);

  const handleRemoveStorage = async () => {
    await removeStorageData("logout");
  };
  useEffect(() => {
    handleRemoveStorage();
    handleContextState({ expiryModal: false, expired: false, duplicateModal: false, loggedOut: false });
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
