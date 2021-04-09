import "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text } from "react-native";
import UserInactivity from "react-native-user-inactivity";

import { ConfirmationModal } from "../components";
import { Language } from "../constants";
import {
  DICTIONARY_INACTIVITY_COUNTDOWN_DEV,
  DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS_DEV,
  DICTIONARY_INACTIVITY_TIMER_DEV,
} from "../data/dictionary";
import { logout } from "../network-actions";
import { DashboardPage, LogoutPage, OnboardingPage } from "../pages";
import { fs16BoldBlack2 } from "../styles";

const { INACTIVITY } = Language.PAGE;

const { Navigator, Screen } = createStackNavigator();

export const PrivateRoute: FunctionComponent = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState(true);
  const [countdown, setCountdown] = useState(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS_DEV);

  const handleLogoutPrompt = () => {
    logout(navigation as any);
    setCountdown(5);
    setActive(true);
  };

  const handleInactivity = (isActive) => {
    setActive(isActive);
    if (isActive === false) {
      setTimeout(() => {
        handleLogoutPrompt();
      }, DICTIONARY_INACTIVITY_COUNTDOWN_DEV);
    }
  };

  useEffect(() => {
    let clockDrift: ReturnType<typeof setTimeout>;
    if (countdown > 0 && active === false) {
      clockDrift = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(clockDrift);
  }, [countdown, active]);

  const defaultOptions = { animationEnabled: false };
  const subtitle = `${INACTIVITY.LABEL_LOGGED_OUT} ${countdown} ${INACTIVITY.LABEL_SECONDS}. ${INACTIVITY.LABEL_STAY}`;

  return (
    <Fragment>
      <UserInactivity isActive={active} onAction={handleInactivity} timeForInactivity={DICTIONARY_INACTIVITY_TIMER_DEV}>
        <Navigator initialRouteName="Dashboard" headerMode="none">
          <Screen name="Dashboard" component={DashboardPage} options={defaultOptions} />
          <Screen name="Logout" component={LogoutPage} options={defaultOptions} />
          <Screen name="Onboarding" component={OnboardingPage} options={defaultOptions} />
        </Navigator>
      </UserInactivity>
      <ConfirmationModal
        handleContinue={handleLogoutPrompt}
        labelContinue={INACTIVITY.BUTTON_YES}
        title={INACTIVITY.TITLE}
        visible={!active}>
        <Text style={fs16BoldBlack2}>{subtitle}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};
