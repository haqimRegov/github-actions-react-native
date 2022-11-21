import React, { FunctionComponent, useState } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, PasswordValidation, RoundedButton } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_PASSWORD_MAX_LENGTH, ERROR } from "../../../data/dictionary";
import { fs24RegGray6, fs40BoldGray6, sh32, sh4, sh40, sh72, sw360 } from "../../../styles";
import { isPassword } from "../../../utils";

const { LOGIN } = Language.PAGE;

interface PasswordDetailsProps {
  error1?: string;
  error2?: string;
  handleSubmit: () => void;
  heading?: string;
  inputNewPassword: string;
  inputRetypePassword: string;
  setError1: (value?: string) => void;
  setError2: (value?: string) => void;
  setInputNewPassword: (value: string) => void;
  setInputRetypePassword: (value: string) => void;
  subheading?: string;
}

export const PasswordDetails: FunctionComponent<PasswordDetailsProps> = ({
  error1,
  error2,
  handleSubmit,
  heading,
  inputNewPassword,
  inputRetypePassword,
  setError2,
  setInputNewPassword,
  setInputRetypePassword,
  subheading,
}: PasswordDetailsProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleValidatePassword = () => {
    if (inputRetypePassword !== "" && inputNewPassword !== inputRetypePassword) {
      return setError2(ERROR.PASSWORD_NOT_MATCH);
    }
    return setError2(undefined);
  };

  const buttonDisabled = inputNewPassword === "" || !isPassword(inputNewPassword);

  return (
    <View>
      <CustomSpacer space={sh72} />
      <Text style={fs40BoldGray6}>{heading || LOGIN.HEADING_PASSWORD}</Text>
      <CustomSpacer space={sh4} />
      <Text style={{ width: sw360, ...fs24RegGray6 }}>{subheading || LOGIN.SUBHEADING_PASSWORD}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput
        error={error1}
        keyboardType="default"
        label={LOGIN.LABEL_NEW_PASSWORD}
        maxLength={DICTIONARY_PASSWORD_MAX_LENGTH}
        onBlur={handleValidatePassword}
        onChangeText={setInputNewPassword}
        rightIcon={{ name: showPassword ? "eye-show" : "eye-hide", onPress: handleShowPassword }}
        secureTextEntry={showPassword}
        value={inputNewPassword}
      />
      <PasswordValidation password={inputNewPassword} />
      <CustomTextInput
        error={error2}
        keyboardType="default"
        label={LOGIN.LABEL_RETYPE_PASSWORD}
        onBlur={handleValidatePassword}
        onChangeText={setInputRetypePassword}
        rightIcon={{ name: showPassword ? "eye-show" : "eye-hide", onPress: handleShowPassword }}
        secureTextEntry={showPassword}
        spaceToTop={sh32}
        value={inputRetypePassword}
      />
      <CustomSpacer space={sh32} />
      <RoundedButton
        disabled={buttonDisabled}
        onPress={handleSubmit}
        buttonStyle={{ width: sw360 }}
        text={LOGIN.BUTTON_CONTINUE}
        withDebounce={true}
      />
      <CustomSpacer space={sh32} />
    </View>
  );
};
