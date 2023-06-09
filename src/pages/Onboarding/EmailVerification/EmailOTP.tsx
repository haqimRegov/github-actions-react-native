import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import {
  ColorCard,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  defaultContentProps,
  LinkText,
  RoundedButton,
  SafeAreaPage,
  TextSpaceArea,
} from "../../../components";
import { Language, OTP_CONFIG } from "../../../constants";
import { ERROR, ERROR_CODE } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
import { emailOtpVerification } from "../../../network-actions";
import {
  borderBottomBlue2,
  colorBlue,
  flexGrow,
  flexRow,
  fs12BoldBlue8,
  fs12BoldGray5,
  fs12RegGray5,
  fs14RegGray5,
  fs16BoldBlack2,
  fs18BoldGray6,
  px,
  sh16,
  sh24,
  sh4,
  sh56,
  sw24,
  sw264,
  sw32,
  sw4,
  sw8,
} from "../../../styles";
import { isNumber } from "../../../utils";

const { EMAIL_VERIFICATION, INVESTOR_INFORMATION } = Language.PAGE;
declare interface EmailOTPProps {
  accountType: TypeAccountChoices;
  addPersonalInfo: (state: IPersonalInfoState) => void;
  details?: IClientDetailsState;
  handleCancel?: () => void;
  handleNavigate: () => void;
  handleResend: () => void;
  jointEmail: string;
  jointEmailCheck: boolean;
  jointOtp: string;
  isEtbJoint: boolean;
  isEtbPrincipal: boolean;
  disabledSteps?: TypeOnboardingKey[];
  personalInfo: IPersonalInfoState;
  principalClientId: string;
  principalEmail: string;
  principalOtp: string;
  resendTimer: number;
  setJointOtp: (value: string) => void;
  setPage: (page: "verification" | "otp") => void;
  setPrincipalOtp: (value: string) => void;
  setResendTimer: (value: number) => void;
}

export const EmailOTP: FunctionComponent<EmailOTPProps> = ({
  addPersonalInfo,
  details,
  handleNavigate,
  handleResend,
  isEtbPrincipal,
  isEtbJoint,
  jointEmail,
  jointEmailCheck,
  jointOtp,
  disabledSteps,
  personalInfo,
  principalClientId,
  principalEmail,
  principalOtp,
  resendTimer,
  setJointOtp,
  setPage,
  setPrincipalOtp,
  setResendTimer,
}: EmailOTPProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const fetching = useRef<boolean>(false);
  const [principalError, setPrincipalError] = useState<string | undefined>(undefined);
  const [jointError, setJointError] = useState<string | undefined>(undefined);

  const validateOtp = (value: string) => {
    if (isNumber(value) === false) {
      return ERROR.LOGIN_INVALID_OTP;
    }
    return undefined;
  };

  const checkPrincipalOtp = () => {
    setPrincipalError(validateOtp(principalOtp));
  };

  const checkJointOtp = () => {
    setJointError(validateOtp(jointOtp));
  };

  const handleFetching = (loading: boolean) => {
    fetching.current = loading;
  };

  const handleVerifyOTP = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setPrincipalError(undefined);
      const checkJoint = jointEmailCheck === true ? { jointHolder: { email: jointEmail, code: jointOtp } } : {};
      const checkPrincipal = isEtbPrincipal === false ? { principalHolder: { email: principalEmail, code: principalOtp } } : {};
      const request: IEmailOtpVerificationRequest = {
        initId: details!.initId!,
        isForceUpdate: false,
        clientId: principalClientId,
        ...checkPrincipal,
        ...checkJoint,
      };
      const response: IEmailOtpVerificationResponse = await emailOtpVerification(request, navigation, handleFetching);
      fetching.current = false;
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          if (data.result.status === true) {
            handleNavigate();
          }
        }
        if (error !== null) {
          setPrincipalError(error.message);
          setJointError(error.message);
          if (error.errorCode === ERROR_CODE.otpAttempt) {
            setResendTimer(OTP_CONFIG.COOL_OFF);
            addPersonalInfo({ ...personalInfo, emailOtpSent: true, emailTimestamp: moment().format("x") });
          }
        }
      }
    }
    return true;
  };

  const handleResendOtp = () => {
    handleResend();
  };

  const handleBack = () => {
    addPersonalInfo({ ...personalInfo, editMode: false });
    setPage("verification");
  };

  const resendMinutes = Math.floor(resendTimer / 60);
  const resendSeconds = resendTimer % 60 === 0 ? 0 : resendTimer % 60;
  const formattedResendSeconds = resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds;
  const disabled =
    jointEmailCheck === false
      ? isEtbPrincipal === false && principalOtp === ""
      : (isEtbPrincipal === false && principalOtp === "") || (isEtbJoint === false && jointOtp === "");
  const principalOtpLabel = jointEmailCheck === true ? EMAIL_VERIFICATION.LABEL_OTP_PRINCIPAL : EMAIL_VERIFICATION.LABEL_OTP;

  const checkPrincipalLabel = isEtbPrincipal === false ? ` ${principalEmail} & ${jointEmail}` : jointEmail;
  const otpEmail = jointEmailCheck === true ? checkPrincipalLabel : `${principalEmail}`;
  const { editMode } = personalInfo;

  useEffect(() => {
    if (disabledSteps !== undefined && resendTimer <= 0) {
      const findEmailVerification = disabledSteps.indexOf("EmailVerification");
      if (findEmailVerification !== -1 && editMode === true) {
        setPage("verification");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaPage>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ ...px(sw24), backgroundColor: colorBlue._2 }}>
        <CustomSpacer space={defaultContentProps.spaceToTop!} />
        <View>
          <View style={flexRow}>
            <IcoMoon name="arrow-left" onPress={handleBack} size={sw24} suppressHighlighting={true} />
            <CustomSpacer isHorizontal={true} space={sw8} />
            <View>
              <Text style={fs18BoldGray6}>{EMAIL_VERIFICATION.HEADING_OTP}</Text>
            </View>
          </View>
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw32} />
            <TextSpaceArea spaceToTop={sh4} style={{ ...fs14RegGray5 }} text={EMAIL_VERIFICATION.NOTE_SPAM} />
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
                    <Text style={fs12BoldGray5}>{otpEmail}</Text>
                  </View>
                </View>
              }
              content={
                <View>
                  {isEtbPrincipal === false ? (
                    <CustomTextInput
                      keyboardType="numeric"
                      error={principalError}
                      label={principalOtpLabel}
                      maxLength={OTP_CONFIG.LENGTH}
                      onBlur={checkPrincipalOtp}
                      onChangeText={setPrincipalOtp}
                      placeholder={INVESTOR_INFORMATION.LABEL_OTP_PLACEHOLDER}
                      value={principalOtp}
                    />
                  ) : null}
                  {jointEmailCheck === true || jointEmail !== "" ? (
                    <Fragment>
                      {isEtbPrincipal === false ? (
                        <Fragment>
                          <CustomSpacer space={sh16} />
                          <View style={borderBottomBlue2} />
                          <CustomSpacer space={sh16} />
                        </Fragment>
                      ) : null}
                      <CustomTextInput
                        keyboardType="numeric"
                        error={jointError}
                        label={EMAIL_VERIFICATION.LABEL_OTP_JOINT}
                        onBlur={checkJointOtp}
                        maxLength={OTP_CONFIG.LENGTH}
                        onChangeText={setJointOtp}
                        placeholder={EMAIL_VERIFICATION.LABEL_OTP_PLACEHOLDER}
                        value={jointOtp}
                      />
                      <CustomSpacer space={sh16} />
                      <View style={borderBottomBlue2} />
                    </Fragment>
                  ) : null}
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
        </View>
        <CustomFlexSpacer />
        <CustomSpacer space={sh56} />
        <RoundedButton
          buttonStyle={{ width: sw264 }}
          disabled={disabled}
          text={EMAIL_VERIFICATION.LABEL_VERIFY}
          onPress={handleVerifyOTP}
        />
        <CustomSpacer space={sh56} />
      </ScrollView>
    </SafeAreaPage>
  );
};
