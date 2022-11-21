import { useNavigation } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  ActionButtons,
  ColorCard,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  CustomToast,
  defaultContentProps,
  LinkText,
  SafeAreaPage,
} from "../../../components";
import { Language, OTP_CONFIG } from "../../../constants";
import { ERROR, ERROR_CODE } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
import { emailOtpVerification } from "../../../network-actions";
import {
  colorBlue,
  flexGrow,
  flexRow,
  fs12BoldBlue8,
  fs12BoldGray5,
  fs12RegGray5,
  fs16BoldBlack2,
  px,
  sh16,
  sh24,
  sh48,
  sh56,
  sw24,
  sw4,
  sw8,
} from "../../../styles";
import { isNumber } from "../../../utils";

const { INVESTOR_INFORMATION, EMAIL_VERIFICATION } = Language.PAGE;

declare interface VerifyOTPProps {
  details?: IClientDetailsState;
  emailOtpSent: boolean;
  handleCancel?: () => void;
  handleNavigate: () => void;
  handleResend: () => void;
  inputEmail: string;
  resendTimer: number;
  setEmailOtpSent: (value: boolean) => void;
  setOtpVerified: (toggle: boolean) => void;
  setResendTimer: (value: number) => void;
}

export const VerifyOTP: FunctionComponent<VerifyOTPProps> = ({
  details,
  emailOtpSent,
  handleCancel,
  handleNavigate,
  handleResend,
  inputEmail,
  resendTimer,
  setEmailOtpSent,
  setOtpVerified,
  setResendTimer,
}: VerifyOTPProps) => {
  const inputClientId = details?.principalHolder?.clientId!;

  const navigation = useNavigation<IStackNavigationProp>();
  const fetching = useRef<boolean>(false);
  const [inputOtp, setInputOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string | undefined>(undefined);

  const validateOtp = (value: string) => {
    if (isNumber(value) === false) {
      return ERROR.LOGIN_INVALID_OTP;
    }
    return undefined;
  };

  const checkPrincipalOtp = () => {
    setOtpError(validateOtp(inputOtp));
  };

  const handleFetching = (loading: boolean) => {
    fetching.current = loading;
  };

  const handleVerifyOTP = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setOtpError(undefined);
      const request: IEmailOtpVerificationRequest = {
        id: details!.principalHolder!.id,
        initId: details!.initId!,
        isForceUpdate: true,
        clientId: inputClientId,
        principalHolder: { email: inputEmail, code: inputOtp },
      };
      const response: IEmailOtpVerificationResponse = await emailOtpVerification(request, navigation, handleFetching);
      fetching.current = false;
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          if (data.result.status === true) {
            setOtpVerified(true);
            handleNavigate();
          }
        }
        if (error !== null) {
          setOtpError(error.message);
          if (error.errorCode === ERROR_CODE.otpAttempt) {
            setResendTimer(OTP_CONFIG.COOL_OFF);
          }
        }
      }
    }
    return true;
  };

  const handleResendOtp = () => {
    handleResend();
    setResendTimer(OTP_CONFIG.EXPIRY);
    setEmailOtpSent(true);
  };

  const resendMinutes = Math.floor(resendTimer / 60);
  const resendSeconds = resendTimer % 60 === 0 ? 0 : resendTimer % 60;
  const formattedResendSeconds = resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds;
  const disabled = inputOtp === "";
  const inputOtpLabel = INVESTOR_INFORMATION.LABEL_OTP;

  useEffect(() => {
    let redirectTimer: ReturnType<typeof setTimeout>;
    return () => {
      return clearTimeout(redirectTimer);
    };
  }, []);

  // TODO don't show toast when email is not sent

  return (
    <Fragment>
      <SafeAreaPage>
        <ScrollView
          contentContainerStyle={flexGrow}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ ...px(sw24), backgroundColor: colorBlue._2 }}>
          <CustomSpacer space={defaultContentProps.spaceToTop!} />
          <View style={flexRow}>
            <CustomSpacer space={sw4} />
            <View>
              <IcoMoon name="arrow-left" onPress={handleCancel} size={sw24} suppressHighlighting={true} />
            </View>
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={defaultContentProps.subheadingStyle}>{INVESTOR_INFORMATION.HEADING_CONTACT}</Text>
          </View>
          <CustomSpacer space={sh24} />
          <View>
            <ColorCard
              header="custom"
              customHeader={
                <View>
                  <Text style={fs16BoldBlack2}>{INVESTOR_INFORMATION.CARD_LABEL_OTP}</Text>
                  <View style={flexRow}>
                    <Text style={fs12RegGray5}>{EMAIL_VERIFICATION.LABEL_OTP_SEND_TO}</Text>
                    <CustomSpacer isHorizontal space={sw4} />
                    <Text style={fs12BoldGray5}>{inputEmail}</Text>
                  </View>
                </View>
              }
              content={
                <View>
                  <CustomTextInput
                    keyboardType="numeric"
                    error={otpError}
                    label={inputOtpLabel}
                    maxLength={OTP_CONFIG.LENGTH}
                    onBlur={checkPrincipalOtp}
                    onChangeText={setInputOtp}
                    placeholder={INVESTOR_INFORMATION.LABEL_OTP_PLACEHOLDER}
                    value={inputOtp}
                  />
                  <CustomSpacer space={sh16} />
                  <View style={flexRow}>
                    <Text style={fs12RegGray5}>{INVESTOR_INFORMATION.LABEL_RESEND}</Text>
                    <CustomSpacer isHorizontal={true} space={sw4} />
                    {resendTimer <= 0 ? (
                      <LinkText onPress={handleResendOtp} style={fs12BoldBlue8} text={INVESTOR_INFORMATION.LINK_RESEND} />
                    ) : (
                      <View style={flexRow}>
                        <Text style={fs12RegGray5}>{INVESTOR_INFORMATION.LABEL_RESEND_IN}</Text>
                        <CustomSpacer space={sw4} isHorizontal />
                        <Text style={fs12BoldGray5}>
                          {resendMinutes}:{formattedResendSeconds}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              }
            />
          </View>
          <CustomFlexSpacer />
          <CustomSpacer space={sh56} />
          <ActionButtons
            continueDisabled={disabled}
            labelContinue={INVESTOR_INFORMATION.LABEL_VERIFY}
            handleCancel={handleCancel}
            handleContinue={handleVerifyOTP}
          />
          <CustomSpacer space={sh48} />
        </ScrollView>
      </SafeAreaPage>
      <CustomToast deleteText={INVESTOR_INFORMATION.TOAST_SENT} parentVisible={emailOtpSent} setParentVisible={setEmailOtpSent} />
    </Fragment>
  );
};
