import React, { Fragment, useState } from "react";
import { Text, View } from "react-native";

import {
  CheckBox,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  LinkTextGroup,
  LinkTextProps,
  RoundedButton,
} from "../../components";
import { Language } from "../../constants";
import { updateStorageData } from "../../integrations";
import {
  centerVertical,
  flexRow,
  fs12RegBlue1,
  fs24BoldBlack2,
  fs40BoldBlack2,
  px,
  sh24,
  sh28,
  sh32,
  sh40,
  sh60,
  sh8,
  sw24,
  sw288,
  sw360,
  sw4,
  sw40,
} from "../../styles";

const { LOGIN } = Language.PAGE;

interface NormalLoginProps {
  navigation: IStackNavigationProp;
  passwordRecovery?: boolean;
  setRootPage: (page: TypeLoginPages) => void;
}

export const NormalLogin = ({ navigation, passwordRecovery, setRootPage }: NormalLoginProps) => {
  const [inputNRIC, setInputNRIC] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleFingerprint = () => {
    // TODO
    navigation.navigate("Dashboard");
  };

  const handleForgotPassword = () => {
    setRootPage("PASSWORD_RECOVERY");
  };

  const handleFirstTimeLogin = () => {
    setRootPage("FIRST_TIME_LOGIN");
  };

  const handleLogin = async () => {
    // TODO integration
    await updateStorageData("visited", true);
    navigation.navigate("Onboarding");
  };

  const handleRememberMe = () => {
    // TODO
    setRememberMe(!rememberMe);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const bottomLinks: LinkTextProps[] = [
    {
      onPress: handleFirstTimeLogin,
      text: LOGIN.LABEL_FIRST_TIME,
    },
    {
      onPress: handleForgotPassword,
      text: LOGIN.FORGOT_PASSWORD,
    },
  ];
  const HEADING = passwordRecovery === true ? LOGIN.HEADING_DONE : LOGIN.HEADING_WELCOME;

  return (
    <View style={px(sw40)}>
      <CustomSpacer space={sh60} />
      <Text style={fs40BoldBlack2}>{HEADING}</Text>
      <CustomSpacer space={sh8} />
      <Text style={{ width: sw360, ...fs24BoldBlack2 }}>{LOGIN.SUBHEADING_LOGIN}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput
        keyboardType={"numeric"}
        label={LOGIN.LABEL_NRIC}
        onChangeText={setInputNRIC}
        secureTextEntry={false}
        value={inputNRIC}
      />
      <CustomTextInput
        keyboardType={"default"}
        label={LOGIN.LABEL_PASSWORD}
        onChangeText={setInputPassword}
        rightIcon={showPassword ? "eye-show" : "eye-hide"}
        rightIconPress={handleShowPassword}
        rightIconSize={sh24}
        secureTextEntry={showPassword}
        spaceToTop={sh24}
        value={inputPassword}
      />
      <CustomSpacer space={sh32} />
      <View style={flexRow}>
        <RoundedButton
          disabled={inputNRIC === "" || inputPassword === ""}
          onPress={handleLogin}
          buttonStyle={{ width: sw288 }}
          text={LOGIN.BUTTON_LOGIN}
        />
        <CustomSpacer isHorizontal={true} space={sw24} />
        <Fragment>
          <IconButton name="fingerprint" onPress={handleFingerprint} />
        </Fragment>
      </View>
      <CustomSpacer space={sh28} />
      <View style={{ ...centerVertical, ...flexRow, width: sw360 }}>
        <CheckBox label={LOGIN.REMEMBER_ME} onPress={handleRememberMe} toggle={rememberMe} />
        <CustomFlexSpacer />
        <LinkTextGroup divider={<Text style={fs12RegBlue1}>|</Text>} links={bottomLinks} spaceToDivider={sw4} />
      </View>
    </View>
  );
};
