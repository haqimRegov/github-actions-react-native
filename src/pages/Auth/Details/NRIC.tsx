import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, CustomTextInput, LinkText, RoundedButton } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_NRIC_LENGTH, ERROR } from "../../../data/dictionary";
import { fs12BoldBlue8, fs24RegGray6, fs40BoldGray6, sh16, sh32, sh40, sh56, sh8, sw112, sw144, sw360 } from "../../../styles";
import { isNumber } from "../../../utils";

const { LOGIN } = Language.PAGE;

interface NRICDetailsProps {
  error?: string;
  handleExistingLogin?: () => void;
  handleSubmit: () => void;
  heading?: string;
  inputNRIC: string;
  setError: (value?: string) => void;
  setInputNRIC: (value: string) => void;
  setPage: (TypeLoginPages) => void;
  subheading?: string;
}

export const NRICDetails: FunctionComponent<NRICDetailsProps> = ({
  error,
  handleExistingLogin,
  handleSubmit,
  heading,
  inputNRIC,
  setError,
  setInputNRIC,
  setPage,
  subheading,
}: NRICDetailsProps) => {
  const handleValidateNRIC = () => {
    if (!isNumber(inputNRIC)) {
      return setError(ERROR.LOGIN_INVALID_NRIC);
    }
    return setError(undefined);
  };

  const handleNric = (value: string) => {
    if (isNumber(value) || value === "") {
      setInputNRIC(value);
    }
  };

  const handleBackToLogin = () => {
    setPage("LOGIN");
  };

  return (
    <View>
      <CustomSpacer space={sh56} />
      <Text style={fs40BoldGray6}>{heading || LOGIN.HEADING_WELCOME}</Text>
      <CustomSpacer space={sh8} />
      <Text style={{ width: sw360, ...fs24RegGray6 }}>{subheading || LOGIN.SUBHEADING_FIRST_TIME}</Text>
      <CustomSpacer space={sh40} />
      <CustomTextInput
        error={error}
        keyboardType="numeric"
        label={LOGIN.LABEL_NRIC}
        maxLength={DICTIONARY_NRIC_LENGTH}
        onBlur={handleValidateNRIC}
        onChangeText={handleNric}
        placeholder={LOGIN.LABEL_PLACEHOLDER_NRIC}
        secureTextEntry={false}
        value={inputNRIC}
      />
      <CustomSpacer space={sh32} />
      <RoundedButton
        disabled={!isNumber(inputNRIC)}
        onPress={handleSubmit}
        buttonStyle={{ width: sw360 }}
        text={LOGIN.BUTTON_CONTINUE}
        withDebounce={true}
      />
      <CustomSpacer space={sh16} />
      {handleExistingLogin !== undefined ? (
        <LinkText onPress={handleExistingLogin} text={LOGIN.LABEL_ALREADY} style={{ ...fs12BoldBlue8, marginLeft: sw112 }} />
      ) : (
        <LinkText
          onPress={handleBackToLogin}
          text={LOGIN.LINK_BACK_TO_LOGIN}
          style={{ ...fs12BoldBlue8, marginLeft: sw144, marginTop: sh16 }}
        />
      )}
    </View>
  );
};
