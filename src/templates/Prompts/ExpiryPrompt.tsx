import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { View } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Prompt } from "../../components";
import { Language } from "../../constants";
import { ModalContext } from "../../context";
import { DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS } from "../../data/dictionary";
import { useExpiryCountdown } from "../../hooks/useExpiryCountdown";
import { logout } from "../../network-actions";
import { centerHV, fullHW } from "../../styles";

const { INACTIVITY } = Language.PAGE;

export const ExpiryPrompt: FunctionComponent = () => {
  const navigation = useNavigation<IStackNavigationProp>();
  const [countdown, setCountdown] = useExpiryCountdown();
  const { expired, handleContextState, setLoggedOut } = useContext(ModalContext);

  const handleExtend = () => {
    handleContextState({ expiryModal: false, expired: false });
    setTimeout(() => {
      setCountdown(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS);
    }, 150);
  };

  const handleLogout = () => {
    setLoggedOut(true);
    logout(navigation, true);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  const subtitle =
    expired === true
      ? INACTIVITY.LABEL_SIGN_IN
      : `${INACTIVITY.LABEL_LOGGED_OUT} ${countdown} ${INACTIVITY.LABEL_SECONDS}. ${INACTIVITY.LABEL_STAY}`;
  return (
    <View style={{ ...centerHV, ...fullHW }}>
      <Prompt
        handleCancel={expired === true ? undefined : handleLogout}
        handleContinue={expired === true ? handleLogout : handleExtend}
        illustration={LocalAssets.illustration.sessionExpired}
        label={expired === true ? INACTIVITY.TITLE_EXPIRED : INACTIVITY.TITLE}
        labelCancel={INACTIVITY.BUTTON_NO}
        labelContinue={expired === true ? INACTIVITY.BUTTON_PROCEED : INACTIVITY.BUTTON_YES}
        title={subtitle}
      />
    </View>
  );
};
