import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useState } from "react";
import { Alert, Image, ImageStyle, ScrollView, Text, View, ViewStyle } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import { LocalAssets } from "../assets/LocalAssets";
import {
  CheckBox,
  ConfirmationModal,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  IconButton,
  LinkText,
  LinkTextGroup,
  LinkTextProps,
  RoundedButton,
} from "../components";
import { Language } from "../constants";
import {
  centerVertical,
  circle,
  colorBlack,
  colorWhite,
  DEVICE,
  flexChild,
  flexGrow,
  flexRow,
  fs12RegBlack2,
  fs12RegBlue,
  fs12SemiBoldBlack2,
  fs16BoldBlack2,
  fs24RegBlack2,
  fs36SemiBoldBlack2,
  fsUppercase,
  px,
  scaleHeight,
  sh12,
  sh14,
  sh16,
  sh23,
  sh24,
  sh30,
  sh56,
  sh70,
  sw16,
  sw205,
  sw24,
  sw278,
  sw350,
  sw4,
  sw56,
  sw590,
  sw73,
} from "../styles";

const {
  BUTTON_LOGIN,
  FORGOT_PASSWORD,
  HEADING,
  LABEL_AGENT_CODE,
  LABEL_PASSWORD,
  LANGUAGE_ENGLISH,
  LANGUAGE_BAHASA,
  PRIVACY_POLICY,
  REMEMBER_ME,
  SUBHEADING,
  TERMS_AND_CONDITIONS,
} = Language.PAGE.LOGIN;
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

interface LoginPageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const LoginPage = ({ navigation }: LoginPageProps) => {
  const { bottom, top } = useSafeArea();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputAgentCode, setInputAgentCode] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // TODO check why sizes cannot be imported here
  const sh32 = scaleHeight(32);
  const bottomPadding = sh32 + bottom;
  const topPadding = sh32 + top;
  const buttonStyle: ViewStyle = { width: sw205 };
  const inputStyle: ViewStyle = { width: sw350 };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleForgotPassword = () => {
    Alert.alert("ForgotPassword");
  };

  const handlePrivacyPolicy = () => {
    Alert.alert("PrivacyPolicy");
  };

  const handleTermsAndConditions = () => {
    Alert.alert("TermsAndConditions");
  };

  const handleFingerprint = () => {
    Alert.alert("handleFingerprint");
  };

  const handleLanguageChange = () => {
    Alert.alert("handleLanguageChange");
  };

  const handleLogin = () => {
    handleModal();
    navigation.navigate("Onboarding");
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "Dashboard" }],
    //   }),
    // );
  };
  const backgroundStyle: ImageStyle = { width: sw590, height: DEVICE.WINDOW.HEIGHT };
  const logoStyle: ImageStyle = { height: sh70 };
  const topLinks: LinkTextProps[] = [
    {
      onPress: handleLanguageChange,
      style: fsUppercase,
      text: LANGUAGE_BAHASA,
    },
    {
      onPress: handleLanguageChange,
      style: fsUppercase,
      text: LANGUAGE_ENGLISH,
    },
  ];
  const bottomLinks: LinkTextProps[] = [
    {
      onPress: handlePrivacyPolicy,
      text: PRIVACY_POLICY,
    },
    {
      onPress: handleTermsAndConditions,
      text: TERMS_AND_CONDITIONS,
    },
  ];

  return (
    <Fragment>
      <ScrollView bounces={false} contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ ...flexRow, backgroundColor: colorWhite._1 }}>
          <View>
            <Image source={LocalAssets.login.background} style={backgroundStyle} />
          </View>
          <View style={{ ...flexChild, ...px(sw56) }}>
            <CustomSpacer space={topPadding} />
            <View style={flexRow}>
              <Image source={LocalAssets.logo.kenanga} style={logoStyle} />
              <CustomFlexSpacer />
              <View style={{ ...centerVertical, ...flexRow, height: sh16 }}>
                <LinkTextGroup divider={<View style={circle(sw4, colorBlack._3)} />} links={topLinks} spaceToDivider={sw4} />
              </View>
            </View>
            <View style={px(sw16)}>
              <CustomSpacer space={sh56} />
              <Text style={fs36SemiBoldBlack2}>{HEADING}</Text>
              <Text style={fs24RegBlack2}>{SUBHEADING}</Text>
              <CustomTextInput
                label={LABEL_AGENT_CODE}
                onChangeText={setInputAgentCode}
                spaceToTop={sh14}
                value={inputAgentCode}
                viewStyle={inputStyle}
              />
              <CustomTextInput
                label={LABEL_PASSWORD}
                onChangeText={setInputPassword}
                spaceToTop={sh12}
                spaceToBottom={sh30}
                value={inputPassword}
                viewStyle={inputStyle}
              />
              <View style={flexRow}>
                <RoundedButton onPress={handleModal} buttonStyle={{ width: sw278 }} text={BUTTON_LOGIN} />
                <CustomSpacer isHorizontal={true} space={sw24} />
                <IconButton name="fingerprint" onPress={handleFingerprint} />
              </View>
              <CustomSpacer space={sh23} />
              <View style={flexRow}>
                <CheckBox label={REMEMBER_ME} toggle={false} />
                <CustomSpacer isHorizontal={true} space={sw73} />
                <LinkText onPress={handleForgotPassword} style={fs12RegBlack2} text={FORGOT_PASSWORD} />
              </View>
            </View>
            <CustomFlexSpacer />
            <View style={flexRow}>
              <LinkTextGroup divider={<Text style={fs12RegBlue}>|</Text>} links={bottomLinks} spaceToDivider={sw4} />
            </View>
            <CustomSpacer space={bottomPadding} />
          </View>
        </View>
      </ScrollView>
      <ConfirmationModal
        buttons={[
          { onPress: handleModal, text: BUTTON_RE_UPLOAD, secondary: true, buttonStyle: buttonStyle },
          { onPress: handleLogin, text: BUTTON_CONFIRM, buttonStyle: buttonStyle },
        ]}
        handleClose={handleModal}
        title={CONFIRM_YOUR_DETAILS}
        visible={modalVisible}>
        <Fragment>
          {SAMPLE_CLIENT_DETAILS.map((items: ISampleClientDetails, index: number) => (
            <Fragment key={index}>
              <Text style={fs12SemiBoldBlack2}>{items.title}</Text>
              <Text style={fs16BoldBlack2}>{items.output}</Text>
              <CustomSpacer space={sh24} />
            </Fragment>
          ))}
        </Fragment>
      </ConfirmationModal>
    </Fragment>
  );
};
