import "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import UserInactivity from "react-native-user-inactivity";
import { connect } from "react-redux";

import { LocalAssets } from "../assets/images/LocalAssets";
import { EventModal, PromptModal } from "../components";
import { Language } from "../constants";
import {
  DICTIONARY_INACTIVITY_COUNTDOWN,
  DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS,
  DICTIONARY_INACTIVITY_TIMER,
  ERRORS,
} from "../data/dictionary";
import { updateStorageData, WEB_SOCKET_CONFIG } from "../integrations";
import { logout } from "../network-actions";
import { DashboardPage, ForceUpdatePage, LogoutPage, NewSalesPage, OnboardingPage } from "../pages";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../store";
import { sw212 } from "../styles";
import { AlertDialog, isNotEmpty } from "../utils";

const { INACTIVITY } = Language.PAGE;

const { Navigator, Screen } = createStackNavigator();

const PrivateRouteComponent: FunctionComponent<GlobalStoreProps> = (props: GlobalStoreProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const expired = useRef<boolean>(false);
  const lastActive = useRef<number | undefined>(undefined);
  const [inactivityStatus, setInactivityStatus] = useState<boolean>(true);
  const [dontShowEpf, setDontShowEpf] = useState<boolean>(false);
  const [eventPrompt, setEventPrompt] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);

  const ws = useRef<WebSocket | null>(null);

  const handleExtend = () => {
    setInactivityStatus(true);
    setTimeout(() => {
      setCountdown(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);
    }, 150);
  };

  const handleLogout = (globalLogout?: boolean) => {
    setInactivityStatus(true);
    logout(navigation, globalLogout);
  };

  const handleEvents = async () => {
    setEventPrompt(false);
    if (dontShowEpf === true) {
      await updateStorageData("hideEvent", "isMultiUtmc");
    }
    props.resetEvents();
  };

  const handleEpfCheckbox = () => {
    setDontShowEpf(!dontShowEpf);
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
    let webSocketInterval: ReturnType<typeof setInterval>;
    const webSocketUrl = `wss://${WEB_SOCKET_CONFIG.url}/${WEB_SOCKET_CONFIG.stage}?username=${props.agent?.username}&x-api-key=${WEB_SOCKET_CONFIG.apiKey}`;
    ws.current = new WebSocket(webSocketUrl);

    const handlePing = () => {
      if (ws !== undefined && ws.current !== null) {
        ws.current.send("PING");
        webSocketInterval = setInterval(() => {
          if (ws !== undefined && ws.current !== null) {
            ws.current.send("PING");
          }
        }, 10000);
      }
    };

    if (ws !== undefined && ws.current !== null) {
      ws.current.onopen = () => {
        // connection opened
        // eslint-disable-next-line no-console
        console.log("onopen");
        handlePing();
      };
      ws.current.onclose = (e) => {
        // connection closed
        // eslint-disable-next-line no-console
        console.log("closed", e);
      };
      ws.current.onerror = (e) => {
        // an error occurred
        // eslint-disable-next-line no-console
        console.log("error", e);
      };
      ws.current.onmessage = (e) => {
        // a message was received
        // eslint-disable-next-line no-console
        console.log("message", e?.data);
        if (isNotEmpty(e) && isNotEmpty(e?.data) && e?.data !== "PONG") {
          const response = JSON.parse(e?.data) as IResponseError;
          if (response.message === ERRORS.duplicateLogin.message) {
            props.addGlobal({ ...props.global, isLogout: true });
            clearInterval(webSocketInterval);
            AlertDialog(ERRORS.duplicateLogin.message, () => handleLogout(false), "You've been logged out");
          }
        }
      };
    }

    return () => {
      clearInterval(webSocketInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        props.addGlobal({ ...props.global, isLogout: true });
        handleLogout();
      }
    }, DICTIONARY_INACTIVITY_COUNTDOWN);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inactivityStatus]);

  useEffect(() => {
    if (props.events !== undefined && props.events.findIndex(({ eventName }) => eventName === "isMultiUtmc") !== -1) {
      setEventPrompt(true);
    }
  }, [props.events]);

  const defaultOptions = { animationEnabled: false };
  const subtitle =
    expired.current === true
      ? INACTIVITY.LABEL_SIGN_IN
      : `${INACTIVITY.LABEL_LOGGED_OUT} ${countdown} ${INACTIVITY.LABEL_SECONDS}. ${INACTIVITY.LABEL_STAY}`;

  const isMultiUtmcEvent = props.events !== undefined ? props.events.findIndex(({ eventName }) => eventName === "isMultiUtmc") : -1;

  let event = {
    checkbox: "",
    description: "",
    eventName: "",
    header: "",
    headerDescription: "",
    primaryButton: "",
    s3Path: "",
    secondaryButton: "",
  };

  if (isMultiUtmcEvent !== -1) {
    event = props.events![isMultiUtmcEvent];
  }

  return (
    <Fragment>
      <UserInactivity isActive={inactivityStatus} onAction={handleInactivity} timeForInactivity={DICTIONARY_INACTIVITY_TIMER}>
        <Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
          <Screen name="Dashboard" component={DashboardPage} options={defaultOptions} />
          <Screen name="Logout" component={LogoutPage} options={defaultOptions} />
          <Screen name="Onboarding" component={OnboardingPage} options={defaultOptions} />
          <Screen name="ForceUpdate" component={ForceUpdatePage} options={defaultOptions} />
          <Screen name="NewSales" component={NewSalesPage} options={defaultOptions} />
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
      <EventModal
        checkboxLabel={event.checkbox}
        checkboxToggled={dontShowEpf}
        description={event.description}
        handleCheckbox={handleEpfCheckbox}
        header={event.header}
        headerDescription={event.headerDescription}
        illustration={{ uri: event.s3Path }}
        primary={{ onPress: handleEvents, text: event.primaryButton, buttonStyle: { width: sw212 } }}
        visible={eventPrompt}
      />
    </Fragment>
  );
};

export const PrivateRoute = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(PrivateRouteComponent);
