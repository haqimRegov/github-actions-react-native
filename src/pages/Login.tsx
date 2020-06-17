import React, { Fragment, useState } from "react";
import { Alert, Image, ImageStyle, Text, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { LocalAssets } from "../assets/LocalAssets";
import { ConformationModal, CustomFlexSpacer, CustomSpacer, CustomTextInput, LinkText, RoundedButton, SafeAreaPage } from "../components";
import { Language } from "../constants";
import {
  alignSelfCenter,
  centerHV,
  centerVertical,
  colorWhite,
  flexChild,
  flexRow,
  fs12MedBlack,
  fs13MedBlue2,
  fs16MedBlack,
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
  shadow,
  sw200,
  sw205,
  sw304,
  sw80,
} from "../styles";

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

interface ISampleClientDetails {
  title: string;
  output: string;
}

const SAMPLE_CLIENT_DETAILS: ISampleClientDetails[] = [
  {
    title: OUTPUT_FULL_NAME,
    output: OUTPUT_FULL_NAME_PLACEHOLDER,
  },
  {
    title: OUTPUT_NRIC_PASSPORT,
    output: OUTPUT_NRIC_PASSPORT_PLACEHOLDER,
  },
  {
    title: OUTPUT_GENDER,
    output: OUTPUT_GENDER_PLACEHOLDER,
  },
  {
    title: OUTPUT_DATE_OF_BIRTH,
    output: OUTPUT_DATE_OF_BIRTH_PLACEHOLDER,
  },
];
export const LoginPage = () => {
  const container: ViewStyle = { ...centerHV, ...flexChild, backgroundColor: colorWhite._1 };
  const formContainer: ViewStyle = { ...px(sw80), ...shadow, backgroundColor: colorWhite._1 };
  const inputStyle: ViewStyle = { minWidth: sw304 };
  const logoStyle: ImageStyle = { ...alignSelfCenter, height: sh80, resizeMode: "contain", width: sw200 };
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const buttonStyle: ViewStyle = { width: sw205 };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleForgotPassword = () => {
    Alert.alert("ForgotPassword");
  };

  const handlePrivacyTerms = () => {
    Alert.alert("PrivacyTerms");
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
            <RoundedButton onPress={handleModal} text={BUTTON_LOGIN} />
          </View>
          <CustomSpacer space={sh80} />
        </View>
      </ScrollView>
      <ConformationModal
        buttons={[
          { onPress: handleModal, text: BUTTON_RE_UPLOAD, secondary: true, buttonStyle: buttonStyle },
          { onPress: handleModal, text: BUTTON_CONFIRM, buttonStyle: buttonStyle },
        ]}
        handleClose={handleModal}
        title={CONFIRM_YOUR_DETAILS}
        visible={modalVisible}>
        <Fragment>
          {SAMPLE_CLIENT_DETAILS.map((items: ISampleClientDetails, index: number) => (
            <Fragment key={index}>
              <Text style={fs12MedBlack}>{items.title}</Text>
              <Text style={fs16MedBlack}>{items.output}</Text>
              <CustomSpacer space={sh24} />
            </Fragment>
          ))}
        </Fragment>
      </ConformationModal>
    </SafeAreaPage>
  );
};
