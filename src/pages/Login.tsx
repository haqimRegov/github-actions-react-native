import React, { useState, Fragment } from "react";
import { Alert, Image, ImageStyle, Text, View, ViewStyle, TextStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { LocalAssets } from "../assets/LocalAssets";
import { CustomFlexSpacer, CustomSpacer, CustomTextInput, LinkText, RoundedButton, SafeAreaPage } from "../components";
import { Language } from "../constants";
import {
  alignSelfCenter,
  centerHV,
  centerVertical,
  colorWhite,
  flexChild,
  flexRow,
  fs13MedBlue2,
  fs24MedBlack,
  fsAlignCenter,
  px,
  sh10,
  sh11,
  sh23,
  sh24,
  sh32,
  sh44,
  sh80,
  fs14MedBlack,
  shadow,
  sw200,
  sw304,
  sw80,
  sh28,
  fs20MedBlack,
} from "../styles";
import { CustomModal } from "./CustomModal";

const { INPUT_AGENT_CODE, INPUT_PASSWORD, BUTTON_LOGIN, FORGOT_PASSWORD, TITLE, PRIVACY_TERMS } = Language.PAGE.LOGIN;
const {
  CONFIRM_YOUR_DETAILS,
  OUTPUT_FULL_NAME,
  OUTPUT_FULL_NAME_PLACEHOLDER,
  OUTPUT_NRIC_PASSPORT,
  OUTPUT_NRIC_PASSPORT_PLACEHOLDER,
  OUTPUT_GENDER,
  OUTPUT_GENDER_PLACEHOLDER,
  OUTPUT_DATE_OF_BIRTH,
  OUTPUT_DATE_OF_BIRTH_PLACEHOLDER,
  BUTTON_RE_UPLOAD,
  BUTTON_CONFIRM,
} = Language.PAGE.MODAL;
const buttonLR: string[] = [BUTTON_RE_UPLOAD, BUTTON_CONFIRM];
const ModalInfo = [
  {
    Data: {
      Title: OUTPUT_FULL_NAME,
      Output: OUTPUT_FULL_NAME_PLACEHOLDER,
    },
  },
  {
    Data: {
      Title: OUTPUT_NRIC_PASSPORT,
      Output: OUTPUT_NRIC_PASSPORT_PLACEHOLDER,
    },
  },
  {
    Data: {
      Title: OUTPUT_GENDER,
      Output: OUTPUT_GENDER_PLACEHOLDER,
    },
  },
  {
    Data: {
      Title: OUTPUT_DATE_OF_BIRTH,
      Output: OUTPUT_DATE_OF_BIRTH_PLACEHOLDER,
    },
  },
];
export const LoginPage = () => {
  const container: ViewStyle = { ...centerHV, ...flexChild, backgroundColor: colorWhite._1 };
  const formContainer: ViewStyle = { ...px(sw80), ...shadow, backgroundColor: colorWhite._1 };
  const inputStyle: ViewStyle = { minWidth: sw304 };
  const logoStyle: ImageStyle = { ...alignSelfCenter, height: sh80, resizeMode: "contain", width: sw200 };
  const groupHeight: TextStyle = { marginBottom: sh28, ...fs20MedBlack };
  const groupHeightSmall: TextStyle = { ...fs14MedBlack };
  const [ModalVisible, setModalVisible] = useState<boolean>(false);

  const handleModel = () => {
    setModalVisible(!ModalVisible);
  };

  // const handleLogin = () => {
  //   Alert.alert("Login");
  // };

  const handleForgotPassword = () => {
    Alert.alert("ForgotPassword");
  };

  const handlePrivacyTerms = () => {
    Alert.alert("PrivacyTerms");
  };

  const ModalContent = () => {
    return ModalInfo.map(({ Data }) => (
      <Fragment>
        <Text style={groupHeightSmall}>{Data.Title}</Text>
        <Text style={groupHeight}>{Data.Output}</Text>
      </Fragment>
    ));
  };

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={container} keyboardShouldPersistTaps="handled">
        <View style={formContainer}>
          <CustomSpacer space={sh23} />
          <Image source={LocalAssets.logo.kib} style={logoStyle} />
          <CustomSpacer space={sh11} />
          <Text style={{ ...fs24MedBlack, ...fsAlignCenter }}>{TITLE}</Text>
          <CustomSpacer space={sh10} />
          <LinkText onPress={handlePrivacyTerms} style={{ ...fs13MedBlue2, ...fsAlignCenter }} text={PRIVACY_TERMS} />
          <CustomSpacer space={sh44} />
          <CustomTextInput placeholder={INPUT_AGENT_CODE} viewStyle={inputStyle} />
          <CustomSpacer space={sh24} />
          <CustomTextInput placeholder={INPUT_PASSWORD} secureTextEntry={true} viewStyle={inputStyle} />
          <CustomSpacer space={sh32} />
          <View style={{ ...flexRow, ...centerVertical }}>
            <LinkText onPress={handleForgotPassword} text={FORGOT_PASSWORD} />
            <CustomFlexSpacer />
            <RoundedButton onPress={handleModel} text={BUTTON_LOGIN} />
          </View>
          <CustomSpacer space={sh80} />
        </View>
      </ScrollView>
      <CustomModal
        visible={ModalVisible}
        handleClose={handleModel}
        buttonLR={buttonLR}
        content={ModalContent}
        Title={CONFIRM_YOUR_DETAILS}
      />
    </SafeAreaPage>
  );
};
