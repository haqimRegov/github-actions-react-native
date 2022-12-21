import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useContext } from "react";
import { View } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Prompt } from "../../components";
import { Language } from "../../constants";
import { ModalContext } from "../../context";
import { ERRORS } from "../../data/dictionary";
import { logout } from "../../network-actions";
import { centerHV, fullHW } from "../../styles";

const { SESSION } = Language.PAGE;

export const DuplicatePrompt: FunctionComponent = () => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { setLoggedOut } = useContext(ModalContext);

  const handleDuplicateLogout = () => {
    setLoggedOut(true);
    logout(navigation, false);
  };

  return (
    <View style={{ ...centerHV, ...fullHW }}>
      <Prompt
        handleContinue={handleDuplicateLogout}
        illustration={LocalAssets.illustration.clientWarning}
        label={SESSION.PROMPT_LOGOUT}
        labelContinue={SESSION.BUTTON_LOGIN}
        title={ERRORS.duplicateLogin.message}
      />
    </View>
  );
};
