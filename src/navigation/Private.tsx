import "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import UserInactivity from "react-native-user-inactivity";

import { LocalAssets } from "../assets/LocalAssets";
import { PromptModal } from "../components";
import { Language } from "../constants";
import { DICTIONARY_INACTIVITY_COUNTDOWN, DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS, DICTIONARY_INACTIVITY_TIMER } from "../data/dictionary";
import { logout } from "../network-actions";
import { DashboardPage, LogoutPage, OnboardingPage } from "../pages";
import { fs16BoldBlack2 } from "../styles";

const { INACTIVITY } = Language.PAGE;

const { Navigator, Screen } = createStackNavigator();

export const PrivateRoute: FunctionComponent = () => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [active, setActive] = useState(true);
  const [countdown, setCountdown] = useState(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);

  const handleExtend = () => {
    setActive(true);
    setTimeout(() => {
      setCountdown(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);
    }, 150);
  };

  const handleLogout = async () => {
    await logout(navigation);
    setActive(true);
  };

  const handleInactivity = (isActive: boolean) => {
    setActive(isActive);
  };

  useEffect(() => {
    let clockDrift: ReturnType<typeof setTimeout>;
    if (countdown > 0 && active === false) {
      clockDrift = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(clockDrift);
    };
  }, [countdown, active]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (active === false) {
        handleLogout();
      }
    }, DICTIONARY_INACTIVITY_COUNTDOWN);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const defaultOptions = { animationEnabled: false };
  const subtitle = `${INACTIVITY.LABEL_LOGGED_OUT} ${countdown} ${INACTIVITY.LABEL_SECONDS}. ${INACTIVITY.LABEL_STAY}`;

  return (
    <Fragment>
      <UserInactivity isActive={active} onAction={handleInactivity} timeForInactivity={DICTIONARY_INACTIVITY_TIMER}>
        <Navigator initialRouteName="Dashboard" headerMode="none">
          <Screen name="Dashboard" component={DashboardPage} options={defaultOptions} />
          <Screen name="Logout" component={LogoutPage} options={defaultOptions} />
          <Screen name="Onboarding" component={OnboardingPage} options={defaultOptions} />
        </Navigator>
      </UserInactivity>
      <PromptModal
        handleCancel={handleLogout}
        handleContinue={handleExtend}
        illustration={LocalAssets.illustration.sessionExpired}
        label={INACTIVITY.TITLE}
        labelCancel={INACTIVITY.BUTTON_NO}
        labelContinue={INACTIVITY.BUTTON_YES}
        title={subtitle}
        titleStyle={fs16BoldBlack2}
        visible={!active}
      />
      {/* <PromptModal handleContinue={handleLogout} labelContinue={INACTIVITY.BUTTON_YES} title={INACTIVITY.TITLE} visible={!active} /> */}
      {/* <Text style={fs16BoldBlack2}>{subtitle}</Text> */}
    </Fragment>
  );
};
