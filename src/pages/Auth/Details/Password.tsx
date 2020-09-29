import React, { FunctionComponent, useState } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, PasswordValidation, RoundedButton } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_PASSWORD_MAX_LENGTH, ERROR } from "../../../data/dictionary";
import { fs24RegBlack2, fs40BoldBlack2, px, sh24, sh32, sh40, sh56, sh8, sw360, sw40 } from "../../../styles";
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
    <View style={px(sw40)}>
      <CustomSpacer space={sh56} />
      <Text style={fs40BoldBlack2}>{heading || LOGIN.HEADING_PASSWORD}</Text>
      <CustomSpacer space={sh8} />
      <Text style={{ width: sw360, ...fs24RegBlack2 }}>{subheading || LOGIN.SUBHEADING_PASSWORD}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput
        error={error1}
        keyboardType={"default"}
        label={LOGIN.LABEL_NEW_PASSWORD}
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
        error={error2}
        keyboardType={"default"}
        label={LOGIN.LABEL_RETYPE_PASSWORD}
        onBlur={handleValidatePassword}
        onChangeText={setInputRetypePassword}
        rightIcon={showPassword ? "eye-show" : "eye-hide"}
        rightIconPress={handleShowPassword}
        rightIconSize={sh24}
        secureTextEntry={showPassword}
        spaceToTop={sh24}
        value={inputRetypePassword}
      />
      <CustomSpacer space={sh32} />
      <RoundedButton disabled={buttonDisabled} onPress={handleSubmit} buttonStyle={{ width: sw360 }} text={LOGIN.BUTTON_CONTINUE} />
      <CustomSpacer space={sh32} />
    </View>
  );
};
