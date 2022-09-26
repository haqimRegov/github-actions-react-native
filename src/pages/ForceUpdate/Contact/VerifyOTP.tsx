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
  fs12RegGray5,
  fs18BoldGray6,
  px,
  sh24,
  sh4,
  sh40,
  sh48,
  sh56,
  sw24,
  sw4,
  sw8,
} from "../../../styles";
import { isNumber } from "../../../utils";

const { INVESTOR_INFORMATION } = Language.PAGE;

declare interface VerifyOTPProps {
  details?: IClientDetailsState;
  emailOtpSent: boolean;
  handleCancel?: () => void;
  handleNavigate: () => void;
  handleResend: () => void;
  inputEmail: string;
  setEmailOtpSent: (value: boolean) => void;
  setOtpVerified: (toggle: boolean) => void;
}

export const VerifyOTP: FunctionComponent<VerifyOTPProps> = ({
  details,
  emailOtpSent,
  handleCancel,
  handleNavigate,
  handleResend,
  inputEmail,
  setEmailOtpSent,
  setOtpVerified,
}: VerifyOTPProps) => {
  const inputClientId = details?.principalHolder?.clientId!;

  const navigation = useNavigation<IStackNavigationProp>();
  const fetching = useRef<boolean>(false);
  const [inputOtp, setInputOtp] = useState<string>("");
  const [resendTimer, setResendTimer] = useState(OTP_CONFIG.EXPIRY);
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
  const otpLabel = `${INVESTOR_INFORMATION.CARD_TITLE_OTP} ${inputEmail}`;

  useEffect(() => {
    let otpTimer: ReturnType<typeof setTimeout>;
    if (resendTimer > 0) {
      otpTimer = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [resendTimer]);

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
          <CustomSpacer space={sh40} />
          <View style={flexRow}>
            <CustomSpacer space={sw4} />
            <View style={{}}>
              <IcoMoon name="arrow-left" onPress={handleCancel} size={sw24} suppressHighlighting={true} />
            </View>
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={fs18BoldGray6}>{INVESTOR_INFORMATION.HEADING_CONTACT}</Text>
          </View>
          <CustomSpacer space={sh24} />
          <View>
            <ColorCard
              header={{ label: INVESTOR_INFORMATION.CARD_LABEL_OTP, title: otpLabel }}
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
                  <CustomSpacer space={sh4} />
                  <View style={flexRow}>
                    <Text style={fs12RegGray5}>{INVESTOR_INFORMATION.LABEL_RESEND}</Text>
                    <CustomSpacer isHorizontal={true} space={sw4} />
                    {resendTimer <= 0 ? (
                      <LinkText onPress={handleResendOtp} style={fs12BoldBlue8} text={INVESTOR_INFORMATION.LINK_RESEND} />
                    ) : (
                      <Text
                        style={fs12RegGray5}>{`${INVESTOR_INFORMATION.LABEL_RESEND_IN} ${resendMinutes}:${formattedResendSeconds}`}</Text>
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
