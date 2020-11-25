import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ActionButtons, CustomFlexSpacer, CustomSpacer, CustomTextInput, LinkText, SafeAreaPage } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_OTP_EXPIRY, DICTIONARY_OTP_LENGTH } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
import {
  alignSelfCenter,
  colorWhite,
  flexGrow,
  flexRow,
  fs12BoldBlack2,
  fs16BoldBlack2,
  fs16SemiBoldBlack2,
  fs16SemiBoldBlue1,
  fs24BoldBlack2,
  px,
  sh24,
  sh32,
  sh40,
  sh56,
  sh8,
  sw20,
  sw24,
  sw4,
  sw40,
} from "../../../styles";

const { EMAIL_VERIFICATION } = Language.PAGE;
declare interface EmailOTPProps {
  accountType: TypeAccountChoices;
  handleCancel?: () => void;
  handleContinue: () => void;
  isJointEmail: boolean;
  personalInfo: IPersonalInfoState;
  setPage: (page: "verification" | "otp") => void;
}

export const EmailOTP: FunctionComponent<EmailOTPProps> = ({
  handleCancel,
  handleContinue,
  isJointEmail,
  personalInfo,
  setPage,
}: EmailOTPProps) => {
  const [resendTimer, setResendTimer] = useState(DICTIONARY_OTP_EXPIRY);
  const [jointResendTimer, setJointResendTimer] = useState(DICTIONARY_OTP_EXPIRY);
  const [principalOtp, setPrincipalOtp] = useState<string>("");
  const [jointOtp, setJointOtp] = useState<string>("");

  const handleResend = () => {
    setResendTimer(DICTIONARY_OTP_EXPIRY);
  };

  const handleJointResend = () => {
    setJointResendTimer(11);
  };

  const handleBack = () => {
    setPage("verification");
  };

  useEffect(() => {
    let otpTimer: number;
    if (resendTimer > 0) {
      otpTimer = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [resendTimer]);

  useEffect(() => {
    let otpTimer: number;
    if (jointResendTimer > 0) {
      otpTimer = setInterval(() => {
        setJointResendTimer(jointResendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [jointResendTimer]);

  const resendMinutes = Math.floor(resendTimer / 60);
  const resendSeconds = resendTimer % 60 === 0 ? 0 : resendTimer % 60;
  const formattedResendSeconds = resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds;
  const jointResendMinutes = Math.floor(jointResendTimer / 60);
  const jointResendSeconds = jointResendTimer % 60 === 0 ? 0 : jointResendTimer % 60;
  const formattedJointResendSeconds = jointResendSeconds < 10 ? `0${jointResendSeconds}` : jointResendSeconds;
  const disabled = isJointEmail === true ? principalOtp === "" || jointOtp === "" : principalOtp === "";

  return (
    <SafeAreaPage>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ ...px(sw24), backgroundColor: colorWhite._4 }}>
        <CustomSpacer space={sh56} />
        <View style={flexRow}>
          <CustomSpacer space={sw4} />
          <View style={alignSelfCenter}>
            <IcoMoon name="arrow-left" onPress={handleBack} size={sw20} />
          </View>
          <CustomSpacer isHorizontal={true} space={sw20} />
          <Text style={fs24BoldBlack2}>{EMAIL_VERIFICATION.HEADING}</Text>
        </View>
        <CustomSpacer space={sh8} />
        <View style={px(sw40)}>
          <View style={flexRow}>
            <Text style={fs16SemiBoldBlack2}>{EMAIL_VERIFICATION.LABEL_OTP_SEND_TO}</Text>
            <CustomSpacer isHorizontal={true} space={sw4} />
            <Text style={fs16BoldBlack2}>{personalInfo.principal?.contactDetails?.emailAddress}</Text>
          </View>
          <CustomSpacer space={sh24} />
          <Text style={fs12BoldBlack2}>{EMAIL_VERIFICATION.LABEL_OTP}</Text>
          <CustomTextInput
            keyboardType="numeric"
            maxLength={DICTIONARY_OTP_LENGTH}
            onChangeText={setPrincipalOtp}
            placeholder={EMAIL_VERIFICATION.LABEL_OTP_PLACEHOLDER}
            value={principalOtp}
          />
          <CustomSpacer space={sh32} />
          <View style={flexRow}>
            <Text style={fs16SemiBoldBlack2}>{EMAIL_VERIFICATION.LABEL_RESEND}</Text>
            <CustomSpacer isHorizontal={true} space={sw4} />
            {resendTimer <= 0 ? (
              <LinkText onPress={handleResend} style={fs16SemiBoldBlue1} text={EMAIL_VERIFICATION.LINK_RESEND} />
            ) : (
              <Text style={fs16SemiBoldBlack2}>{`${EMAIL_VERIFICATION.LABEL_RESEND_IN} ${resendMinutes}:${formattedResendSeconds}`}</Text>
            )}
          </View>
          <CustomSpacer space={sh32} />
          {isJointEmail ? (
            <Fragment>
              <View style={flexRow}>
                <Text style={fs16SemiBoldBlack2}>{EMAIL_VERIFICATION.LABEL_OTP_SEND_TO}</Text>
                <CustomSpacer isHorizontal={true} space={sw4} />
                <Text style={fs16BoldBlack2}>{personalInfo.joint?.contactDetails?.emailAddress}</Text>
              </View>
              <CustomSpacer space={sh24} />
              <Text style={fs12BoldBlack2}>{EMAIL_VERIFICATION.LABEL_OTP}</Text>
              <CustomTextInput
                keyboardType="numeric"
                maxLength={DICTIONARY_OTP_LENGTH}
                onChangeText={setJointOtp}
                placeholder={EMAIL_VERIFICATION.LABEL_OTP_PLACEHOLDER}
                value={jointOtp}
              />
              <CustomSpacer space={sh32} />
              <View style={flexRow}>
                <Text style={fs16SemiBoldBlack2}>{EMAIL_VERIFICATION.LABEL_RESEND}</Text>
                <CustomSpacer isHorizontal={true} space={sw4} />
                {jointResendTimer <= 0 ? (
                  <LinkText onPress={handleJointResend} style={fs16SemiBoldBlue1} text={EMAIL_VERIFICATION.LINK_RESEND} />
                ) : (
                  <Text
                    style={
                      fs16SemiBoldBlack2
                    }>{`${EMAIL_VERIFICATION.LABEL_RESEND_IN} ${jointResendMinutes}:${formattedJointResendSeconds}`}</Text>
                )}
              </View>
            </Fragment>
          ) : null}
        </View>
        <CustomFlexSpacer />
        <ActionButtons
          continueDisabled={disabled}
          labelContinue={EMAIL_VERIFICATION.LABEL_VERIFY}
          handleCancel={handleCancel}
          handleContinue={handleContinue}
        />
        <CustomSpacer space={sh40} />
      </ScrollView>
    </SafeAreaPage>
  );
};
