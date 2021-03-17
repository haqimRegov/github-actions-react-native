import React, { FunctionComponent, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

import { LocalAssets } from "../../../assets/LocalAssets";
import {
  ActionButtons,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  PasswordValidation,
  PromptModal,
  SafeAreaPage,
} from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_PASSWORD_MAX_LENGTH, ERROR } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
import { changePassword } from "../../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../../store";
import { centerVertical, colorWhite, flexGrow, flexRow, fs24BoldBlack2, px, sh16, sh24, sh56, sw16, sw20, sw24 } from "../../../styles";
import { Encrypt, isPassword } from "../../../utils";

const { PROFILE } = Language.PAGE;
declare interface ChangePasswordProps extends GlobalStoreProps {
  page: "profile" | "password";
  navigation: IStackNavigationProp;
  setPage: (page: "profile" | "password") => void;
}

const ChangePasswordComponent: FunctionComponent<ChangePasswordProps> = ({ config, navigation, setPage }: ChangePasswordProps) => {
  const [prompt, setPrompt] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [input1Error, setInput1Error] = useState<string | undefined>(undefined);
  const [input2Error, setInput2Error] = useState<string | undefined>(undefined);
  const [inputNewPassword, setInputNewPassword] = useState<string>("");
  const [inputRetypePassword, setInputRetypePassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handelChangePassword = async () => {
    setIsLoading(true);
    setPrompt(true);
    setInput1Error(undefined);
    const encryptedNewPassword = await Encrypt(inputNewPassword, config!.sessionToken);
    const encryptedRetypePassword = await Encrypt(inputRetypePassword, config!.sessionToken);
    const request = {
      password: encryptedNewPassword,
      confirmPassword: encryptedRetypePassword,
    };
    // eslint-disable-next-line no-console
    console.log("changePassword request", request);
    const response: IChangePasswordResponse = await changePassword(request, { encryptionKey: config!.sessionToken }, navigation);
    // eslint-disable-next-line no-console
    console.log("response", response);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        if (data.result.status === true) {
          setIsLoading(false);
        }
      }
      if (error !== null) {
        setPrompt(false);
        setIsLoading(false);
        setInput1Error(error.message);
      }
    }
  };

  const handleValidatePassword = () => {
    if (inputRetypePassword !== "" && inputNewPassword !== inputRetypePassword) {
      return setInput2Error(ERROR.PASSWORD_NOT_MATCH);
    }
    return setInput2Error(undefined);
  };

  const buttonDisabled = inputNewPassword === "" || !isPassword(inputNewPassword);

  const handleBack = () => {
    setPage("profile");
  };

  return (
    <SafeAreaPage>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ ...px(sw24), backgroundColor: colorWhite._4 }}>
        <CustomSpacer space={sh16} />
        <View style={{ ...flexRow, ...centerVertical }}>
          <IcoMoon name="arrow-left" onPress={handleBack} size={sw20} />
          <CustomSpacer isHorizontal={true} space={sw16} />
          <Text style={fs24BoldBlack2}>{PROFILE.HEADING_CHANGE}</Text>
        </View>
        <CustomSpacer space={sh24} />
        <View>
          <CustomTextInput
            error={input1Error}
            keyboardType="default"
            label={PROFILE.LABEL_NEW_PASSWORD}
            maxLength={DICTIONARY_PASSWORD_MAX_LENGTH}
            onBlur={handleValidatePassword}
            onChangeText={setInputNewPassword}
            rightIcon={showPassword ? "eye-show" : "eye-hide"}
            rightIconPress={handleShowPassword}
            rightIconSize={sh24}
            secureTextEntry={showPassword}
            value={inputNewPassword}
          />
          <PasswordValidation password={inputNewPassword} />
          <CustomTextInput
            error={input2Error}
            keyboardType="default"
            label={PROFILE.LABEL_RETYPE_PASSWORD}
            onBlur={handleValidatePassword}
            onChangeText={setInputRetypePassword}
            rightIcon={showPassword ? "eye-show" : "eye-hide"}
            rightIconPress={handleShowPassword}
            rightIconSize={sh24}
            secureTextEntry={showPassword}
            spaceToTop={sh24}
            value={inputRetypePassword}
          />
        </View>
        <CustomFlexSpacer />
        <CustomSpacer space={sh56} />
        <ActionButtons
          continueDisabled={buttonDisabled}
          labelContinue={PROFILE.BUTTON_UPDATE}
          handleCancel={handleBack}
          handleContinue={handelChangePassword}
        />
        <CustomSpacer space={sh56} />
      </ScrollView>
      <PromptModal
        backdropOpacity={isLoading ? 0.4 : undefined}
        handleContinue={handleBack}
        illustration={LocalAssets.illustration.profileSuccess}
        isLoading={isLoading}
        label={PROFILE.PROMPT_TITLE}
        labelContinue={PROFILE.BUTTON_DONE}
        title={PROFILE.PROMPT_SUBTITLE}
        visible={prompt}
      />
    </SafeAreaPage>
  );
};

export const ChangePassword = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(ChangePasswordComponent);
