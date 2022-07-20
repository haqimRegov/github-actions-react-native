import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

import { LocalAssets } from "../../../assets/images/LocalAssets";
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
import { useDebounce } from "../../../hooks";
import { IcoMoon } from "../../../icons";
import { changePassword } from "../../../network-actions/dashboard/ChangePassword";
import { checkPassword } from "../../../network-actions/dashboard/CheckPassword";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../../store";
import {
  borderBottomBlue4,
  centerVertical,
  colorBlue,
  flexGrow,
  flexRow,
  fs24BoldGray6,
  px,
  sh16,
  sh24,
  sh32,
  sh56,
  sw16,
  sw20,
  sw24,
} from "../../../styles";
import { Encrypt, isPassword } from "../../../utils";

const { PROFILE } = Language.PAGE;
declare interface ChangePasswordProps extends GlobalStoreProps {
  page: "profile" | "password";
  navigation: IStackNavigationProp;
  setPage: (page: "profile" | "password") => void;
}

const ChangePasswordComponent: FunctionComponent<ChangePasswordProps> = ({ config, navigation, setPage }: ChangePasswordProps) => {
  const fetching = useRef<boolean>(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [input1Error, setInput1Error] = useState<string | undefined>(undefined);
  const [inputCurrentError, setInputCurrentError] = useState<string | undefined>(undefined);
  const [input2Error, setInput2Error] = useState<string | undefined>(undefined);
  const [inputCurrentPassword, setCurrentPassword] = useState<string>("");
  const [inputNewPassword, setInputNewPassword] = useState<string>("");
  const [inputRetypePassword, setInputRetypePassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(true);
  const [validateCurrentPassword, setValidateCurrentPassword] = useState<boolean>(true);
  const [validateNewPassword, setValidateNewPassword] = useState<boolean>(true);
  const [switchValidation, setSwitchValidation] = useState<boolean>(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleCheckPassword = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setIsLoading(true);
      setInputCurrentError(undefined);
      const encryptedCurrentPassword = await Encrypt(inputCurrentPassword, config!.sessionToken);
      const request: ICheckPasswordRequest = { password: encryptedCurrentPassword };
      const response: ICheckPasswordResponse = await checkPassword(request, { encryptionKey: config!.sessionToken }, navigation);
      fetching.current = false;
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          if (data.result.status === true) {
            setValidateCurrentPassword(false);
            setSwitchValidation(false);
          } else {
            setInputCurrentError(ERROR.CHECK_WRONG_PASSWORD);
            setValidateCurrentPassword(true);
            setSwitchValidation(true);
          }
        }
        if (error !== null) {
          setInputCurrentError(error.message);
        }
      }
    }
  };

  const handleOnChange = (text: string) => {
    setCurrentPassword(text);
  };

  const handleNewPassword = (text: string) => {
    setInputNewPassword(text);
    setSwitchValidation(false);
    setInput1Error(undefined);
    if (validateCurrentPassword === false && isPassword(text)) {
      setValidateNewPassword(false);
    } else setValidateNewPassword(true);
  };

  const handleChangePassword = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setIsLoading(true);
      setPrompt(true);
      setInput1Error(undefined);
      const encryptedNewPassword = await Encrypt(inputNewPassword, config!.sessionToken);
      const encryptedRetypePassword = await Encrypt(inputRetypePassword, config!.sessionToken);
      const encryptedCurrentPassword = await Encrypt(inputCurrentPassword, config!.sessionToken);
      const request = {
        password: encryptedNewPassword,
        confirmPassword: encryptedRetypePassword,
        currentPassword: encryptedCurrentPassword,
      };
      const response: IChangePasswordResponse = await changePassword(
        request,
        { encryptionKey: config!.sessionToken },
        navigation,
        setIsLoading,
      );
      fetching.current = false;
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          if (data.result.status === true) {
            setIsLoading(false);
          }
        }
        if (error !== null) {
          setPrompt(false);
          setSwitchValidation(true);
          setInput1Error(error.message);
        }
      }
    }
  };

  const handleValidateRetypePassword = () => {
    if (inputRetypePassword !== "" && inputNewPassword !== inputRetypePassword) {
      return setInput2Error(ERROR.PASSWORD_NOT_MATCH);
    }
    return setInput2Error(undefined);
  };

  const handleValidatePassword = () => {
    if (input1Error !== undefined) {
      setValidateNewPassword(true);
      return input1Error;
    }
    if (input2Error !== undefined) {
      handleValidateRetypePassword();
    }
    if (inputNewPassword === inputCurrentPassword) {
      setValidateNewPassword(true);
      setSwitchValidation(true);
      return setInput1Error(ERROR.SIMILAR_PASSWORD);
    }
    return setInput1Error(undefined);
  };

  const debouncedCurrentPassword: string = useDebounce<string>(inputCurrentPassword, 1000);

  const handleClearAll = () => {
    if (input1Error !== undefined) {
      setSwitchValidation(true);
      setInputRetypePassword("");
    }
  };

  const buttonDisabled =
    inputNewPassword === "" ||
    !isPassword(inputNewPassword) ||
    inputRetypePassword === "" ||
    !isPassword(inputRetypePassword) ||
    input2Error !== undefined ||
    inputNewPassword !== inputRetypePassword ||
    input1Error !== undefined;

  const handleBack = () => {
    setPage("profile");
  };

  useEffect(() => {
    if (debouncedCurrentPassword !== "") {
      handleCheckPassword();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCurrentPassword]);

  return (
    <SafeAreaPage>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colorBlue._2 }}>
        <CustomSpacer space={sh16} />
        <View style={{ ...px(sw24), ...flexRow, ...centerVertical }}>
          <IcoMoon name="arrow-left" onPress={handleBack} size={sw20} suppressHighlighting={true} />
          <CustomSpacer isHorizontal={true} space={sw16} />
          <Text style={fs24BoldGray6}>{PROFILE.HEADING_CHANGE}</Text>
        </View>
        <CustomSpacer space={sh32} />
        <View style={px(sw24)}>
          <CustomTextInput
            keyboardType="default"
            error={inputCurrentError}
            label={PROFILE.LABEL_CURRENT_PASSWORD}
            maxLength={DICTIONARY_PASSWORD_MAX_LENGTH}
            rightIcon={{ name: showCurrentPassword ? "eye-show" : "eye-hide", onPress: handleShowCurrentPassword }}
            secureTextEntry={showCurrentPassword}
            onChangeText={handleOnChange}
            value={inputCurrentPassword}
          />
        </View>
        <CustomSpacer space={sh32} />
        <View style={borderBottomBlue4} />
        <CustomSpacer space={sh32} />

        <View style={px(sw24)}>
          <CustomTextInput
            disabled={validateCurrentPassword}
            increaseErrorWidth={true}
            error={input1Error}
            keyboardType="default"
            label={PROFILE.LABEL_NEW_PASSWORD}
            maxLength={DICTIONARY_PASSWORD_MAX_LENGTH}
            onBlur={handleValidatePassword}
            onChangeText={handleNewPassword}
            onFocus={handleClearAll}
            rightIcon={{ name: showPassword ? "eye-show" : "eye-hide", onPress: handleShowPassword }}
            secureTextEntry={showPassword}
            value={inputNewPassword}
          />
          {switchValidation === false ? <PasswordValidation password={inputNewPassword} /> : null}
          <CustomTextInput
            disabled={validateNewPassword}
            error={input2Error}
            keyboardType="default"
            label={PROFILE.LABEL_RETYPE_PASSWORD}
            onBlur={handleValidateRetypePassword}
            onChangeText={setInputRetypePassword}
            rightIcon={{ name: showPassword ? "eye-show" : "eye-hide", onPress: handleShowPassword }}
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
          handleContinue={handleChangePassword}
          buttonContainerStyle={px(sw24)}
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
