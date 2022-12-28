import "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import moment from "moment";
import React, { Fragment, FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import UserInactivity from "react-native-user-inactivity";
import { connect } from "react-redux";

import { LocalAssets } from "../assets/images/LocalAssets";
import { EventModal, PromptModal } from "../components";
import { Language } from "../constants";
import { ModalContext } from "../context";
import { DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS, DICTIONARY_INACTIVITY_TIMER, ERRORS } from "../data/dictionary";
import { useExpiryCountdown } from "../hooks/useExpiryCountdown";
import { getStorageData, RNInAppBrowser, updateStorageData, WEB_SOCKET_CONFIG } from "../integrations";
import { logout } from "../network-actions";
import { DashboardPage, ForceUpdatePage, LogoutPage, NewSalesPage, OnboardingPage } from "../pages";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../store";
import { sw212 } from "../styles";
import { isNotEmpty } from "../utils";

const { INACTIVITY, SESSION } = Language.PAGE;

const { Navigator, Screen } = createStackNavigator();

const PrivateRouteComponent: FunctionComponent<GlobalStoreProps> = (props: GlobalStoreProps) => {
  const { duplicateModal, expired, expiryModal, handleContextState, setExpired, setExpiryModal, setLoggedOut } = useContext(ModalContext);
  const navigation = useNavigation<IStackNavigationProp>();
  const [countdown, setCountdown] = useExpiryCountdown();
  const lastActive = useRef<number | undefined>(undefined);
  const [dontShowEpf, setDontShowEpf] = useState<boolean>(false);
  const [eventPrompt, setEventPrompt] = useState<boolean>(false);

  const ws = useRef<WebSocket | null>(null);

  const handleLogout = (globalLogout?: boolean) => {
    setLoggedOut(true);
    logout(navigation, globalLogout);
  };

  const handleDuplicateLogout = () => {
    handleLogout(false);
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

  const handleInactivity = async (isActive: boolean) => {
    if (expiryModal === false) {
      const checkLogout = await getStorageData("logout");
      if (checkLogout !== true && expired !== true) {
        setExpired(moment().diff(lastActive.current, "milliseconds") > DICTIONARY_INACTIVITY_TIMER);
      }
      if (isActive === false && checkLogout !== true) {
        const checkThirdParty = await getStorageData("thirdPartyModal");
        if (checkThirdParty === true) {
          RNInAppBrowser.closeBrowser();
          await updateStorageData("thirdPartyModal", false);
        }
        handleContextState({ expiryModal: true });
      }
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "inactive" || nextAppState === "background") {
      lastActive.current = parseInt(moment().format("x"), 10);
    } else if (expired === false) {
      lastActive.current = undefined;
    }
  };

  const handleExtend = () => {
    handleContextState({ expiryModal: false, expired: false });
    setTimeout(() => {
      setCountdown(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);
    }, 150);
  };

  useEffect(() => {
    let webSocketInterval: ReturnType<typeof setInterval>;
    const webSocketUrl = `wss://${WEB_SOCKET_CONFIG.url}/${WEB_SOCKET_CONFIG.stage}?username=${props.agent?.username}&x-api-key=${WEB_SOCKET_CONFIG.apiKey}`;
    ws.current = new WebSocket(webSocketUrl);
    // console.log("Initializing Web Socket Connection");

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
        handlePing();
      };
      ws.current.onclose = () => {
        // connection closed
      };
      ws.current.onerror = () => {
        // an error occurred
      };
      ws.current.onmessage = async (e) => {
        // a message was received
        if (isNotEmpty(e) && isNotEmpty(e?.data) && e?.data !== "PONG") {
          const response = JSON.parse(e?.data) as IResponseError;
          if (response.errorCode === ERRORS.duplicateLogin.errorCode) {
            props.addGlobal({ ...props.global, isLogout: true });
            clearInterval(webSocketInterval);
            await updateStorageData("logout", true);
            const checkThirdParty = await getStorageData("thirdPartyModal");
            if (checkThirdParty === true) {
              RNInAppBrowser.closeBrowser();
              await updateStorageData("thirdPartyModal", false);
            }
            handleContextState({ duplicateModal: true });
          }
        }
      };
    }

    return () => {
      clearInterval(webSocketInterval);
      if (ws !== undefined && ws.current !== null) {
        // console.log("Closing Web Socket Connection");
        ws.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (expired === true) {
      setExpiryModal(true);
    }
  }, [expired]);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (expiryModal === false) {
      setTimeout(() => {
        setCountdown(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);
      }, 150);
    }
  }, [expiryModal]);

  useEffect(() => {
    if (countdown === 1) {
      const countTimeout = setTimeout(() => {
        handleLogout();
      }, 1000);
      return () => {
        clearTimeout(countTimeout);
      };
    }
    return undefined;
  }, [countdown]);

  useEffect(() => {
    if (props.events !== undefined && props.events.findIndex(({ eventName }) => eventName === "isMultiUtmc") !== -1) {
      setEventPrompt(true);
    }
  }, [props.events]);

  const defaultOptions = { animationEnabled: false };

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

  const subtitle =
    expired === true
      ? INACTIVITY.LABEL_SIGN_IN
      : `${INACTIVITY.LABEL_LOGGED_OUT} ${countdown} ${INACTIVITY.LABEL_SECONDS}. ${INACTIVITY.LABEL_STAY}`;

  return (
    <Fragment>
      <UserInactivity isActive={!expiryModal} onAction={handleInactivity} timeForInactivity={DICTIONARY_INACTIVITY_TIMER}>
        <Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
          <Screen name="Dashboard" component={DashboardPage} options={defaultOptions} />
          <Screen name="Logout" component={LogoutPage} options={defaultOptions} />
          <Screen name="Onboarding" component={OnboardingPage} options={defaultOptions} />
          <Screen name="ForceUpdate" component={ForceUpdatePage} options={defaultOptions} />
          <Screen name="NewSales" component={NewSalesPage} options={defaultOptions} />
        </Navigator>
      </UserInactivity>
      <PromptModal
        handleContinue={handleDuplicateLogout}
        illustration={LocalAssets.illustration.clientWarning}
        label={SESSION.PROMPT_LOGOUT}
        labelContinue={SESSION.BUTTON_LOGIN}
        title={ERRORS.duplicateLogin.message}
        visible={duplicateModal}
      />
      <PromptModal
        handleCancel={handleLogout}
        handleContinue={expired === true ? handleLogout : handleExtend}
        illustration={LocalAssets.illustration.sessionExpired}
        label={expired === true ? INACTIVITY.TITLE_EXPIRED : INACTIVITY.TITLE}
        labelCancel={INACTIVITY.BUTTON_NO}
        labelContinue={expired === true ? INACTIVITY.BUTTON_PROCEED : INACTIVITY.BUTTON_YES}
        title={subtitle}
        visible={expiryModal}
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
