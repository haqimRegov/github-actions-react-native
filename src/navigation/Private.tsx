import "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import UserInactivity from "react-native-user-inactivity";

import { LocalAssets } from "../assets/images/LocalAssets";
import { PromptModal } from "../components";
import { Language } from "../constants";
import { DICTIONARY_INACTIVITY_COUNTDOWN, DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS, DICTIONARY_INACTIVITY_TIMER } from "../data/dictionary";
import { logout } from "../network-actions";
import { DashboardPage, LogoutPage, OnboardingPage } from "../pages";

const { INACTIVITY } = Language.PAGE;

const { Navigator, Screen } = createStackNavigator();

export const PrivateRoute: FunctionComponent = () => {
  const navigation = useNavigation<IStackNavigationProp>();
  const expired = useRef<boolean>(false);
  const lastActive = useRef<number | undefined>(undefined);
  const [inactivityStatus, setInactivityStatus] = useState<boolean>(true);
  const [countdown, setCountdown] = useState(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);

  const handleExtend = () => {
    setInactivityStatus(true);
    setTimeout(() => {
      setCountdown(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);
    }, 150);
  };

  const handleLogout = async () => {
    await logout(navigation);
    setInactivityStatus(true);
  };

  const handleInactivity = (isActive: boolean) => {
    expired.current = moment().diff(lastActive.current, "milliseconds") > DICTIONARY_INACTIVITY_TIMER;
    setInactivityStatus(isActive);
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "inactive" || nextAppState === "background") {
      lastActive.current = parseInt(moment().format("x"), 10);
    } else if (expired.current === false) {
      lastActive.current = undefined;
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    let clockDrift: ReturnType<typeof setTimeout>;
    if (countdown > 0 && inactivityStatus === false && expired.current === false) {
      clockDrift = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(clockDrift);
    };
  }, [countdown, inactivityStatus, expired]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inactivityStatus === false) {
        handleLogout();
      }
    }, DICTIONARY_INACTIVITY_COUNTDOWN);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inactivityStatus]);

  const defaultOptions = { animationEnabled: false };
  const subtitle =
    expired.current === true
      ? INACTIVITY.LABEL_SIGN_IN
      : `${INACTIVITY.LABEL_LOGGED_OUT} ${countdown} ${INACTIVITY.LABEL_SECONDS}. ${INACTIVITY.LABEL_STAY}`;

  return (
    <Fragment>
      <UserInactivity isActive={inactivityStatus} onAction={handleInactivity} timeForInactivity={DICTIONARY_INACTIVITY_TIMER}>
        <Navigator initialRouteName="Dashboard" headerMode="none">
          <Screen name="Dashboard" component={DashboardPage} options={defaultOptions} />
          <Screen name="Logout" component={LogoutPage} options={defaultOptions} />
          <Screen name="Onboarding" component={OnboardingPage} options={defaultOptions} />
        </Navigator>
      </UserInactivity>
      <PromptModal
        handleCancel={expired.current === true ? undefined : handleLogout}
        handleContinue={expired.current === true ? handleLogout : handleExtend}
        illustration={LocalAssets.illustration.sessionExpired}
        label={expired.current === true ? INACTIVITY.TITLE_EXPIRED : INACTIVITY.TITLE}
        labelCancel={INACTIVITY.BUTTON_NO}
        labelContinue={expired.current === true ? INACTIVITY.BUTTON_PROCEED : INACTIVITY.BUTTON_YES}
        title={subtitle}
        visible={inactivityStatus === false}
      />
    </Fragment>
  );
};
